import Link from "next/link";
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Mail,
    Shield,
    CheckCircle,
    XCircle,
} from "lucide-react";

const users = [
    {
        id: "1",
        name: "Dr. Sarah Chen",
        email: "sarah.chen@hospital.org",
        role: "clinician",
        verified: true,
        enrollments: 4,
        completions: 2,
        joinedAt: "Jan 5, 2026",
    },
    {
        id: "2",
        name: "Dr. James Wilson",
        email: "j.wilson@clinic.com",
        role: "clinician",
        verified: true,
        enrollments: 6,
        completions: 4,
        joinedAt: "Dec 18, 2025",
    },
    {
        id: "3",
        name: "Dr. Emily Rodriguez",
        email: "emily.r@med.edu",
        role: "clinician",
        verified: false,
        enrollments: 1,
        completions: 0,
        joinedAt: "Jan 9, 2026",
    },
    {
        id: "4",
        name: "Michael Park",
        email: "m.park@gmail.com",
        role: "advanced_learner",
        verified: false,
        enrollments: 2,
        completions: 1,
        joinedAt: "Nov 22, 2025",
    },
    {
        id: "5",
        name: "Dr. Lisa Thompson",
        email: "l.thompson@healthcare.net",
        role: "clinician",
        verified: true,
        enrollments: 8,
        completions: 5,
        joinedAt: "Oct 3, 2025",
    },
    {
        id: "6",
        name: "Prof. Michael Torres",
        email: "mtorres@medicineschool.edu",
        role: "instructor",
        verified: true,
        enrollments: 0,
        completions: 0,
        joinedAt: "Sep 1, 2025",
    },
];

const roleColors: Record<string, string> = {
    admin: "bg-purple-50 text-purple-600",
    instructor: "bg-blue-50 text-blue-600",
    clinician: "bg-emerald-50 text-emerald-600",
    advanced_learner: "bg-amber-50 text-amber-600",
    learner: "bg-slate-100 text-slate-600",
};

const roleLabels: Record<string, string> = {
    admin: "Admin",
    instructor: "Instructor",
    clinician: "Clinician",
    advanced_learner: "Advanced Learner",
    learner: "Learner",
};

export default function AdminUsersPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        User Management
                    </h1>
                    <p className="text-slate-500">Manage users and their roles.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                    <Plus className="h-4 w-4" />
                    Invite User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">1,247</p>
                    <p className="text-sm text-slate-500">Total Users</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">892</p>
                    <p className="text-sm text-slate-500">Verified Clinicians</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">23</p>
                    <p className="text-sm text-slate-500">Pending Verification</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">12</p>
                    <p className="text-sm text-slate-500">Instructors</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Roles</option>
                    <option value="clinician">Clinicians</option>
                    <option value="advanced_learner">Advanced Learners</option>
                    <option value="instructor">Instructors</option>
                    <option value="admin">Admins</option>
                </select>
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Verification Status</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Role
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Verification
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Enrollments
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Completions
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
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                                        <div>
                                            <p className="font-medium text-[#0f172a] text-sm">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-slate-500">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded ${roleColors[user.role]}`}
                                    >
                                        {roleLabels[user.role]}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    {user.verified ? (
                                        <div className="flex items-center gap-1.5 text-emerald-600">
                                            <CheckCircle className="h-4 w-4" />
                                            <span className="text-xs font-medium">Verified</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-amber-600">
                                            <XCircle className="h-4 w-4" />
                                            <span className="text-xs font-medium">Pending</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">{user.enrollments}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-600">{user.completions}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-500">{user.joinedAt}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                            <Mail className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                            <Shield className="h-4 w-4" />
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
