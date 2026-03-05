"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left branding panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "#3D0F8F" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              DS
            </div>
            <span className="text-white font-semibold text-xl">Digital Shaheens</span>
          </div>
          <div className="mb-8">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-6"
              style={{ background: "rgba(255,255,255,0.12)", color: "#A78BFA" }}
            >
              EcomOS Investor Portal
            </div>
            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Your passive income,<br />fully managed.
            </h1>
            <p className="text-lg" style={{ color: "#C4B5FD" }}>
              15–25% Monthly ROI. Fully managed.
            </p>
          </div>
        </div>

        <div>
          <blockquote className="mb-8">
            <p className="text-lg font-medium leading-relaxed" style={{ color: "#E9D5FF" }}>
              "Digital Shaheens handles everything — sourcing, logistics, customer service. I just watch my returns grow."
            </p>
            <footer className="mt-4">
              <p className="font-semibold text-white">Zara K.</p>
              <p className="text-sm" style={{ color: "#A78BFA" }}>EcomOS Investor since 2024</p>
            </footer>
          </blockquote>

          <div className="flex gap-6">
            {[
              { label: "Avg. Monthly ROI", value: "18.4%" },
              { label: "Active Stores", value: "47+" },
              { label: "Investors", value: "120+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs" style={{ color: "#A78BFA" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login form */}
      <div
        className="flex-1 flex items-center justify-center p-8"
        style={{ background: "#FAFAF8" }}
      >
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: "#3D0F8F" }}
              >
                DS
              </div>
              <span className="font-semibold text-lg" style={{ color: "#1A1A2E" }}>Digital Shaheens</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm" style={{ border: "1px solid #E0D8F8" }}>
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Welcome back</h2>
            <p className="text-sm mb-8" style={{ color: "#6B7280" }}>Sign in to your investor portal</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: "1px solid #E0D8F8",
                    background: "#FAFAF8",
                    color: "#1A1A2E",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: "1px solid #E0D8F8",
                    background: "#FAFAF8",
                    color: "#1A1A2E",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium"
                  style={{ color: "#6D28D9" }}
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "#3D0F8F" }}
              >
                Sign In
              </button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: "#6B7280" }}>
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-medium" style={{ color: "#6D28D9" }}>
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
