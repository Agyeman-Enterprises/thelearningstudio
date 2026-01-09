import Link from "next/link";
import {
    Search,
    Plus,
    UserPlus,
    Mail,
    MoreHorizontal,
    UserMinus,
    GraduationCap,
    Eye,
    Edit,
    Check,
    X,
} from "lucide-react";

const students = [
    {
        id: "1",
        name: "Dr. Sarah Chen",
        email: "sarah.chen@hospital.org",
        status: "active",
        enrolledCourses: 3,
        completedCourses: 2,
        joinedAt: "Nov 15, 2025",
        verified: true,
    },
    {
        id: "2",
        name: "Dr. James Wilson",
        email: "j.wilson@clinic.com",
        status: "active",
        enrolledCourses: 2,
        completedCourses: 1,
        joinedAt: "Dec 3, 2025",
        verified: true,
    },
    {
        id: "3",
        name: "Dr. Emily Rodriguez",
        email: "emily.r@med.edu",
        status: "pending",
        enrolledCourses: 0,
        completedCourses: 0,
        joinedAt: "Jan 8, 2026",
        verified: false,
    },
    {
        id: "4",
        name: "Michael Park",
        email: "m.park@gmail.com",
        status: "active",
        enrolledCourses: 1,
        completedCourses: 0,
        joinedAt: "Jan 5, 2026",
        verified: true,
    },
    {
        id: "5",
        name: "Dr. Lisa Thompson",
        email: "l.thompson@healthcare.net",
        status: "suspended",
        enrolledCourses: 2,
        completedCourses: 2,
        joinedAt: "Sep 22, 2025",
        verified: true,
    },
];

const stats = [
    { label: "Total Students", value: "1,247" },
    { label: "Active", value: "1,089" },
    { label: "Pending Verification", value: "34" },
    { label: "Suspended", value: "12" },
];

export default function AdminStudentsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Student Management
                    </h1>
                    <p className="text-slate-500">Add, manage, and track student records.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Mail className="h-4 w-4" />
                        Invite Students
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        <UserPlus className="h-4 w-4" />
                        Add Student
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-4">
                        <p className="text-2xl font-semibold text-[#0f172a]">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search students by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <select
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600"
                    aria-label="Filter by status"
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                </select>
                <select
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600"
                    aria-label="Filter by verification"
                >
                    <option value="">All</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                </select>
            </div>

            {/* Students Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Student
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Enrolled
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Completed
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Joined
                            </th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                            {student.name.split(" ").map((n) => n[0]).join("")}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-[#0f172a] text-sm">{student.name}</p>
                                                {student.verified && (
                                                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500">{student.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded ${student.status === "active"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : student.status === "pending"
                                                    ? "bg-amber-50 text-amber-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">{student.enrolledCourses} courses</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">{student.completedCourses} courses</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-500">{student.joinedAt}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link
                                            href={`/admin/students/${student.id}`}
                                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                            title="View Student"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        <button
                                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                                            title="Enroll in Course"
                                        >
                                            <GraduationCap className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                            title="Disenroll"
                                        >
                                            <UserMinus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
