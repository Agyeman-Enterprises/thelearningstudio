import { notFound } from "next/navigation";
import Link from "next/link";
import {
    GraduationCap,
    Stethoscope,
    Activity,
    FlaskConical,
    Briefcase,
    Scale,
    BookOpen,
    Users,
    Clock,
    ArrowLeft,
} from "lucide-react";

const divisionsData: Record<string, {
    name: string;
    icon: React.ElementType;
    description: string;
    longDescription: string;
    access: string;
    color: string;
    courses: {
        code: string;
        title: string;
        instructor: string;
        duration: string;
        enrolled: number;
    }[];
}> = {
    foundations: {
        name: "Foundations of Medical Science",
        icon: GraduationCap,
        description: "Medical reasoning, epistemology, physiology, and pharmacology fundamentals.",
        longDescription: "This division anchors legitimacy. It covers the venerable core of medical education: how doctors think, how the body works, and how drugs interact with physiology. All content is designed for clinicians seeking to deepen their foundational understanding.",
        access: "Clinician-only",
        color: "from-emerald-400 to-teal-500",
        courses: [
            { code: "MED-101", title: "Medical Thinking: How Physicians Reason", instructor: "Dr. James Mitchell", duration: "8 modules", enrolled: 342 },
            { code: "PHY-101", title: "Integrated Physiology for Clinicians", instructor: "Dr. Lisa Park", duration: "12 modules", enrolled: 287 },
            { code: "PHM-101", title: "Pharmacology Without Memorization", instructor: "Dr. Robert Chen", duration: "10 modules", enrolled: 198 },
            { code: "EPI-101", title: "Reading the Literature Like a Clinician", instructor: "Dr. Amanda Foster", duration: "6 modules", enrolled: 156 },
        ],
    },
    clinical: {
        name: "Clinical Medicine & Systems",
        icon: Stethoscope,
        description: "Organ-system clinical care, differential diagnosis, and standards of care.",
        longDescription: "This division mirrors real medical training. It covers traditional clinical medicine with a modern lens: organ systems, differential diagnosis, red flags, and the tension between guidelines and clinical judgment.",
        access: "Clinician-only",
        color: "from-blue-400 to-indigo-500",
        courses: [
            { code: "CLI-102", title: "Internal Medicine Systems Review", instructor: "Dr. Amanda Foster", duration: "10 modules", enrolled: 256 },
            { code: "CLI-201", title: "Primary Care Decision-Making", instructor: "Dr. Michael Torres", duration: "8 modules", enrolled: 189 },
            { code: "CLI-301", title: "Acute vs Chronic Care Models", instructor: "Dr. Sarah Chen", duration: "6 modules", enrolled: 124 },
        ],
    },
    functional: {
        name: "Functional & Systems Medicine",
        icon: Activity,
        description: "Root-cause frameworks, inflammation, metabolism, and personalized care.",
        longDescription: "This division is explicitly additive, not oppositional. Functional medicine is taught as a lens, a systems overlay, and a longitudinal model—not a replacement for classical medicine. Tiered access allows both clinicians and advanced learners to benefit.",
        access: "Tiered: Clinician / Advanced Learner",
        color: "from-purple-400 to-pink-500",
        courses: [
            { code: "FUN-201", title: "Systems-Based Root Cause Medicine", instructor: "Dr. Sarah Chen", duration: "12 modules", enrolled: 128 },
            { code: "FUN-202", title: "Functional Lab Interpretation", instructor: "Dr. Lisa Park", duration: "8 modules", enrolled: 97 },
            { code: "FUN-301", title: "Chronic Disease Through a Functional Lens", instructor: "Dr. James Mitchell", duration: "10 modules", enrolled: 86 },
        ],
    },
    diagnostics: {
        name: "Diagnostics & Therapeutics",
        icon: FlaskConical,
        description: "Lab interpretation, imaging, medications vs supplements, and therapeutic sequencing.",
        longDescription: "This division bridges both classical and functional worlds. It covers lab interpretation (standard and advanced), imaging fundamentals, the medication vs supplement debate, and therapeutic decision-making frameworks.",
        access: "Clinician-only",
        color: "from-amber-400 to-orange-500",
        courses: [
            { code: "DIA-101", title: "Labs That Matter (And Those That Don't)", instructor: "Dr. Robert Chen", duration: "6 modules", enrolled: 178 },
            { code: "DIA-201", title: "Medications, Supplements, and Interactions", instructor: "Dr. Lisa Park", duration: "8 modules", enrolled: 145 },
            { code: "DIA-301", title: "Therapeutic Decision Trees", instructor: "Dr. Michael Torres", duration: "6 modules", enrolled: 112 },
        ],
    },
    business: {
        name: "The Business of Medicine",
        icon: Briefcase,
        description: "Billing, coding, employment models, insurance, and administrative strategy.",
        longDescription: "This division is pragmatic, sober, and non-ideological. It covers the realities of medical practice that are never taught in training: billing, coding, employment vs independent practice, insurance models, and administrative survival.",
        access: "Clinician-only",
        color: "from-slate-400 to-slate-600",
        courses: [
            { code: "BUS-301", title: "How Medicine Is Paid For", instructor: "Prof. Michael Torres", duration: "6 modules", enrolled: 89 },
            { code: "BUS-302", title: "Employed Physician vs Independent Practice", instructor: "Prof. Michael Torres", duration: "4 modules", enrolled: 76 },
            { code: "BUS-401", title: "Administrative Strategy for Sanity", instructor: "Dr. Amanda Foster", duration: "4 modules", enrolled: 64 },
        ],
    },
    ethics: {
        name: "Ethics, Law & Professional Practice",
        icon: Scale,
        description: "Medical ethics, scope of practice, consent, telehealth law, and risk management.",
        longDescription: "This division protects you. It covers the legal and ethical dimensions of modern practice: scope of practice, informed consent, telehealth law, documentation as protection, and risk management. Mandatory viewing for all clinicians.",
        access: "Clinician-only (Mandatory)",
        color: "from-rose-400 to-red-500",
        courses: [
            { code: "ETH-101", title: "Ethics in Modern Medical Practice", instructor: "Dr. Robert Kim", duration: "4 modules", enrolled: 512 },
            { code: "ETH-201", title: "Informed Consent in the Real World", instructor: "Dr. Robert Kim", duration: "3 modules", enrolled: 298 },
            { code: "ETH-301", title: "Telemedicine Law & Risk", instructor: "Dr. Amanda Foster", duration: "4 modules", enrolled: 187 },
        ],
    },
};

