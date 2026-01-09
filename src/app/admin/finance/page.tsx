import Link from "next/link";
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    CreditCard,
    Download,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";

const transactions = [
    {
        id: "txn_1",
        student: "Dr. Sarah Chen",
        description: "MED-101 Enrollment",
        amount: 299,
        status: "completed",
        date: "Jan 9, 2026",
    },
    {
        id: "txn_2",
        student: "Dr. James Wilson",
        description: "FUN-201 Enrollment",
        amount: 499,
        status: "completed",
        date: "Jan 8, 2026",
    },
    {
        id: "txn_3",
        student: "Michael Park",
        description: "BUS-301 Enrollment",
        amount: 199,
        status: "completed",
        date: "Jan 7, 2026",
    },
    {
        id: "txn_4",
        student: "Emily Rodriguez",
        description: "MED-101 Enrollment",
        amount: 299,
        status: "refunded",
        date: "Jan 5, 2026",
    },
    {
        id: "txn_5",
        student: "Dr. Lisa Thompson",
        description: "ETH-101 Enrollment",
        amount: 149,
        status: "completed",
        date: "Jan 4, 2026",
    },
];

const monthlyRevenue = [
    { month: "Aug", revenue: 18500 },
    { month: "Sep", revenue: 22300 },
    { month: "Oct", revenue: 19800 },
    { month: "Nov", revenue: 28400 },
    { month: "Dec", revenue: 32100 },
    { month: "Jan", revenue: 24650 },
];

export default function AdminFinancePage() {
    const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.revenue, 0);
    const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

    return (
        <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-[#0f172a] mb-1">
                        Finance & Revenue
                    </h1>
                    <p className="text-slate-500">Track payments, refunds, and revenue.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        <Download className="h-4 w-4" />
                        Export Report
                    </button>
                    <Link
                        href="https://dashboard.stripe.com"
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#635bff] text-white rounded-lg text-sm font-medium hover:bg-[#5851ea] transition-colors"
                    >
                        <CreditCard className="h-4 w-4" />
                        Stripe Dashboard
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <DollarSign className="h-5 w-5 text-emerald-500" />
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <TrendingUp className="h-3 w-3" /> +18%
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">$24,650</p>
                    <p className="text-sm text-slate-500">Revenue (30 days)</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <ArrowUpRight className="h-5 w-5 text-blue-500" />
                        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                            <TrendingUp className="h-3 w-3" /> +24%
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">156</p>
                    <p className="text-sm text-slate-500">Transactions (30 days)</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <ArrowDownRight className="h-5 w-5 text-red-500" />
                        <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                            3 refunds
                        </span>
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">$897</p>
                    <p className="text-sm text-slate-500">Refunds (30 days)</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <DollarSign className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-2xl font-semibold text-[#0f172a]">$158</p>
                    <p className="text-sm text-slate-500">Avg. Transaction</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
                    <h2 className="font-semibold text-[#0f172a] mb-4">Monthly Revenue</h2>
                    <div className="flex items-end gap-4 h-48">
                        {monthlyRevenue.map((m) => (
                            <div key={m.month} className="flex-1 flex flex-col items-center">
                                <div
                                    className="w-full bg-emerald-500 rounded-t-md transition-all hover:bg-emerald-600"
                                    style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                                />
                                <p className="text-xs text-slate-500 mt-2">{m.month}</p>
                                <p className="text-xs text-slate-400">${(m.revenue / 1000).toFixed(1)}k</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <h2 className="font-semibold text-[#0f172a] mb-4">Revenue by Course</h2>
                    <div className="space-y-4">
                        {[
                            { course: "MED-101", revenue: 8970, percent: 36 },
                            { course: "FUN-201", revenue: 6475, percent: 26 },
                            { course: "ETH-101", revenue: 4925, percent: 20 },
                            { course: "BUS-301", revenue: 2389, percent: 10 },
                            { course: "Other", revenue: 1891, percent: 8 },
                        ].map((item) => (
                            <div key={item.course}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-[#0f172a]">{item.course}</span>
                                    <span className="text-sm text-slate-600">${item.revenue.toLocaleString()}</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-emerald-500 rounded-full"
                                        style={{ width: `${item.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-6 bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
                    <h2 className="font-semibold text-[#0f172a]">Recent Transactions</h2>
                    <Link href="/admin/finance/transactions" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        View All →
                    </Link>
                </div>
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Student
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Description
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Amount
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Status
                            </th>
                            <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">
                                Date
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transactions.map((txn) => (
                            <tr key={txn.id} className="hover:bg-slate-50">
                                <td className="px-5 py-4 text-sm font-medium text-[#0f172a]">
                                    {txn.student}
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-600">
                                    {txn.description}
                                </td>
                                <td className="px-5 py-4 text-sm font-medium text-[#0f172a]">
                                    ${txn.amount}
                                </td>
                                <td className="px-5 py-4">
                                    <span
                                        className={`text-xs font-medium px-2 py-1 rounded ${txn.status === "completed"
                                                ? "bg-emerald-50 text-emerald-600"
                                                : "bg-red-50 text-red-600"
                                            }`}
                                    >
                                        {txn.status === "completed" ? "Completed" : "Refunded"}
                                    </span>
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-500">
                                    {txn.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
