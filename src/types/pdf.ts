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
