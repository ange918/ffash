export type Product = {
  id: number;
  nom: string;
  categorie: string;
  gamme?: string;
  typePeau: string[];
  description: string;
  prix: number;
  badge?: string;
  image: string;
};

export const products: Product[] = [
  // SAVONS CORPORELS
  { id: 1, nom: "Savon Teint Marron", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint marron pour une peau douce et hydratée.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 2, nom: "Savon Teint Marron Clair", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint marron clair pour un éclat naturel.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 3, nom: "Savon Teint Métissé", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint métissé pour sublimer votre carnation.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 4, nom: "Savon Teint Caramel", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint caramel pour une peau lumineuse.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 5, nom: "Savon Teint Ébène", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint ébène qui révèle la beauté naturelle.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 6, nom: "Savon Teint Jaune Banane", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint jaune banane pour un teint ensoleillé.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 7, nom: "Savon Teint Clair", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel au teint clair pour illuminer la peau.", prix: 1200, image: "/images/placeholder.jpg" },
  { id: 8, nom: "Savon Teint Blanchissant", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel blanchissant pour un teint uniforme et radieux.", prix: 1500, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 9, nom: "Savon Bébé", categorie: "Savons Corporels", typePeau: ["sensible"], description: "Savon doux spécialement formulé pour la peau délicate des bébés.", prix: 800, badge: "Bébé", image: "/images/placeholder.jpg" },
  { id: 10, nom: "Savon Boys", categorie: "Savons Corporels", typePeau: ["tous"], description: "Savon corporel pour hommes à la formule purifiante et tonifiante.", prix: 1200, badge: "Spécial Homme", image: "/images/placeholder.jpg" },

  // LAITS CORPORELS
  { id: 11, nom: "Lait Teint Marron", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint marron pour une peau soyeuse et nourrie.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 12, nom: "Lait Teint Marron Clair", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint marron clair pour un éclat naturel durable.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 13, nom: "Lait Teint Métissé", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint métissé pour sublimer votre carnation.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 14, nom: "Lait Teint Caramel", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint caramel pour une peau veloutée et lumineuse.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 15, nom: "Lait Teint Ébène", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint ébène révélant la beauté naturelle de la peau.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 16, nom: "Lait Teint Jaune Banane", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint jaune banane pour un teint ensoleillé.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 17, nom: "Lait Teint Clair", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel au teint clair pour illuminer et unifier le teint.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 18, nom: "Lait Éclaircissant", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel éclaircissant pour un teint uniforme et radieux.", prix: 3000, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 19, nom: "Lait Hydratant Intense", categorie: "Laits Corporels", typePeau: ["tous"], description: "Lait corporel à hydratation intense pour une peau douce toute la journée.", prix: 2800, image: "/images/placeholder.jpg" },

  // CRÈMES VISAGE
  { id: 20, nom: "Crème Peau Grasse", categorie: "Crèmes Visage", typePeau: ["grasse"], description: "Crème visage légère matifiante idéale pour les peaux grasses.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 21, nom: "Crème Peau Sèche", categorie: "Crèmes Visage", typePeau: ["sèche"], description: "Crème visage nourrissante et réparatrice pour les peaux sèches.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 22, nom: "Crème Peau Mixte", categorie: "Crèmes Visage", typePeau: ["mixte"], description: "Crème visage équilibrante adaptée aux peaux mixtes.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 23, nom: "Crème Anti-Acné", categorie: "Crèmes Visage", typePeau: ["grasse", "mixte"], description: "Crème visage anti-acné pour réduire les imperfections et affiner les pores.", prix: 4000, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 24, nom: "Crème Éclaircissante", categorie: "Crèmes Visage", typePeau: ["tous"], description: "Crème visage éclaircissante pour un teint uniforme et lumineux.", prix: 4000, image: "/images/placeholder.jpg" },
  { id: 25, nom: "Crème Réparatrice", categorie: "Crèmes Visage", typePeau: ["sèche", "sensible"], description: "Crème visage réparatrice pour les peaux sèches et sensibles.", prix: 3800, image: "/images/placeholder.jpg" },

  // LOTIONS VISAGE
  { id: 26, nom: "Lotion Anti-Acné", categorie: "Lotions Visage", typePeau: ["grasse", "mixte"], description: "Lotion anti-acné purifiante pour réduire les boutons et imperfections.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 27, nom: "Lotion Éclaircissante", categorie: "Lotions Visage", typePeau: ["tous"], description: "Lotion éclaircissante pour un teint uniforme et radieux au quotidien.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 28, nom: "Lotion Hydratante", categorie: "Lotions Visage", typePeau: ["sèche"], description: "Lotion hydratante pour les peaux sèches, apportant douceur et confort.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 29, nom: "Lotion Resserre-Pores", categorie: "Lotions Visage", typePeau: ["grasse"], description: "Lotion resserrante pour minimiser les pores dilatés et matifier la peau.", prix: 3000, image: "/images/placeholder.jpg" },
  { id: 30, nom: "Lotion Teint Uniforme", categorie: "Lotions Visage", typePeau: ["tous"], description: "Lotion pour unifier le teint et sublimer l'éclat naturel de votre peau.", prix: 2800, badge: "Nouveau", image: "/images/placeholder.jpg" },

  // GOMMAGES CORPS & VISAGE
  { id: 31, nom: "Gommage Corps Éclaircissant", categorie: "Gommages", typePeau: ["tous"], description: "Gommage corporel éclaircissant pour une peau douce et lumineuse.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 32, nom: "Gommage Corps Hydratant", categorie: "Gommages", typePeau: ["tous"], description: "Gommage corporel hydratant pour exfolier et nourrir la peau en profondeur.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 33, nom: "Gommage Corps Réparateur", categorie: "Gommages", typePeau: ["tous"], description: "Gommage corporel réparateur pour régénérer et revitaliser la peau.", prix: 3800, image: "/images/placeholder.jpg" },
  { id: 34, nom: "Gommage Visage Doux", categorie: "Gommages", typePeau: ["sensible"], description: "Gommage visage ultra-doux formulé spécialement pour les peaux sensibles.", prix: 3200, image: "/images/placeholder.jpg" },
  { id: 35, nom: "Gommage Visage Anti-Imperfections", categorie: "Gommages", typePeau: ["grasse", "mixte"], description: "Gommage visage anti-imperfections pour purifier et lisser la peau.", prix: 3500, badge: "Bestseller", image: "/images/placeholder.jpg" },

  // SAVONS VISAGE
  { id: 36, nom: "Savon Visage Anti-Acné", categorie: "Savons Visage", typePeau: ["grasse", "mixte"], description: "Savon visage anti-acné pour nettoyer en profondeur et réduire les imperfections.", prix: 1500, image: "/images/placeholder.jpg" },
  { id: 37, nom: "Savon Visage Éclaircissant", categorie: "Savons Visage", typePeau: ["tous"], description: "Savon visage éclaircissant pour un teint uniforme et lumineux.", prix: 1500, image: "/images/placeholder.jpg" },
  { id: 38, nom: "Savon Visage Hydratant", categorie: "Savons Visage", typePeau: ["tous"], description: "Savon visage hydratant pour nettoyer sans dessécher la peau.", prix: 1500, image: "/images/placeholder.jpg" },
  { id: 39, nom: "Savon Visage Teint Uniforme", categorie: "Savons Visage", typePeau: ["tous"], description: "Savon visage pour unifier le teint et révéler l'éclat naturel.", prix: 1500, image: "/images/placeholder.jpg" },
  { id: 40, nom: "Savon Visage Peau Sensible", categorie: "Savons Visage", typePeau: ["sensible"], description: "Savon visage doux et hypoallergénique pour les peaux sensibles.", prix: 1800, image: "/images/placeholder.jpg" },

  // GELS DE DOUCHE
  { id: 41, nom: "Gel de Douche Teint Marron", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint marron pour une peau douce et parfumée.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 42, nom: "Gel de Douche Teint Marron Clair", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint marron clair pour un éclat naturel.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 43, nom: "Gel de Douche Teint Métissé", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint métissé pour sublimer votre carnation.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 44, nom: "Gel de Douche Teint Caramel", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint caramel pour une peau veloutée.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 45, nom: "Gel de Douche Teint Ébène", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint ébène révélant la beauté naturelle.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 46, nom: "Gel de Douche Teint Jaune Banane", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint jaune banane pour un teint ensoleillé.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 47, nom: "Gel de Douche Teint Clair", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche au teint clair pour illuminer et unifier le teint.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 48, nom: "Gel de Douche Éclaircissant", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche éclaircissant pour un teint uniforme et radieux.", prix: 2500, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 49, nom: "Gel de Douche Bébé", categorie: "Gels de Douche", typePeau: ["sensible"], description: "Gel douche ultra-doux pour la peau délicate des bébés.", prix: 1800, badge: "Bébé", image: "/images/placeholder.jpg" },
  { id: 50, nom: "Gel de Douche Boys", categorie: "Gels de Douche", typePeau: ["tous"], description: "Gel douche pour hommes à la formule purifiante et tonifiante.", prix: 2000, badge: "Spécial Homme", image: "/images/placeholder.jpg" },

  // GAMMES DE TEINT
  { id: 51, nom: "Gamme Teint Ébène", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour sublimer et révéler le teint ébène.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 52, nom: "Gamme Teint Marron", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour sublimer le teint marron naturellement.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 53, nom: "Gamme Teint Marron Clair", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour un teint marron clair éclatant.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 54, nom: "Gamme Teint Métissé", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour sublimer la beauté du teint métissé.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 55, nom: "Gamme Teint Caramel", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour un teint caramel lumineux et uniforme.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 56, nom: "Gamme Teint Jaune Banane", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour un teint jaune banane ensoleillé.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 57, nom: "Gamme Teint Clair", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète pour un teint clair lumineux et homogène.", prix: 6500, image: "/images/placeholder.jpg" },
  { id: 58, nom: "Gamme Teint Éclaircissant", categorie: "Gammes de Teint", gamme: "Teint", typePeau: ["tous"], description: "Gamme complète éclaircissante pour un teint uniforme et radieux.", prix: 7000, badge: "Bestseller", image: "/images/placeholder.jpg" },

  // KITS LÈVRES ROSES
  { id: 59, nom: "Crème Lèvres Roses", categorie: "Lèvres Roses", typePeau: ["tous"], description: "Crème nourrissante pour des lèvres roses et hydratées.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 60, nom: "Gommage Lèvres", categorie: "Lèvres Roses", typePeau: ["tous"], description: "Gommage doux pour des lèvres douces et rosées.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 61, nom: "Soin Lèvres Roses", categorie: "Lèvres Roses", typePeau: ["tous"], description: "Soin intensif pour des lèvres roses et rebondies.", prix: 2200, badge: "Nouveau", image: "/images/placeholder.jpg" },
  { id: 62, nom: "Lotion Lèvres Roses", categorie: "Lèvres Roses", typePeau: ["tous"], description: "Lotion apaisante pour éclaircir et hydrater les lèvres.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 63, nom: "Gloss Lèvres Roses", categorie: "Lèvres Roses", typePeau: ["tous"], description: "Gloss naturel pour des lèvres roses brillantes et attrayantes.", prix: 2500, image: "/images/placeholder.jpg" },

  // ANTI-VERGETURES
  { id: 64, nom: "Savon Anti-Vergetures", categorie: "Anti-Vergetures", typePeau: ["tous"], description: "Savon anti-vergetures pour prévenir et atténuer les vergetures.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 65, nom: "Crème Anti-Vergetures", categorie: "Anti-Vergetures", typePeau: ["tous"], description: "Crème anti-vergetures pour estomper les vergetures et raffermir la peau.", prix: 4500, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 66, nom: "Lotion Anti-Vergetures", categorie: "Anti-Vergetures", typePeau: ["tous"], description: "Lotion légère anti-vergetures pour une peau lisse et tonifiée.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 67, nom: "Sérum Anti-Vergetures", categorie: "Anti-Vergetures", typePeau: ["tous"], description: "Sérum concentré anti-vergetures pour des résultats visibles rapidement.", prix: 5000, badge: "Nouveau", image: "/images/placeholder.jpg" },

  // ANTI-IMPERFECTIONS
  { id: 68, nom: "Savon Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Savon anti-imperfections pour une peau nette et purifiée.", prix: 1500, image: "/images/placeholder.jpg" },
  { id: 69, nom: "Lait Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Lait anti-imperfections pour une peau lisse et sans taches.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 70, nom: "Crème Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Crème anti-imperfections pour réduire les taches et uniformiser le teint.", prix: 3800, image: "/images/placeholder.jpg" },
  { id: 71, nom: "Gommage Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Gommage anti-imperfections pour exfolier et purifier la peau.", prix: 3200, image: "/images/placeholder.jpg" },
  { id: 72, nom: "Lotion Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Lotion anti-imperfections pour réduire les taches et affiner la peau.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 73, nom: "Gel de Douche Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Gel douche anti-imperfections pour une peau nette dès le bain.", prix: 2200, image: "/images/placeholder.jpg" },
  { id: 74, nom: "Sérum Anti-Imperfections", categorie: "Anti-Imperfections", typePeau: ["grasse", "mixte"], description: "Sérum concentré anti-imperfections pour des résultats visibles rapidement.", prix: 5500, badge: "Nouveau", image: "/images/placeholder.jpg" },

  // SAVONS MOLATO
  { id: 75, nom: "Savon Noir Molato", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon noir Molato traditionnel pour une peau purifiée et douce.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 76, nom: "Savon Molato à la Tomate", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato à la tomate pour éclaircir et unifier le teint.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 77, nom: "Savon Molato au Lait", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato au lait pour une peau douce, nourrie et lumineuse.", prix: 1800, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 78, nom: "Savon Molato au Miel", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato au miel pour une peau hydratée et éclatante de santé.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 79, nom: "Savon Molato au Beurre de Karité", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato au beurre de karité pour une peau profondément nourrie.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 80, nom: "Savon Molato au Curcuma", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato au curcuma pour illuminer le teint et réduire les taches.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 81, nom: "Savon Molato au Citron", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato au citron pour éclaircir et tonifier la peau.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 82, nom: "Savon Molato à l'Aloe Vera", categorie: "Savons Corporels", gamme: "Molato", typePeau: ["tous"], description: "Savon Molato à l'aloe vera pour hydrater et apaiser la peau.", prix: 2000, image: "/images/placeholder.jpg" },

  // GAMME AU NILA
  { id: 83, nom: "Savon Au Nila", categorie: "Savons Corporels", gamme: "Nila", typePeau: ["tous"], description: "Savon au Nila pour une peau douce, purifiée et éclatante.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 84, nom: "Lait Corporel Au Nila", categorie: "Laits Corporels", gamme: "Nila", typePeau: ["tous"], description: "Lait corporel au Nila pour une peau soyeuse et nourrie en profondeur.", prix: 3000, image: "/images/placeholder.jpg" },
  { id: 85, nom: "Crème Visage Au Nila", categorie: "Crèmes Visage", gamme: "Nila", typePeau: ["tous"], description: "Crème visage au Nila pour un teint uniforme et lumineux.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 86, nom: "Lotion Au Nila", categorie: "Lotions Visage", gamme: "Nila", typePeau: ["tous"], description: "Lotion au Nila pour hydrater et illuminer le teint naturellement.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 87, nom: "Gommage Corps Au Nila", categorie: "Gommages", gamme: "Nila", typePeau: ["tous"], description: "Gommage corps au Nila pour exfolier et revitaliser la peau.", prix: 3200, image: "/images/placeholder.jpg" },
  { id: 88, nom: "Gommage Visage Au Nila", categorie: "Gommages", gamme: "Nila", typePeau: ["tous"], description: "Gommage visage au Nila pour un teint doux et purifié.", prix: 3000, image: "/images/placeholder.jpg" },
  { id: 89, nom: "Gel de Douche Au Nila", categorie: "Gels de Douche", gamme: "Nila", typePeau: ["tous"], description: "Gel de douche au Nila pour une peau propre et parfumée.", prix: 2500, image: "/images/placeholder.jpg" },
  { id: 90, nom: "Huile au Nila", categorie: "Laits Corporels", gamme: "Nila", typePeau: ["tous"], description: "Huile corporelle au Nila pour une peau brillante et nourrie.", prix: 4000, badge: "Nouveau", image: "/images/placeholder.jpg" },

  // ANTI-QUINTO
  { id: 91, nom: "Savon Anti-Quinto", categorie: "Savons Corporels", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Savon Anti-Quinto pour atténuer les traces et unifier la peau.", prix: 1800, image: "/images/placeholder.jpg" },
  { id: 92, nom: "Lait Anti-Quinto", categorie: "Laits Corporels", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Lait corporel Anti-Quinto pour une peau lisse et homogène.", prix: 3000, image: "/images/placeholder.jpg" },
  { id: 93, nom: "Crème Anti-Quinto", categorie: "Crèmes Visage", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Crème Anti-Quinto pour réduire les taches et éclaircir le teint.", prix: 3800, image: "/images/placeholder.jpg" },
  { id: 94, nom: "Gommage Anti-Quinto", categorie: "Gommages", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Gommage Anti-Quinto pour exfolier et éliminer les imperfections.", prix: 3200, image: "/images/placeholder.jpg" },
  { id: 95, nom: "Lotion Anti-Quinto", categorie: "Lotions Visage", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Lotion Anti-Quinto pour hydrater et unifier le teint.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 96, nom: "Gel de Douche Anti-Quinto", categorie: "Gels de Douche", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Gel de douche Anti-Quinto pour une peau purifiée au quotidien.", prix: 2200, image: "/images/placeholder.jpg" },
  { id: 97, nom: "Huile Anti-Quinto", categorie: "Laits Corporels", gamme: "Anti-Quinto", typePeau: ["tous"], description: "Huile Anti-Quinto pour nourrir et illuminer la peau.", prix: 4000, image: "/images/placeholder.jpg" },

  // GAMME AU COLLAGÈNE
  { id: 98, nom: "Savon au Collagène", categorie: "Savons Corporels", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Savon au collagène pour une peau ferme, lisse et hydratée.", prix: 2000, image: "/images/placeholder.jpg" },
  { id: 99, nom: "Lait Corporel au Collagène", categorie: "Laits Corporels", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Lait corporel au collagène pour une peau rebondie et nourrie.", prix: 3500, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 100, nom: "Crème Visage au Collagène", categorie: "Crèmes Visage", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Crème visage au collagène pour lutter contre les signes du vieillissement.", prix: 4500, image: "/images/placeholder.jpg" },
  { id: 101, nom: "Lotion au Collagène", categorie: "Lotions Visage", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Lotion au collagène pour hydrater et raffermir la peau.", prix: 3000, image: "/images/placeholder.jpg" },
  { id: 102, nom: "Gommage Corps au Collagène", categorie: "Gommages", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Gommage corps au collagène pour une peau lisse et revitalisée.", prix: 3800, image: "/images/placeholder.jpg" },
  { id: 103, nom: "Gommage Visage au Collagène", categorie: "Gommages", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Gommage visage au collagène pour exfolier et raffermir le teint.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 104, nom: "Gel de Douche au Collagène", categorie: "Gels de Douche", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Gel douche au collagène pour une peau douce et revitalisée.", prix: 2800, image: "/images/placeholder.jpg" },
  { id: 105, nom: "Sérum au Collagène", categorie: "Anti-Vergetures", gamme: "Collagène", typePeau: ["sèche", "tous"], description: "Sérum concentré au collagène pour des résultats anti-âge visibles.", prix: 6000, badge: "Nouveau", image: "/images/placeholder.jpg" },

  // GAMME RONDEURS
  { id: 106, nom: "Crème Rondeurs", categorie: "Minceur", gamme: "Rondeurs", typePeau: ["tous"], description: "Crème Rondeurs pour favoriser les courbes et sublimer la silhouette.", prix: 5000, image: "/images/placeholder.jpg" },
  { id: 107, nom: "Lotion Rondeurs", categorie: "Minceur", gamme: "Rondeurs", typePeau: ["tous"], description: "Lotion Rondeurs pour activer les zones et favoriser les rondeurs désirées.", prix: 4000, image: "/images/placeholder.jpg" },
  { id: 108, nom: "Suppositoire Rondeurs", categorie: "Minceur", gamme: "Rondeurs", typePeau: ["tous"], description: "Suppositoire Rondeurs pour agir de l'intérieur sur la silhouette.", prix: 8000, badge: "Bestseller", image: "/images/placeholder.jpg" },
  { id: 109, nom: "Bonbon Rondeurs", categorie: "Minceur", gamme: "Rondeurs", typePeau: ["tous"], description: "Bonbon Rondeurs pour une cure savoureuse en faveur des courbes.", prix: 3500, image: "/images/placeholder.jpg" },
  { id: 110, nom: "Farine Rondeurs", categorie: "Minceur", gamme: "Rondeurs", typePeau: ["tous"], description: "Farine Rondeurs à intégrer dans vos repas pour agir naturellement.", prix: 4500, image: "/images/placeholder.jpg" },
  { id: 111, nom: "Sirop Rondeurs", categorie: "Minceur", gamme: "Rondeurs", typePeau: ["tous"], description: "Sirop Rondeurs pour un complément quotidien en faveur des courbes.", prix: 5500, image: "/images/placeholder.jpg" },

  // MINCEUR & VENTRE PLAT
  { id: 112, nom: "Sirop Minceur & Ventre Plat", categorie: "Minceur", typePeau: ["tous"], description: "Sirop minceur pour aider à affiner la silhouette et obtenir un ventre plat.", prix: 5000, badge: "Nouveau", image: "/images/placeholder.jpg" },
  { id: 113, nom: "Thé Minceur & Ventre Plat", categorie: "Minceur", typePeau: ["tous"], description: "Thé minceur aux plantes pour drainer et faciliter la perte de poids.", prix: 3000, image: "/images/placeholder.jpg" },
  { id: 114, nom: "Tisane Minceur & Ventre Plat", categorie: "Minceur", typePeau: ["tous"], description: "Tisane minceur naturelle pour un ventre plat et une silhouette affinée.", prix: 2800, image: "/images/placeholder.jpg" },
];

export const categories = [
  "Savons Corporels",
  "Laits Corporels",
  "Crèmes Visage",
  "Lotions Visage",
  "Gommages",
  "Savons Visage",
  "Gels de Douche",
  "Gammes de Teint",
  "Lèvres Roses",
  "Anti-Vergetures",
  "Anti-Imperfections",
  "Minceur",
];

export const gammes = ["Molato", "Nila", "Anti-Quinto", "Collagène", "Rondeurs", "Teint"];
