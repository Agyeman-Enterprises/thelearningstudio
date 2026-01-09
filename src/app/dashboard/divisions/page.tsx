import Link from "next/link";
import {
    GraduationCap,
    Stethoscope,
    Activity,
    FlaskConical,
    Briefcase,
    Scale,
    ArrowRight,
    BookOpen,
    Users,
} from "lucide-react";

const divisions = [
    {
        id: "foundations",
        name: "Foundations of Medical Science",
        icon: GraduationCap,
        description: "Medical reasoning, epistemology, physiology, and pharmacology fundamentals.",
        courses: 8,
        faculty: 6,
        access: "Clinician-only",
        color: "from-emerald-400 to-teal-500",
        featured: [
            "Medical Thinking: How Physicians Reason",
            "Integrated Physiology for Clinicians",
            "Pharmacology Without Memorization",
        ],
    },
    {
        id: "clinical",
        name: "Clinical Medicine & Systems",
        icon: Stethoscope,
        description: "Organ-system clinical care, differential diagnosis, and standards of care.",
        courses: 12,
        faculty: 10,
        access: "Clinician-only",
        color: "from-blue-400 to-indigo-500",
        featured: [
            "Internal Medicine Systems Review",
            "Primary Care Decision-Making",
            "Case Conferences",
        ],
    },
    {
        id: "functional",
        name: "Functional & Systems Medicine",
        icon: Activity,
        description: "Root-cause frameworks, inflammation, metabolism, and personalized care.",
        courses: 10,
        faculty: 8,
        access: "Tiered: Clinician / Advanced Learner",
        color: "from-purple-400 to-pink-500",
        featured: [
            "Systems-Based Root Cause Medicine",
            "Functional Lab Interpretation",
            "Chronic Disease Through a Functional Lens",
        ],
    },
    {
        id: "diagnostics",
        name: "Diagnostics & Therapeutics",
        icon: FlaskConical,
        description: "Lab interpretation, imaging, medications vs supplements, and therapeutic sequencing.",
        courses: 6,
        faculty: 5,
        access: "Clinician-only",
        color: "from-amber-400 to-orange-500",
        featured: [
            "Labs That Matter",
            "Medications, Supplements, and Interactions",
            "Therapeutic Decision Trees",
        ],
    },
    {
        id: "business",
        name: "The Business of Medicine",
        icon: Briefcase,
        description: "Billing, coding, employment models, insurance, and administrative strategy.",
        courses: 6,
        faculty: 4,
        access: "Clinician-only",
        color: "from-slate-400 to-slate-600",
        featured: [
            "How Medicine Is Paid For",
            "Employed vs Independent Practice",
            "Administrative Strategy for Sanity",
        ],
    },
    {
        id: "ethics",
        name: "Ethics, Law & Professional Practice",
        icon: Scale,
        description: "Medical ethics, scope of practice, consent, telehealth law, and risk management.",
        courses: 4,
        faculty: 3,
        access: "Clinician-only (Mandatory)",
        color: "from-rose-400 to-red-500",
        featured: [
            "Ethics in Modern Medical Practice",
            "Informed Consent in the Real World",
            "Telemedicine Law & Risk",
        ],
    },
];

export default function DivisionsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#0f172a] mb-2">
                    Medicine School Divisions
                </h1>
                <p className="text-slate-600 max-w-2xl">
                    TLS Medicine School is organized into six divisions, each representing
                    a core domain of medical education. Explore the divisions below to find
                    your learning path.
                </p>
            </div>

            {/* Divisions Grid */}
            <div className="grid gap-6">
                {divisions.map((division) => (
                    <Link
                        key={division.id}
                        href={`/divisions/${division.id}`}
                        className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all"
                    >
                        <div className="flex items-start gap-6">
                            {/* Icon */}
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${division.color} text-white flex-shrink-0`}
                            >
                                <division.icon className="h-7 w-7" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <h2 className="text-lg font-semibold text-[#0f172a] group-hover:text-blue-600 transition-colors">
                                        {division.name}
                                    </h2>
                                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded whitespace-nowrap">
                                        {division.access}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">
                                    {division.description}
                                </p>

                                {/* Featured Courses */}
                                <div className="mb-4">
                                    <p className="text-xs font-medium text-slate-400 mb-2">
                                        Featured Courses:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {division.featured.map((course) => (
                                            <span
                                                key={course}
                                                className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center gap-6 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <BookOpen className="h-3.5 w-3.5" />
                                        {division.courses} Courses
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Users className="h-3.5 w-3.5" />
                                        {division.faculty} Faculty
                                    </span>
                                </div>
                            </div>

                            {/* Arrow */}
                            <ArrowRight className="h-5 w-5 text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
