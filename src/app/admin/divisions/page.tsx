import Link from "next/link";
import {
    Plus,
    Edit,
    Trash2,
    BookOpen,
    Users,
    GraduationCap,
    Stethoscope,
    Activity,
    FlaskConical,
    Briefcase,
    Scale,
} from "lucide-react";

const divisions = [
    {
        id: "foundations",
        name: "Foundations of Medical Science",
        icon: GraduationCap,
        color: "from-emerald-400 to-teal-500",
        courses: 4,
        enrollments: 892,
        access: "Clinician-only",
    },
    {
        id: "clinical",
        name: "Clinical Medicine & Systems",
        icon: Stethoscope,
        color: "from-blue-400 to-indigo-500",
        courses: 2,
        enrollments: 445,
        access: "Clinician-only",
    },
    {
        id: "functional",
        name: "Functional & Systems Medicine",
        icon: Activity,
        color: "from-purple-400 to-pink-500",
        courses: 2,
        enrollments: 225,
        access: "Tiered Access",
    },
    {
        id: "diagnostics",
        name: "Diagnostics & Therapeutics",
        icon: FlaskConical,
        color: "from-amber-400 to-orange-500",
        courses: 2,
        enrollments: 323,
        access: "Clinician-only",
    },
    {
        id: "business",
        name: "The Business of Medicine",
        icon: Briefcase,
        color: "from-slate-400 to-slate-600",
        courses: 2,
        enrollments: 165,
        access: "Clinician-only",
    },
    {
        id: "ethics",
        name: "Ethics, Law & Professional Practice",
        icon: Scale,
        color: "from-rose-400 to-red-500",
        courses: 3,
        enrollments: 997,
        access: "Mandatory",
    },
];

export default function AdminDivisionsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Division Management
                    </h1>
                    <p className="text-slate-500">Manage academic divisions and their courses.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    <Plus className="h-4 w-4" />
                    Create Division
                </button>
            </div>

            {/* Divisions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {divisions.map((division) => (
                    <div
                        key={division.id}
                        className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${division.color} text-white`}
                                >
                                    <division.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[#0f172a]">{division.name}</h3>
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                        {division.access}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                    <Edit className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-slate-500">
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="h-4 w-4" />
                                <span>{division.courses} Courses</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                <span>{division.enrollments} Enrollments</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <Link
                                href={`/admin/divisions/${division.id}`}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                            >
                                Manage Courses →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
