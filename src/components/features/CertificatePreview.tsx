"use client";

import { Button } from "@/components/ui/Button";
import { useToast, Toast } from "@/components/ui/Toast";
import { v4 as uuidv4 } from "uuid";
import type { CertificateData } from "@/lib/pdf";

interface CertificatePreviewProps {
  data: CertificateData;
  projectId: string;
  shareToken?: string | null;
  onShareGenerated?: (token: string) => void;
}

export function CertificatePreview({
  data,
  projectId,
  shareToken,
  onShareGenerated,
}: CertificatePreviewProps) {
  const { toast, showToast, hideToast } = useToast();

  const exportPDF = async () => {
    const { generateCertificatePDF } = await import("@/lib/pdf");
    await generateCertificatePDF(data);
  };

  const copyShareLink = async () => {
    let token = shareToken;
    if (!token) {
      token = uuidv4();
      await fetch(`/api/projects/${projectId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      onShareGenerated?.(token);
    }
    const url = `${window.location.origin}/partage/${token}`;
    await navigator.clipboard.writeText(url);
    showToast("Lien copié !");
  };

  return (
    <>
      <div className="border-2 border-black p-8 max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-xl font-black tracking-[0.2em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            FASHLINK
          </span>
        </div>
        <h2
          className="text-xs tracking-widest uppercase font-black mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          CERTIFICAT DE PREUVE D&apos;ANTÉRIORITÉ
        </h2>
        <div className="h-[1px] bg-black mb-6" />

        <div className="space-y-3 mb-6">
          {[
            ["Nom du projet", data.projectTitle],
            ["Styliste", data.userName],
            ["Date de création", data.createdAt],
            ["Dernière génération IA", data.lastGeneration],
            ["ID Certificat", data.certificateId.slice(0, 18) + "…"],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <span className="text-[10px] tracking-widest uppercase font-black w-40 shrink-0">
                {label}
              </span>
              <span className="text-[10px] font-semibold text-black/70 truncate">{value}</span>
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-black mb-6" />

        <div className="space-y-2">
          {[
            ["Direction IA", data.hasDirection],
            ["Storytelling", data.hasStorytelling],
            ["Illustration", data.hasIllustration],
            ["Matériaux", data.hasMaterials],
          ].map(([label, present]) => (
            <div key={label as string} className="flex items-center gap-3 text-xs font-semibold">
              <span className="font-black">{present ? "✓" : "○"}</span>
              {label as string}
            </div>
          ))}
        </div>

        <div className="h-[1px] bg-black mt-6 mb-4" />
        <p className="text-[9px] font-semibold text-black/50 text-center">
          Ce document atteste de l&apos;antériorité de la création.
        </p>
      </div>

      <div className="flex gap-4 flex-wrap mt-6">
        <Button onClick={exportPDF}>EXPORTER EN PDF</Button>
        <Button variant="outline" onClick={copyShareLink}>
          COPIER LE LIEN PRIVÉ
        </Button>
      </div>

      <Toast message={toast.message} show={toast.show} onHide={hideToast} />
    </>
  );
}
