-- TLS Certificates Schema
-- Migration: 004_certificates.sql

-- ============================================
-- CERTIFICATE TEMPLATES
-- ============================================

CREATE TABLE public.certificate_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    template_type TEXT NOT NULL CHECK (template_type IN ('course', 'division')),
    html_template TEXT, -- HTML template for rendering
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ISSUED CERTIFICATES (enhanced)
-- ============================================

-- Add more fields to existing certificates table if needed
ALTER TABLE public.certificates 
ADD COLUMN IF NOT EXISTS template_id UUID REFERENCES public.certificate_templates(id),
ADD COLUMN IF NOT EXISTS verification_url TEXT,
ADD COLUMN IF NOT EXISTS pdf_url TEXT,
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- ============================================
-- COMPLETION RECORDS
-- ============================================

CREATE TABLE public.completion_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
    division_id UUID REFERENCES public.divisions(id) ON DELETE SET NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    completion_type TEXT NOT NULL CHECK (completion_type IN ('course', 'division', 'certificate')),
    score_percent INTEGER, -- Optional: if there was a final assessment
    time_spent_minutes INTEGER, -- Total time in course
    certificate_id UUID REFERENCES public.certificates(id),
    metadata JSONB DEFAULT '{}'
);

-- ============================================
-- TRANSCRIPT VIEW
-- ============================================

CREATE OR REPLACE VIEW public.user_transcript AS
SELECT 
    cr.user_id,
    p.full_name,
    p.email,
    cr.completed_at,
    cr.completion_type,
    c.code AS course_code,
    c.title AS course_title,
    d.name AS division_name,
    cr.score_percent,
    cr.time_spent_minutes,
    cert.certificate_number,
    cert.title AS certificate_title
FROM public.completion_records cr
JOIN public.profiles p ON p.id = cr.user_id
LEFT JOIN public.courses c ON c.id = cr.course_id
LEFT JOIN public.divisions d ON d.id = cr.division_id
LEFT JOIN public.certificates cert ON cert.id = cr.certificate_id
ORDER BY cr.completed_at DESC;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.certificate_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.completion_records ENABLE ROW LEVEL SECURITY;

-- Templates: Anyone can view active templates
CREATE POLICY "Anyone can view active templates" ON public.certificate_templates
    FOR SELECT USING (is_active = true);

-- Completion records: Users can view their own
CREATE POLICY "Users can view own completion records" ON public.completion_records
    FOR SELECT USING (user_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Generate unique certificate number
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
DECLARE
    v_prefix TEXT := 'TLS';
    v_year TEXT := to_char(NOW(), 'YY');
    v_random TEXT := upper(substr(md5(random()::text), 1, 6));
BEGIN
    RETURN v_prefix || '-' || v_year || '-' || v_random;
END;
$$ LANGUAGE plpgsql;

-- Auto-issue certificate on course completion
CREATE OR REPLACE FUNCTION auto_issue_certificate()
RETURNS TRIGGER AS $$
DECLARE
    v_cert_id UUID;
    v_cert_number TEXT;
    v_course_title TEXT;
    v_user_name TEXT;
BEGIN
    -- Only trigger when status becomes 'completed'
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Get course and user info
        SELECT c.title INTO v_course_title
        FROM public.modules m
        JOIN public.courses c ON c.id = m.course_id
        WHERE m.id = (SELECT module_id FROM public.lessons WHERE id = NEW.lesson_id);

        SELECT full_name INTO v_user_name
        FROM public.profiles
        WHERE id = NEW.user_id;

        -- Check if all lessons in the course are completed
        -- (This is a simplified check - production would be more thorough)
        
        -- Generate certificate number
        v_cert_number := generate_certificate_number();
        
        -- Issue certificate
        INSERT INTO public.certificates (
            user_id,
            course_id,
            certificate_type,
            title,
            certificate_number
        )
        SELECT 
            NEW.user_id,
            m.course_id,
            'course',
            'TLS Certificate: ' || c.title,
            v_cert_number
        FROM public.lessons l
        JOIN public.modules m ON m.id = l.module_id
        JOIN public.courses c ON c.id = m.course_id
        WHERE l.id = NEW.lesson_id
        RETURNING id INTO v_cert_id;

        -- Create completion record
        IF v_cert_id IS NOT NULL THEN
            INSERT INTO public.completion_records (
                user_id,
                course_id,
                completion_type,
                certificate_id
            )
            SELECT 
                NEW.user_id,
                m.course_id,
                'course',
                v_cert_id
            FROM public.lessons l
            JOIN public.modules m ON m.id = l.module_id
            WHERE l.id = NEW.lesson_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger would be:
-- CREATE TRIGGER on_all_lessons_completed
--     AFTER UPDATE ON public.lesson_progress
--     FOR EACH ROW EXECUTE FUNCTION auto_issue_certificate();
-- But we need more complex logic to detect true course completion
