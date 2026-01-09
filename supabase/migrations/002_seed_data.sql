-- TLS Medicine School Seed Data
-- Migration: 002_seed_data.sql

-- ============================================
-- SEED DIVISIONS
-- ============================================

INSERT INTO public.divisions (slug, name, description, long_description, icon, color, access_level, sort_order) VALUES
('foundations', 'Foundations of Medical Science', 
 'Medical reasoning, epistemology, physiology, and pharmacology fundamentals.',
 'This division anchors legitimacy. It covers the venerable core of medical education: how doctors think, how the body works, and how drugs interact with physiology. All content is designed for clinicians seeking to deepen their foundational understanding.',
 'GraduationCap', 'from-emerald-400 to-teal-500', 'clinician', 1),

('clinical', 'Clinical Medicine & Systems',
 'Organ-system clinical care, differential diagnosis, and standards of care.',
 'This division mirrors real medical training. It covers traditional clinical medicine with a modern lens: organ systems, differential diagnosis, red flags, and the tension between guidelines and clinical judgment.',
 'Stethoscope', 'from-blue-400 to-indigo-500', 'clinician', 2),

('functional', 'Functional & Systems Medicine',
 'Root-cause frameworks, inflammation, metabolism, and personalized care.',
 'This division is explicitly additive, not oppositional. Functional medicine is taught as a lens, a systems overlay, and a longitudinal model—not a replacement for classical medicine. Tiered access allows both clinicians and advanced learners to benefit.',
 'Activity', 'from-purple-400 to-pink-500', 'advanced_learner', 3),

('diagnostics', 'Diagnostics & Therapeutics',
 'Lab interpretation, imaging, medications vs supplements, and therapeutic sequencing.',
 'This division bridges both classical and functional worlds. It covers lab interpretation (standard and advanced), imaging fundamentals, the medication vs supplement debate, and therapeutic decision-making frameworks.',
 'FlaskConical', 'from-amber-400 to-orange-500', 'clinician', 4),

('business', 'The Business of Medicine',
 'Billing, coding, employment models, insurance, and administrative strategy.',
 'This division is pragmatic, sober, and non-ideological. It covers the realities of medical practice that are never taught in training: billing, coding, employment vs independent practice, insurance models, and administrative survival.',
 'Briefcase', 'from-slate-400 to-slate-600', 'clinician', 5),

('ethics', 'Ethics, Law & Professional Practice',
 'Medical ethics, scope of practice, consent, telehealth law, and risk management.',
 'This division protects you. It covers the legal and ethical dimensions of modern practice: scope of practice, informed consent, telehealth law, documentation as protection, and risk management. Mandatory viewing for all clinicians.',
 'Scale', 'from-rose-400 to-red-500', 'mandatory', 6);

-- ============================================
-- SEED COURSES
-- ============================================

-- Get division IDs
DO $$
DECLARE
    foundations_id UUID;
    clinical_id UUID;
    functional_id UUID;
    diagnostics_id UUID;
    business_id UUID;
    ethics_id UUID;
    med101_id UUID;
