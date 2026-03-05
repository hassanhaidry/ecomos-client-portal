"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const inputStyle = {
    border: "1px solid #E0D8F8",
    background: "#FAFAF8",
    color: "#1A1A2E",
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
              Start earning,<br />without the work.
            </h1>
            <p className="text-lg" style={{ color: "#C4B5FD" }}>
              Join 120+ investors generating passive income through managed TikTok Shops.
            </p>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            {[
              { step: "01", title: "Apply & get approved", desc: "Submit your details and our team reviews your application within 48 hours." },
              { step: "02", title: "Fund your store", desc: "Choose your investment tier and we set up your fully managed TikTok Shop." },
              { step: "03", title: "Watch it grow", desc: "Track revenue, ROI, and payouts in real time from your investor portal." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(255,255,255,0.15)", color: "#A78BFA" }}
                >
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#C4B5FD" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right signup form */}
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
            <h2 className="text-2xl font-bold mb-1" style={{ color: "#1A1A2E" }}>Create your account</h2>
            <p className="text-sm mb-8" style={{ color: "#6B7280" }}>Join the EcomOS investor portal</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Hassan Raza"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
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
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: "#374151" }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                  onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: "#3D0F8F" }}
              >
                Create Account
              </button>
            </form>

            <div
              className="flex items-start gap-2 mt-5 p-3 rounded-xl text-xs"
              style={{ background: "#F5F1FF", color: "#6B7280" }}
            >
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#6D28D9" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Your account will be reviewed by our team before activation. You&apos;ll receive an email once approved.</span>
            </div>

            <p className="text-center text-sm mt-5" style={{ color: "#6B7280" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-medium" style={{ color: "#6D28D9" }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
