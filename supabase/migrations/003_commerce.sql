-- TLS Commerce Schema
-- Migration: 003_commerce.sql

-- ============================================
-- PRODUCTS & PRICING
-- ============================================

CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL DEFAULT 0, -- Price in cents
    currency TEXT NOT NULL DEFAULT 'usd',
    stripe_product_id TEXT UNIQUE,
    stripe_price_id TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS & PURCHASES
-- ============================================

CREATE TABLE public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    stripe_checkout_session_id TEXT UNIQUE,
    stripe_payment_intent_id TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    amount_cents INTEGER NOT NULL,
    currency TEXT NOT NULL DEFAULT 'usd',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- ============================================
-- ENROLLMENT REQUESTS (for approval workflows)
-- ============================================

CREATE TABLE public.enrollment_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    request_reason TEXT,
    reviewer_id UUID REFERENCES public.profiles(id),
    reviewed_at TIMESTAMPTZ,
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollment_requests ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can view active products
CREATE POLICY "Anyone can view active products" ON public.products
    FOR SELECT USING (is_active = true);

-- Orders: Users can view their own orders
CREATE POLICY "Users can view own orders" ON public.orders
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can insert orders" ON public.orders
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Enrollment requests: Users can view and create their own
CREATE POLICY "Users can view own enrollment requests" ON public.enrollment_requests
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create enrollment requests" ON public.enrollment_requests
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- ============================================
-- TRIGGERS
-- ============================================

CREATE TRIGGER products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-enroll user after successful order
CREATE OR REPLACE FUNCTION handle_successful_order()
RETURNS TRIGGER AS $$
DECLARE
    v_course_id UUID;
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- Get course_id from product
        SELECT course_id INTO v_course_id
        FROM public.products
        WHERE id = NEW.product_id;

        -- Create enrollment
        IF v_course_id IS NOT NULL THEN
            INSERT INTO public.enrollments (user_id, course_id)
            VALUES (NEW.user_id, v_course_id)
            ON CONFLICT (user_id, course_id) DO NOTHING;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_order_completed
    AFTER UPDATE ON public.orders
    FOR EACH ROW EXECUTE FUNCTION handle_successful_order();
