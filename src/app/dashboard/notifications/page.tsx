"use client";
import { useState } from "react";
import { Bell, FileText, CheckCircle, Megaphone, Download, Check } from "lucide-react";

type FilterType = "All" | "Policy" | "Invoices" | "Milestones";

const allNotifications = [
  {
    type: "Policy" as FilterType,
    icon: Bell,
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
    title: "New Marketplace Fee Structure",
    desc: "TikTok Shop has updated their fee structure effective March 1, 2026. The new rates apply to all sellers. Please review the changes to understand how this may affect your monthly returns.",
    date: "Mar 3, 2026",
    read: false,
    action: "View Details",
  },
  {
    type: "Invoices" as FilterType,
    icon: FileText,
    iconBg: "#F5F1FF",
    iconColor: "#6D28D9",
    title: "February 2026 Invoice Ready",
    desc: "Your monthly invoice for February 2026 has been generated and is ready for download. Total amount: $8,240.",
    date: "Mar 1, 2026",
    read: false,
    action: "Download",
  },
  {
    type: "Milestones" as FilterType,
    icon: CheckCircle,
    iconBg: "#D1FAE5",
    iconColor: "#059669",
    title: "Revenue Milestone: $5,000",
    desc: "Congratulations! Your store hit $5,000 in revenue this month — a new monthly record. You are well within the 15-25% ROI target range.",
    date: "Feb 28, 2026",
    read: false,
    action: "View Report",
  },
  {
    type: "Policy" as FilterType,
    icon: Bell,
    iconBg: "#EFF6FF",
    iconColor: "#3B82F6",
    title: "Inventory Policy Update",
    desc: "New guidelines for inventory management have been published. All managed stores must comply by April 1, 2026.",
    date: "Feb 20, 2026",
    read: true,
    action: "View Details",
  },
  {
    type: "All" as FilterType,
    icon: Megaphone,
    iconBg: "#FEF3C7",
    iconColor: "#D97706",
    title: "Q1 2026 Performance Review Scheduled",
    desc: "Your quarterly review call with your account manager Hassan has been scheduled for March 15, 2026. You will receive a calendar invite shortly.",
    date: "Feb 15, 2026",
    read: true,
    action: "Add to Calendar",
  },
  {
    type: "Invoices" as FilterType,
    icon: FileText,
    iconBg: "#F5F1FF",
    iconColor: "#6D28D9",
    title: "January 2026 Invoice Ready",
    desc: "Your monthly invoice for January 2026 has been generated. Total amount: $6,400.",
    date: "Feb 1, 2026",
    read: true,
    action: "Download",
  },
  {
    type: "Milestones" as FilterType,
    icon: CheckCircle,
    iconBg: "#D1FAE5",
    iconColor: "#059669",
    title: "6-Month Investment Anniversary",
    desc: "You've been an EcomOS investor for 6 months! Your cumulative returns have exceeded expectations. Thank you for your trust.",
    date: "Jan 15, 2026",
    read: true,
    action: "View Stats",
  },
];

const filters: FilterType[] = ["All", "Policy", "Invoices", "Milestones"];

const typeColors: Record<string, { bg: string; color: string }> = {
  Policy: { bg: "#EFF6FF", color: "#3B82F6" },
  Invoices: { bg: "#F5F1FF", color: "#6D28D9" },
  Milestones: { bg: "#D1FAE5", color: "#059669" },
  All: { bg: "#FEF3C7", color: "#D97706" },
};

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [readState, setReadState] = useState<Record<number, boolean>>({});

  const filtered = allNotifications.filter((n) => {
    if (activeFilter === "All") return true;
    return n.type === activeFilter;
  });

  const isRead = (i: number) => readState[i] ?? allNotifications[i].read;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>All Notifications</h2>
          <p className="text-sm mt-0.5" style={{ color: "#9CA3AF" }}>
            {allNotifications.filter((_, i) => !isRead(i)).length} unread notifications
          </p>
        </div>
        <button
          onClick={() => {
            const newState: Record<number, boolean> = {};
            allNotifications.forEach((_, i) => (newState[i] = true));
            setReadState(newState);
          }}
          className="text-sm font-medium px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: "#F5F1FF", color: "#6D28D9" }}
        >
          Mark all as read
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeFilter === f ? "#6D28D9" : "#F5F1FF",
              color: activeFilter === f ? "#fff" : "#6D28D9",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="flex flex-col gap-3">
        {filtered.map((n, i) => {
          const globalIdx = allNotifications.indexOf(n);
          const read = isRead(globalIdx);
          return (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 flex items-start gap-4 transition-all"
              style={{
                border: `1px solid ${read ? "#E0D8F8" : "#C4B5FD"}`,
                opacity: read ? 0.85 : 1,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: n.iconBg }}
              >
                <n.icon size={20} style={{ color: n.iconColor }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 mb-1">
                  <p className="text-sm font-semibold flex-1" style={{ color: "#1A1A2E" }}>{n.title}</p>
                  {!read && (
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: "#6D28D9" }}
                    />
                  )}
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>{n.desc}</p>
                <div className="flex items-center gap-3 mt-3">
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={typeColors[n.type] ?? typeColors["All"]}
                  >
                    {n.type === "All" ? "Announcement" : n.type}
                  </span>
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>{n.date}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                  style={{ background: "#F5F1FF", color: "#6D28D9" }}
                >
                  {n.action === "Download" && <Download size={12} />}
                  {n.action}
                </button>
                {!read && (
                  <button
                    onClick={() => setReadState((s) => ({ ...s, [globalIdx]: true }))}
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                    style={{ background: "#F3F4F6", color: "#6B7280" }}
                  >
                    <Check size={12} />
                    Read
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
