import Link from "next/link";
import {
    Search,
    Plus,
    Award,
    Download,
    Eye,
    Mail,
    CheckCircle,
    XCircle,
    RefreshCw,
} from "lucide-react";

const certificates = [
    {
        id: "TLS-26-A7B3C9",
        student: "Dr. Sarah Chen",
        email: "sarah.chen@hospital.org",
        course: "Medical Thinking: How Physicians Reason",
        courseCode: "MED-101",
        issuedAt: "Jan 5, 2026",
        status: "issued",
    },
    {
        id: "TLS-25-D4E6F2",
        student: "Dr. James Wilson",
        email: "j.wilson@clinic.com",
        course: "Ethics in Modern Medical Practice",
        courseCode: "ETH-101",
        issuedAt: "Dec 12, 2025",
        status: "issued",
    },
    {
        id: "TLS-26-B8C4D1",
        student: "Emily Rodriguez",
        email: "emily.r@med.edu",
        course: "Systems-Based Medicine",
        courseCode: "FUN-201",
        issuedAt: "Jan 8, 2026",
        status: "pending",
    },
    {
        id: "TLS-25-E9F7G3",
        student: "Dr. Lisa Thompson",
        email: "l.thompson@healthcare.net",
        course: "Medical Thinking: How Physicians Reason",
        courseCode: "MED-101",
        issuedAt: "Oct 30, 2025",
        status: "issued",
    },
];

const pendingApprovals = certificates.filter((c) => c.status === "pending");

export default function AdminCertificatesPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Certificate Administration
                    </h1>
                    <p className="text-slate-500">Issue, manage, and verify completion certificates.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <RefreshCw className="h-4 w-4" />
                        Bulk Generate
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        <Plus className="h-4 w-4" />
                        Issue Certificate
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Award className="h-5 w-5 text-amber-500" />
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">847</p>
                    <p className="text-sm text-slate-500">Total Issued</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">156</p>
                    <p className="text-sm text-slate-500">This Month</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-amber-500">{pendingApprovals.length}</p>
                    <p className="text-sm text-slate-500">Pending Approval</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">12</p>
                    <p className="text-sm text-slate-500">Revoked</p>
                </div>
            </div>

            {/* Pending Approvals */}
            {pendingApprovals.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <h3 className="font-medium text-amber-800 mb-3">
                        {pendingApprovals.length} Certificate(s) Pending Approval
                    </h3>
                    <div className="space-y-2">
                        {pendingApprovals.map((cert) => (
                            <div
                                key={cert.id}
                                className="flex items-center justify-between bg-white rounded-lg border border-amber-200 p-3"
                            >
                                <div className="flex items-center gap-4">
                                    <Award className="h-5 w-5 text-amber-500" />
                                    <div>
                                        <p className="text-sm font-medium text-[#0f172a]">{cert.student}</p>
                                        <p className="text-xs text-slate-500">
                                            Completed {cert.course}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors">
                                        <CheckCircle className="h-3.5 w-3.5" />
                                        Approve & Issue
                                    </button>
                                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                                        <XCircle className="h-3.5 w-3.5" />
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
                        placeholder="Search by student name or certificate ID..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm"
                    />
                </div>
                <select
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600"
                    aria-label="Filter by course"
                >
                    <option value="">All Courses</option>
                    <option value="med-101">MED-101</option>
                    <option value="fun-201">FUN-201</option>
                    <option value="eth-101">ETH-101</option>
                </select>
                <select
                    className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600"
                    aria-label="Filter by status"
                >
                    <option value="">All Statuses</option>
                    <option value="issued">Issued</option>
                    <option value="pending">Pending</option>
                    <option value="revoked">Revoked</option>
                </select>
            </div>

            {/* Certificates Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Certificate ID
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Student
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Course
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Issued
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Status
                            </th>
                            <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {certificates.filter(c => c.status === "issued").map((cert) => (
                            <tr key={cert.id} className="hover:bg-slate-50">
                                <td className="px-5 py-4">
                                    <span className="text-sm font-mono text-[#0f172a]">{cert.id}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="text-sm font-medium text-[#0f172a]">{cert.student}</p>
                                        <p className="text-xs text-slate-500">{cert.email}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <div>
                                        <p className="text-sm text-slate-600">{cert.course}</p>
                                        <p className="text-xs text-slate-400">{cert.courseCode}</p>
                                    </div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-sm text-slate-500">{cert.issuedAt}</span>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-xs font-medium px-2 py-1 rounded bg-emerald-50 text-emerald-600">
                                        Issued
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-1">
                                        <button className="p-2 text-slate-400 hover:text-slate-600" title="View Certificate">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-600" title="Download PDF">
                                            <Download className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:text-slate-600" title="Email to Student">
                                            <Mail className="h-4 w-4" />
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