BEGIN
    SELECT id INTO foundations_id FROM public.divisions WHERE slug = 'foundations';
    SELECT id INTO clinical_id FROM public.divisions WHERE slug = 'clinical';
    SELECT id INTO functional_id FROM public.divisions WHERE slug = 'functional';
    SELECT id INTO diagnostics_id FROM public.divisions WHERE slug = 'diagnostics';
    SELECT id INTO business_id FROM public.divisions WHERE slug = 'business';
    SELECT id INTO ethics_id FROM public.divisions WHERE slug = 'ethics';

    -- Foundations Courses
    INSERT INTO public.courses (id, division_id, code, title, description, instructor_name, duration, schedule_type, is_published, is_featured)
    VALUES 
    (uuid_generate_v4(), foundations_id, 'MED-101', 'Medical Thinking: How Physicians Reason',
     'Understand how physicians are trained to think, from pattern recognition to systems reasoning.',
     'Dr. James Mitchell', '8 modules', 'self_paced', true, true)
    RETURNING id INTO med101_id;

    INSERT INTO public.courses (division_id, code, title, description, instructor_name, duration, schedule_type, is_published)
    VALUES 
    (foundations_id, 'PHY-101', 'Integrated Physiology for Clinicians',
     'A systems-based review of human physiology for practicing clinicians.',
     'Dr. Lisa Park', '12 modules', 'self_paced', true),
    (foundations_id, 'PHM-101', 'Pharmacology Without Memorization',
     'Understanding drug mechanisms through physiology, not rote memorization.',
     'Dr. Robert Chen', '10 modules', 'self_paced', true),
    (foundations_id, 'EPI-101', 'Reading the Literature Like a Clinician',
     'Evidence appraisal skills for the busy practitioner.',
     'Dr. Amanda Foster', '6 modules', 'self_paced', true);

    -- Clinical Courses
    INSERT INTO public.courses (division_id, code, title, description, instructor_name, duration, schedule_type, is_published)
    VALUES 
    (clinical_id, 'CLI-102', 'Internal Medicine Systems Review',
     'Organ-system clinical care with a focus on differential diagnosis.',
     'Dr. Amanda Foster', '10 modules', 'self_paced', true),
    (clinical_id, 'CLI-201', 'Primary Care Decision-Making',
     'Practical frameworks for common primary care presentations.',
     'Dr. Michael Torres', '8 modules', 'self_paced', true);

    -- Functional Courses
    INSERT INTO public.courses (division_id, code, title, description, instructor_name, duration, schedule_type, is_published, is_featured)
    VALUES 
    (functional_id, 'FUN-201', 'Systems-Based Medicine: A Functional Framework',
     'A rigorous exploration of root-cause medicine without ideology.',
     'Dr. Sarah Chen', '12 modules', 'cohort', true, true),
    (functional_id, 'FUN-202', 'Functional Lab Interpretation',
     'Advanced lab analysis through a systems biology lens.',
     'Dr. Lisa Park', '8 modules', 'self_paced', true, false);

    -- Diagnostics Courses
    INSERT INTO public.courses (division_id, code, title, description, instructor_name, duration, schedule_type, is_published)
    VALUES 
    (diagnostics_id, 'DIA-101', 'Labs That Matter (And Those That Don''t)',
     'A practical guide to clinically meaningful laboratory testing.',
     'Dr. Robert Chen', '6 modules', 'self_paced', true),
    (diagnostics_id, 'DIA-201', 'Medications, Supplements, and Interactions',
     'Navigating polypharmacy and supplement integration.',
     'Dr. Lisa Park', '8 modules', 'self_paced', true);

    -- Business Courses
    INSERT INTO public.courses (division_id, code, title, description, instructor_name, duration, schedule_type, is_published, is_featured)
    VALUES 
    (business_id, 'BUS-301', 'The Business of Medicine',
     'Billing, coding, employment models, and the administrative reality of modern practice.',
     'Prof. Michael Torres', '6 modules', 'self_paced', true, true),
    (business_id, 'BUS-302', 'Employed Physician vs Independent Practice',
     'Understanding your options and their tradeoffs.',
     'Prof. Michael Torres', '4 modules', 'self_paced', true, false);

    -- Ethics Courses
    INSERT INTO public.courses (division_id, code, title, description, instructor_name, duration, schedule_type, is_published)
    VALUES 
    (ethics_id, 'ETH-101', 'Ethics in Modern Medical Practice',
     'Foundational medical ethics for the contemporary clinician.',
     'Dr. Robert Kim', '4 modules', 'self_paced', true),
    (ethics_id, 'ETH-201', 'Informed Consent in the Real World',
     'Practical consent frameworks beyond the checkbox.',
     'Dr. Robert Kim', '3 modules', 'self_paced', true),
    (ethics_id, 'ETH-301', 'Telemedicine Law & Risk',
     'Legal considerations for virtual care across jurisdictions.',
     'Dr. Amanda Foster', '4 modules', 'self_paced', true);

    -- ============================================
    -- SEED MODULES & LESSONS FOR MED-101
    -- ============================================

    -- Module 1
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 1: Orientation & Scope', 'Frame expectations and protect boundaries.', 1);

    -- Module 2
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 2: What Is Medical Reasoning?', 'Define the intellectual core of medicine.', 2);

    -- Module 3
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 3: Evidence, Guidelines, and Reality', 'De-mystify Evidence-Based Medicine without attacking it.', 3);

    -- Module 4
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 4: Reductionism and the Organ-System Model', 'Explain why medicine fragments the body.', 4);

    -- Module 5
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 5: Systems Thinking in Medicine', 'Introduce systems thinking without ideology.', 5);

    -- Module 6
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 6: Where Functional Medicine Fits', 'Properly situate functional medicine.', 6);

    -- Module 7
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 7: Incentives, Constraints, and Behavior', 'Explain why medicine behaves the way it does.', 7);

    -- Module 8
    INSERT INTO public.modules (course_id, title, description, sort_order)
    VALUES (med101_id, 'Module 8: Integration & Orientation Forward', 'Prepare learners for deeper coursework.', 8);

END $$;

-- Add lessons to Module 2 (example of detailed content)
DO $$
DECLARE
    module2_id UUID;
BEGIN
    SELECT id INTO module2_id FROM public.modules WHERE title = 'Module 2: What Is Medical Reasoning?';

    INSERT INTO public.lessons (module_id, title, content, duration_minutes, sort_order)
    VALUES 
    (module2_id, 'Medicine as Applied Science, Not Pure Science',
     'Medicine is not pure science. It is applied science—the translation of laboratory findings into bedside care. This lesson explores the gap between idealized research and messy clinical reality.',
     12, 1),
    (module2_id, 'Pattern Recognition vs. Analytical Reasoning',
     'In clinical practice, physicians rely on two distinct modes of reasoning. System 1 is fast, automatic, and pattern-driven. System 2 is slow, deliberate, and analytical. Expertise is knowing when each applies.',
     15, 2),
    (module2_id, 'The Role of Heuristics in Clinical Practice',
     'Heuristics are mental shortcuts that simplify complex decisions. "Common things are common" saves cognitive load—but can also mislead. This lesson explores the power and peril of clinical heuristics.',
     10, 3),
    (module2_id, 'Uncertainty as a Core Feature of Medicine',
     'Good doctors are not certain—they manage uncertainty. This lesson introduces the Bayesian mindset: updating probability rather than seeking absolute truth.',
     12, 4);
END $$;
