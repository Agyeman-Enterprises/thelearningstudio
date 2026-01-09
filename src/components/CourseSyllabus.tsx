"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Check, Circle, Play } from "lucide-react";

interface Module {
    id: string;
    title: string;
    lessons: {
        id: string;
        title: string;
        status: "completed" | "current" | "locked";
    }[];
    isExpanded?: boolean;
}

interface CourseSyllabusProps {
    courseCode: string;
    courseTitle: string;
    term: string;
    modules: Module[];
    progressPercent: number;
}

export function CourseSyllabus({
    courseCode,
    courseTitle,
    term,
    modules,
    progressPercent,
}: CourseSyllabusProps) {
    const pathname = usePathname();

    return (
        <div className="w-full max-w-md bg-white border-r border-slate-200 h-full overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-slate-100">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400 mb-1">
                    Course Syllabus
                </p>
                <p className="text-sm font-semibold text-[#0f172a]">{term}</p>
            </div>

            {/* Progress */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-sm text-slate-600">{progressPercent}% Complete</span>
                <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#0f172a] rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Modules */}
            <div className="py-2">
                {modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border-b border-slate-100 last:border-0">
                        {/* Module Header */}
                        <button className="w-full flex items-center justify-between px-6 py-3 text-left hover:bg-slate-50 transition-colors">
                            <span className="text-sm font-medium text-[#0f172a]">
                                {module.title}
                            </span>
                            <ChevronRight
                                className={`h-4 w-4 text-slate-400 transition-transform ${module.isExpanded ? "rotate-90" : ""
                                    }`}
                            />
                        </button>

                        {/* Lessons */}
                        {module.isExpanded && (
                            <div className="pb-2">
                                {module.lessons.map((lesson, lessonIndex) => (
                                    <Link
                                        key={lesson.id}
                                        href={`/courses/${courseCode.toLowerCase()}/lessons/${lesson.id}`}
                                        className={`flex items-center gap-3 px-6 py-2.5 text-sm transition-colors ${lesson.status === "current"
                                                ? "bg-slate-100 text-[#0f172a] font-medium"
                                                : lesson.status === "completed"
                                                    ? "text-slate-500 hover:bg-slate-50"
                                                    : "text-slate-400"
                                            }`}
                                    >
                                        {lesson.status === "completed" ? (
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        ) : lesson.status === "current" ? (
                                            <Play className="h-4 w-4 text-[#0f172a]" />
                                        ) : (
                                            <Circle className="h-4 w-4" />
                                        )}
                                        <span>
                                            {lessonIndex + 1}. {lesson.title}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
