"use client";

import { useState } from "react";
import { CheckCircle, User, Link as LinkIcon, Bell } from "lucide-react";

const CARD_STYLE = {
  background: "white",
  border: "1px solid #E0D8F8",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const SECTION_HEADER = {
  padding: "18px 24px",
  borderBottom: "1px solid #E0D8F8",
  display: "flex",
  alignItems: "center",
  gap: 12,
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        background: on ? "#6D28D9" : "#E0D8F8",
        border: "none",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [showSheetForm, setShowSheetForm] = useState(false);
  const [newSheetUrl, setNewSheetUrl] = useState("");

  const [notifs, setNotifs] = useState({
    invoices: true,
    policy: true,
    monthlyReport: true,
    payoutReminders: true,
  });

  const toggleNotif = (key: keyof typeof notifs) => {
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 720 }}>

      {/* ── Section 1: Profile ────────────────────────────────────────────────── */}
      <div style={CARD_STYLE}>
        <div style={SECTION_HEADER}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#F5F1FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={16} style={{ color: "#6D28D9" }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>Profile</h2>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Your account information</p>
          </div>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
          {[
            { label: "Full Name", value: "Hassan Raza" },
            { label: "Email", value: "hassan@example.com" },
            { label: "Investment Start Date", value: "January 2025" },
          ].map((field) => (
            <div key={field.label}>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", display: "block", marginBottom: 6 }}>
                {field.label}
              </label>
              <div
                style={{
                  padding: "11px 16px",
                  borderRadius: 10,
                  border: "1px solid #E0D8F8",
                  background: "#FAFAF8",
                  fontSize: 14,
                  color: "#1A1A2E",
                  fontWeight: 500,
                }}
              >
                {field.value}
              </div>
            </div>
          ))}

          <div>
            <button
              onClick={() => alert("Coming soon")}
              style={{
                border: "1.5px solid #6D28D9",
                background: "transparent",
                color: "#6D28D9",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* ── Section 2: Store Connection ───────────────────────────────────────── */}
      <div style={CARD_STYLE}>
        <div style={SECTION_HEADER}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#D1FAE5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinkIcon size={16} style={{ color: "#16A34A" }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>Store Connection</h2>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Manage your Google Sheets data source</p>
          </div>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Sheet info row */}
          <div
            style={{
              background: "#F5F1FF",
              border: "1px solid #E0D8F8",
              borderRadius: 12,
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E", marginBottom: 4 }}>
                Deal Hoper - TTS Ecom Digital Shaheens v7
              </p>
              <p style={{ fontSize: 12, color: "#6B7280", fontFamily: "monospace" }}>
                ID: 1H8q41yDxNIX...
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <CheckCircle size={16} style={{ color: "#16A34A" }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#16A34A" }}>Connected</span>
            </div>
          </div>

          {/* Update button */}
          <div>
            <button
              onClick={() => setShowSheetForm((v) => !v)}
              style={{
                border: "1.5px solid #6D28D9",
                background: showSheetForm ? "#F5F1FF" : "transparent",
                color: "#6D28D9",
                borderRadius: 10,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F1FF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = showSheetForm ? "#F5F1FF" : "transparent")}
            >
              {showSheetForm ? "Cancel" : "Update Sheet Link"}
            </button>
          </div>

          {/* Inline form */}
          {showSheetForm && (
            <div
              style={{
                background: "#FAFAF8",
                border: "1px solid #E0D8F8",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#374151", display: "block", marginBottom: 6 }}>
                  New Google Sheet URL
                </label>
                <input
                  type="url"
                  value={newSheetUrl}
                  onChange={(e) => setNewSheetUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: 10,
                    border: "1px solid #E0D8F8",
                    background: "white",
                    color: "#1A1A2E",
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
                <p style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>
                  Make sure sharing is set to <strong>Anyone with the link → Viewer</strong>
                </p>
              </div>
              <button
                onClick={() => {
                  alert("Coming soon");
                  setShowSheetForm(false);
                }}
                style={{
                  background: "#6D28D9",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  padding: "11px 24px",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#5B21B6")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#6D28D9")}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Section 3: Notifications ──────────────────────────────────────────── */}
      <div style={CARD_STYLE}>
        <div style={SECTION_HEADER}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: "#EDE9FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={16} style={{ color: "#6D28D9" }} />
          </div>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A2E" }}>Notifications</h2>
            <p style={{ fontSize: 12, color: "#9CA3AF" }}>Control what you hear from us</p>
          </div>
        </div>

        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { key: "invoices" as const, label: "Email notifications for new invoices" },
            { key: "policy" as const, label: "Email notifications for policy updates" },
            { key: "monthlyReport" as const, label: "Monthly performance report" },
            { key: "payoutReminders" as const, label: "Payout reminders" },
          ].map((item, i, arr) => (
            <div
              key={item.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 0",
                borderBottom: i < arr.length - 1 ? "1px solid #F3F4F6" : "none",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 14, color: "#374151" }}>{item.label}</span>
              <Toggle on={notifs[item.key]} onToggle={() => toggleNotif(item.key)} />
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <button
              onClick={() => alert("Preferences saved!")}
              style={{
                background: "#6D28D9",
                color: "white",
                border: "none",
                borderRadius: 10,
                padding: "11px 24px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#5B21B6")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#6D28D9")}
            >
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
