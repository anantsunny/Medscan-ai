"use client";

import { PrescriptionResult } from "@/lib/types";
import {
  AlertTriangle,
  Info,
  Shield,
  Pill,
  Brain,
  Stethoscope,
  TestTube,
  ChevronRight,
} from "lucide-react";

interface Props {
  data: PrescriptionResult;
}

export default function PrescriptionResults({ data }: Props) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      {/* Disclaimer */}
      <div className="disclaimer">
        <Shield
          size={16}
          style={{ marginTop: "1px", flexShrink: 0, color: "#d4a600" }}
        />
        <span>
          <strong>Demo only</strong> — No data is stored or transmitted beyond
          your AI provider. Do not upload real patient PII. Not a medical device
          or substitute for professional medical advice.
        </span>
      </div>

      {/* Diagnosis */}
      {data.diagnosis && (
        <div className="glass-card animate-fade-in-up delay-100" style={{ padding: "1.25rem" }}>
          <div className="section-label">Diagnosis Detected</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginTop: "0.5rem",
            }}
          >
            <Stethoscope
              size={18}
              style={{ color: "var(--color-brand-400)" }}
            />
            <span style={{ fontWeight: 600, fontSize: "1rem" }}>
              {data.diagnosis}
            </span>
          </div>
        </div>
      )}

      {/* Medicines Table */}
      {data.medicines.length > 0 && (
        <div className="glass-card animate-fade-in-up delay-100" style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--glass-border)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Pill size={16} style={{ color: "var(--color-brand-400)" }} />
            <span style={{ fontWeight: 600 }}>Extracted Medicines</span>
            <span
              className="badge badge-info"
              style={{ marginLeft: "auto" }}
            >
              {data.medicines.length} found
            </span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {data.medicines.map((med, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{med.name}</td>
                    <td>{med.dosage || "—"}</td>
                    <td>{med.frequency || "—"}</td>
                    <td>{med.duration || "—"}</td>
                    <td>
                      <span
                        className={`badge-confidence-${med.confidence}`}
                        style={{ fontSize: "0.82rem", fontWeight: 600 }}
                      >
                        ● {med.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Flags */}
      {data.flags.length > 0 && (
        <div className="glass-card animate-fade-in-up delay-200" style={{ padding: "1.25rem" }}>
          <div className="section-label">Clinical Flags</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              marginTop: "0.75rem",
            }}
          >
            {data.flags.map((flag, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.6rem",
                  padding: "0.75rem",
                  borderRadius: "0.625rem",
                  background:
                    flag.type === "alert"
                      ? "rgba(239,68,68,0.08)"
                      : flag.type === "warning"
                      ? "rgba(251,191,36,0.08)"
                      : "rgba(59,110,248,0.08)",
                  border:
                    flag.type === "alert"
                      ? "1px solid rgba(239,68,68,0.2)"
                      : flag.type === "warning"
                      ? "1px solid rgba(251,191,36,0.2)"
                      : "1px solid rgba(59,110,248,0.2)",
                }}
              >
                {flag.type === "alert" ? (
                  <AlertTriangle
                    size={15}
                    style={{
                      color: "var(--color-red-400)",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  />
                ) : flag.type === "warning" ? (
                  <AlertTriangle
                    size={15}
                    style={{
                      color: "var(--color-amber-400)",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  />
                ) : (
                  <Info
                    size={15}
                    style={{
                      color: "var(--color-brand-400)",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  />
                )}
                <span
                  style={{ fontSize: "0.88rem", color: "var(--color-text-primary)" }}
                >
                  {flag.message}
                </span>
                <span
                  className={`badge badge-${flag.type}`}
                  style={{ marginLeft: "auto", flexShrink: 0 }}
                >
                  {flag.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctor Instructions */}
      {data.doctorInstructions.length > 0 && (
        <div className="glass-card animate-fade-in-up delay-200" style={{ padding: "1.25rem" }}>
          <div className="section-label">Doctor Instructions</div>
          <ul
            style={{
              marginTop: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              listStyle: "none",
              padding: 0,
            }}
          >
            {data.doctorInstructions.map((instr, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <ChevronRight
                  size={14}
                  style={{
                    color: "var(--color-brand-400)",
                    marginTop: "3px",
                    flexShrink: 0,
                  }}
                />
                {instr}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommended Tests */}
      {data.recommendedTests.length > 0 && (
        <div className="glass-card animate-fade-in-up delay-200" style={{ padding: "1.25rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            <TestTube size={16} style={{ color: "var(--color-emerald-400)" }} />
            <span className="section-label" style={{ marginBottom: 0 }}>
              Recommended Tests
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {data.recommendedTests.map((test, i) => (
              <span key={i} className="badge badge-info">
                {test}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Patient Guidance */}
      {data.patientGuidance && (
        <div
          className="glass-card animate-fade-in-up delay-300"
          style={{
            padding: "1.25rem",
            background: "rgba(59,110,248,0.05)",
            border: "1px solid rgba(59,110,248,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.75rem",
            }}
          >
            <Brain size={16} style={{ color: "var(--color-brand-400)" }} />
            <span className="section-label" style={{ marginBottom: 0 }}>
              AI Guidance for You
            </span>
          </div>
          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.7,
              color: "var(--color-text-primary)",
            }}
          >
            {data.patientGuidance}
          </p>
        </div>
      )}
    </div>
  );
}
