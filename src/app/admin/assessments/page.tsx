import Link from "next/link";
import {
    Search,
    Plus,
    ClipboardCheck,
    Eye,
    Edit,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
} from "lucide-react";

const assessments = [
    {
        id: "1",
        title: "Module 2 Quiz: Medical Reasoning",
        course: "MED-101",
        type: "quiz",
        questions: 10,
        passingScore: 70,
        submissions: 156,
        avgScore: 82,
        status: "active",
    },
    {
        id: "2",
        title: "Final Exam: Medical Thinking",
        course: "MED-101",
        type: "exam",
        questions: 50,
        passingScore: 75,
        submissions: 89,
        avgScore: 78,
        status: "active",
    },
    {
        id: "3",
        title: "Case Study Assessment",
        course: "FUN-201",
        type: "assignment",
        questions: 5,
        passingScore: 80,
        submissions: 45,
        avgScore: 85,
        status: "active",
    },
    {
        id: "4",
        title: "Ethics Practical Evaluation",
        course: "ETH-101",
        type: "practical",
        questions: 3,
        passingScore: 100,
        submissions: 234,
        avgScore: 92,
        status: "active",
    },
];

const recentSubmissions = [
    { student: "Dr. Sarah Chen", assessment: "Module 2 Quiz", score: 90, passed: true, time: "2 hours ago" },
    { student: "Dr. James Wilson", assessment: "Final Exam", score: 68, passed: false, time: "4 hours ago" },
    { student: "Emily Rodriguez", assessment: "Case Study", score: 88, passed: true, time: "Yesterday" },
    { student: "Michael Park", assessment: "Module 2 Quiz", score: 75, passed: true, time: "Yesterday" },
];

export default function AdminAssessmentsPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Assessments
                    </h1>
                    <p className="text-slate-500">Create, manage, and grade student assessments.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <FileText className="h-4 w-4" />
                        Grade Submissions
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        <Plus className="h-4 w-4" />
                        Create Assessment
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">24</p>
                    <p className="text-sm text-slate-500">Total Assessments</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">524</p>
                    <p className="text-sm text-slate-500">Submissions (30d)</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">84%</p>
                    <p className="text-sm text-slate-500">Avg. Pass Rate</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-amber-500">12</p>
                    <p className="text-sm text-slate-500">Pending Review</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Assessments List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="font-semibold text-[#0f172a]">All Assessments</h2>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm w-48"
                                />
                            </div>
                        </div>
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                        Assessment
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                        Type
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                        Submissions
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                        Avg Score
                                    </th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {assessments.map((assessment) => (
                                    <tr key={assessment.id} className="hover:bg-slate-50">
                                        <td className="px-5 py-4">
                                            <div>
                                                <p className="font-medium text-[#0f172a] text-sm">{assessment.title}</p>
                                                <p className="text-xs text-slate-500">{assessment.course} • {assessment.questions} questions</p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-600 capitalize">
                                                {assessment.type}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-sm text-slate-600">
                                            {assessment.submissions}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-sm font-medium ${assessment.avgScore >= assessment.passingScore ? "text-emerald-600" : "text-red-500"}`}>
                                                {assessment.avgScore}%
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1">
                                                <button className="p-2 text-slate-400 hover:text-slate-600" title="View Results">
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button className="p-2 text-slate-400 hover:text-slate-600" title="Edit Assessment">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Submissions */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200">
                        <div className="px-5 py-4 border-b border-slate-200">
                            <h2 className="font-semibold text-[#0f172a]">Recent Submissions</h2>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {recentSubmissions.map((submission, i) => (
                                <div key={i} className="px-5 py-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-[#0f172a]">{submission.student}</p>
                                        <span className={`flex items-center gap-1 text-xs font-medium ${submission.passed ? "text-emerald-600" : "text-red-500"}`}>
                                            {submission.passed ? <CheckCircle className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                            {submission.score}%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs text-slate-500">{submission.assessment}</p>
                                        <p className="text-xs text-slate-400">{submission.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="px-5 py-3 border-t border-slate-100">
                            <Link href="/admin/assessments/submissions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                                View All Submissions →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
