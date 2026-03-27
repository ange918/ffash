"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", telephone: "", sujet: "Commande", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(`Bonjour Cosmetics Shop !\n\nNom: ${form.nom}\nEmail: ${form.email}\nTéléphone: ${form.telephone}\nSujet: ${form.sujet}\n\n${form.message}`);
    window.open(`https://wa.me/22900000000?text=${text}`, "_blank");
  };

  const inputStyle = {
    width: "100%",
    padding: "0.85rem 1rem",
    border: "1px solid #FDE8EF",
    borderRadius: "10px",
    fontFamily: "var(--font-montserrat)",
    fontSize: "0.88rem",
    outline: "none",
    color: "#3A2A35",
    backgroundColor: "white",
  };

  return (
    <div style={{ backgroundColor: "#FDFAF8", minHeight: "100vh", padding: "4rem 1.5rem" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 style={{ fontFamily: "var(--font-unbounded)", fontWeight: 300, color: "#3A2A35", fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "0.5rem" }}>
            Contactez-nous
          </h1>
          <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070" }}>
            Nous sommes là pour vous aider. N'hésitez pas à nous contacter.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Colonne gauche */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="flex flex-col gap-4 mb-8">
              {[
                { emoji: "📍", label: "Localisation", info: "Cotonou, Bénin" },
                { emoji: "📱", label: "WhatsApp", info: "+229 00 00 00 00" },
                { emoji: "🕐", label: "Disponibilité", info: "Lun–Sam, 8h–20h" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4" style={{ backgroundColor: "#FDE8EF", borderRadius: "12px", padding: "1.2rem" }}>
                  <span style={{ fontSize: "1.5rem" }}>{c.emoji}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-unbounded)", fontWeight: 400, color: "#3A2A35", fontSize: "0.88rem" }}>{c.label}</p>
                    <p style={{ fontFamily: "var(--font-montserrat)", color: "#7A6070", fontSize: "0.82rem" }}>{c.info}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="flex items-center justify-center"
              style={{ backgroundColor: "#EDE0F0", borderRadius: "16px", height: "250px" }}
            >
              <div className="text-center">
                <p style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#7A6070", fontSize: "1rem" }}>
                  📍 Cosmetics Shop — Cotonou, Bénin
                </p>
              </div>
            </div>
          </motion.div>

          {/* Colonne droite - Formulaire */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Nom complet</label>
                <input
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  placeholder="Votre nom"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#E8739A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,115,154,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#FDE8EF"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="votre@email.com"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#E8739A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,115,154,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#FDE8EF"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Téléphone</label>
                <input
                  type="tel"
                  value={form.telephone}
                  onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                  placeholder="+229 00 00 00 00"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "#E8739A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,115,154,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#FDE8EF"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Sujet</label>
                <select
                  value={form.sujet}
                  onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => { e.target.style.borderColor = "#E8739A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,115,154,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#FDE8EF"; e.target.style.boxShadow = "none"; }}
                >
                  <option>Commande</option>
                  <option>Informations produit</option>
                  <option>Livraison</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: "var(--font-montserrat)", fontWeight: 500, color: "#3A2A35", fontSize: "0.82rem", display: "block", marginBottom: "0.4rem" }}>Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Votre message..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => { e.target.style.borderColor = "#E8739A"; e.target.style.boxShadow = "0 0 0 3px rgba(232,115,154,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "#FDE8EF"; e.target.style.boxShadow = "none"; }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 text-white transition-colors duration-200"
                style={{ backgroundColor: "#E8739A", borderRadius: "999px", fontFamily: "var(--font-montserrat)", fontWeight: 600, border: "none", cursor: "pointer", fontSize: "0.95rem" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C94F78")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8739A")}
              >
                Envoyer via WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
