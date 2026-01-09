"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Calendar,
    Library,
    GraduationCap,
    Stethoscope,
    Activity,
    FlaskConical,
    Briefcase,
    Scale,
    ChevronDown,
    Award,
} from "lucide-react";

const mainMenuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "My Courses", href: "/courses", icon: BookOpen },
    { name: "My Records", href: "/records", icon: Award },
    { name: "Academic Calendar", href: "/calendar", icon: Calendar },
];

const divisions = [
    { name: "Foundations", href: "/divisions/foundations", icon: GraduationCap },
    { name: "Clinical Medicine", href: "/divisions/clinical", icon: Stethoscope },
    { name: "Functional Medicine", href: "/divisions/functional", icon: Activity },
    { name: "Diagnostics", href: "/divisions/diagnostics", icon: FlaskConical },
    { name: "Business of Medicine", href: "/divisions/business", icon: Briefcase },
    { name: "Ethics & Law", href: "/divisions/ethics", icon: Scale },
];

const resources = [
    { name: "Library", href: "/library", icon: Library },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    return (
        <aside className="flex h-screen w-[280px] flex-col bg-[#0f172a] text-white flex-shrink-0 border-r border-white/10">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-white/5 px-6 py-8">
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

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
                {/* Platform Section */}
                <div className="mb-6">
                    <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Platform
                    </p>
                    <div className="space-y-1">
                        {mainMenuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                                    ? "bg-[#fbbf24]/10 text-[#fbbf24]"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Divisions Section */}
                <div className="mb-6">
                    <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Divisions
                    </p>
                    <div className="space-y-1">
                        {divisions.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                                    ? "bg-[#fbbf24]/10 text-[#fbbf24]"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Resources Section */}
                <div>
                    <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Resources
                    </p>
                    <div className="space-y-1">
                        {resources.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${isActive(item.href)
                                    ? "bg-[#fbbf24]/10 text-[#fbbf24]"
                                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* User Section */}
            <div className="flex items-center gap-3 border-t border-white/5 px-5 py-5">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                <div className="flex flex-col">
                    <span className="text-sm font-medium truncate">Dr. Elena Fisher</span>
                    <span className="text-xs text-slate-400 truncate">Senior Fellow</span>
                </div>
            </div>
        </aside>
    );
}
