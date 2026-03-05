"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { SkeletonCard } from "@/components/LoadingSkeleton";
import type { SheetResponse, MonthlyData } from "@/types";

function fmtCurrency(n: number) {
  return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getBadge(roi: number): { label: string; bg: string; color: string } {
  if (roi >= 20) return { label: "Excellent", bg: "#D1FAE5", color: "#065F46" };
  if (roi >= 15) return { label: "On Track", bg: "#EDE9FE", color: "#6D28D9" };
  if (roi >= 10) return { label: "Moderate", bg: "#FEF3C7", color: "#92400E" };
  return { label: "Below Target", bg: "#FEE2E2", color: "#991B1B" };
}

const CARD_STYLE = {
  background: "white",
  border: "1px solid #E0D8F8",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

function SkeletonRow() {
  return (
    <tr style={{ borderTop: "1px solid #F3F4F6" }}>
      {Array.from({ length: 7 }).map((_, j) => (
        <td key={j} style={{ padding: "14px 20px" }}>
          <div style={{ height: 14, background: "#E0D8F8", borderRadius: 6, width: 80 }} />
        </td>
      ))}
    </tr>
  );
}

export default function PerformancePage() {
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

  const monthly: MonthlyData[] = data?.monthly ?? [];

  // Derived summary stats
  const bestMonth = monthly.length
    ? monthly.reduce((best, m) => (m.revenue > best.revenue ? m : best), monthly[0])
    : null;
  const worstMonth = monthly.length
    ? monthly.filter((m) => m.revenue > 0).reduce((worst, m) => (m.revenue < worst.revenue ? m : worst), monthly.find((m) => m.revenue > 0) ?? monthly[0])
    : null;
  const avgRevenue = monthly.length
    ? monthly.filter((m) => m.revenue > 0).reduce((s, m) => s + m.revenue, 0) /
      monthly.filter((m) => m.revenue > 0).length
    : 0;

  const chartData = monthly.map((m) => ({
    month: m.month.slice(0, 3),
    revenue: m.revenue,
    roi: m.roi,
  }));

  const summaryCards = [
    {
      label: "Best Month",
      value: bestMonth ? `${bestMonth.month} — ${fmtCurrency(bestMonth.revenue)}` : "—",
      bg: "#D1FAE5",
      color: "#065F46",
    },
    {
      label: "Worst Month",
      value: worstMonth ? `${worstMonth.month} — ${fmtCurrency(worstMonth.revenue)}` : "—",
      bg: "#FEE2E2",
      color: "#991B1B",
    },
    {
      label: "Avg Monthly Revenue",
      value: avgRevenue ? fmtCurrency(avgRevenue) : "—",
      bg: "#EDE9FE",
      color: "#6D28D9",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Error state */}
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
          Failed to load performance data. Please refresh.
        </div>
      )}

      {/* ── Summary cards ──────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ flex: "1 1 200px" }}>
                <SkeletonCard />
              </div>
            ))
          : summaryCards.map((card) => (
              <div
                key={card.label}
                style={{
                  flex: "1 1 200px",
                  background: "white",
                  border: "1px solid #E0D8F8",
                  borderRadius: 14,
                  padding: "18px 20px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 6 }}>{card.label}</p>
                <span
                  style={{
                    display: "inline-block",
                    background: card.bg,
                    color: card.color,
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  {card.value}
                </span>
              </div>
            ))}
      </div>

      {/* ── Section 1: Revenue Over Time ───────────────────────────────────────── */}
      <div style={CARD_STYLE}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>Revenue Over Time</h2>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>Monthly revenue trend</p>

        {loading ? (
          <div style={{ height: 220, background: "#F5F1FF", borderRadius: 12, animation: "pulse 1.5s infinite" }} />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6D28D9" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6D28D9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(value: number | undefined) => [`$${(value ?? 0).toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E0D8F8",
                  fontSize: 12,
                  color: "#1A1A2E",
                }}
                cursor={{ stroke: "#6D28D9", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6D28D9"
                strokeWidth={2}
                fill="url(#revGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Section 2: ROI Trend ───────────────────────────────────────────────── */}
      <div style={CARD_STYLE}>
        <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>ROI Trend</h2>
        <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>
          Monthly ROI% with target bands (15% min — 25% max)
        </p>

        {loading ? (
          <div style={{ height: 220, background: "#F5F1FF", borderRadius: 12, animation: "pulse 1.5s infinite" }} />
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
              />
              <Tooltip
                formatter={(value: number | undefined) => [`${(value ?? 0).toFixed(1)}%`, "ROI"]}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E0D8F8",
                  fontSize: 12,
                  color: "#1A1A2E",
                }}
              />
              <ReferenceLine
                y={15}
                stroke="#6D28D9"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
                label={{ value: "Min Target", position: "insideTopRight", fontSize: 11, fill: "#6D28D9" }}
              />
              <ReferenceLine
                y={25}
                stroke="#6D28D9"
                strokeDasharray="4 4"
                strokeOpacity={0.6}
                label={{ value: "Max Target", position: "insideTopRight", fontSize: 11, fill: "#6D28D9" }}
              />
              <Line
                type="monotone"
                dataKey="roi"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={{ fill: "#F59E0B", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* ── Section 3: Orders vs Profit Table ─────────────────────────────────── */}
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
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>Orders vs Profit</h2>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#F5F1FF" }}>
                {["Month", "Orders", "Revenue", "Cost", "Profit", "ROI", "Status"].map((h) => (
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
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                : monthly.map((row, i) => {
                    const badge = getBadge(row.roi);
                    return (
                      <tr
                        key={i}
                        style={{ borderTop: "1px solid #F3F4F6", background: i % 2 === 1 ? "#FAFAF8" : "white" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1FF")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 1 ? "#FAFAF8" : "white")}
                      >
                        <td style={{ padding: "13px 20px", fontSize: 14, fontWeight: 500, color: "#1A1A2E" }}>{row.month}</td>
                        <td style={{ padding: "13px 20px", fontSize: 14, color: "#1A1A2E" }}>{row.orders.toLocaleString()}</td>
                        <td style={{ padding: "13px 20px", fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{fmtCurrency(row.revenue)}</td>
                        <td style={{ padding: "13px 20px", fontSize: 14, color: "#6B7280" }}>{fmtCurrency(row.cogs)}</td>
                        <td style={{ padding: "13px 20px", fontSize: 14, color: "#1A1A2E" }}>{fmtCurrency(row.profit)}</td>
                        <td style={{ padding: "13px 20px", fontSize: 14, fontWeight: 600, color: "#6D28D9" }}>{row.roi.toFixed(1)}%</td>
                        <td style={{ padding: "13px 20px" }}>
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
    </div>
  );
}
