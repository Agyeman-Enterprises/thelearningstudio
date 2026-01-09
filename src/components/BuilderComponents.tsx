"use client";

import { Builder } from "@builder.io/react";

// Custom components for Builder.io

// Video Player Component
export function VideoPlayer({ url, title }: { url?: string; title?: string }) {
    return (
        <div className="aspect-video bg-slate-900 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
            {url ? (
                <iframe
                    src={url}
                    title={title || "Video"}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            ) : (
                <div className="text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <p className="text-sm opacity-70">Video Player</p>
                </div>
            )}
        </div>
    );
}

// Key Concept Callout
export function KeyConcept({ title, children }: { title?: string; children?: React.ReactNode }) {
    return (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6 rounded-r-lg">
            {title && (
                <h4 className="font-semibold text-amber-800 mb-2">{title}</h4>
            )}
            <div className="text-amber-900">{children}</div>
        </div>
    );
}

// Clinical Note
export function ClinicalNote({ children }: { children?: React.ReactNode }) {
    return (
        <div className="bg-blue-50 border border-blue-200 p-4 my-6 rounded-lg">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className="text-blue-900 text-sm">{children}</div>
            </div>
        </div>
    );
}

// Quiz Question
export function QuizQuestion({
    question,
    options,
    correctIndex
}: {
    question: string;
    options: string[];
    correctIndex: number;
}) {
    return (
        <div className="bg-slate-50 border border-slate-200 p-6 my-6 rounded-xl">
            <p className="font-medium text-[#0f172a] mb-4">{question}</p>
            <div className="space-y-2">
                {options.map((option, i) => (
                    <button
                        key={i}
                        className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg text-sm hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                        <span className="font-medium text-slate-400 mr-3">
                            {String.fromCharCode(65 + i)}.
                        </span>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Register components with Builder
if (typeof window !== 'undefined') {
    Builder.registerComponent(VideoPlayer, {
        name: 'VideoPlayer',
        inputs: [
            { name: 'url', type: 'url', friendlyName: 'Video URL' },
            { name: 'title', type: 'string', friendlyName: 'Video Title' },
        ],
    });

    Builder.registerComponent(KeyConcept, {
        name: 'KeyConcept',
        inputs: [
            { name: 'title', type: 'string', friendlyName: 'Title' },
        ],
        defaultChildren: [
            {
                '@type': '@builder.io/sdk:Element',
                component: { name: 'Text', options: { text: 'Key concept content here...' } },
            },
        ],
    });

    Builder.registerComponent(ClinicalNote, {
        name: 'ClinicalNote',
        defaultChildren: [
            {
                '@type': '@builder.io/sdk:Element',
                component: { name: 'Text', options: { text: 'Clinical note content here...' } },
            },
        ],
    });

    Builder.registerComponent(QuizQuestion, {
        name: 'QuizQuestion',
        inputs: [
            { name: 'question', type: 'string', friendlyName: 'Question' },
            { name: 'options', type: 'list', subFields: [{ name: 'option', type: 'string' }] },
            { name: 'correctIndex', type: 'number', friendlyName: 'Correct Answer Index' },
        ],
    });
}
