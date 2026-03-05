"use client";
import { Download } from "lucide-react";

const invoices = [
  { month: "February 2026", amount: "$8,240", status: "Paid", due: "Mar 10, 2026", id: "INV-2026-02" },
  { month: "January 2026", amount: "$6,400", status: "Paid", due: "Feb 10, 2026", id: "INV-2026-01" },
  { month: "December 2025", amount: "$7,200", status: "Paid", due: "Jan 10, 2026", id: "INV-2025-12" },
  { month: "November 2025", amount: "$5,100", status: "Paid", due: "Dec 10, 2025", id: "INV-2025-11" },
  { month: "October 2025", amount: "$5,800", status: "Paid", due: "Nov 10, 2025", id: "INV-2025-10" },
  { month: "March 2026", amount: "$9,100", status: "Pending", due: "Apr 10, 2026", id: "INV-2026-03" },
];

const statusStyle = (status: string) => {
  if (status === "Paid") return { background: "#D1FAE5", color: "#065F46" };
  return { background: "#FEF3C7", color: "#92400E" };
};

export default function InvoicesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>Invoices</h2>
          <p className="text-sm mt-0.5" style={{ color: "#9CA3AF" }}>Download and track your monthly invoices</p>
        </div>
        <div className="flex gap-3">
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ background: "#D1FAE5", border: "1px solid #A7F3D0" }}
          >
            <p className="text-lg font-bold" style={{ color: "#065F46" }}>5</p>
            <p className="text-xs" style={{ color: "#059669" }}>Paid</p>
          </div>
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ background: "#FEF3C7", border: "1px solid #FDE68A" }}
          >
            <p className="text-lg font-bold" style={{ color: "#92400E" }}>1</p>
            <p className="text-xs" style={{ color: "#D97706" }}>Pending</p>
          </div>
          <div
            className="rounded-xl px-4 py-3 text-center"
            style={{ background: "#F5F1FF", border: "1px solid #E0D8F8" }}
          >
            <p className="text-lg font-bold" style={{ color: "#6D28D9" }}>$41,840</p>
            <p className="text-xs" style={{ color: "#9333EA" }}>Total Paid</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: "1px solid #E0D8F8" }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: "#FAFAF8" }}>
              {["Invoice ID", "Month", "Amount", "Status", "Due Date", ""].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-medium"
                  style={{ color: "#9CA3AF" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv, i) => (
              <tr
                key={i}
                className="border-t transition-colors"
                style={{ borderColor: "#F3F4F6" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAF8")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td className="px-6 py-4 text-sm font-mono font-medium" style={{ color: "#6D28D9" }}>
                  {inv.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium" style={{ color: "#1A1A2E" }}>{inv.month}</td>
                <td className="px-6 py-4 text-sm font-semibold" style={{ color: "#1A1A2E" }}>{inv.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full"
                    style={statusStyle(inv.status)}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: "#6B7280" }}>{inv.due}</td>
                <td className="px-6 py-4">
                  <button
                    className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-opacity hover:opacity-80"
                    style={{
                      background: inv.status === "Paid" ? "#F5F1FF" : "#F3F4F6",
                      color: inv.status === "Paid" ? "#6D28D9" : "#9CA3AF",
                    }}
                    disabled={inv.status !== "Paid"}
                  >
                    <Download size={12} />
                    {inv.status === "Paid" ? "Download" : "Pending"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
        Invoices are generated on the 1st of each month and paid by the 10th. Contact support if you have any discrepancies.
      </p>
    </div>
  );
}