export default async function DivisionPage({
    params,
}: {
    params: Promise<{ divisionId: string }>;
}) {
    const { divisionId } = await params;
    const division = divisionsData[divisionId];

    if (!division) {
        notFound();
    }

    const IconComponent = division.icon;

    return (
        <div className="p-8">
            {/* Back Link */}
            <Link
                href="/divisions"
                className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6"
            >
                <ArrowLeft className="h-4 w-4" />
                All Divisions
            </Link>

            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${division.color} text-white flex-shrink-0`}
                >
                    <IconComponent className="h-8 w-8" />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-semibold text-[#0f172a]">
                            {division.name}
                        </h1>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                            {division.access}
                        </span>
                    </div>
                    <p className="text-slate-600 max-w-2xl">
                        {division.longDescription}
                    </p>
                </div>
            </div>

            {/* Courses */}
            <section>
                <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
                    Courses in this Division
                </h2>
                <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                    {division.courses.map((course) => (
                        <Link
                            key={course.code}
                            href={`/courses/${course.code.toLowerCase()}`}
                            className="flex items-center gap-6 p-5 hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-slate-100 text-xs font-mono font-medium text-slate-600">
                                {course.code}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-[#0f172a]">{course.title}</h3>
                                <p className="text-sm text-slate-500">{course.instructor}</p>
                            </div>
                            <div className="flex items-center gap-6 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Users className="h-3.5 w-3.5" />
                                    {course.enrolled} enrolled
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
