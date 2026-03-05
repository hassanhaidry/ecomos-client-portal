"use client";
import { useState, useEffect } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  ShoppingCart,
  Calendar,
  BarChart2,
  Bell,
  FileText,
  CheckCircle,
} from "lucide-react";
import { SkeletonCard } from "@/components/LoadingSkeleton";
import type { SheetResponse, MonthlyData } from "@/types";

// ── helpers ────────────────────────────────────────────────────────────────────
function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtShort(n: number) {
  return `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}

function getBadge(roi: number): { label: string; bg: string; color: string } {
  if (roi >= 20) return { label: "Excellent", bg: "#D1FAE5", color: "#065F46" };
  if (roi >= 15) return { label: "On Track", bg: "#EDE9FE", color: "#6D28D9" };
  if (roi >= 10) return { label: "Moderate", bg: "#FEF3C7", color: "#92400E" };
  return { label: "Below Target", bg: "#FEE2E2", color: "#991B1B" };
}

// ── notifications (hard-coded) ─────────────────────────────────────────────────
const NOTIFICATIONS = [
  {
    type: "policy",
    borderColor: "#3B82F6",
    Icon: Bell,
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
    title: "Marketplace Fee Update",
    desc: "TikTok Shop fee structure updated effective March 1, 2026",
    time: "2 days ago",
    btn: "Read Policy",
  },
  {
    type: "invoice",
    borderColor: "#6D28D9",
    Icon: FileText,
    iconBg: "#F5F1FF",
    iconColor: "#6D28D9",
    title: "Invoice Ready",
    desc: "Your February 2026 profit statement is available",
    time: "5 days ago",
    btn: "Download",
  },
  {
    type: "milestone",
    borderColor: "#16A34A",
    Icon: CheckCircle,
    iconBg: "#DCFCE7",
    iconColor: "#16A34A",
    title: "Revenue Milestone",
    desc: "Your store crossed 150 total orders this month!",
    time: "1 week ago",
    btn: "View Details",
  },
];

// ── main component ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [sheetsData, setSheetsData] = useState<SheetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // support form
  const [subject, setSubject] = useState("Store Issue");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<"normal" | "high">("normal");

  useEffect(() => {
    fetch("/api/sheets")
      .then((res) => {
        if (!res.ok) throw new Error(`API error ${res.status}`);
        return res.json();
      })
      .then((json: SheetResponse) => {
        setSheetsData(json);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  // ── derived data ──────────────────────────────────────────────────────────────
  const lastNonZero: MonthlyData | null =
    sheetsData
      ? [...sheetsData.monthly].reverse().find((m) => m.revenue > 0) ?? null
      : null;

  const totalCogs = sheetsData
    ? sheetsData.monthly.reduce((sum, m) => sum + m.cogs, 0)
    : 0;

  const chartData =
    sheetsData?.monthly.map((m) => ({
      month: m.month.slice(0, 3),
      revenue: m.revenue,
      roi: m.roi,
    })) ?? [];

  // ── KPI cards config ──────────────────────────────────────────────────────────
  const kpiCards = [
    {
      Icon: DollarSign,
      circleBg: "#DCFCE7",
      iconColor: "#16A34A",
      value: sheetsData ? fmtCurrency(sheetsData.totals.totalRevenue) : "—",
      label: "Total Revenue",
      sub: "Lifetime store earnings",
      badge: null,
    },
    {
      Icon: TrendingUp,
      circleBg: "#EDE9FE",
      iconColor: "#6D28D9",
      value: sheetsData ? `${sheetsData.totals.avgRoi.toFixed(1)}%` : "—",
      label: "Average ROI",
      sub: null,
      badge: { text: "Target: 15–25%", border: "#A78BFA", color: "#6D28D9" },
    },
    {
      Icon: ShoppingCart,
      circleBg: "#DBEAFE",
      iconColor: "#2563EB",
      value: sheetsData ? fmtCurrency(totalCogs) : "—",
      label: "Total Cost (COGS)",
      sub: "Cost of goods sold",
      badge: null,
    },
    {
      Icon: Calendar,
      circleBg: "#FEF3C7",
      iconColor: "#D97706",
      value: "Mar 10, 2026",
      label: "Next Payout",
      sub: null,
      badge: { text: "12 days away", border: "#FCD34D", color: "#D97706" },
    },
    {
      Icon: BarChart2,
      circleBg: "#EDE9FE",
      iconColor: "#9333EA",
      value: lastNonZero ? fmtShort(lastNonZero.revenue) : "—",
      label: lastNonZero ? lastNonZero.month : "This Month",
      sub: lastNonZero ? `${lastNonZero.orders} orders this month` : null,
      badge: null,
    },
  ];

  // ── store info rows ────────────────────────────────────────────────────────────
  const storeRows = [
    {
      label: "Platform",
      value: (
        <span
          style={{
            background: "#1A1A2E",
            color: "white",
            padding: "2px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          TikTok Shop
        </span>
      ),
    },
    {
      label: "Status",
      value: (
        <span
          style={{
            background: "#D1FAE5",
            color: "#065F46",
            padding: "2px 10px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          Active
        </span>
      ),
    },
    { label: "Store Started", value: "November 2024" },
    { label: "Account Manager", value: "Hassan" },
    { label: "Investment Target", value: "15–25% ROI/mo" },
    { label: "Payout Schedule", value: "Monthly, 10th" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Error banner */}
      {error && (
        <div
          style={{
            background: "#FEF2F2",
            color: "#991B1B",
            border: "1px solid #FECACA",
            borderRadius: 12,
            padding: "14px 20px",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Unable to load store data. Please refresh.
        </div>
      )}

      {/* ── SECTION A: 5 KPI Cards ────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <div key={i} style={{ flex: "1 1 180px" }}><SkeletonCard /></div>)
          : kpiCards.map((card) => (
              <div
                key={card.label}
                style={{
                  flex: "1 1 180px",
                  background: "white",
                  border: "1px solid #E0D8F8",
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: card.circleBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <card.Icon size={18} style={{ color: card.iconColor }} />
                </div>

                {/* Value + label */}
                <div>
                  <p style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.1 }}>{card.value}</p>
                  <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{card.label}</p>
                  {card.sub && (
                    <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{card.sub}</p>
                  )}
                  {card.badge && (
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 8,
                        border: `1px solid ${card.badge.border}`,
                        color: card.badge.color,
                        padding: "2px 10px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 500,
                      }}
                    >
                      {card.badge.text}
                    </span>
                  )}
                </div>
              </div>
            ))}
      </div>

      {/* ── SECTION B: Chart + Store Info ─────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
        {/* Chart (~60%) */}
        <div
          style={{
            flex: "3",
            background: "white",
            border: "1px solid #E0D8F8",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>
            Month-over-Month Performance
          </h2>
          <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>Revenue (bars) vs ROI% (line)</p>

          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={chartData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                formatter={(value: number | undefined | string, name: string | undefined) => {
                  const n = typeof value === "number" ? value : 0;
                  return name === "revenue"
                    ? [`$${n.toLocaleString()}`, "Revenue"]
                    : [`${n.toFixed(1)}%`, "ROI"];
                }}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E0D8F8",
                  fontSize: 12,
                  color: "#1A1A2E",
                }}
                cursor={{ fill: "#F5F1FF" }}
              />
              <Legend
                formatter={(value: string) => (value === "revenue" ? "Revenue" : "ROI%")}
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              />
              <Bar yAxisId="left" dataKey="revenue" fill="#6D28D9" radius={[6, 6, 0, 0]} />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="roi"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ fill: "#F59E0B", r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Store Info (~40%) */}
        <div
          style={{
            flex: "2",
            background: "white",
            border: "1px solid #E0D8F8",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>Store Overview</h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {storeRows.map((row, i) => (
              <div key={row.label}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                  <span style={{ fontSize: 13, color: "#6B7280" }}>{row.label}</span>
                  {typeof row.value === "string" ? (
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#1A1A2E" }}>{row.value}</span>
                  ) : (
                    row.value
                  )}
                </div>
                {i < storeRows.length - 1 && (
                  <div style={{ height: 1, background: "#F3F4F6" }} />
                )}
              </div>
            ))}
          </div>

          <button
            style={{
              marginTop: "auto",
              border: "1.5px solid #6D28D9",
              background: "transparent",
              color: "#6D28D9",
              borderRadius: 12,
              padding: "11px",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F5F1FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Book a Strategy Call
          </button>
        </div>
      </div>

      {/* ── SECTION C: MoM Comparison Table ────────────────────────────────────── */}
      <div
        style={{
          background: "white",
          border: "1px solid #E0D8F8",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #E0D8F8" }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>Monthly Performance Breakdown</h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5F1FF" }}>
                {["Month", "Revenue", "Cost", "Profit", "ROI%", "vs Last Month", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 20px",
                      textAlign: "left",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#6B7280",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} style={{ borderTop: "1px solid #F3F4F6" }}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j} style={{ padding: "14px 20px" }}>
                          <div style={{ height: 14, background: "#E0D8F8", borderRadius: 6, width: 80, animation: "pulse 1.5s infinite" }} />
                        </td>
                      ))}
                    </tr>
                  ))
                : (sheetsData?.monthly ?? []).map((row, i, arr) => {
                    const prev = arr[i - 1];
                    const diff = prev ? row.revenue - prev.revenue : null;
                    const badge = getBadge(row.roi);

                    let diffEl: React.ReactNode = <span style={{ color: "#9CA3AF" }}>—</span>;
                    if (diff !== null) {
                      if (diff > 0) {
                        diffEl = <span style={{ color: "#16A34A" }}>▲ +{fmtShort(diff)}</span>;
                      } else if (diff < 0) {
                        diffEl = <span style={{ color: "#DC2626" }}>▼ {fmtShort(diff)}</span>;
                      } else {
                        diffEl = <span style={{ color: "#9CA3AF" }}>—</span>;
                      }
                    }

                    return (
                      <tr
                        key={i}
                        style={{ borderTop: "1px solid #F3F4F6", background: i % 2 === 1 ? "#FAFAF8" : "white" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1FF")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 1 ? "#FAFAF8" : "white")}
                      >
                        <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500, color: "#1A1A2E" }}>{row.month}</td>
                        <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{fmtCurrency(row.revenue)}</td>
                        <td style={{ padding: "14px 20px", fontSize: 14, color: "#6B7280" }}>{fmtCurrency(row.cogs)}</td>
                        <td style={{ padding: "14px 20px", fontSize: 14, color: "#1A1A2E" }}>{fmtCurrency(row.profit)}</td>
                        <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 600, color: "#6D28D9" }}>{row.roi.toFixed(1)}%</td>
                        <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 500 }}>{diffEl}</td>
                        <td style={{ padding: "14px 20px" }}>
                          <span
                            style={{
                              background: badge.bg,
                              color: badge.color,
                              padding: "3px 10px",
                              borderRadius: 999,
                              fontSize: 12,
                              fontWeight: 500,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── SECTION D: Notifications + Quick Support ────────────────────────────── */}
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
        {/* Recent Updates (~55%) */}
        <div
          style={{
            flex: "11",
            background: "white",
            border: "1px solid #E0D8F8",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 20 }}>Recent Updates</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {NOTIFICATIONS.map((n, i) => (
              <div
                key={i}
                style={{
                  borderLeft: `4px solid ${n.borderColor}`,
                  borderRadius: 10,
                  background: "#FAFAF8",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  border: `1px solid #E0D8F8`,
                  borderLeftWidth: 4,
                  borderLeftColor: n.borderColor,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: n.iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <n.Icon size={16} style={{ color: n.iconColor }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{n.title}</p>
                  <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{n.desc}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>{n.time}</p>
                </div>

                <button
                  style={{
                    flexShrink: 0,
                    border: "1px solid #E0D8F8",
                    background: "white",
                    color: "#6D28D9",
                    borderRadius: 8,
                    padding: "5px 12px",
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {n.btn}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Support (~45%) */}
        <div
          style={{
            flex: "9",
            background: "white",
            border: "1px solid #E0D8F8",
            borderRadius: 16,
            padding: 24,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 20 }}>Quick Support</h2>

          <form
            onSubmit={(e) => { e.preventDefault(); console.log({ subject, message, priority }); }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {/* Subject */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #E0D8F8",
                  background: "#FAFAF8",
                  color: "#1A1A2E",
                  fontSize: 14,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {["Store Issue", "Payout Query", "Policy Question", "General Inquiry"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                Message
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid #E0D8F8",
                  background: "#FAFAF8",
                  color: "#1A1A2E",
                  fontSize: 14,
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
              />
            </div>

            {/* Priority toggle */}
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 8 }}>
                Priority
              </label>
              <div style={{ display: "flex", gap: 0, border: "1px solid #E0D8F8", borderRadius: 10, overflow: "hidden" }}>
                {(["normal", "high"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    style={{
                      flex: 1,
                      padding: "9px",
                      border: "none",
                      background: priority === p ? "#6D28D9" : "transparent",
                      color: priority === p ? "white" : "#6B7280",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      textTransform: "capitalize",
                      transition: "all 0.15s",
                    }}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                background: "#6D28D9",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "12px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                width: "100%",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#5B21B6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#6D28D9")}
            >
              Send Request
            </button>

            <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF" }}>
              Average response time: under 4 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
