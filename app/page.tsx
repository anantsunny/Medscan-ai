import Link from "next/link";
import { Activity, Stethoscope, FlaskConical, ArrowRight, Zap, Lock, Cpu } from "lucide-react";
import { PROVIDERS } from "@/config/providers";

export default function Home() {
  return (
    <div style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Hero */}
      <section
        style={{
          padding: "5rem 1.5rem 4rem",
          maxWidth: "860px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div
          className="animate-fade-in-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 0.875rem",
            borderRadius: "9999px",
            background: "rgba(59,110,248,0.1)",
            border: "1px solid rgba(59,110,248,0.25)",
            color: "var(--color-brand-300)",
            fontSize: "0.8rem",
            fontWeight: 600,
            marginBottom: "1.75rem",
            letterSpacing: "0.04em",
          }}
        >
          <Activity size={12} />
          OPEN SOURCE · SELF-HOSTED · BRING YOUR OWN KEY
        </div>

        <h1
          className="animate-fade-in-up delay-100"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            lineHeight: 1.1,
            margin: "0 0 1.25rem",
          }}
        >
          AI Vision for{" "}
          <span className="gradient-text">Prescriptions</span>{" "}
          &amp; Lab Reports
        </h1>

        <p
          className="animate-fade-in-up delay-200"
          style={{
            color: "var(--color-text-secondary)",
            fontSize: "1.1rem",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
          }}
        >
          Upload a prescription or lab test report — AI extracts medicines,
          analyzes values, and gives you personalized health guidance.
          Powered by any LLM you configure.
        </p>

        <div
          className="animate-fade-in-up delay-300"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/lab/prescription"
            className="btn-brand"
            style={{ fontSize: "1rem", padding: "0.875rem 1.75rem" }}
            id="hero-prescription-btn"
          >
            <Stethoscope size={18} />
            Analyze Prescription
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/lab/lab-report"
            className="btn-brand"
            style={{
              fontSize: "1rem",
              padding: "0.875rem 1.75rem",
              background: "linear-gradient(135deg, #059669, #10b981)",
              boxShadow: "0 4px 20px rgba(16,185,129,0.3)",
            }}
            id="hero-lab-btn"
          >
            <FlaskConical size={18} />
            Analyze Lab Report
          </Link>
        </div>

        {/* Disclaimer */}
        <p
          className="animate-fade-in-up delay-300"
          style={{
            marginTop: "1.5rem",
            fontSize: "0.78rem",
            color: "var(--color-text-muted)",
          }}
        >
          ⚠ Demo only — no data stored — not a medical device
        </p>
      </section>

      {/* Features */}
      <section
        style={{
          padding: "3rem 1.5rem",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          <FeatureCard
            icon={<Zap size={20} style={{ color: "#fbbf24" }} />}
            iconBg="rgba(251,191,36,0.1)"
            iconBorder="rgba(251,191,36,0.2)"
            title="Vision AI Extraction"
            desc="Any vision-capable model reads handwritten or printed prescriptions and lab reports with high accuracy."
          />
          <FeatureCard
            icon={<Lock size={20} style={{ color: "#34d399" }} />}
            iconBg="rgba(52,211,153,0.1)"
            iconBorder="rgba(52,211,153,0.2)"
            title="Zero Data Storage"
            desc="Images are base64-encoded in-browser, sent directly to your chosen LLM, and never written to disk."
          />
          <FeatureCard
            icon={<Cpu size={20} style={{ color: "#818cf8" }} />}
            iconBg="rgba(129,140,248,0.1)"
            iconBorder="rgba(129,140,248,0.2)"
            title="Any LLM Provider"
            desc="OpenAI SDK's baseURL override works across all major providers — switch with a single .env change."
          />
        </div>
      </section>

      {/* Providers Table */}
      <section
        style={{
          padding: "2rem 1.5rem 4rem",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h2
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "1.4rem",
            marginBottom: "1.25rem",
            textAlign: "center",
          }}
        >
          Supported Providers
        </h2>
        <div
          className="glass-card"
          style={{ overflow: "hidden" }}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Vision Support</th>
                <th>Free Tier</th>
                <th>Example Models</th>
              </tr>
            </thead>
            <tbody>
              {PROVIDERS.map((p) => (
                <tr key={p.id}>
                  <td>
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "var(--color-brand-300)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {p.name}
                    </a>
                  </td>
                  <td>
                    {p.visionSupport ? (
                      <span style={{ color: "var(--color-emerald-400)", fontWeight: 600 }}>✓ Yes</span>
                    ) : (
                      <span style={{ color: "var(--color-text-muted)" }}>✗ No</span>
                    )}
                  </td>
                  <td>
                    {p.freeTier === true ? (
                      <span className="badge badge-normal">Free</span>
                    ) : p.freeTier === "limited" ? (
                      <span className="badge badge-warning">Limited</span>
                    ) : (
                      <span style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>Paid</span>
                    )}
                  </td>
                  <td style={{ color: "var(--color-text-secondary)", fontSize: "0.82rem" }}>
                    {p.exampleModels.slice(0, 2).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Quick Start */}
      <section
        style={{
          padding: "2rem 1.5rem 5rem",
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <div
          className="glass-card"
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "rgba(59,110,248,0.04)",
            border: "1px solid rgba(59,110,248,0.15)",
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--color-brand-300)" style={{ marginBottom: "1rem" }}>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.3rem",
              marginBottom: "0.875rem",
            }}
          >
            Self-Host in 60 Seconds
          </h2>
          <pre
            style={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "0.75rem",
              padding: "1rem 1.25rem",
              fontSize: "0.82rem",
              lineHeight: 1.8,
              textAlign: "left",
              color: "var(--color-text-secondary)",
              overflowX: "auto",
              border: "1px solid rgba(255,255,255,0.06)",
              marginBottom: "1.25rem",
            }}
          >
            <code>
              {`git clone https://github.com/medscan-ai/medscan-ai
cp .env.example .env.local
# Set LLM_PROVIDER, LLM_API_KEY, LLM_MODEL
npm install && npm run dev`}
            </code>
          </pre>
          <a
            href="https://github.com/medscan-ai/medscan-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand"
            style={{ display: "inline-flex" }}
            id="github-star-btn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            Star on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  iconBg,
  iconBorder,
  title,
  desc,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconBorder: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="glass-card" style={{ padding: "1.5rem" }}>
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: iconBg,
          border: `1px solid ${iconBorder}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
        {desc}
      </p>
    </div>
  );
}
