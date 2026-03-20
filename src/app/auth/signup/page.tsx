"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Erreur lors de l'inscription");
      setLoading(false);
      return;
    }

    await signIn("credentials", { email, password, redirect: false });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="hidden md:flex flex-col items-center justify-center bg-black text-white p-16">
        <span
          className="text-4xl font-black tracking-[0.2em] mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          FASHLINK
        </span>
        <p className="text-sm font-semibold text-white/60 text-center max-w-xs tracking-wide">
          La première plateforme de direction créative IA pour stylistes.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center px-8 py-16"
      >
        <div className="w-full max-w-sm">
          <h1
            className="text-2xl font-black tracking-tight mb-2"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            CRÉER UN COMPTE
          </h1>
          <p className="text-xs font-semibold text-black/50 mb-10 tracking-wide">
            Rejoignez la communauté des stylistes FASHLINK
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nom complet"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            {error && (
              <div className="border border-black p-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} className="w-full py-4">
              S&apos;INSCRIRE
            </Button>
          </form>

          <p className="text-xs font-semibold text-center mt-8 text-black/60">
            Déjà un compte ?{" "}
            <Link href="/auth/signin" className="text-black underline">
              Se connecter
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
