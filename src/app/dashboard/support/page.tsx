"use client";
import { useState } from "react";
import { Send, MessageSquare } from "lucide-react";

type Priority = "Normal" | "High";
type Subject = "" | "Store Issue" | "Policy Question" | "Payout Query" | "General";

const myRequests = [
  { id: "REQ-1042", subject: "Payout Query", status: "Resolved", opened: "Feb 15, 2026", updated: "Feb 17, 2026" },
  { id: "REQ-1038", subject: "Store Issue", status: "Resolved", opened: "Jan 28, 2026", updated: "Feb 1, 2026" },
  { id: "REQ-1051", subject: "Policy Question", status: "In Progress", opened: "Mar 1, 2026", updated: "Mar 3, 2026" },
  { id: "REQ-1055", subject: "General", status: "Open", opened: "Mar 4, 2026", updated: "Mar 4, 2026" },
];

const statusStyle = (status: string) => {
  if (status === "Resolved") return { background: "#D1FAE5", color: "#065F46" };
  if (status === "In Progress") return { background: "#FEF3C7", color: "#92400E" };
  return { background: "#EFF6FF", color: "#1D4ED8" };
};

export default function SupportPage() {
  const [subject, setSubject] = useState<Subject>("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState<Priority>("Normal");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject("");
      setMessage("");
      setPriority("Normal");
    }, 3000);
  };

  const inputStyle = {
    border: "1px solid #E0D8F8",
    background: "#FAFAF8",
    color: "#1A1A2E",
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Open a Request */}
      <div className="grid grid-cols-5 gap-6">
        <div
          className="col-span-2 bg-white rounded-2xl p-6"
          style={{ border: "1px solid #E0D8F8" }}
        >
          <div className="mb-6">
            <h2 className="text-base font-semibold" style={{ color: "#1A1A2E" }}>Open a Request</h2>
            <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Our team typically responds within 24 hours</p>
          </div>

          {submitted ? (
            <div
              className="rounded-xl p-6 text-center flex flex-col items-center gap-3"
              style={{ background: "#D1FAE5", border: "1px solid #A7F3D0" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "#059669" }}
              >
                <Send size={20} color="white" />
              </div>
              <p className="font-semibold" style={{ color: "#065F46" }}>Request submitted!</p>
              <p className="text-sm" style={{ color: "#059669" }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as Subject)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={inputStyle}
                >
                  <option value="">Select a subject</option>
                  <option>Store Issue</option>
                  <option>Policy Question</option>
                  <option>Payout Query</option>
                  <option>General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue or question in detail..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#374151" }}>Priority</label>
                <div className="flex gap-2">
                  {(["Normal", "High"] as Priority[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={{
                        background: priority === p ? (p === "High" ? "#FEF3C7" : "#F5F1FF") : "#FAFAF8",
                        color: priority === p ? (p === "High" ? "#92400E" : "#6D28D9") : "#9CA3AF",
                        border: `1px solid ${priority === p ? (p === "High" ? "#FDE68A" : "#C4B5FD") : "#E0D8F8"}`,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
                style={{ background: "#3D0F8F" }}
              >
                <Send size={15} />
                Submit Request
              </button>
            </form>
          )}
        </div>

        {/* Info panel */}
        <div className="col-span-3 flex flex-col gap-4">
          <div
            className="rounded-2xl p-6"
            style={{ background: "#F5F1FF", border: "1px solid #E0D8F8" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#6D28D9" }}>
                <MessageSquare size={18} color="white" />
              </div>
              <div>
                <p className="font-semibold" style={{ color: "#1A1A2E" }}>Talk to your Account Manager</p>
                <p className="text-xs" style={{ color: "#9CA3AF" }}>Direct line to Hassan</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
              For urgent store issues or payout queries, you can reach your account manager Hassan directly. Use the request form for general questions or to create a tracked support ticket.
            </p>
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: "Response Time", value: "< 24 hrs" },
                { label: "Availability", value: "Mon–Sat" },
                { label: "Languages", value: "EN / UR" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-3 text-center" style={{ border: "1px solid #E0D8F8" }}>
                  <p className="font-bold text-sm" style={{ color: "#6D28D9" }}>{item.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid #E0D8F8" }}>
            <p className="text-sm font-semibold mb-3" style={{ color: "#1A1A2E" }}>Common Questions</p>
            <div className="flex flex-col gap-2">
              {[
                "When will I receive my monthly payout?",
                "How is my ROI calculated?",
                "Can I withdraw my investment early?",
                "How do I read my performance report?",
              ].map((q) => (
                <button
                  key={q}
                  className="text-left text-sm px-4 py-2.5 rounded-xl transition-colors"
                  style={{ background: "#FAFAF8", color: "#6B7280", border: "1px solid #E0D8F8" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F1FF";
                    e.currentTarget.style.color = "#6D28D9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#FAFAF8";
                    e.currentTarget.style.color = "#6B7280";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* My Requests table */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E0D8F8" }}>
        <div className="px-6 py-5 border-b" style={{ borderColor: "#E0D8F8" }}>
          <h2 className="text-base font-semibold" style={{ color: "#1A1A2E" }}>My Requests</h2>
          <p className="text-xs mt-0.5" style={{ color: "#9CA3AF" }}>Track all your support requests</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#FAFAF8" }}>
              {["#ID", "Subject", "Status", "Date Opened", "Last Update"].map((h) => (
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
            {myRequests.map((req, i) => (
              <tr
                key={i}
                className="border-t transition-colors"
                style={{ borderColor: "#F3F4F6" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-6 py-4 text-sm font-mono font-medium" style={{ color: "#6D28D9" }}>{req.id}</td>
                <td className="px-6 py-4 text-sm font-medium" style={{ color: "#1A1A2E" }}>{req.subject}</td>
                <td className="px-6 py-4">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={statusStyle(req.status)}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "#6B7280" }}>{req.opened}</td>
                <td className="px-6 py-4 text-sm" style={{ color: "#6B7280" }}>{req.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
