"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { motion } from "framer-motion";

export default function NouveauProjetPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [season, setSeason] = useState("SS26");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, theme, season }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Erreur lors de la création");
      setLoading(false);
      return;
    }

    router.push(`/dashboard/projets/${data.project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1
        className="text-4xl font-black tracking-tight mb-10"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        NOUVEAU PROJET
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <Input
          label="Nom du projet"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Ex: Collection Automne Silences"
        />

        <Textarea
          label="Thème ou concept initial"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          rows={4}
          placeholder="Décrivez votre concept de départ..."
        />

        <Select
          label="Saison"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
          options={[
            { value: "SS25", label: "SS25" },
            { value: "AW25", label: "AW25" },
            { value: "SS26", label: "SS26" },
            { value: "AW26", label: "AW26" },
            { value: "Intemporel", label: "Intemporel" },
          ]}
        />

        {error && (
          <div className="border border-black p-3 text-xs font-semibold text-red-600">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full py-4">
          CRÉER LE PROJET
        </Button>
      </form>
    </motion.div>
  );
}
