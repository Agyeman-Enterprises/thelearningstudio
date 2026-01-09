"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    ArrowLeft,
    Save,
    Eye,
    Plus,
    Trash2,
    GripVertical,
    Video,
    FileText,
    Clock,
    Bold,
    Italic,
    List,
    Heading1,
    Heading2,
    Link as LinkIcon,
    Image,
} from "lucide-react";

// Sample course data
const courseData = {
    id: "med-101",
    code: "MED-101",
    title: "Medical Thinking: How Physicians Reason",
    modules: [
        {
            id: "mod-1",
            title: "Module 1: Orientation & Scope",
            lessons: [
                { id: "les-1-1", title: "Welcome & Course Overview", duration: 8 },
                { id: "les-1-2", title: "What This Course Is Not", duration: 6 },
            ],
        },
        {
            id: "mod-2",
            title: "Module 2: What Is Medical Reasoning?",
            lessons: [
                { id: "les-2-1", title: "Medicine as Applied Science", duration: 12 },
                { id: "les-2-2", title: "Pattern Recognition vs. Analytical Reasoning", duration: 15 },
                { id: "les-2-3", title: "The Role of Heuristics", duration: 10 },
            ],
        },
    ],
};

export default function CourseEditorPage() {
    const params = useParams();
    const router = useRouter();
    const [activeModule, setActiveModule] = useState(courseData.modules[0]?.id);

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Sidebar - Module/Lesson Tree */}
            <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <Link
                        href="/admin/courses"
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-3"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Courses
                    </Link>
                    <h2 className="font-semibold text-[#0f172a]">{courseData.code}</h2>
                    <p className="text-sm text-slate-500 truncate">{courseData.title}</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Modules
                        </h3>
                        <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded">
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {courseData.modules.map((module) => (
                            <div key={module.id} className="space-y-1">
                                <button
                                    onClick={() => setActiveModule(module.id)}
                                    className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${activeModule === module.id
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-slate-700 hover:bg-slate-50"
                                        }`}
                                >
                                    <GripVertical className="h-4 w-4 text-slate-300" />
                                    <span className="truncate flex-1">{module.title}</span>
                                </button>

                                {activeModule === module.id && (
                                    <div className="ml-6 space-y-1">
                                        {module.lessons.map((lesson) => (
                                            <Link
                                                key={lesson.id}
                                                href={`/admin/courses/${courseData.id}/modules/${module.id}/lessons/${lesson.id}`}
                                                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                                            >
                                                <FileText className="h-3.5 w-3.5 text-slate-400" />
                                                <span className="truncate flex-1">{lesson.title}</span>
                                                <span className="text-xs text-slate-400">{lesson.duration}m</span>
                                            </Link>
                                        ))}
                                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg w-full">
                                            <Plus className="h-3.5 w-3.5" />
                                            Add Lesson
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content - Editor Placeholder */}
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-600 mb-2">
                        Select a Lesson to Edit
                    </h3>
                    <p className="text-sm text-slate-400">
                        Choose a lesson from the sidebar or create a new one
                    </p>
                </div>
            </div>
        </div>
    );
}
