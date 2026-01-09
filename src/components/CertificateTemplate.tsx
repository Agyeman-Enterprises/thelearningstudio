"use client";

import { useRef } from "react";
import { Award, Download, ExternalLink } from "lucide-react";

interface CertificateProps {
    recipientName: string;
    courseTitle: string;
    completionDate: string;
    certificateNumber: string;
    instructorName?: string;
}

export function CertificateTemplate({
    recipientName,
    courseTitle,
    completionDate,
    certificateNumber,
    instructorName = "The Learning Studio Faculty",
}: CertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={certificateRef}
            className="relative w-[800px] h-[600px] bg-white border-8 border-[#0f172a] p-12 mx-auto"
            style={{
                backgroundImage: `
          radial-gradient(ellipse at top left, rgba(251, 191, 36, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(15, 23, 42, 0.03) 0%, transparent 50%)
        `,
            }}
        >
            {/* Border decoration */}
            <div className="absolute inset-4 border-2 border-[#fbbf24]/30 pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-[#fbbf24]" />
            <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-[#fbbf24]" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-[#fbbf24]" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-[#fbbf24]" />

            {/* Content */}
            <div className="flex flex-col items-center justify-center h-full text-center">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0f172a] text-white font-bold text-lg">
                        LS
                    </div>
                    <div className="text-left">
                        <p className="text-lg font-bold text-[#0f172a] tracking-tight">
                            The Learning Studio
                        </p>
                        <p className="text-xs text-slate-500 tracking-widest uppercase">
                            Professional Education
                        </p>
                    </div>
                </div>

                {/* Title */}
                <p className="text-sm text-slate-500 tracking-[0.3em] uppercase mb-2">
                    Certificate of Completion
                </p>

                <div className="w-24 h-0.5 bg-[#fbbf24] mb-8" />

                {/* Recipient */}
                <p className="text-sm text-slate-500 mb-2">This certifies that</p>
                <h2 className="text-4xl font-serif text-[#0f172a] mb-4">
                    {recipientName}
                </h2>

                {/* Achievement */}
                <p className="text-sm text-slate-500 mb-2">has successfully completed</p>
                <h3 className="text-xl font-semibold text-[#0f172a] mb-6 max-w-lg">
                    {courseTitle}
                </h3>

                {/* Date */}
                <p className="text-sm text-slate-500">
                    Completed on {completionDate}
                </p>

                {/* Signature area */}
                <div className="mt-8 pt-8 border-t border-slate-200 w-full max-w-md">
                    <div className="flex justify-between items-end">
                        <div className="text-center">
                            <div className="w-32 border-b border-slate-300 mb-1" />
                            <p className="text-xs text-slate-500">{instructorName}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Award className="h-6 w-6 text-[#fbbf24]" />
                        </div>
                        <div className="text-center">
                            <div className="w-32 border-b border-slate-300 mb-1" />
                            <p className="text-xs text-slate-500">Program Director</p>
                        </div>
                    </div>
                </div>

                {/* Certificate number */}
                <p className="absolute bottom-8 text-[10px] text-slate-400 tracking-wider">
                    Certificate No: {certificateNumber} • Verify at thelearningstudio.com/verify/{certificateNumber}
                </p>
            </div>
        </div>
    );
}

export function CertificateCard({
    title,
    courseCode,
    issuedDate,
    certificateNumber,
}: {
    title: string;
    courseCode: string;
    issuedDate: string;
    certificateNumber: string;
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 text-white">
                        <Award className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-[#0f172a] text-sm">{title}</h3>
                        <p className="text-xs text-slate-500">{courseCode}</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                <span>Issued: {issuedDate}</span>
                <span className="text-xs font-mono">{certificateNumber}</span>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                    <Download className="h-4 w-4" />
                    Download
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
