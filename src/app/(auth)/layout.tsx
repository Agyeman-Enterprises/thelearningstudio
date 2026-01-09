import { GraduationCap } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] text-white flex-col justify-between p-12">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0f172a] font-bold text-lg">
                        LS
                        <GraduationCap className="absolute -right-2 -top-1.5 h-5 w-5 text-[#fbbf24]" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs opacity-90">The</span>
                        <span className="font-bold text-sm text-[#fbbf24] tracking-tight">
                            Learning Studio
                        </span>
                    </div>
                </div>

                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        TLS | Medicine School
                    </h1>
                    <p className="text-lg text-slate-300 max-w-md">
                        Professional medical education for clinicians who think critically
                        about how medicine actually works.
                    </p>
                </div>

                <div className="text-sm text-slate-400">
                    © 2026 The Learning Studio. All rights reserved.
                </div>
            </div>

            {/* Right Panel - Auth Forms */}
            <div className="flex-1 flex items-center justify-center p-8 bg-slate-50">
                {children}
            </div>
        </div>
    );
}
