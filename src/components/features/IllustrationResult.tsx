"use client";

import { Button } from "@/components/ui/Button";
import { useState } from "react";

interface IllustrationResultProps {
  sketchUrl: string;
  resultUrl: string;
  illustrationId: string;
  inCertificate: boolean;
  onToggleCertificate?: (id: string, val: boolean) => void;
}

export function IllustrationResult({
  sketchUrl,
  resultUrl,
  illustrationId,
  inCertificate,
  onToggleCertificate,
}: IllustrationResultProps) {
  const [cert, setCert] = useState(inCertificate);

  const download = () => {
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "fashlink-illustration.png";
    a.target = "_blank";
    a.click();
  };

  const toggleCert = async () => {
    const next = !cert;
    setCert(next);
    onToggleCertificate?.(illustrationId, next);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p
            className="text-[9px] tracking-widest uppercase font-black mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            CROQUIS ORIGINAL
          </p>
          <img src={sketchUrl} alt="Croquis" className="w-full border border-black object-contain max-h-80" />
        </div>
        <div>
          <p
            className="text-[9px] tracking-widest uppercase font-black mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ILLUSTRATION GÉNÉRÉE
          </p>
          <img src={resultUrl} alt="Illustration" className="w-full border border-black object-contain max-h-80" />
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Button onClick={download} variant="primary">
          TÉLÉCHARGER L&apos;ILLUSTRATION
        </Button>
        <Button
          onClick={toggleCert}
          variant={cert ? "primary" : "outline"}
        >
          {cert ? "✓ DANS LE CERTIFICAT" : "AJOUTER AU CERTIFICAT"}
        </Button>
      </div>
    </div>
  );
}
