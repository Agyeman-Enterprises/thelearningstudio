import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Clock,
    Download,
    MessageSquare,
} from "lucide-react";
import { FallbackLessonContent } from "@/components/BuilderContent";

// Sample lesson data (would come from Supabase/Builder)
const lessonsData: Record<string, {
    id: string;
    title: string;
    moduleTitle: string;
    courseCode: string;
    courseTitle: string;
    duration: number;
    content: string;
    videoUrl?: string;
    resources: { title: string; type: string }[];
    prevLesson?: { id: string; title: string };
    nextLesson?: { id: string; title: string };
}> = {
    "med-101-2-1": {
        id: "med-101-2-1",
        title: "Medicine as Applied Science, Not Pure Science",
        moduleTitle: "Module 2: What Is Medical Reasoning?",
        courseCode: "MED-101",
        courseTitle: "Medical Thinking: How Physicians Reason",
        duration: 12,
        content: `Medicine is not pure science. It is applied science—the translation of laboratory findings into bedside care.

This distinction matters enormously. Pure science seeks truth for its own sake. Applied science seeks utility under constraints: time, resources, uncertainty, and human variability.

When a researcher discovers that a molecule inhibits a receptor in a petri dish, they have contributed to pure science. When a physician decides whether to prescribe that molecule to a 67-year-old patient with diabetes, hypertension, and a history of medication non-compliance, they are practicing applied science.

The gap between these two activities is where medical reasoning lives.

**Key Concepts:**

1. **Laboratory vs. Bedside** - What works in controlled conditions may not translate to real patients
2. **N=1 Problem** - Each patient is a unique experiment
3. **Reversibility** - Unlike physics, biological systems don't always behave predictably
4. **Time Constraints** - Decisions must often be made with incomplete information

Understanding this distinction is the first step toward developing genuine clinical wisdom.`,
        videoUrl: "https://example.com/video",
        resources: [
            { title: "Lesson Slides (PDF)", type: "pdf" },
            { title: "Key Concepts Worksheet", type: "pdf" },
        ],
        prevLesson: undefined,
        nextLesson: { id: "med-101-2-2", title: "Pattern Recognition vs. Analytical Reasoning" },
    },
    "med-101-2-2": {
        id: "med-101-2-2",
        title: "Pattern Recognition vs. Analytical Reasoning",
        moduleTitle: "Module 2: What Is Medical Reasoning?",
        courseCode: "MED-101",
        courseTitle: "Medical Thinking: How Physicians Reason",
        duration: 15,
        content: `In clinical practice, physicians rely on two distinct modes of reasoning, often called System 1 and System 2.

**System 1: Fast and Intuitive**
- Pattern-based recognition
- Automatic and effortless
- "The patient looks sick"
- Built through experience

**System 2: Slow and Analytical**
- Deliberate reasoning
- Step-by-step analysis
- Differential diagnosis lists
- Evidence weighing

Expert clinicians develop rich pattern libraries through years of experience. A seasoned emergency physician can often recognize sepsis within seconds of seeing a patient—long before labs return. This is System 1 at work.

But System 1 can also mislead. Cognitive biases like anchoring, availability bias, and premature closure all stem from over-reliance on pattern matching.

The art of clinical reasoning lies in knowing when to trust your patterns and when to slow down and think analytically.

**Clinical Application:**
- Use System 1 for initial gestalt and red flag recognition
- Engage System 2 for complex, atypical, or high-stakes cases
- When System 1 and System 2 conflict, investigate further`,
        videoUrl: "https://example.com/video2",
        resources: [
            { title: "Dual-Process Theory Handout", type: "pdf" },
            { title: "Case Studies", type: "pdf" },
        ],
        prevLesson: { id: "med-101-2-1", title: "Medicine as Applied Science" },
        nextLesson: { id: "med-101-2-3", title: "The Role of Heuristics" },
    },
};

export default function LessonPage({ params }: { params: { lessonId: string } }) {
    const lesson = lessonsData[params.lessonId] || lessonsData["med-101-2-1"];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-8 py-4">
                <div className="flex items-center justify-between max-w-5xl mx-auto">
                    <div>
                        <Link
                            href={`/courses/${lesson.courseCode.toLowerCase()}`}
                            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-1"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to {lesson.courseTitle}
                        </Link>
                        <p className="text-xs text-slate-400">{lesson.moduleTitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-sm text-slate-500">
                            <Clock className="h-4 w-4" />
                            {lesson.duration} min
                        </span>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
                            <Check className="h-4 w-4" />
                            Mark Complete
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl border border-slate-200 p-8">
                            <FallbackLessonContent
                                title={lesson.title}
                                content={lesson.content}
                                videoUrl={lesson.videoUrl}
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6">
                            {lesson.prevLesson ? (
                                <Link
                                    href={`/lessons/${lesson.prevLesson.id}`}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span className="hidden sm:inline">Previous:</span> {lesson.prevLesson.title}
                                </Link>
                            ) : (
                                <div />
                            )}
                            {lesson.nextLesson && (
                                <Link
                                    href={`/lessons/${lesson.nextLesson.id}`}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                                >
                                    <span className="hidden sm:inline">Next:</span> {lesson.nextLesson.title}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Resources */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <h3 className="font-semibold text-[#0f172a] text-sm mb-3">
                                Resources
                            </h3>
                            <div className="space-y-2">
                                {lesson.resources.map((resource, i) => (
                                    <button
                                        key={i}
                                        className="flex items-center gap-2 w-full px-3 py-2 bg-slate-50 rounded-lg text-sm text-slate-600 hover:bg-slate-100 transition-colors"
                                    >
                                        <Download className="h-4 w-4 text-slate-400" />
                                        {resource.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Discussion */}
                        <div className="bg-white rounded-xl border border-slate-200 p-4">
                            <h3 className="font-semibold text-[#0f172a] text-sm mb-3">
                                Discussion
                            </h3>
                            <button className="flex items-center gap-2 w-full px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                                <MessageSquare className="h-4 w-4" />
                                Ask a Question
                            </button>
                            <p className="text-xs text-slate-400 mt-2">
                                3 questions in this lesson
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
