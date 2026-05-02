"use client";

import { useState, useCallback } from "react";
import FileUpload from "@/components/FileUpload";
import PrescriptionResults from "@/components/PrescriptionResults";
import { PrescriptionResult } from "@/lib/types";
import { Stethoscope, Scan, RotateCcw } from "lucide-react";
import type { Metadata } from "next";

// Note: metadata export doesn't work in client components,
// so move to a separate layout or use generateMetadata in a server wrapper.

type State = "idle" | "uploading" | "result" | "error";

export default function PrescriptionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [state, setState] = useState<State>("idle");
  const [result, setResult] = useState<PrescriptionResult | null>(null);
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

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 8, 85));
    }, 700);

    try {
      const res = await fetch("/api/parse-prescription", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to analyze prescription");
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
        maxWidth: "900px",
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
              background: "linear-gradient(135deg, #3b6ef8, #6366f1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(59,110,248,0.35)",
            }}
          >
            <Stethoscope size={20} color="white" />
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
              Prescription{" "}
              <span className="gradient-text">Analyzer</span>
            </h1>
          </div>
        </div>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Upload a prescription image to extract medicines, dosages, diagnoses,
          and get AI-powered patient guidance.
        </p>
      </div>

      {/* Upload + Analyze */}
      {state !== "result" && (
        <div className="glass-card animate-fade-in-up delay-100" style={{ padding: "1.5rem", marginBottom: "1.5rem" }}>
          <FileUpload
            accept="image/jpeg,image/png,image/webp"
            label="Drop your prescription here"
            description="JPG, PNG, or WEBP · Max 5MB"
            onFile={handleFile}
            maxMB={5}
            icon={<Stethoscope size={26} style={{ color: "var(--color-brand-400)" }} />}
          />

          {file && state !== "uploading" && (
            <button
              className="btn-brand"
              onClick={analyze}
              style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }}
              id="analyze-prescription-btn"
            >
              <Scan size={16} />
              Analyze Prescription
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
                  Analyzing with AI vision model…
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-brand-400)",
                    fontWeight: 600,
                  }}
                >
                  {progress}%
                </span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
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
          <p style={{ color: "var(--color-red-400)", fontWeight: 600, marginBottom: "0.5rem" }}>
            ⚠ Analysis Failed
          </p>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
            {errorMsg}
          </p>
          <button className="btn-brand" onClick={reset} style={{ fontSize: "0.85rem", padding: "0.5rem 1rem" }}>
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
              id="new-prescription-btn"
            >
              <RotateCcw size={13} />
              New Scan
            </button>
          </div>
          <PrescriptionResults data={result} />
        </div>
      )}
    </div>
  );
}
