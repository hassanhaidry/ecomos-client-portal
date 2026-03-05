"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Award,
  ArrowUpRight,
  Bell,
  FileText,
  CheckCircle,
} from "lucide-react";
import { SkeletonCard, SkeletonRow, SkeletonChart } from "@/components/LoadingSkeleton";
import type { SheetResponse, MonthlyData } from "@/types";

const statusStyle = (status: string) => {
  if (status === "On Track") return { background: "#D1FAE5", color: "#065F46" };
  if (status === "Optimizing") return { background: "#FEF3C7", color: "#92400E" };
  return { background: "#F3F4F6", color: "#374151" };
};

function getStatus(roi: number): string {
  return roi >= 15 ? "On Track" : "Optimizing";
}

function fmt(n: number): string {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const notifications = [
  {
    icon: Bell,
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
    title: "Policy Update",
    desc: "New marketplace fee structure effective March 1",
    time: "2 hours ago",
    action: "View Details",
  },
  {
    icon: FileText,
    iconBg: "#F5F1FF",
    iconColor: "#6D28D9",
    title: "Invoice Ready",
    desc: "February 2026 invoice is ready for download",
    time: "1 day ago",
    action: "Download",
  },
  {
    icon: CheckCircle,
    iconBg: "#D1FAE5",
    iconColor: "#059669",
    title: "Milestone Reached",
    desc: "Your store hit $5,000 revenue this month!",
    time: "3 days ago",
    action: "View Report",
  },
];

export default function DashboardPage() {
  const [data, setData] = useState<SheetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/sheets")
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((json: SheetResponse) => {
        setData(json);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const lastMonth: MonthlyData | null =
    data && data.monthly.length > 0
      ? data.monthly[data.monthly.length - 1]
      : null;

  const kpis = [
    {
      label: "Revenue This Month",
      value: lastMonth ? fmt(lastMonth.revenue) : "—",
      trend: lastMonth ? `${lastMonth.roi.toFixed(1)}% ROI` : "—",
      icon: DollarSign,
      iconBg: "#F5F1FF",
      iconColor: "#6D28D9",
    },
    {
      label: "Total Orders",
      value: lastMonth ? lastMonth.orders.toString() : "—",
      trend: lastMonth ? lastMonth.month : "—",
      icon: ShoppingBag,
      iconBg: "#EFF6FF",
      iconColor: "#3B82F6",
    },
    {
      label: "ROI This Month",
      value: lastMonth ? `${lastMonth.roi.toFixed(2)}%` : "—",
      trend: "Target: 15–25%",
      icon: TrendingUp,
      iconBg: "#D1FAE5",
      iconColor: "#059669",
    },
    {
      label: "All-Time Revenue",
      value: data ? fmt(data.totals.totalRevenue) : "—",
      trend: data ? `${data.monthly.length} months` : "—",
      icon: Award,
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
    },
  ];

  const chartData =
    data?.monthly.map((m) => ({
      month: m.month.slice(0, 3),
      revenue: m.revenue,
    })) ?? [];

  const chartSubtitle =
    data && data.monthly.length >= 2
      ? `${data.monthly[0].month} – ${data.monthly[data.monthly.length - 1].month}`
      : "Monthly data";

  return (
    <div className="flex flex-col gap-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="bg-white rounded-2xl p-5 flex flex-col gap-4"
                style={{ border: "1px solid #E0D8F8" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: kpi.iconBg }}
                  >
                    <kpi.icon size={20} style={{ color: kpi.iconColor }} />
                  </div>
                  <div
                    className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                    style={{ background: "#D1FAE5", color: "#065F46" }}
                  >
                    <ArrowUpRight size={12} />
                    {kpi.trend}
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#1A1A2E" }}>{kpi.value}</p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "#6B7280" }}>{kpi.label}</p>
                </div>
              </div>
            ))}
      </div>

      {/* Error banner */}
      {error && (
        <div
          className="rounded-xl px-5 py-4 text-sm font-medium"
          style={{ background: "#FEF2F2", color: "#991B1B", border: "1px solid #FECACA" }}
        >
          Could not load live data: {error}. Showing cached or placeholder values.
        </div>
      )}

      {/* Chart + Store Info */}
      <div className="grid grid-cols-5 gap-5">
        {/* Revenue Chart */}
        <div
          className="col-span-3 bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E0D8F8" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold" style={{ color: "#1A1A2E" }}>Monthly Revenue</h2>
              <p className="text-xs" style={{ color: "#9CA3AF" }}>{chartSubtitle}</p>
            </div>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full"
              style={{ background: "#F5F1FF", color: "#6D28D9" }}
            >
              {data ? `${data.monthly.length} months` : "Loading…"}
            </span>
          </div>
          {loading ? (
            <SkeletonChart />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, "Revenue"]}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E0D8F8",
                    fontSize: 12,
                    color: "#1A1A2E",
                  }}
                  cursor={{ fill: "#F5F1FF" }}
                />
                <Bar dataKey="revenue" fill="#6D28D9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Store Info */}
        <div
          className="col-span-2 bg-white rounded-2xl p-6 flex flex-col gap-5"
          style={{ border: "1px solid #E0D8F8" }}
        >
          <div>
            <h2 className="text-base font-semibold mb-1" style={{ color: "#1A1A2E" }}>Store Overview</h2>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>Your managed store details</p>
          </div>

          <div className="flex flex-col gap-4">
            {[
              { label: "Store Name", value: "My TikTok Shop" },
              {
                label: "Platform",
                value: (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: "#1A1A2E", color: "#ffffff" }}
                  >
                    TikTok Shop
                  </span>
                ),
              },
              {
                label: "Status",
                value: (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{ background: "#D1FAE5", color: "#065F46" }}
                  >
                    Active
                  </span>
                ),
              },
              { label: "Started", value: "November 2025" },
              { label: "Account Manager", value: "Hassan" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm" style={{ color: "#6B7280" }}>{row.label}</span>
                {typeof row.value === "string" ? (
                  <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>{row.value}</span>
                ) : (
                  row.value
                )}
              </div>
            ))}
          </div>

          <div
            className="rounded-xl p-4 mt-auto"
            style={{ background: "#F5F1FF", border: "1px solid #E0D8F8" }}
          >
            <p className="text-xs mb-0.5" style={{ color: "#9CA3AF" }}>Next Payout</p>
            <p className="text-base font-bold" style={{ color: "#6D28D9" }}>March 10, 2026</p>
            <p className="text-xs mt-1" style={{ color: "#6B7280" }}>Direct bank transfer</p>
          </div>
        </div>
      </div>

      {/* Performance History + Notifications */}
      <div className="grid grid-cols-5 gap-5">
        {/* Performance Table */}
        <div
          className="col-span-3 bg-white rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E0D8F8" }}
        >
          <div className="px-6 py-5 border-b" style={{ borderColor: "#E0D8F8" }}>
            <h2 className="text-base font-semibold" style={{ color: "#1A1A2E" }}>Performance History</h2>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Monthly breakdown of your store performance</p>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: "#FAFAF8" }}>
                {["Month", "Revenue", "Orders", "ROI %", "Status"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium"
                    style={{ color: "#9CA3AF" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                : (data?.monthly ?? [])
                    .slice()
                    .reverse()
                    .map((row, i) => {
                      const status = getStatus(row.roi);
                      return (
                        <tr
                          key={i}
                          className="border-t transition-colors"
                          style={{ borderColor: "#F3F4F6" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF8")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                        >
                          <td className="px-6 py-4 text-sm font-medium" style={{ color: "#1A1A2E" }}>{row.month}</td>
                          <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#1A1A2E" }}>{fmt(row.revenue)}</td>
                          <td className="px-6 py-4 text-sm" style={{ color: "#6B7280" }}>{row.orders}</td>
                          <td className="px-6 py-4 text-sm font-medium" style={{ color: "#6D28D9" }}>{row.roi.toFixed(2)}%</td>
                          <td className="px-6 py-4">
                            <span
                              className="text-xs font-medium px-2.5 py-1 rounded-full"
                              style={statusStyle(status)}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
            </tbody>
          </table>
        </div>

        {/* Recent Notifications */}
        <div
          className="col-span-2 bg-white rounded-2xl p-6 flex flex-col gap-5"
          style={{ border: "1px solid #E0D8F8" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold" style={{ color: "#1A1A2E" }}>Notifications</h2>
              <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Recent updates</p>
            </div>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: "#F5F1FF", color: "#6D28D9" }}
            >
              3 new
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {notifications.map((n, i) => (
              <div
                key={i}
                className="rounded-xl p-4 flex flex-col gap-3"
                style={{ background: "#FAFAF8", border: "1px solid #E0D8F8" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: n.iconBg }}
                  >
                    <n.icon size={16} style={{ color: n.iconColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>{n.title}</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#6B7280" }}>{n.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{n.time}</span>
                  <button
                    className="text-xs font-medium px-2.5 py-1 rounded-lg transition-opacity hover:opacity-80"
                    style={{ background: "#F5F1FF", color: "#6D28D9" }}
                  >
                    {n.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
