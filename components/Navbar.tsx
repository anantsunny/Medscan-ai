"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, FlaskConical, Stethoscope } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        background: "rgba(8,12,20,0.8)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #3b6ef8, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(59,110,248,0.4)",
            }}
          >
            <Activity size={18} color="white" strokeWidth={2.5} />
          </div>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "#f0f4ff",
            }}
          >
            MedScan{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI
            </span>
          </span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Link
            href="/lab/prescription"
            className={`nav-link ${pathname === "/lab/prescription" ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <Stethoscope size={15} />
            Prescription
          </Link>
          <Link
            href="/lab/lab-report"
            className={`nav-link ${pathname === "/lab/lab-report" ? "active" : ""}`}
            style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
          >
            <FlaskConical size={15} />
            Lab Report
          </Link>
        </nav>

        {/* GitHub badge */}
        <a
          href="https://github.com/medscan-ai/medscan-ai"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.875rem",
            borderRadius: "0.5rem",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(240,244,255,0.7)",
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 500,
            transition: "all 0.15s",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.2)";
            (e.currentTarget as HTMLElement).style.color = "#f0f4ff";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLElement).style.color =
              "rgba(240,244,255,0.7)";
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </header>
  );
}
