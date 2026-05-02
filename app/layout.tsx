import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "MedScan AI — AI-Powered Prescription & Lab Report Analyzer",
    template: "%s | MedScan AI",
  },
  description:
    "Upload your prescription or lab report and get instant AI-powered analysis, medicine extraction, and personalized health guidance. Self-hostable, no data stored.",
  keywords: [
    "prescription analyzer",
    "lab report analyzer",
    "AI health",
    "vision AI",
    "medical AI",
    "open source health",
  ],
  openGraph: {
    title: "MedScan AI",
    description: "AI-Powered Prescription & Lab Report Analyzer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-mesh">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
