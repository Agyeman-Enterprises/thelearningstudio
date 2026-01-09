"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Check,
    CreditCard,
    Shield,
    Clock,
    BookOpen,
    Users,
    Award,
} from "lucide-react";

// Sample course data (would come from database)
const courseData: Record<string, {
    code: string;
    title: string;
    instructor: string;
    description: string;
    modules: number;
    duration: string;
    enrolled: number;
    price: number;
    features: string[];
}> = {
    "med-101": {
        code: "MED-101",
        title: "Medical Thinking: How Physicians Reason",
        instructor: "Dr. James Mitchell",
        description:
            "Understand how physicians are trained to think, from pattern recognition to systems reasoning. This foundational course sets the epistemological framework for all medical education at TLS.",
        modules: 8,
        duration: "4-6 weeks",
        enrolled: 342,
        price: 29900, // $299.00 in cents
        features: [
            "8 comprehensive modules",
            "Self-paced learning",
            "Downloadable resources",
            "Certificate of completion",
            "Private community access",
            "Lifetime access to content",
        ],
    },
    "fun-201": {
        code: "FUN-201",
        title: "Systems-Based Medicine: A Functional Framework",
        instructor: "Dr. Sarah Chen",
        description:
            "A rigorous exploration of root-cause medicine without ideology. Learn to apply systems thinking to chronic disease management.",
        modules: 12,
        duration: "8-10 weeks",
        enrolled: 128,
        price: 49900, // $499.00 in cents
        features: [
            "12 in-depth modules",
            "Cohort-based learning",
            "Live Q&A sessions",
            "Case study library",
            "Certificate of completion",
            "Private community access",
        ],
    },
};

export default function CheckoutPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const course = courseData[courseId] || courseData["med-101"];

    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId,
                    courseName: course.title,
                    priceInCents: course.price,
                    userId: "user-123", // Would come from auth
                    userEmail: "user@example.com", // Would come from auth
                }),
            });

            const { url, error } = await response.json();

            if (error) {
                console.error("Checkout error:", error);
                alert("Failed to start checkout. Please try again.");
                return;
            }

            if (url) {
                window.location.href = url;
            }
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Failed to start checkout. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (cents: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(cents / 100);
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <Link
                    href={`/courses/${courseId}`}
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-8"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to course
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Course Details */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="mb-6">
                                <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                    {course.code}
                                </span>
                            </div>

                            <h1 className="text-2xl font-semibold text-[#0f172a] mb-2">
                                {course.title}
                            </h1>
                            <p className="text-slate-600 mb-6">{course.description}</p>

                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6 pb-6 border-b border-slate-100">
                                <span className="flex items-center gap-1.5">
                                    <BookOpen className="h-4 w-4" />
                                    {course.modules} modules
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    {course.duration}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4" />
                                    {course.enrolled} enrolled
                                </span>
                            </div>

                            <h3 className="font-semibold text-[#0f172a] mb-4">
                                What&apos;s Included
                            </h3>
                            <ul className="space-y-3">
                                {course.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-slate-600">
                                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Payment Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-8">
                            <div className="text-center mb-6">
                                <p className="text-3xl font-bold text-[#0f172a]">
                                    {formatPrice(course.price)}
                                </p>
                                <p className="text-sm text-slate-500">One-time payment</p>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0f172a] text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        <CreditCard className="h-4 w-4" />
                                        Enroll Now
                                    </>
                                )}
                            </button>

                            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <Shield className="h-4 w-4 text-emerald-500" />
                                    <span>Secure payment via Stripe</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-500">
                                    <Award className="h-4 w-4 text-amber-500" />
                                    <span>Certificate upon completion</span>
                                </div>
                            </div>

                            <p className="mt-6 text-xs text-slate-400 text-center">
                                By enrolling, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
