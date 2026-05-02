"use client";

import { useState, useCallback } from "react";
import FileUpload from "@/components/FileUpload";
import LabReportResults from "@/components/LabReportResults";
import { LabReportResult } from "@/lib/types";
import { FlaskConical, Scan, RotateCcw } from "lucide-react";

type State = "idle" | "uploading" | "result" | "error";

export default function LabReportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<LabReportResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    setErrorMsg(null);
    setState("idle");
  }, []);

  const analyze = async () => {
    if (!file) return;
    setState("uploading");
    setProgress(10);

    const formData = new FormData();
    formData.append("file", file);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 6, 85));
    }, 800);

    try {
      const res = await fetch("/api/parse-lab-report", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to analyze lab report");
      }

      setResult(json.data);
      setState("result");
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setState("error");
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setErrorMsg(null);
    setState("idle");
    setProgress(0);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        padding: "2.5rem 1.5rem",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="animate-fade-in-up" style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(16,185,129,0.35)",
            }}
          >
            <FlaskConical size={20} color="white" />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.75rem",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Lab Report{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #34d399, #10b981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Analyzer
              </span>
            </h1>
          </div>
        </div>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Upload a lab report (CBC, Lipid Panel, LFT, KFT, Thyroid, HbA1c,
          Vitamins, Urine) to get AI-powered analysis and personalized health guidance.
        </p>

        {/* Supported report tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            marginTop: "0.875rem",
          }}
        >
          {[
            "CBC",
            "Lipid Panel",
            "LFT",
            "KFT",
            "Thyroid",
            "HbA1c",
            "Vitamin Panel",
            "Urine Routine",
          ].map((tag) => (
            <span
              key={tag}
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 500,
                background: "rgba(52,211,153,0.1)",
                color: "var(--color-emerald-400)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Upload + Analyze */}
      {state !== "result" && (
        <div
          className="glass-card animate-fade-in-up delay-100"
          style={{ padding: "1.5rem", marginBottom: "1.5rem" }}
        >
          <FileUpload
            accept="image/jpeg,image/png,image/webp,application/pdf"
            label="Drop your lab report here"
            description="PDF, JPG, PNG, or WEBP · Max 5MB"
            onFile={handleFile}
            maxMB={5}
            icon={
              <FlaskConical
                size={26}
                style={{ color: "var(--color-emerald-400)" }}
              />
            }
          />

          {file && state !== "uploading" && (
            <button
              className="btn-brand"
              onClick={analyze}
              style={{
                width: "100%",
                marginTop: "1rem",
                justifyContent: "center",
                background: "linear-gradient(135deg, #059669, #10b981)",
                boxShadow: "0 4px 20px rgba(16,185,129,0.3)",
              }}
              id="analyze-lab-report-btn"
            >
              <Scan size={16} />
              Analyze Lab Report
            </button>
          )}

          {state === "uploading" && (
            <div style={{ marginTop: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Processing lab values with AI…
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-emerald-400)",
                    fontWeight: 600,
                  }}
                >
                  {progress}%
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, #10b981, #34d399)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {state === "error" && (
        <div
          className="glass-card animate-fade-in-up"
          style={{
            padding: "1.5rem",
            marginBottom: "1.5rem",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
          }}
        >
          <p
            style={{
              color: "var(--color-red-400)",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            ⚠ Analysis Failed
          </p>
          <p
            style={{
              fontSize: "0.88rem",
              color: "var(--color-text-secondary)",
              marginBottom: "1rem",
            }}
          >
            {errorMsg}
          </p>
          <button
            className="btn-brand"
            onClick={reset}
            style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}
          >
            <RotateCcw size={14} />
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {state === "result" && result && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1.25rem",
            }}
          >
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.25rem",
                margin: 0,
              }}
            >
              Analysis Results
            </h2>
            <button
              className="btn-brand"
              onClick={reset}
              style={{
                background: "rgba(255,255,255,0.06)",
                boxShadow: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--color-text-secondary)",
                fontSize: "0.82rem",
                padding: "0.4rem 0.875rem",
              }}
              id="new-lab-report-btn"
            >
              <RotateCcw size={13} />
              New Scan
            </button>
          </div>
          <LabReportResults data={result} />
        </div>
      )}
    </div>
  );
}
