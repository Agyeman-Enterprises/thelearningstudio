"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, BookOpen, Award } from "lucide-react";

function CheckoutSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In production, verify the session with Stripe
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, [sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-8 w-8 border-4 border-slate-200 border-t-[#0f172a] rounded-full mx-auto mb-4" />
                    <p className="text-slate-500">Confirming your enrollment...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mx-auto mb-6">
                        <CheckCircle className="h-8 w-8 text-emerald-600" />
                    </div>

                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-2">
                        Enrollment Complete!
                    </h1>
                    <p className="text-slate-600 mb-8">
                        Thank you for your purchase. You now have full access to the course.
                    </p>

                    <div className="bg-slate-50 rounded-lg p-4 mb-8">
                        <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-slate-400" />
                                <span>Access your course</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-4 w-4 text-slate-400" />
                                <span>Earn your certificate</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/courses"
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#0f172a] text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                        >
                            Go to My Courses
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="flex items-center justify-center w-full px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            Return to Dashboard
                        </Link>
                    </div>
                </div>

                <p className="text-center text-sm text-slate-400 mt-6">
                    A confirmation email has been sent to your inbox.
                </p>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin h-8 w-8 border-4 border-slate-200 border-t-[#0f172a] rounded-full mx-auto mb-4" />
                        <p className="text-slate-500">Loading...</p>
                    </div>
                </div>
            }
        >
            <CheckoutSuccessContent />
        </Suspense>
    );
}
