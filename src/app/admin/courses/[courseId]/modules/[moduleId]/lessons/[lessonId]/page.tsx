"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Eye,
    Trash2,
    Video,
    Clock,
    Bold,
    Italic,
    List,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Image,
    Code,
    Quote,
    AlertCircle,
    Lightbulb,
    FileText,
} from "lucide-react";

// Sample lesson data
const lessonData = {
    id: "les-2-1",
    title: "Medicine as Applied Science, Not Pure Science",
    moduleTitle: "Module 2: What Is Medical Reasoning?",
    courseCode: "MED-101",
    duration: 12,
    videoUrl: "",
    content: `Medicine is not pure science. It is applied science—the translation of laboratory findings into bedside care.

This distinction matters enormously. Pure science seeks truth for its own sake. Applied science seeks utility under constraints: time, resources, uncertainty, and human variability.

When a researcher discovers that a molecule inhibits a receptor in a petri dish, they have contributed to pure science. When a physician decides whether to prescribe that molecule to a 67-year-old patient with diabetes, hypertension, and a history of medication non-compliance, they are practicing applied science.

## Key Concepts

1. **Laboratory vs. Bedside** - What works in controlled conditions may not translate to real patients
2. **N=1 Problem** - Each patient is a unique experiment
3. **Reversibility** - Unlike physics, biological systems don't always behave predictably
4. **Time Constraints** - Decisions must often be made with incomplete information

> Clinical Pearl: The gap between research and practice is where medical reasoning lives.

Understanding this distinction is the first step toward developing genuine clinical wisdom.`,
    resources: [
        { id: "res-1", title: "Lesson Slides", type: "pdf", url: "" },
        { id: "res-2", title: "Key Concepts Worksheet", type: "pdf", url: "" },
    ],
};

export default function LessonEditorPage() {
    const params = useParams();
    const router = useRouter();
    const [lesson, setLesson] = useState(lessonData);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"content" | "settings" | "resources">("content");

    const handleSave = async () => {
        setSaving(true);
        // Simulate save
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Link
                            href={`/admin/courses/${params.courseId}`}
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <p className="text-xs text-slate-400">{lessonData.courseCode} / {lessonData.moduleTitle}</p>
                            <input
                                type="text"
                                value={lesson.title}
                                onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                                className="text-lg font-semibold text-[#0f172a] bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link
                            href={`/lessons/${params.lessonId}`}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 text-slate-600 bg-slate-100 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                        >
                            <Eye className="h-4 w-4" />
                            Preview
                        </Link>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
                        >
                            <Save className="h-4 w-4" />
                            {saving ? "Saving..." : "Save"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-slate-200 px-6">
                <div className="max-w-6xl mx-auto flex gap-1">
                    {(["content", "settings", "resources"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab
                                    ? "border-[#0f172a] text-[#0f172a]"
                                    : "border-transparent text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                {activeTab === "content" && (
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Editor */}
                        <div className="lg:col-span-3">
                            {/* Video Section */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
                                <label className="text-sm font-medium text-[#0f172a] mb-2 block">
                                    <Video className="h-4 w-4 inline mr-2" />
                                    Video URL (YouTube, Vimeo, or direct link)
                                </label>
                                <input
                                    type="url"
                                    value={lesson.videoUrl}
                                    onChange={(e) => setLesson({ ...lesson, videoUrl: e.target.value })}
                                    placeholder="https://youtube.com/watch?v=..."
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Editor Toolbar */}
                            <div className="bg-white rounded-t-xl border border-slate-200 border-b-0 p-2 flex items-center gap-1 flex-wrap">
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Bold">
                                    <Bold className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Italic">
                                    <Italic className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-slate-200 mx-1" />
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Heading 1">
                                    <Heading1 className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Heading 2">
                                    <Heading2 className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-slate-200 mx-1" />
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Bullet List">
                                    <List className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Quote">
                                    <Quote className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Code">
                                    <Code className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-slate-200 mx-1" />
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Link">
                                    <LinkIcon className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded" title="Image">
                                    <Image className="h-4 w-4" />
                                </button>
                                <div className="w-px h-6 bg-slate-200 mx-1" />
                                <button className="p-2 text-amber-500 hover:text-amber-600 hover:bg-amber-50 rounded" title="Key Concept">
                                    <Lightbulb className="h-4 w-4" />
                                </button>
                                <button className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Clinical Note">
                                    <AlertCircle className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Content Editor */}
                            <div className="bg-white rounded-b-xl border border-slate-200 p-4">
                                <textarea
                                    value={lesson.content}
                                    onChange={(e) => setLesson({ ...lesson, content: e.target.value })}
                                    className="w-full h-[500px] p-4 font-mono text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Write lesson content in Markdown..."
                                />
                                <p className="text-xs text-slate-400 mt-2">
                                    Supports Markdown: **bold**, *italic*, ## headings, - lists, {"> quotes"}
                                </p>
                            </div>
                        </div>

                        {/* Sidebar - Quick Actions */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-xl border border-slate-200 p-4">
                                <h3 className="text-sm font-semibold text-[#0f172a] mb-3">
                                    Lesson Settings
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-xs text-slate-500 mb-1 block">Duration (minutes)</label>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-slate-400" />
                                            <input
                                                type="number"
                                                value={lesson.duration}
                                                onChange={(e) => setLesson({ ...lesson, duration: parseInt(e.target.value) || 0 })}
                                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl border border-slate-200 p-4">
                                <h3 className="text-sm font-semibold text-[#0f172a] mb-3">
                                    Content Blocks
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <button className="flex items-center gap-2 w-full px-3 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors">
                                        <Lightbulb className="h-4 w-4" />
                                        Key Concept
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                                        <AlertCircle className="h-4 w-4" />
                                        Clinical Note
                                    </button>
                                    <button className="flex items-center gap-2 w-full px-3 py-2 bg-slate-50 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                                        <FileText className="h-4 w-4" />
                                        Quiz Question
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "resources" && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-[#0f172a]">Lesson Resources</h3>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                                <FileText className="h-4 w-4" />
                                Upload File
                            </button>
                        </div>
                        <div className="space-y-2">
                            {lesson.resources.map((resource) => (
                                <div
                                    key={resource.id}
                                    className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-5 w-5 text-slate-400" />
                                        <span className="text-sm font-medium text-slate-700">{resource.title}</span>
                                        <span className="text-xs text-slate-400 uppercase">{resource.type}</span>
                                    </div>
                                    <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "settings" && (
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="font-semibold text-[#0f172a] mb-4">Lesson Settings</h3>
                        <div className="space-y-4 max-w-lg">
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1 block">Lesson Title</label>
                                <input
                                    type="text"
                                    value={lesson.title}
                                    onChange={(e) => setLesson({ ...lesson, title: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700 mb-1 block">Duration (minutes)</label>
                                <input
                                    type="number"
                                    value={lesson.duration}
                                    onChange={(e) => setLesson({ ...lesson, duration: parseInt(e.target.value) || 0 })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                                />
                            </div>
                            <div className="pt-4 border-t border-slate-200">
                                <button className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                    Delete Lesson
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
