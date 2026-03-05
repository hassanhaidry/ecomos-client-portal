import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "EcomOS Investor Portal — Digital Shaheens",
  description: "Manage your ecommerce investment portfolio with Digital Shaheens.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.variable} antialiased`} style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
