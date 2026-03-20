"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";

interface SketchUploaderProps {
  projectId: string;
  onResult: (data: { sketchUrl: string; resultUrl: string; id: string }) => void;
  adnSynthese?: string;
}

export function SketchUploader({ projectId, onResult, adnSynthese }: SketchUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [styleText, setStyleText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (f.size > 5 * 1024 * 1024) {
      setError("Fichier trop volumineux (5MB max)");
      return;
    }
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async () => {
    if (!file || !preview) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/projects/${projectId}/generate-illustration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: preview,
          styleText,
          adnSynthese,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de génération");
      onResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="border-2 border-dashed border-black p-12 text-center cursor-pointer hover:bg-black/5 transition-colors"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <div className="space-y-4">
            <img src={preview} alt="Croquis" className="max-h-64 mx-auto border border-black object-contain" />
            <p className="text-xs text-black/50 font-semibold">Cliquez pour changer</p>
          </div>
        ) : (
          <>
            <h3
              className="text-lg font-black tracking-wide mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              DÉPOSEZ VOTRE CROQUIS ICI
            </h3>
            <p className="text-xs font-semibold text-black/50">JPG, PNG — 5MB max</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      <div>
        <label className="text-xs tracking-widest uppercase font-semibold block mb-2">
          Précisions stylistiques (optionnel)
        </label>
        <input
          type="text"
          value={styleText}
          onChange={(e) => setStyleText(e.target.value)}
          placeholder="ex: robe longue, style épuré, noir"
          className="border border-black px-4 py-3 text-sm font-semibold w-full bg-white"
        />
      </div>

      {error && (
        <div className="border border-black bg-white p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {loading ? (
        <Spinner text="Transformation en illustration 2D..." />
      ) : (
        <Button onClick={handleSubmit} disabled={!file}>
          TRANSFORMER EN ILLUSTRATION 2D
        </Button>
      )}
    </div>
  );
}
