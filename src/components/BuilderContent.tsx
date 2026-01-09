"use client";

import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "@/lib/builder/config";

interface BuilderContentProps {
    content: any;
    model: string;
}

export function BuilderContent({ content, model }: BuilderContentProps) {
    const isPreviewing = useIsPreviewing();

    if (!content && !isPreviewing) {
        return null;
    }

    return (
        <BuilderComponent
            model={model}
            content={content}
        />
    );
}

// Fallback content component when Builder is not configured
export function FallbackLessonContent({
    title,
    content,
    videoUrl,
}: {
    title: string;
    content: string;
    videoUrl?: string;
}) {
    return (
        <div className="prose prose-slate max-w-none">
            <h1 className="text-2xl font-semibold text-[#0f172a] mb-6">{title}</h1>

            {videoUrl && (
                <div className="aspect-video bg-slate-900 rounded-xl mb-8 flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <p className="text-sm opacity-70">Video Player</p>
                    </div>
                </div>
            )}

            <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {content}
            </div>
        </div>
    );
}
