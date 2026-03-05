"use client";

import { CheckCircle, Store, Calendar, User, BarChart2, ShoppingCart, TrendingUp, DollarSign } from "lucide-react";

const CARD_STYLE = {
  background: "white",
  border: "1px solid #E0D8F8",
  borderRadius: 16,
  padding: 24,
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const MILESTONES = [
  { date: "Jan 2025", event: "Store launched", dot: "#6D28D9" },
  { date: "Feb 2025", event: "First 100 orders milestone", dot: "#6D28D9" },
  { date: "Jul 2025", event: "Best month — $9,828 revenue", dot: "#16A34A" },
  { date: "Oct 2025", event: "279 orders in a month (record)", dot: "#F59E0B" },
  { date: "Now", event: "Store active and optimizing", dot: "#16A34A" },
];

const STAT_PILLS = [
  { icon: ShoppingCart, label: "Total Orders", value: "1,013", bg: "#DBEAFE", iconColor: "#2563EB" },
  { icon: BarChart2, label: "Listings Active", value: "89", bg: "#EDE9FE", iconColor: "#6D28D9" },
  { icon: TrendingUp, label: "Avg Monthly ROI", value: "18.7%", bg: "#D1FAE5", iconColor: "#16A34A" },
  { icon: DollarSign, label: "Total Revenue", value: "$54,812", bg: "#FEF3C7", iconColor: "#D97706" },
];

export default function StoresPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* ── Main Store Card ────────────────────────────────────────────────────── */}
      <div style={{ ...CARD_STYLE }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#F5F1FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Store size={24} style={{ color: "#6D28D9" }} />
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E", marginBottom: 6 }}>
                Deal Hoper TikTok Shop
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                {/* Platform badge */}
                <span
                  style={{
                    background: "#1A1A2E",
                    color: "white",
                    padding: "3px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  TikTok Shop
                </span>
                {/* Status badge */}
                <span
                  style={{
                    background: "#D1FAE5",
                    color: "#065F46",
                    padding: "3px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#16A34A",
                      display: "inline-block",
                    }}
                  />
                  Active
                </span>
                {/* Store Health badge */}
                <span
                  style={{
                    background: "#D1FAE5",
                    color: "#065F46",
                    border: "1px solid #A7F3D0",
                    padding: "3px 12px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  Healthy
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 0,
            borderTop: "1px solid #F3F4F6",
          }}
        >
          {[
            { icon: Calendar, label: "Started", value: "January 2025" },
            { icon: User, label: "Account Manager", value: "Hassan" },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px 16px 0",
                borderRight: "1px solid #F3F4F6",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "#F5F1FF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <row.icon size={16} style={{ color: "#6D28D9" }} />
              </div>
              <div>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 2 }}>{row.label}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{row.value}</p>
              </div>
            </div>
          ))}

          {/* Sheet connected */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 20px 16px 0",
              gridColumn: "1 / -1",
              borderTop: "1px solid #F3F4F6",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#D1FAE5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <CheckCircle size={16} style={{ color: "#16A34A" }} />
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 2 }}>Sheet Connected</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>
                Deal Hoper - TTS Ecom Digital Shaheens v7
                <span style={{ marginLeft: 8 }}>
                  <CheckCircle size={14} style={{ color: "#16A34A", display: "inline", verticalAlign: "middle" }} />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat Pills ─────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {STAT_PILLS.map((pill) => (
          <div
            key={pill.label}
            style={{
              flex: "1 1 160px",
              background: "white",
              border: "1px solid #E0D8F8",
              borderRadius: 14,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: pill.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <pill.icon size={18} style={{ color: pill.iconColor }} />
            </div>
            <div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.1 }}>{pill.value}</p>
              <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{pill.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Store Timeline ─────────────────────────────────────────────────────── */}
      <div style={CARD_STYLE}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 24 }}>Store Timeline</h3>

        <div style={{ position: "relative", paddingLeft: 28 }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 8,
              bottom: 8,
              width: 2,
              background: "#E0D8F8",
              borderRadius: 1,
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, position: "relative" }}>
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -24,
                    top: 4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    background: m.dot,
                    border: "2px solid white",
                    boxShadow: `0 0 0 2px ${m.dot}40`,
                    zIndex: 1,
                  }}
                />
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#6D28D9",
                      background: "#F5F1FF",
                      padding: "2px 8px",
                      borderRadius: 6,
                      display: "inline-block",
                      marginBottom: 4,
                    }}
                  >
                    {m.date}
                  </span>
                  <p style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Add Another Store ──────────────────────────────────────────────────── */}
      <div
        style={{
          ...CARD_STYLE,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
          background: "#FAFAF8",
        }}
      >
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>
            Want to add another store?
          </h3>
          <p style={{ fontSize: 13, color: "#6B7280" }}>
            Scale your portfolio with an additional managed TikTok Shop.
          </p>
        </div>
        <button
          style={{
            border: "1.5px solid #6D28D9",
            background: "transparent",
            color: "#6D28D9",
            borderRadius: 12,
            padding: "10px 24px",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1FF")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Contact Your Manager
        </button>
      </div>
    </div>
  );
}
