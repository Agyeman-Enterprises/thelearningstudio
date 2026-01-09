import Link from "next/link";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Edit,
    Trash2,
    Eye,
    Users,
} from "lucide-react";

const courses = [
    {
        id: "med-101",
        code: "MED-101",
        title: "Medical Thinking: How Physicians Reason",
        division: "Foundations",
        instructor: "Dr. James Mitchell",
        enrollments: 342,
        status: "published",
        featured: true,
    },
    {
        id: "phy-101",
        code: "PHY-101",
        title: "Integrated Physiology for Clinicians",
        division: "Foundations",
        instructor: "Dr. Lisa Park",
        enrollments: 287,
        status: "published",
        featured: false,
    },
    {
        id: "fun-201",
        code: "FUN-201",
        title: "Systems-Based Medicine: A Functional Framework",
        division: "Functional Medicine",
        instructor: "Dr. Sarah Chen",
        enrollments: 128,
        status: "published",
        featured: true,
    },
    {
        id: "bus-301",
        code: "BUS-301",
        title: "The Business of Medicine",
        division: "Business of Medicine",
        instructor: "Prof. Michael Torres",
        enrollments: 89,
        status: "published",
        featured: true,
    },
    {
        id: "eth-101",
        code: "ETH-101",
        title: "Ethics in Modern Medical Practice",
        division: "Ethics & Law",
        instructor: "Dr. Robert Kim",
        enrollments: 512,
        status: "published",
        featured: false,
    },
    {
        id: "cli-102",
        code: "CLI-102",
        title: "Internal Medicine Systems Review",
        division: "Clinical Medicine",
        instructor: "Dr. Amanda Foster",
        enrollments: 256,
        status: "draft",
        featured: false,
    },
];

export default function AdminCoursesPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Course Management
                    </h1>
                    <p className="text-slate-500">Create, edit, and manage courses.</p>
                </div>
                <Link
                    href="/admin/courses/new"
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Create Course
                </Link>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    Filter
                </button>
            </div>

            {/* Course Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Division
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Instructor
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Enrollments
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {courses.map((course) => (
                            <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-slate-100 text-xs font-mono font-medium text-slate-600">
                                            {course.code}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#0f172a] text-sm">
                                                {course.title}
                                            </p>
                                            {course.featured && (
                                                <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                                                    Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">{course.division}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">{course.instructor}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="h-3.5 w-3.5 text-slate-400" />
                                        <span className="text-sm text-slate-600">{course.enrollments}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded ${course.status === "published"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        {course.status === "published" ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <Link
                                            href={`/admin/courses/${course.id}`}
                                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Link>
                                        <Link
                                            href={`/admin/courses/${course.id}/edit`}
                                            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="h-4 w-4" />
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
