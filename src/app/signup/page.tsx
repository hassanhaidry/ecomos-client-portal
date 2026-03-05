"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inputStyle = {
  border: "1px solid #E0D8F8",
  background: "#FAFAF8",
  color: "#1A1A2E",
  width: "100%",
  padding: "12px 16px",
  borderRadius: "12px",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.15s",
};

function Field({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required
        style={inputStyle}
        onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
        onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
      />
    </div>
  );
}

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    sheetLink: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const match = form.sheetLink.match(/\/d\/([^/]+)/);
    const sheetId = match ? match[1] : null;
    console.log("Sheet ID:", sheetId);
    router.push("/dashboard");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Left panel */}
      <div
        style={{
          display: "none",
          width: "50%",
          background: "#3D0F8F",
          padding: "48px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        className="lg-panel"
      >
        {/* Force show via CSS — use a wrapper approach */}
      </div>

      {/* Left panel (visible only lg+) */}
      <div
        className="hidden lg:flex"
        style={{
          width: "50%",
          background: "#3D0F8F",
          padding: "48px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 64 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              DS
            </div>
            <span style={{ color: "white", fontWeight: 600, fontSize: 20 }}>Digital Shaheens</span>
          </div>

          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.12)",
              color: "#A78BFA",
              fontSize: 12,
              fontWeight: 500,
              padding: "4px 12px",
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            EcomOS Investor Portal
          </div>

          <h1 style={{ color: "white", fontSize: 36, fontWeight: 700, lineHeight: 1.2, marginBottom: 40 }}>
            Your store.<br />Our expertise.
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "✦", text: "Fully managed stores" },
              { icon: "✦", text: "15–25% monthly ROI" },
              { icon: "✦", text: "Real-time performance tracking" },
            ].map((item) => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A78BFA",
                    fontSize: 10,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <span style={{ color: "#C4B5FD", fontSize: 15 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
          © 2026 Digital Shaheens — EcomOS Portal
        </p>
      </div>

      {/* Right side */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          background: "#FAFAF8",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* Mobile logo */}
          <div className="lg:hidden" style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "#3D0F8F",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                DS
              </div>
              <span style={{ fontWeight: 600, fontSize: 18, color: "#1A1A2E" }}>Digital Shaheens</span>
            </div>
          </div>

          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            {[1, 2].map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: step >= s ? "#6D28D9" : "#E0D8F8",
                    color: step >= s ? "white" : "#9CA3AF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {s}
                </div>
                <span style={{ fontSize: 13, color: step === s ? "#6D28D9" : "#9CA3AF", fontWeight: step === s ? 600 : 400 }}>
                  {s === 1 ? "Account" : "Connect Store"}
                </span>
                {s < 2 && (
                  <div style={{ width: 32, height: 1, background: step > 1 ? "#6D28D9" : "#E0D8F8", margin: "0 4px" }} />
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              background: "white",
              borderRadius: 20,
              padding: 32,
              border: "1px solid #E0D8F8",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {step === 1 ? (
              <form onSubmit={handleStep1} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>Create Your Account</h2>
                  <p style={{ fontSize: 13, color: "#6B7280" }}>Join the EcomOS investor portal</p>
                </div>

                <Field label="Full Name" name="name" value={form.name} placeholder="Hassan Raza" onChange={handleChange} />
                <Field label="Email" name="email" type="email" value={form.email} placeholder="you@example.com" onChange={handleChange} />
                <Field label="Password" name="password" type="password" value={form.password} placeholder="Min. 8 characters" onChange={handleChange} />
                <Field label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} placeholder="Repeat your password" onChange={handleChange} />

                <button
                  type="submit"
                  style={{
                    background: "#6D28D9",
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    padding: "13px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                    marginTop: 4,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#5B21B6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#6D28D9")}
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1A1A2E", marginBottom: 4 }}>Connect Your Store</h2>
                  <p style={{ fontSize: 13, color: "#6B7280" }}>
                    Paste your Google Sheet link. We will handle everything else automatically.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#374151" }}>Google Sheet Link</label>
                  <input
                    type="url"
                    name="sheetLink"
                    value={form.sheetLink}
                    onChange={handleChange}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    required
                    style={{ ...inputStyle, padding: "14px 16px" }}
                    onFocus={(e) => (e.target.style.borderColor = "#6D28D9")}
                    onBlur={(e) => (e.target.style.borderColor = "#E0D8F8")}
                  />
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>
                    Sharing must be set to Anyone with the link can view
                  </p>
                </div>

                {/* How-to guide */}
                <div
                  style={{
                    background: "#F5F1FF",
                    border: "1px solid #E0D8F8",
                    borderRadius: 12,
                    padding: "16px 18px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#6D28D9", marginBottom: 2 }}>How to share your sheet</p>
                  {[
                    "Open your Google Sheet in browser",
                    "Click Share > Change to Anyone with the link > Viewer",
                    "Copy the link and paste above",
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#6D28D9",
                          color: "white",
                          fontSize: 11,
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.4 }}>{step}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  style={{
                    background: "#6D28D9",
                    color: "white",
                    border: "none",
                    borderRadius: 12,
                    padding: "13px",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#5B21B6")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#6D28D9")}
                >
                  Create My Account
                </button>

                <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF" }}>
                  Your account will be reviewed and activated within 24 hours
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6D28D9",
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                  }}
                >
                  &larr; Back
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
