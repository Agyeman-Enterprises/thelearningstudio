"use client";

import { useParams } from "next/navigation";
import { CertificateTemplate } from "@/components/CertificateTemplate";
import { Download, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Sample certificate data
const certificateData: Record<string, {
    recipientName: string;
    courseTitle: string;
    completionDate: string;
    certificateNumber: string;
    instructorName: string;
}> = {
    "TLS-26-A7B3C9": {
        recipientName: "Dr. Sarah Chen",
        courseTitle: "Medical Thinking: How Physicians Reason",
        completionDate: "January 5, 2026",
        certificateNumber: "TLS-26-A7B3C9",
        instructorName: "Dr. James Mitchell",
    },
    "TLS-25-D4E6F2": {
        recipientName: "Dr. Sarah Chen",
        courseTitle: "Ethics in Modern Medical Practice",
        completionDate: "December 12, 2025",
        certificateNumber: "TLS-25-D4E6F2",
        instructorName: "Dr. Robert Kim",
    },
};

export default function CertificatePage() {
    const params = useParams();
    const certId = params.certId as string;
    const certificate = certificateData[certId] || certificateData["TLS-26-A7B3C9"];

    return (
        <div className="min-h-screen bg-slate-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/records"
                        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Records
                    </Link>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                            <Share2 className="h-4 w-4" />
                            Share
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#0f172a] text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
                            <Download className="h-4 w-4" />
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Certificate */}
                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-lg">
                    <CertificateTemplate {...certificate} />
                </div>

                {/* Verification Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-500">
                        This certificate can be verified at{" "}
                        <span className="font-medium text-blue-600">
                            thelearningstudio.com/verify/{certificate.certificateNumber}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
