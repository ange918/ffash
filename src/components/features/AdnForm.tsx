"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Textarea, Select } from "@/components/ui/Input";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Spinner } from "@/components/ui/Spinner";
import { Card } from "@/components/ui/Card";

const VALEURS = ["Durabilité", "Luxe", "Avant-garde", "Minimalisme", "Streetwear", "Couture", "Sportswear", "Bohème"];
const STYLES = ["Classique", "Moderne", "Expérimental", "Romantique", "Streetwear", "Couture"];

interface AdnFormProps {
  initialData?: {
    adn_inspirations?: string;
    adn_valeurs?: string[];
    adn_marche?: string;
    adn_prix?: string;
    adn_style?: string;
    adn_synthese?: string;
  };
}

export function AdnForm({ initialData }: AdnFormProps) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [synthese, setSynthese] = useState(initialData?.adn_synthese || "");

  const [inspirations, setInspirations] = useState(initialData?.adn_inspirations || "");
  const [valeurs, setValeurs] = useState<string[]>(initialData?.adn_valeurs || []);
  const [marche, setMarche] = useState(initialData?.adn_marche || "Femme");
  const [prix, setPrix] = useState(initialData?.adn_prix || "Mid-range (50–200€)");
  const [style, setStyle] = useState(initialData?.adn_style || "");

  const toggleValeur = (v: string) =>
    setValeurs((prev) => (prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/adn/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inspirations, valeurs, marche, prix, style }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSynthese(data.synthese);
    } catch (e: unknown) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <StepIndicator
        steps={["INSPIRATIONS", "MARCHÉ", "STYLE"]}
        current={step}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <Textarea
                label="Vos inspirations, références, univers créatif"
                value={inspirations}
                onChange={(e) => setInspirations(e.target.value)}
                rows={5}
                placeholder="Décrivez votre univers créatif..."
              />
              <div>
                <p className="text-xs tracking-widest uppercase font-semibold mb-3">Valeurs</p>
                <div className="flex flex-wrap gap-2">
                  {VALEURS.map((v) => (
                    <button
                      key={v}
                      onClick={() => toggleValeur(v)}
                      className={`px-4 py-2 text-xs font-semibold border tracking-wide transition-colors ${
                        valeurs.includes(v)
                          ? "bg-black text-white border-black"
                          : "bg-white text-black border-black hover:bg-black/5"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6 max-w-md">
              <Select
                label="Marché cible"
                value={marche}
                onChange={(e) => setMarche(e.target.value)}
                options={["Femme", "Homme", "Mixte", "Enfant", "Unisexe"].map((v) => ({ value: v, label: v }))}
              />
              <Select
                label="Gamme de prix"
                value={prix}
                onChange={(e) => setPrix(e.target.value)}
                options={[
                  { value: "Accessible (< 50€)", label: "Accessible (< 50€)" },
                  { value: "Mid-range (50–200€)", label: "Mid-range (50–200€)" },
                  { value: "Premium (200–500€)", label: "Premium (200–500€)" },
                  { value: "Luxe (500€+)", label: "Luxe (500€+)" },
                ]}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-xs tracking-widest uppercase font-semibold">Style dominant</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {STYLES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`border px-6 py-6 text-xs font-black tracking-widest uppercase transition-colors ${
                      style === s
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-black hover:bg-black/5"
                    }`}
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between mt-10 pt-6 border-t border-black">
        <Button
          variant="outline"
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
        >
          PRÉCÉDENT
        </Button>

        {step < 2 ? (
          <Button onClick={() => setStep((s) => s + 1)}>SUIVANT</Button>
        ) : loading ? (
          <Spinner text="L'IA analyse votre profil créatif..." />
        ) : (
          <Button onClick={handleSubmit}>GÉNÉRER MON ADN</Button>
        )}
      </div>

      {synthese && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <Card>
            <h3
              className="text-sm font-black tracking-widest uppercase mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              VOTRE SYNTHÈSE ADN
            </h3>
            <p className="text-sm font-semibold leading-relaxed">{synthese}</p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
