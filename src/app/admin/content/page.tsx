import Link from "next/link";
import {
    Plus,
    Search,
    FileText,
    Video,
    Image,
    File,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Upload,
} from "lucide-react";

const contentItems = [
    {
        id: "1",
        title: "Module 2: Medical Reasoning - Lesson Script",
        type: "document",
        course: "MED-101",
        updatedAt: "2 hours ago",
        status: "published",
    },
    {
        id: "2",
        title: "Pattern Recognition vs. Analytical Reasoning",
        type: "video",
        course: "MED-101",
        updatedAt: "1 day ago",
        status: "published",
    },
    {
        id: "3",
        title: "Evidence Hierarchy Diagram",
        type: "image",
        course: "MED-101",
        updatedAt: "3 days ago",
        status: "published",
    },
    {
        id: "4",
        title: "Systems Thinking Framework PDF",
        type: "pdf",
        course: "FUN-201",
        updatedAt: "1 week ago",
        status: "draft",
    },
    {
        id: "5",
        title: "Clinical Case Study: Chronic Fatigue",
        type: "document",
        course: "FUN-201",
        updatedAt: "2 weeks ago",
        status: "published",
    },
];

const typeIcons: Record<string, React.ElementType> = {
    document: FileText,
    video: Video,
    image: Image,
    pdf: File,
};

const typeColors: Record<string, string> = {
    document: "bg-blue-50 text-blue-500",
    video: "bg-purple-50 text-purple-500",
    image: "bg-emerald-50 text-emerald-500",
    pdf: "bg-red-50 text-red-500",
};

export default function AdminContentPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Content Management
                    </h1>
                    <p className="text-slate-500">Manage lesson content and media assets.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Upload className="h-4 w-4" />
                        Upload Media
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                        <Plus className="h-4 w-4" />
                        Create Content
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">156</p>
                    <p className="text-sm text-slate-500">Total Assets</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">42</p>
                    <p className="text-sm text-slate-500">Videos</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">87</p>
                    <p className="text-sm text-slate-500">Documents</p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-4">
                    <p className="text-2xl font-semibold text-[#0f172a]">27</p>
                    <p className="text-sm text-slate-500">PDFs & Files</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search content..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Types</option>
                    <option value="video">Videos</option>
                    <option value="document">Documents</option>
                    <option value="pdf">PDFs</option>
                    <option value="image">Images</option>
                </select>
                <select className="px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Courses</option>
                    <option value="med-101">MED-101</option>
                    <option value="fun-201">FUN-201</option>
                    <option value="bus-301">BUS-301</option>
                </select>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Content
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Course
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Updated
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
                        {contentItems.map((item) => {
                            const IconComponent = typeIcons[item.type];
                            return (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${typeColors[item.type]}`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <span className="font-medium text-[#0f172a] text-sm">
                                                {item.title}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-sm text-slate-600 capitalize">
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                                            {item.course}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span className="text-sm text-slate-500">{item.updatedAt}</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`text-xs font-medium px-2 py-1 rounded ${item.status === "published"
                                                    ? "bg-emerald-50 text-emerald-600"
                                                    : "bg-slate-100 text-slate-500"
                                                }`}
                                        >
                                            {item.status === "published" ? "Published" : "Draft"}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                <Eye className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
