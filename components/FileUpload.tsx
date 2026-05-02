"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileImage, X, CheckCircle2 } from "lucide-react";

interface FileUploadProps {
  accept?: string;
  label: string;
  description?: string;
  onFile: (file: File) => void;
  maxMB?: number;
  icon?: React.ReactNode;
}

export default function FileUpload({
  accept = "image/*",
  label,
  description,
  onFile,
  maxMB = 5,
  icon,
}: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selected, setSelected] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > maxMB * 1024 * 1024) {
        setError(`File too large. Max ${maxMB}MB.`);
        return;
      }
      setSelected(file);
      onFile(file);
    },
    [maxMB, onFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        id="file-upload-zone"
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onInputChange}
          style={{ display: "none" }}
          id="file-input"
        />

        {selected ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            <CheckCircle2
              size={40}
              style={{ color: "var(--color-emerald-400)" }}
            />
            <div>
              <p
                style={{
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.2rem",
                }}
              >
                {selected.name}
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                {(selected.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              className="btn-brand"
              onClick={clear}
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.3)",
                boxShadow: "none",
                color: "var(--color-red-400)",
                fontSize: "0.82rem",
                padding: "0.4rem 0.875rem",
              }}
              id="clear-file-btn"
            >
              <X size={14} />
              Remove
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "1rem",
                background: "rgba(59,110,248,0.1)",
                border: "1px solid rgba(59,110,248,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {icon || <Upload size={26} style={{ color: "var(--color-brand-400)" }} />}
            </div>
            <div>
              <p
                style={{
                  fontWeight: 600,
                  color: "var(--color-text-primary)",
                  marginBottom: "0.3rem",
                  fontSize: "1rem",
                }}
              >
                {label}
              </p>
              {description && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {description}
                </p>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.8rem",
                color: "var(--color-text-muted)",
                background: "rgba(255,255,255,0.04)",
                padding: "0.3rem 0.75rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <FileImage size={12} />
              Max {maxMB}MB
            </div>
          </div>
        )}
      </div>

      {error && (
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.82rem",
            color: "var(--color-red-400)",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          role="alert"
        >
          ⚠ {error}
        </p>
      )}
    </div>
  );
}
