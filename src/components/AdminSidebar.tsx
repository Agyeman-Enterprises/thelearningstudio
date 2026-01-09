"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    UserPlus,
    Building2,
    FileText,
    BarChart3,
    Settings,
    ChevronLeft,
    GraduationCap,
    ClipboardCheck,
    Award,
    DollarSign,
} from "lucide-react";

const academicItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: UserPlus },
    { name: "Enrollments", href: "/admin/enrollments", icon: GraduationCap },
    { name: "Assessments", href: "/admin/assessments", icon: ClipboardCheck },
    { name: "Certificates", href: "/admin/certificates", icon: Award },
];

const managementItems = [
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Divisions", href: "/admin/divisions", icon: Building2 },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
];

const financeItems = [
    { name: "Finance", href: "/admin/finance", icon: DollarSign },
    { name: "Reports", href: "/admin/reports", icon: BarChart3 },
];

export function AdminSidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/admin/dashboard") return pathname === "/admin/dashboard" || pathname === "/admin";
        return pathname.startsWith(href);
    };

    const NavSection = ({ title, items }: { title: string; items: typeof academicItems }) => (
        <div className="mb-6">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {title}
            </p>
            <div className="space-y-0.5">
                {items.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive(item.href)
                            ? "bg-[#fbbf24]/10 text-[#fbbf24]"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <aside className="flex h-screen w-[260px] flex-col bg-[#0f172a] text-white flex-shrink-0 border-r border-white/10">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-white/5 px-5 py-5">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f172a] font-bold text-sm">
                    LS
                    <GraduationCap className="absolute -right-1.5 -top-1 h-4 w-4 text-[#fbbf24]" />
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="font-bold text-sm text-[#fbbf24] tracking-tight">
                        Admin Portal
                    </span>
                    <span className="text-[10px] text-slate-400">The Learning Studio</span>
                </div>
            </div>

            {/* Back to Platform */}
            <div className="px-4 py-3 border-b border-white/5">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                >
                    <ChevronLeft className="h-3.5 w-3.5" />
                    Back to Platform
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
                <NavSection title="Academic" items={academicItems} />
                <NavSection title="Management" items={managementItems} />
                <NavSection title="Finance & Reports" items={financeItems} />
            </nav>

            {/* Settings */}
            <div className="border-t border-white/5 p-3">
                <Link
                    href="/admin/settings"
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive("/admin/settings")
                        ? "bg-[#fbbf24]/10 text-[#fbbf24]"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <Settings className="h-4 w-4" />
                    Settings
                </Link>
            </div>
        </aside>
    );
}
