import Link from "next/link";
import {
    Search,
    Filter,
    Check,
    X,
    Eye,
    MoreHorizontal,
    Users,
    Clock,
    DollarSign,
} from "lucide-react";

const enrollments = [
    {
        id: "1",
        user: "Dr. Sarah Chen",
        email: "sarah.chen@hospital.org",
        course: "Medical Thinking",
        courseCode: "MED-101",
        type: "paid",
        amount: 299,
        status: "active",
        enrolledAt: "Jan 5, 2026",
        progress: 65,
    },
    {
        id: "2",
        user: "Dr. James Wilson",
        email: "j.wilson@clinic.com",
        course: "Systems-Based Medicine",
        courseCode: "FUN-201",
        type: "paid",
        amount: 499,
        status: "active",
        enrolledAt: "Dec 18, 2025",
        progress: 100,
    },
    {
        id: "3",
        user: "Dr. Emily Rodriguez",
        email: "emily.r@med.edu",
        course: "Medical Thinking",
        courseCode: "MED-101",
        type: "request",
        amount: 0,
        status: "pending",
        enrolledAt: "Jan 9, 2026",
        progress: 0,
    },
    {
        id: "4",
        user: "Michael Park",
        email: "m.park@gmail.com",
        course: "Business of Medicine",
        courseCode: "BUS-301",
        type: "paid",
        amount: 199,
        status: "active",
        enrolledAt: "Nov 22, 2025",
        progress: 30,
    },
    {
        id: "5",
        user: "Dr. Lisa Thompson",
        email: "l.thompson@healthcare.net",
        course: "Ethics in Modern Practice",
        courseCode: "ETH-101",
        type: "manual",
        amount: 0,
        status: "active",
        enrolledAt: "Oct 3, 2025",
        progress: 78,
    },
];

const pendingRequests = enrollments.filter((e) => e.status === "pending");

export default function AdminEnrollmentsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Enrollment Management
                    </h1>
                    <p className="text-slate-500">Manage student enrollments and access.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-slate-500">Total Enrollments</span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">3,892</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm text-slate-500">Revenue (30d)</span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">$24,650</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-slate-500">Pending Requests</span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">{pendingRequests.length}</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-slate-500">Completed</span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">847</p>
                </div>
            </div>

            {/* Pending Requests */}
            {pendingRequests.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <h3 className="font-medium text-amber-800 mb-3">
                        {pendingRequests.length} Pending Enrollment Request(s)
                    </h3>
                    <div className="space-y-2">
                        {pendingRequests.map((request) => (
                            <div
                                key={request.id}
                                className="flex items-center justify-between bg-white rounded-lg border border-amber-200 p-3"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500" />
                                    <div>
                                        <p className="text-sm font-medium text-[#0f172a]">
                                            {request.user}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Requested access to {request.course}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                                        <Check className="h-3.5 w-3.5" />
                                        Approve
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                                        <X className="h-3.5 w-3.5" />
                                        Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search enrollments..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                    <option value="">All Courses</option>
                    <option value="med-101">MED-101</option>
                    <option value="fun-201">FUN-201</option>
                    <option value="bus-301">BUS-301</option>
                </select>
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600">
                    <option value="">All Types</option>
                    <option value="paid">Paid</option>
                    <option value="manual">Manual</option>
                    <option value="request">Request</option>
                </select>
            </div>

            {/* Enrollments Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Student
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Progress
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Enrolled
                            </th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {enrollments
                            .filter((e) => e.status === "active")
                            .map((enrollment) => (
                                <tr key={enrollment.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                                            <div>
                                                <p className="text-sm font-medium text-[#0f172a]">
                                                    {enrollment.user}
                                                </p>
                                                <p className="text-xs text-slate-500">{enrollment.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div>
                                            <p className="text-sm text-[#0f172a]">{enrollment.course}</p>
                                            <p className="text-xs text-slate-500">{enrollment.courseCode}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded ${enrollment.type === "paid"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {enrollment.type === "paid"
                                                ? `$${enrollment.amount}`
                                                : enrollment.type.charAt(0).toUpperCase() + enrollment.type.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${enrollment.progress === 100
                                                            ? "bg-emerald-500"
                                                            : "bg-blue-500"
                                                        }`}
                                                    style={{ width: `${enrollment.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {enrollment.progress}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-sm text-slate-500">{enrollment.enrolledAt}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreHorizontal className="h-4 w-4" />
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
