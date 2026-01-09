import Link from "next/link";
import { ArrowRight, BookOpen, Users, Clock } from "lucide-react";

const courses = [
    {
        code: "MED-101",
        title: "Medical Thinking: How Physicians Reason",
        instructor: "Dr. James Mitchell",
        duration: "8 modules • Self-paced",
        enrolled: 342,
        division: "Foundations",
        description: "Understand how physicians are trained to think, from pattern recognition to systems reasoning.",
        progress: 65,
    },
    {
        code: "FUN-201",
        title: "Systems-Based Medicine: A Functional Framework",
        instructor: "Dr. Sarah Chen",
        duration: "12 modules • Cohort-based",
        enrolled: 128,
        division: "Functional Medicine",
        description: "A rigorous exploration of root-cause medicine without ideology.",
        progress: 30,
    },
    {
        code: "BUS-301",
        title: "The Business of Medicine",
        instructor: "Prof. Michael Torres",
        duration: "6 modules • Self-paced",
        enrolled: 89,
        division: "Business of Medicine",
        description: "Billing, coding, employment models, and the administrative reality of modern practice.",
        progress: 12,
    },
    {
        code: "CLI-102",
        title: "Internal Medicine Systems Review",
        instructor: "Dr. Amanda Foster",
        duration: "10 modules • Self-paced",
        enrolled: 256,
        division: "Clinical Medicine",
        description: "Organ-system clinical care with a focus on differential diagnosis.",
        progress: 0,
    },
    {
        code: "ETH-101",
        title: "Ethics in Modern Medical Practice",
        instructor: "Dr. Robert Kim",
        duration: "4 modules • Required",
        enrolled: 512,
        division: "Ethics & Law",
        description: "Scope, consent, documentation, and risk management for the modern clinician.",
        progress: 0,
    },
];

export default function CoursesPage() {
    const inProgress = courses.filter((c) => c.progress > 0);
    const available = courses.filter((c) => c.progress === 0);

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-semibold text-[#0f172a] mb-2">My Courses</h1>
                <p className="text-slate-600">
                    Your enrolled courses and available programs in TLS Medicine School.
                </p>
            </div>

            {/* In Progress */}
            {inProgress.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
                        In Progress
                    </h2>
                    <div className="grid gap-4">
                        {inProgress.map((course) => (
                            <Link
                                key={course.code}
                                href={`/courses/${course.code.toLowerCase()}`}
                                className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all"
                            >
                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                {course.code}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                {course.division}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#0f172a] group-hover:text-blue-600 transition-colors mb-1">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mb-3">
                                            {course.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Users className="h-3.5 w-3.5" />
                                                {course.enrolled} enrolled
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3.5 w-3.5" />
                                                {course.duration}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className="text-sm font-medium text-[#0f172a]">
                                            {course.progress}%
                                        </span>
                                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-blue-500 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Available */}
            <section>
                <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
                    Available Courses
                </h2>
                <div className="grid gap-4">
                    {available.map((course) => (
                        <Link
                            key={course.code}
                            href={`/courses/${course.code.toLowerCase()}`}
                            className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all"
                        >
                            <div className="flex items-start justify-between gap-6">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                            {course.code}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                            {course.division}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#0f172a] group-hover:text-blue-600 transition-colors mb-1">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mb-3">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-3.5 w-3.5" />
                                            {course.enrolled} enrolled
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            {course.duration}
                                        </span>
                                    </div>
                                </div>
                                <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    Enroll
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
