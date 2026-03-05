"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  TrendingUp,
  Bell,
  FileText,
  LifeBuoy,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/stores", label: "My Stores", icon: Store },
  { href: "/dashboard/performance", label: "Performance", icon: TrendingUp },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { href: "/dashboard/invoices", label: "Invoices", icon: FileText },
  { href: "/dashboard/support", label: "Support", icon: LifeBuoy },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen" style={{ background: "#FAFAF8" }}>
      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full w-64 flex flex-col z-40 transition-transform"
        style={{ background: "#3D0F8F", transform: sidebarOpen ? "translateX(0)" : undefined }}
      >
        {/* Logo */}
        <div className="px-6 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              DS
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Digital Shaheens</p>
              <p className="text-xs" style={{ color: "#A78BFA" }}>EcomOS Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative"
                style={{
                  background: active ? "rgba(255,255,255,0.12)" : "transparent",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.65)",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  if (!active) e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                  if (!active) e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                }}
              >
                <Icon size={18} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span
                    className="text-xs font-semibold px-1.5 py-0.5 rounded-full"
                    style={{ background: "#A78BFA", color: "#fff", minWidth: 20, textAlign: "center" }}
                  >
                    {badge}
                  </span>
                )}
                {active && <ChevronRight size={14} style={{ color: "#A78BFA" }} />}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="px-3 pb-4 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: "#6D28D9" }}
            >
              HR
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">Hassan Raza</p>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(167,139,250,0.2)", color: "#A78BFA" }}
              >
                Investor
              </span>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="opacity-50 hover:opacity-100 transition-opacity"
              title="Logout"
            >
              <LogOut size={16} color="white" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: 256 }}>
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-4"
          style={{
            background: "rgba(250,250,248,0.85)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid #E0D8F8",
          }}
        >
          <div>
            <h1 className="text-lg font-semibold" style={{ color: "#1A1A2E" }}>
              {navItems.find((n) => isActive(n.href))?.label ?? "Dashboard"}
            </h1>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/notifications" className="relative p-2 rounded-xl transition-colors" style={{ background: "#F5F1FF" }}>
              <Bell size={18} style={{ color: "#6D28D9" }} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 text-xs flex items-center justify-center rounded-full text-white font-semibold"
                style={{ background: "#6D28D9", fontSize: 9 }}
              >
                3
              </span>
            </Link>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "#6D28D9" }}
            >
              HR
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
