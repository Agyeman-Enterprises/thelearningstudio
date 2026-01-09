import Link from "next/link";
import {
    Award,
    BookOpen,
    Clock,
    Download,
    GraduationCap,
    TrendingUp,
} from "lucide-react";
import { CertificateCard } from "@/components/CertificateTemplate";

// Sample data
const completedCourses = [
    {
        id: "1",
        title: "Medical Thinking: How Physicians Reason",
        code: "MED-101",
        division: "Foundations of Medical Science",
        completedAt: "Jan 5, 2026",
        timeSpent: "24 hours",
        score: 92,
        hasCertificate: true,
        certificateNumber: "TLS-26-A7B3C9",
    },
    {
        id: "2",
        title: "Ethics in Modern Medical Practice",
        code: "ETH-101",
        division: "Ethics, Law & Professional Practice",
        completedAt: "Dec 12, 2025",
        timeSpent: "8 hours",
        score: 88,
        hasCertificate: true,
        certificateNumber: "TLS-25-D4E6F2",
    },
];

const inProgressCourses = [
    {
        id: "3",
        title: "Systems-Based Medicine: A Functional Framework",
        code: "FUN-201",
        progress: 65,
        lastActivity: "2 days ago",
    },
    {
        id: "4",
        title: "The Business of Medicine",
        code: "BUS-301",
        progress: 30,
        lastActivity: "1 week ago",
    },
];

const stats = [
    { label: "Courses Completed", value: "2", icon: GraduationCap },
    { label: "Certificates Earned", value: "2", icon: Award },
    { label: "Total Learning Time", value: "32h", icon: Clock },
    { label: "Avg. Score", value: "90%", icon: TrendingUp },
];

export default function RecordsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        My Records
                    </h1>
                    <p className="text-slate-500">
                        Your learning history and achievements.
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                    <Download className="h-4 w-4" />
                    Export Transcript
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl border border-slate-200 p-5"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-lg bg-slate-100">
                                <stat.icon className="h-5 w-5 text-slate-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-semibold text-[#0f172a]">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Certificates */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
                    My Certificates
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedCourses
                        .filter((c) => c.hasCertificate)
                        .map((course) => (
                            <CertificateCard
                                key={course.id}
                                title={course.title}
                                courseCode={course.code}
                                issuedDate={course.completedAt}
                                certificateNumber={course.certificateNumber}
                            />
                        ))}
                </div>
            </div>

            {/* Completed Courses */}
            <div className="mb-8">
                <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
                    Completed Courses
                </h2>
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                    Course
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                    Division
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                    Completed
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                    Time Spent
                                </th>
                                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                    Score
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {completedCourses.map((course) => (
                                <tr key={course.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-emerald-50 text-xs font-mono font-medium text-emerald-600">
                                                {course.code}
                                            </div>
                                            <span className="font-medium text-[#0f172a] text-sm">
                                                {course.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-500">
                                        {course.division}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-500">
                                        {course.completedAt}
                                    </td>
                                    <td className="px-5 py-4 text-sm text-slate-500">
                                        {course.timeSpent}
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-sm font-medium text-emerald-600">
                                            {course.score}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* In Progress */}
            <div>
                <h2 className="text-lg font-semibold text-[#0f172a] mb-4">
                    In Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inProgressCourses.map((course) => (
                        <Link
                            key={course.id}
                            href={`/courses/${course.id}`}
                            className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-blue-50 text-xs font-mono font-medium text-blue-600">
                                    {course.code}
                                </div>
                                <div>
                                    <h3 className="font-medium text-[#0f172a] text-sm">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs text-slate-500">
                                        Last activity: {course.lastActivity}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{ width: `${course.progress}%` }}
                                    />
                                </div>
                                <span className="text-xs text-slate-500">{course.progress}%</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
