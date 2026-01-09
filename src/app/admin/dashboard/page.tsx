import Link from "next/link";
import {
    Users,
    BookOpen,
    GraduationCap,
    TrendingUp,
    ArrowRight,
    Plus,
    Eye,
} from "lucide-react";

// Sample analytics data
const stats = [
    { label: "Total Users", value: "1,247", change: "+12%", icon: Users, color: "blue" },
    { label: "Active Courses", value: "14", change: "+2", icon: BookOpen, color: "emerald" },
    { label: "Enrollments", value: "3,892", change: "+18%", icon: GraduationCap, color: "purple" },
    { label: "Completions", value: "847", change: "+24%", icon: TrendingUp, color: "amber" },
];

const recentActivity = [
    { type: "enrollment", user: "Dr. Sarah Chen", course: "Medical Thinking", time: "2 min ago" },
    { type: "completion", user: "Dr. James Wilson", course: "Systems-Based Medicine", time: "15 min ago" },
    { type: "signup", user: "Dr. Emily Rodriguez", course: null, time: "32 min ago" },
    { type: "enrollment", user: "Dr. Michael Park", course: "The Business of Medicine", time: "1 hour ago" },
    { type: "completion", user: "Dr. Lisa Thompson", course: "Ethics in Modern Practice", time: "2 hours ago" },
];

const quickActions = [
    { label: "Create Course", href: "/admin/courses/new", icon: Plus },
    { label: "View Reports", href: "/admin/reports", icon: Eye },
    { label: "Manage Users", href: "/admin/users", icon: Users },
];

export default function AdminDashboardPage() {
    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                    Admin Dashboard
                </h1>
                <p className="text-slate-500">
                    Platform overview and management tools.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-white rounded-xl border border-slate-200 p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                                <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
                            </div>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-2xl font-semibold text-[#0f172a]">{stat.value}</p>
                        <p className="text-sm text-slate-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-[#0f172a]">Recent Activity</h2>
                        <Link
                            href="/admin/reports"
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            View all
                            <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="px-5 py-3 flex items-center gap-4">
                                <div
                                    className={`h-2 w-2 rounded-full ${activity.type === "enrollment"
                                            ? "bg-blue-500"
                                            : activity.type === "completion"
                                                ? "bg-emerald-500"
                                                : "bg-purple-500"
                                        }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[#0f172a]">
                                        <span className="font-medium">{activity.user}</span>
                                        {activity.type === "enrollment" && (
                                            <span className="text-slate-500">
                                                {" "}enrolled in <span className="font-medium">{activity.course}</span>
                                            </span>
                                        )}
                                        {activity.type === "completion" && (
                                            <span className="text-slate-500">
                                                {" "}completed <span className="font-medium">{activity.course}</span>
                                            </span>
                                        )}
                                        {activity.type === "signup" && (
                                            <span className="text-slate-500"> signed up</span>
                                        )}
                                    </p>
                                </div>
                                <span className="text-xs text-slate-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-slate-200">
                    <div className="px-5 py-4 border-b border-slate-100">
                        <h2 className="font-semibold text-[#0f172a]">Quick Actions</h2>
                    </div>
                    <div className="p-4 space-y-2">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <action.icon className="h-4 w-4 text-slate-600" />
                                <span className="text-sm font-medium text-[#0f172a]">
                                    {action.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Top Courses */}
                    <div className="px-5 py-4 border-t border-slate-100">
                        <h3 className="font-medium text-sm text-[#0f172a] mb-3">
                            Top Courses This Week
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Medical Thinking</span>
                                <span className="text-xs font-medium text-slate-500">142 enrollments</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Systems-Based Medicine</span>
                                <span className="text-xs font-medium text-slate-500">98 enrollments</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Business of Medicine</span>
                                <span className="text-xs font-medium text-slate-500">67 enrollments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
