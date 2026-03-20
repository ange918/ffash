"use client";

export async function generateMaterialsPDF(
  projectTitle: string,
  materials: MaterialRow[],
  budgetTotal: number,
  budgetPerPiece: number,
  sourcingNotes: string
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("FASHLINK", 20, 20);

  doc.setFontSize(14);
  doc.text("INVENTAIRE DES MATÉRIAUX", 20, 32);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`Projet: ${projectTitle}`, 20, 46);
  doc.text(`Date: ${new Date().toLocaleDateString("fr-FR")}`, 20, 54);

  doc.setLineWidth(0.5);
  doc.line(20, 60, 190, 60);

  const headers = ["Matériau", "Catégorie", "Quantité", "Prix/u (€)"];
  const colX = [20, 70, 120, 155];
  let y = 70;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  headers.forEach((h, i) => doc.text(h, colX[i], y));
  y += 6;
  doc.line(20, y, 190, y);
  y += 4;

  doc.setFont("helvetica", "normal");
  materials.forEach((m) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(m.nom.slice(0, 20), colX[0], y);
    doc.text(m.categorie.slice(0, 18), colX[1], y);
    doc.text(m.quantite_estimee.slice(0, 15), colX[2], y);
    doc.text(String(m.prix_unitaire_eur), colX[3], y);
    y += 7;
  });

  y += 4;
  doc.line(20, y, 190, y);
  y += 8;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Budget total estimé: ${budgetTotal.toFixed(2)} €`, 20, y);
  y += 8;
  doc.text(`Budget par pièce: ${budgetPerPiece.toFixed(2)} €`, 20, y);
  y += 12;

  if (sourcingNotes) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(`Notes: ${sourcingNotes}`, 170);
    doc.text(lines, 20, y);
  }

  doc.save(`fashlink-materiaux-${projectTitle}.pdf`);
}

export async function generateCertificatePDF(data: CertificateData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF();

  doc.setDrawColor(0);
  doc.setLineWidth(1);
  doc.rect(10, 10, 190, 277);
  doc.setLineWidth(0.3);
  doc.rect(13, 13, 184, 271);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("FASHLINK", 105, 35, { align: "center" });

  doc.setFontSize(12);
  doc.text("CERTIFICAT DE PREUVE D'ANTÉRIORITÉ", 105, 46, { align: "center" });

  doc.setLineWidth(0.5);
  doc.line(20, 52, 190, 52);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  let y = 65;
  const fields = [
    ["Nom du projet", data.projectTitle],
    ["Styliste", data.userName],
    ["Date de création", data.createdAt],
    ["Dernière génération IA", data.lastGeneration],
    ["ID Certificat", data.certificateId],
  ];

  fields.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, 25, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 90, y);
    y += 10;
  });

  y += 5;
  doc.line(20, y, 190, y);
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SECTIONS PRÉSENTES", 25, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const sections = [
    ["Direction IA", data.hasDirection],
    ["Storytelling", data.hasStorytelling],
    ["Illustration", data.hasIllustration],
    ["Matériaux", data.hasMaterials],
  ];

  sections.forEach(([label, present]) => {
    doc.text(`${present ? "✓" : "○"} ${label}`, 30, y);
    y += 8;
  });

  y += 10;
  doc.line(20, y, 190, y);
  y += 10;

  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Ce document atteste de l'antériorité de la création enregistrée sur la plateforme FASHLINK.",
    105,
    y,
    { align: "center" }
  );

  doc.save(`fashlink-certificat-${data.projectTitle}.pdf`);
}

export interface MaterialRow {
  nom: string;
  categorie: string;
  description: string;
  quantite_estimee: string;
  prix_unitaire_eur: number;
  fournisseurs_suggeres: string[];
  conseils: string;
}

export interface CertificateData {
  projectTitle: string;
  userName: string;
  createdAt: string;
  lastGeneration: string;
  certificateId: string;
  hasDirection: boolean;
  hasStorytelling: boolean;
  hasIllustration: boolean;
  hasMaterials: boolean;
}
