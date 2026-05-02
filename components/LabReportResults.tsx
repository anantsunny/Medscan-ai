"use client";

import { LabReportResult } from "@/lib/types";
import {
  AlertTriangle,
  Salad,
  Moon,
  Dumbbell,
  Apple,
  Brain,
  ArrowRight,
  Shield,
  FlaskConical,
} from "lucide-react";

interface Props {
  data: LabReportResult;
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    normal: "Normal",
    high: "High",
    low: "Low",
    "critical-high": "Critical ↑",
    "critical-low": "Critical ↓",
  };
  return map[status] || status;
}

export default function LabReportResults({ data }: Props) {
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

      {/* Report type badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <FlaskConical size={18} style={{ color: "var(--color-brand-400)" }} />
        <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>
          {data.reportType}
        </span>
        <span className="badge badge-info">{data.markers.length} markers</span>
      </div>

      {/* Critical Alerts */}
      {data.criticalAlerts.length > 0 && (
        <div
          className="glass-card animate-fade-in-up"
          style={{
            padding: "1.25rem",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.875rem",
            }}
          >
            <AlertTriangle size={16} style={{ color: "var(--color-red-400)" }} />
            <span
              style={{
                fontWeight: 700,
                color: "var(--color-red-400)",
                fontSize: "0.85rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Critical Alerts
            </span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {data.criticalAlerts.map((alert, i) => (
              <div
                key={i}
                style={{
                  fontSize: "0.88rem",
                  padding: "0.625rem 0.875rem",
                  background: "rgba(239,68,68,0.08)",
                  borderRadius: "0.5rem",
                  borderLeft: "3px solid var(--color-red-500)",
                }}
              >
                {alert}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Markers Table */}
      {data.markers.length > 0 && (
        <div
          className="glass-card animate-fade-in-up delay-100"
          style={{ overflow: "hidden" }}
        >
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--glass-border)",
            }}
          >
            <span style={{ fontWeight: 600 }}>Lab Markers</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test Name</th>
                  <th>Value</th>
                  <th>Normal Range</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {data.markers.map((m, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{m.testName}</td>
                    <td>
                      {m.value} {m.unit}
                    </td>
                    <td style={{ color: "var(--color-text-secondary)" }}>
                      {m.normalRange}
                    </td>
                    <td>
                      <span className={`badge badge-${m.status}`}>
                        {statusLabel(m.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Summary */}
      {data.aiSummary && (
        <div
          className="glass-card animate-fade-in-up delay-100"
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
              AI Summary
            </span>
          </div>
          <p
            style={{
              fontSize: "0.92rem",
              lineHeight: 1.75,
              color: "var(--color-text-primary)",
            }}
          >
            {data.aiSummary}
          </p>
        </div>
      )}

      {/* Lifestyle Recommendations */}
      <div
        className="glass-card animate-fade-in-up delay-200"
        style={{ padding: "1.25rem" }}
      >
        <div className="section-label">Lifestyle Recommendations</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginTop: "0.875rem",
          }}
        >
          {data.lifestyleRecommendations.diet.length > 0 && (
            <LifestyleBlock
              icon={<Salad size={15} />}
              label="Diet"
              items={data.lifestyleRecommendations.diet}
              color="var(--color-emerald-400)"
            />
          )}
          {data.lifestyleRecommendations.sleep.length > 0 && (
            <LifestyleBlock
              icon={<Moon size={15} />}
              label="Sleep"
              items={data.lifestyleRecommendations.sleep}
              color="var(--color-brand-400)"
            />
          )}
          {data.lifestyleRecommendations.exercise.length > 0 && (
            <LifestyleBlock
              icon={<Dumbbell size={15} />}
              label="Exercise"
              items={data.lifestyleRecommendations.exercise}
              color="var(--color-amber-400)"
            />
          )}
        </div>
      </div>

      {/* Food & Nutrition */}
      {data.foodAndNutritionGuidance.length > 0 && (
        <div
          className="glass-card animate-fade-in-up delay-200"
          style={{ padding: "1.25rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.875rem",
            }}
          >
            <Apple size={16} style={{ color: "var(--color-emerald-400)" }} />
            <span className="section-label" style={{ marginBottom: 0 }}>
              Food & Nutrition Guidance
            </span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            {data.foodAndNutritionGuidance.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.5rem",
                  fontSize: "0.88rem",
                  padding: "0.625rem 0.875rem",
                  background: "rgba(52,211,153,0.05)",
                  borderRadius: "0.5rem",
                  borderLeft: "3px solid var(--color-emerald-500)",
                }}
              >
                <ArrowRight
                  size={13}
                  style={{
                    color: "var(--color-emerald-400)",
                    marginTop: "2px",
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps */}
      {data.nextSteps.length > 0 && (
        <div
          className="glass-card animate-fade-in-up delay-300"
          style={{ padding: "1.25rem" }}
        >
          <div className="section-label">Next Steps</div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              marginTop: "0.75rem",
            }}
          >
            {data.nextSteps.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "0.625rem",
                  border: "1px solid var(--glass-border)",
                  fontSize: "0.88rem",
                }}
              >
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "rgba(59,110,248,0.15)",
                    color: "var(--color-brand-400)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LifestyleBlock({
  icon,
  label,
  items,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  items: string[];
  color: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        borderRadius: "0.75rem",
        padding: "0.875rem",
        border: "1px solid var(--glass-border)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          color,
          fontWeight: 600,
          fontSize: "0.82rem",
          marginBottom: "0.625rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {icon}
        {label}
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "0.35rem",
        }}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: "0.83rem",
              color: "var(--color-text-secondary)",
              display: "flex",
              alignItems: "flex-start",
              gap: "0.4rem",
            }}
          >
            <span style={{ color, marginTop: "2px" }}>·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
