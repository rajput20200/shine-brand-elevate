// Curated catalog of 100+ luxury jewelry pieces for AURAÉ VERA.
// Imagery is reused thoughtfully per category for visual consistency.

import ringHero from "@/assets/cat-rings.jpg";
import ring2 from "@/assets/p-ring-2.jpg";
import ring3 from "@/assets/p-ring-3.jpg";
import ring4 from "@/assets/p-ring-4.jpg";
import neckHero from "@/assets/cat-necklaces.jpg";
import neck2 from "@/assets/p-neck-2.jpg";
import neck3 from "@/assets/p-neck-3.jpg";
import neck4 from "@/assets/p-neck-4.jpg";
import earHero from "@/assets/cat-earrings.jpg";
import ear2 from "@/assets/p-ear-2.jpg";
import ear3 from "@/assets/p-ear-3.jpg";
import ear4 from "@/assets/p-ear-4.jpg";
import bracHero from "@/assets/cat-bracelets.jpg";
import brac2 from "@/assets/p-brac-2.jpg";
import brac3 from "@/assets/p-brac-3.jpg";
import brac4 from "@/assets/p-brac-4.jpg";
import watchHero from "@/assets/cat-watches.jpg";
import watch2 from "@/assets/p-watch-2.jpg";
import watch3 from "@/assets/p-watch-3.jpg";
import watch4 from "@/assets/p-watch-4.jpg";

export type CategorySlug = "rings" | "necklaces" | "earrings" | "bracelets" | "watches";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  image: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: CategorySlug;
  subcategory: string;
  shortDescription: string;
  description: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  material: string;
  weight: string;
  dimensions: string;
  warranty: string;
  shipping: string;
  care: string;
  images: string[];
  badges: ("new" | "bestseller" | "featured" | "limited")[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "rings",
    name: "Rings",
    tagline: "Forever marked, forever yours",
    image: ringHero,
    subcategories: ["Engagement", "Diamond", "Gold", "Silver", "Minimalist", "Statement"],
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    tagline: "A whisper close to the heart",
    image: neckHero,
    subcategories: ["Gold", "Layered", "Pearl", "Diamond Pendant", "Choker"],
  },
  {
    slug: "earrings",
    name: "Earrings",
    tagline: "Light framed by light",
    image: earHero,
    subcategories: ["Stud", "Hoop", "Drop", "Luxury", "Pearl"],
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    tagline: "Sculpted around the wrist",
    image: bracHero,
    subcategories: ["Tennis", "Charm", "Gold", "Diamond"],
  },
  {
    slug: "watches",
    name: "Watches",
    tagline: "Time, worn like jewellery",
    image: watchHero,
    subcategories: ["Luxury", "Fashion", "Diamond", "Gold"],
  },
];

const RING_IMGS = [ringHero, ring2, ring3, ring4];
const NECK_IMGS = [neckHero, neck2, neck3, neck4];
const EAR_IMGS = [earHero, ear2, ear3, ear4];
const BRAC_IMGS = [bracHero, brac2, brac3, brac4];
const WATCH_IMGS = [watchHero, watch2, watch3, watch4];

const IMG_MAP: Record<CategorySlug, string[]> = {
  rings: RING_IMGS,
  necklaces: NECK_IMGS,
  earrings: EAR_IMGS,
  bracelets: BRAC_IMGS,
  watches: WATCH_IMGS,
};

interface Seed {
  name: string;
  sub: string;
  short: string;
  desc: string;
  price: number;
  sale?: number;
  material: string;
  weight: string;
  dim: string;
  badges?: Product["badges"];
}

const RING_SEEDS: Seed[] = [
  { name: "Solène Brilliant Solitaire", sub: "Engagement", short: "1.5 ct round brilliant in platinum", desc: "A single brilliant-cut lab-grown diamond rests in a six-prong knife-edge platinum band — the quietest possible architecture for the loudest possible promise.", price: 5800, material: "950 Platinum, 1.5ct VS1 diamond", weight: "3.4 g", dim: "Band 1.8mm", badges: ["bestseller", "featured"] },
  { name: "Vera Pavé Halo", sub: "Engagement", short: "Cushion-cut diamond halo, micro-pavé band", desc: "A 1.2ct cushion centre encircled by a halo of 18 round brilliants, set in 18k white gold with a hand-pavéd shoulder.", price: 6400, sale: 5760, material: "18k White Gold, 1.78ctw diamond", weight: "4.1 g", dim: "Band 2.0mm", badges: ["bestseller"] },
  { name: "Lune Trilogy", sub: "Engagement", short: "Past, present, future — three diamonds", desc: "Three graduated round brilliants in a low-set East-West rail.", price: 4900, material: "18k Yellow Gold, 1.5ctw diamond", weight: "3.8 g", dim: "Band 1.6mm", badges: ["new"] },
  { name: "Aura Eternity Band", sub: "Diamond", short: "Full eternity diamond band, 2.4ctw", desc: "A continuous channel of 36 round brilliant diamonds in 18k rose gold — designed to be worn alone or stacked.", price: 3800, material: "18k Rose Gold, 2.4ctw diamond", weight: "4.2 g", dim: "Band 2.5mm", badges: ["featured"] },
  { name: "Demi Eternity", sub: "Diamond", short: "Half-eternity, hand-set", desc: "Eighteen brilliants set across the front face only — comfort on the inner band, brilliance where you see it.", price: 2200, material: "18k White Gold, 1.0ctw diamond", weight: "3.0 g", dim: "Band 2.2mm" },
  { name: "Cassia Princess Band", sub: "Diamond", short: "Channel-set princess cuts", desc: "Princess-cut diamonds suspended in a flush channel — architectural and unflinching.", price: 2950, material: "18k White Gold, 1.2ctw diamond", weight: "3.6 g", dim: "Band 2.8mm" },
  { name: "Mira Signet", sub: "Gold", short: "Oval signet in 18k yellow gold", desc: "A modern take on the traditional signet — heavy, smooth, ready for engraving.", price: 1450, material: "18k Yellow Gold", weight: "9.2 g", dim: "Face 14×11mm", badges: ["new"] },
  { name: "Onde Wave Ring", sub: "Gold", short: "Sculpted wave, brushed finish", desc: "A continuous wave hand-formed from a single piece of 14k yellow gold and softly brushed.", price: 680, material: "14k Yellow Gold", weight: "3.1 g", dim: "Width 4mm" },
  { name: "Ciel Dome Ring", sub: "Gold", short: "Polished dome, substantial weight", desc: "A confident dome of 18k gold with a high-polish exterior and a soft-brushed interior.", price: 1180, material: "18k Yellow Gold", weight: "6.4 g", dim: "Dome 10mm" },
  { name: "Soft Bar Stack", sub: "Minimalist", short: "Set of three fine stacking bands", desc: "Three whisper-thin bands — polished, brushed, and hammered — designed to be worn together or one at a time.", price: 420, material: "14k Yellow Gold", weight: "1.8 g (set)", dim: "Band 1.0mm" },
  { name: "Argent Twist", sub: "Silver", short: "Twisted band in recycled silver", desc: "Two strands of recycled sterling silver twisted by hand.", price: 180, sale: 144, material: "925 Sterling Silver", weight: "2.6 g", dim: "Width 2mm" },
  { name: "Argent Open Cuff Ring", sub: "Silver", short: "Open-front silver cuff", desc: "A modern open-front cuff ring with two tapered terminals.", price: 220, material: "925 Sterling Silver", weight: "3.1 g", dim: "Width 3mm" },
  { name: "Smoke Sapphire Statement", sub: "Statement", short: "12mm grey sapphire on gold", desc: "A grey-blue sapphire cabochon mounted in a wide 18k yellow gold setting.", price: 3400, material: "18k Yellow Gold, grey sapphire", weight: "7.8 g", dim: "Stone 12mm", badges: ["limited"] },
  { name: "Verde Emerald Cocktail", sub: "Statement", short: "Emerald-cut emerald, diamond halo", desc: "A 4ct emerald-cut Colombian emerald embraced by a halo of round brilliant diamonds.", price: 8900, material: "18k Yellow Gold, 4ct emerald, 0.8ctw diamond", weight: "8.4 g", dim: "Face 18×13mm", badges: ["featured", "limited"] },
  { name: "Citrine Sun Ring", sub: "Statement", short: "Faceted citrine, gold bezel", desc: "A warm faceted citrine in a brushed 18k bezel setting.", price: 1280, material: "18k Yellow Gold, citrine", weight: "5.2 g", dim: "Stone 14mm" },
  { name: "Atelier Baguette Band", sub: "Diamond", short: "Tapered baguettes", desc: "Five tapered baguette diamonds in a flush channel.", price: 2680, material: "18k White Gold, 0.9ctw diamond", weight: "3.4 g", dim: "Band 3mm" },
  { name: "Aria Open Ring", sub: "Minimalist", short: "Open-front fine ring with diamonds", desc: "An open-front ring with two diamonds suspended at the terminals.", price: 540, material: "14k Yellow Gold, 0.08ctw diamond", weight: "1.4 g", dim: "Band 1.2mm" },
  { name: "Mira Square Signet", sub: "Gold", short: "Cushion-faced signet", desc: "A wider cushion-faced signet for monogram engraving.", price: 1620, material: "18k Yellow Gold", weight: "10.8 g", dim: "Face 16×13mm" },
  { name: "Nuit Black Diamond Trio", sub: "Diamond", short: "Three black diamonds, white gold", desc: "Three rose-cut black diamonds in matte white gold.", price: 1950, material: "18k White Gold, 0.6ctw black diamond", weight: "2.8 g", dim: "Band 1.4mm" },
  { name: "Lyra Pearl Solitaire", sub: "Statement", short: "Akoya pearl, 18k gold", desc: "A 9mm round white Akoya pearl on a softly tapered band.", price: 1180, material: "18k Yellow Gold, 9mm Akoya pearl", weight: "3.2 g", dim: "Pearl 9mm" },
  { name: "Pluie Pavé Dome", sub: "Statement", short: "Full-pavé dome, 200 diamonds", desc: "A dome of close-set micro-pavé diamonds rendered in white gold.", price: 4200, material: "18k White Gold, 1.6ctw diamond", weight: "5.4 g", dim: "Dome 12mm" },
];

const NECK_SEEDS: Seed[] = [
  { name: "Demi Solitaire Pendant", sub: "Diamond Pendant", short: "0.5ct bezel-set diamond", desc: "A single bezel-set round brilliant on a fine 18k chain.", price: 1650, material: "18k Yellow Gold, 0.5ct diamond", weight: "2.8 g", dim: "Chain 45cm", badges: ["bestseller"] },
  { name: "Lune Diamond Drop", sub: "Diamond Pendant", short: "1ct pear-cut on fine chain", desc: "A 1ct pear-cut diamond suspended from a delicate platinum chain.", price: 3200, material: "Platinum, 1ct diamond", weight: "3.1 g", dim: "Chain 45cm" },
  { name: "Atelier Layered Trio", sub: "Layered", short: "Three layered gold chains, pre-set", desc: "A pre-styled set of three 14k gold chains in graduating lengths.", price: 980, sale: 784, material: "14k Yellow Gold", weight: "11.4 g", dim: "40/45/50cm", badges: ["bestseller"] },
  { name: "Mara Curb Chain", sub: "Gold", short: "Solid 14k curb chain, 4mm", desc: "A confident 4mm curb chain in solid 14k yellow gold.", price: 1480, material: "14k Yellow Gold", weight: "18.2 g", dim: "Length 50cm" },
  { name: "Aria Box Chain", sub: "Gold", short: "Sleek box chain, 18k", desc: "A clean architectural box chain.", price: 920, material: "18k Yellow Gold", weight: "8.6 g", dim: "Length 45cm" },
  { name: "Onde Rope Chain", sub: "Gold", short: "Twisted rope chain", desc: "A hand-twisted rope chain in 14k yellow gold.", price: 1080, material: "14k Yellow Gold", weight: "10.4 g", dim: "Length 50cm" },
  { name: "Perle Single Strand", sub: "Pearl", short: "Akoya pearl strand, hand-knotted", desc: "Forty-five 7mm Akoya pearls, individually hand-knotted with silk thread.", price: 1880, material: "Akoya pearls, 18k gold clasp", weight: "23 g", dim: "Length 42cm", badges: ["bestseller"] },
  { name: "Perle Baroque Drape", sub: "Pearl", short: "Baroque pearl statement strand", desc: "An organically formed strand of baroque freshwater pearls.", price: 1340, material: "Baroque freshwater pearls", weight: "30 g", dim: "Length 48cm", badges: ["new"] },
  { name: "Perle Layered Set", sub: "Pearl", short: "Three pearl strands, varying lengths", desc: "Three pre-styled pearl strands designed to layer seamlessly.", price: 2480, material: "Akoya pearls", weight: "62 g", dim: "40/48/56cm" },
  { name: "Nuit Diamond Choker", sub: "Choker", short: "Wide diamond choker, 4ctw", desc: "A continuous band of close-set round brilliants forming a structured choker.", price: 12800, material: "18k White Gold, 4.0ctw diamond", weight: "32 g", dim: "Length 35cm", badges: ["limited", "featured"] },
  { name: "Soie Velvet Choker", sub: "Choker", short: "Velvet choker, diamond clasp", desc: "Hand-cut silk velvet finished with a diamond-set 18k clasp.", price: 580, material: "Silk velvet, 18k gold, 0.15ctw diamond", weight: "8 g", dim: "Adjustable 32–38cm" },
  { name: "Aurore Gold Choker", sub: "Choker", short: "Hammered gold choker", desc: "A hand-hammered 14k gold choker with a discreet hook closure.", price: 1380, material: "14k Yellow Gold", weight: "14 g", dim: "Length 36cm" },
  { name: "Constellation Pendant", sub: "Diamond Pendant", short: "Seven diamonds, hand-set arc", desc: "Seven graduated round brilliants set in a delicate arc.", price: 2280, material: "18k White Gold, 0.8ctw diamond", weight: "3.4 g", dim: "Chain 45cm" },
  { name: "Mira Heart Locket", sub: "Diamond Pendant", short: "Engravable diamond-set locket", desc: "A 14k yellow gold locket with a single pavé heart and room inside for two photographs.", price: 980, material: "14k Yellow Gold, 0.06ctw diamond", weight: "6.2 g", dim: "Locket 18mm" },
  { name: "Soft Beaded Layer", sub: "Layered", short: "Beaded fine gold chain", desc: "A delicate beaded chain in 14k yellow gold.", price: 480, material: "14k Yellow Gold", weight: "3.4 g", dim: "Length 42cm" },
  { name: "Atelier Cable + Pearl Layer", sub: "Layered", short: "Cable chain with floating pearls", desc: "A cable chain interrupted by three small floating freshwater pearls.", price: 620, material: "14k Yellow Gold, freshwater pearls", weight: "4.8 g", dim: "Length 45cm" },
  { name: "Verde Emerald Pendant", sub: "Diamond Pendant", short: "Emerald with diamond halo", desc: "A 1.2ct emerald in a halo of round brilliants on a fine 18k chain.", price: 3680, material: "18k Yellow Gold, 1.2ct emerald, 0.4ctw diamond", weight: "3.6 g", dim: "Chain 45cm" },
  { name: "Smoke Sapphire Pendant", sub: "Diamond Pendant", short: "Cabochon grey sapphire", desc: "A cabochon grey sapphire on a fine chain.", price: 1480, material: "18k Yellow Gold, sapphire", weight: "3.0 g", dim: "Chain 45cm" },
  { name: "Aura Tennis Necklace", sub: "Diamond Pendant", short: "Continuous diamond tennis necklace", desc: "A continuous strand of bezel-set diamonds.", price: 14800, material: "18k White Gold, 8ctw diamond", weight: "26 g", dim: "Length 42cm", badges: ["featured", "limited"] },
  { name: "Demi Bar Necklace", sub: "Gold", short: "Engravable horizontal bar", desc: "A 14k yellow gold bar pendant on a delicate chain — perfect for engraving.", price: 540, material: "14k Yellow Gold", weight: "3.2 g", dim: "Bar 25mm" },
  { name: "Soft Star Charm Layer", sub: "Layered", short: "Star and moon charm chain", desc: "A charm chain with hand-finished star and crescent moon charms.", price: 580, material: "14k Yellow Gold", weight: "4.0 g", dim: "Length 42cm" },
];

const EAR_SEEDS: Seed[] = [
  { name: "Demi Diamond Studs", sub: "Stud", short: "0.5ctw diamond studs, four-prong", desc: "A pair of round brilliant diamonds in four-prong 18k yellow gold settings.", price: 1380, material: "18k Yellow Gold, 0.5ctw diamond", weight: "1.4 g", dim: "Stone 4mm", badges: ["bestseller"] },
  { name: "Aria 1ct Studs", sub: "Stud", short: "1ctw brilliant studs", desc: "A pair of 0.5ct round brilliants — the everyday classic, scaled up.", price: 2680, material: "18k White Gold, 1.0ctw diamond", weight: "1.8 g", dim: "Stone 5mm", badges: ["bestseller"] },
  { name: "Perle Akoya Studs", sub: "Pearl", short: "7mm Akoya pearl studs", desc: "A pair of perfectly round 7mm Akoya pearls on 18k gold posts.", price: 480, material: "18k Yellow Gold, Akoya pearls", weight: "1.6 g", dim: "Pearl 7mm" },
  { name: "Onde Small Hoops", sub: "Hoop", short: "12mm polished gold hoops", desc: "Petite everyday hoops in solid 14k yellow gold.", price: 380, material: "14k Yellow Gold", weight: "2.4 g", dim: "12mm" },
  { name: "Onde Medium Hoops", sub: "Hoop", short: "25mm gold hoops", desc: "Medium hoops with a soft squared profile.", price: 580, material: "14k Yellow Gold", weight: "3.8 g", dim: "25mm" },
  { name: "Pavé Hoops", sub: "Hoop", short: "18mm pavé diamond hoops", desc: "18mm hoops fully pavéd with round brilliant diamonds on the outer face.", price: 1480, material: "18k Yellow Gold, 0.6ctw diamond", weight: "3.4 g", dim: "18mm", badges: ["featured"] },
  { name: "Atelier Huggies", sub: "Hoop", short: "Pavé diamond huggies", desc: "Snug huggie hoops with a row of pavé diamonds.", price: 780, material: "14k Yellow Gold, 0.18ctw diamond", weight: "2.0 g", dim: "10mm" },
  { name: "Lune Pearl Drops", sub: "Drop", short: "Pearl drop with diamond cap", desc: "A baroque pearl drop suspended from a diamond-set cap.", price: 1180, material: "18k White Gold, 0.12ctw diamond, freshwater pearls", weight: "3.2 g", dim: "Drop 32mm" },
  { name: "Mira Diamond Drops", sub: "Drop", short: "Three-stone diamond drop", desc: "A three-stone vertical diamond drop on an invisible post.", price: 2480, material: "18k White Gold, 0.9ctw diamond", weight: "2.6 g", dim: "Drop 28mm" },
  { name: "Verde Emerald Drops", sub: "Luxury", short: "Pear-cut emerald drops", desc: "A pair of pear-cut emeralds suspended from diamond-set caps.", price: 6800, material: "18k Yellow Gold, 2.0ctw emerald, 0.4ctw diamond", weight: "3.8 g", dim: "Drop 30mm", badges: ["limited"] },
  { name: "Citrine Sun Drops", sub: "Drop", short: "Faceted citrine on gold", desc: "Faceted citrines on hand-finished 18k drops.", price: 880, material: "18k Yellow Gold, citrines", weight: "3.0 g", dim: "Drop 28mm" },
  { name: "Atelier Chandelier", sub: "Luxury", short: "Diamond chandelier earrings", desc: "Multi-tier chandelier earrings with round and pear-cut diamonds.", price: 4280, material: "18k White Gold, 2.4ctw diamond", weight: "5.8 g", dim: "Drop 42mm", badges: ["limited", "featured"] },
  { name: "Argent Small Hoops", sub: "Hoop", short: "Sterling silver hoops", desc: "Lightweight everyday silver hoops.", price: 120, material: "925 Sterling Silver", weight: "2.0 g", dim: "14mm" },
  { name: "Demi Pearl Drops", sub: "Pearl", short: "Single pearl drops", desc: "A single pearl on a fine 18k gold post.", price: 380, material: "18k Yellow Gold, freshwater pearl", weight: "1.8 g", dim: "Drop 20mm" },
  { name: "Soft Bar Earrings", sub: "Drop", short: "Thin bar drop earrings", desc: "Slim bar drops in 14k yellow gold.", price: 280, material: "14k Yellow Gold", weight: "1.6 g", dim: "Drop 22mm" },
  { name: "Lyra Star Studs", sub: "Stud", short: "Diamond star studs", desc: "Six-point star studs set with micro diamonds.", price: 540, material: "14k Yellow Gold, 0.08ctw diamond", weight: "1.4 g", dim: "8mm" },
  { name: "Nuit Black Diamond Studs", sub: "Stud", short: "Rose-cut black diamonds", desc: "Rose-cut black diamonds on matte white gold posts.", price: 880, material: "18k White Gold, 0.6ctw black diamond", weight: "1.6 g", dim: "Stone 5mm" },
  { name: "Aurore Tassel Drops", sub: "Drop", short: "Gold tassel earrings", desc: "Fine gold-chain tassels suspended from a polished cap.", price: 980, material: "14k Yellow Gold", weight: "4.2 g", dim: "Drop 50mm" },
  { name: "Constellation Climbers", sub: "Stud", short: "Diamond ear climbers", desc: "A delicate row of graduated diamonds that climbs the lobe.", price: 980, material: "14k Yellow Gold, 0.18ctw diamond", weight: "1.6 g", dim: "Climb 18mm", badges: ["new"] },
];

const BRAC_SEEDS: Seed[] = [
  { name: "Aura Tennis Bracelet", sub: "Tennis", short: "4ctw bezel-set diamonds", desc: "A continuous strand of 60 bezel-set round brilliant diamonds in 18k white gold.", price: 6800, material: "18k White Gold, 4ctw diamond", weight: "12 g", dim: "Length 18cm", badges: ["bestseller", "featured"] },
  { name: "Demi Tennis Bracelet", sub: "Tennis", short: "2ctw four-prong tennis", desc: "A lighter-weight tennis bracelet with four-prong-set diamonds.", price: 3480, material: "18k White Gold, 2ctw diamond", weight: "8 g", dim: "Length 18cm" },
  { name: "Onde Curb Bracelet", sub: "Gold", short: "Solid 14k curb chain bracelet", desc: "A confident curb chain finished with a lobster clasp.", price: 1280, material: "14k Yellow Gold", weight: "16 g", dim: "Length 18cm" },
  { name: "Atelier Rope Bracelet", sub: "Gold", short: "Twisted rope bracelet", desc: "A finely twisted rope bracelet in 14k gold.", price: 880, material: "14k Yellow Gold", weight: "9 g", dim: "Length 18cm" },
  { name: "Mira Charm Bracelet", sub: "Charm", short: "Pre-set with five charms", desc: "An 18k gold curb bracelet hung with five hand-finished charms.", price: 1480, material: "18k Yellow Gold", weight: "14 g", dim: "Length 19cm", badges: ["new"] },
  { name: "Soft Charm Starter", sub: "Charm", short: "Open charm bracelet", desc: "An empty 14k gold charm bracelet — start your own story.", price: 580, material: "14k Yellow Gold", weight: "6 g", dim: "Length 19cm" },
  { name: "Nuit Black Diamond Tennis", sub: "Diamond", short: "Black diamond tennis bracelet", desc: "A row of rose-cut black diamonds in matte white gold.", price: 2980, material: "18k White Gold, 3ctw black diamond", weight: "10 g", dim: "Length 18cm" },
  { name: "Aria Diamond Bar", sub: "Diamond", short: "Floating diamond bar on chain", desc: "A horizontal bar of three diamonds on a fine 18k chain bracelet.", price: 980, material: "18k Yellow Gold, 0.3ctw diamond", weight: "3.2 g", dim: "Length 18cm" },
  { name: "Lune Pearl Bracelet", sub: "Charm", short: "Pearl-and-gold bracelet", desc: "Alternating freshwater pearls and 14k gold beads.", price: 480, material: "14k Yellow Gold, freshwater pearls", weight: "4.8 g", dim: "Length 18cm" },
  { name: "Argent Cuff", sub: "Gold", short: "Open silver cuff", desc: "An open cuff with two polished terminals.", price: 320, material: "925 Sterling Silver", weight: "18 g", dim: "Adjustable" },
  { name: "Aurore Bangle", sub: "Gold", short: "Hammered gold bangle", desc: "A hand-hammered 14k gold bangle with a hidden hinge.", price: 1080, material: "14k Yellow Gold", weight: "12 g", dim: "Diameter 60mm" },
  { name: "Verde Emerald Tennis", sub: "Diamond", short: "Emerald and diamond tennis", desc: "Alternating emeralds and diamonds in 18k yellow gold.", price: 7800, material: "18k Yellow Gold, 3.0ctw emerald, 2.0ctw diamond", weight: "12 g", dim: "Length 18cm", badges: ["limited"] },
  { name: "Atelier Box Chain Bracelet", sub: "Gold", short: "Architectural box chain", desc: "A sleek architectural box chain in 18k yellow gold.", price: 920, material: "18k Yellow Gold", weight: "8 g", dim: "Length 18cm" },
  { name: "Lyra Diamond Tennis", sub: "Tennis", short: "Princess-cut diamond tennis", desc: "Channel-set princess-cut diamonds in an architectural tennis line.", price: 5800, material: "18k White Gold, 5ctw diamond", weight: "14 g", dim: "Length 18cm", badges: ["featured"] },
  { name: "Demi Bar Bracelet", sub: "Gold", short: "Engravable bar bracelet", desc: "A 14k yellow gold bar on a delicate chain.", price: 380, material: "14k Yellow Gold", weight: "3.0 g", dim: "Bar 25mm" },
  { name: "Soft Beaded Bracelet", sub: "Gold", short: "Beaded gold chain", desc: "A delicate 14k gold beaded chain bracelet.", price: 340, material: "14k Yellow Gold", weight: "2.6 g", dim: "Length 17cm" },
];

const WATCH_SEEDS: Seed[] = [
  { name: "Aurore 32mm Gold", sub: "Gold", short: "32mm rose gold dress watch", desc: "A 32mm rose-gold-plated case with mother-of-pearl dial and integrated bracelet.", price: 980, material: "Rose gold PVD stainless steel", weight: "84 g", dim: "Case 32mm", badges: ["bestseller"] },
  { name: "Aurore 28mm Petite", sub: "Fashion", short: "Petite rose gold watch", desc: "A 28mm case for smaller wrists with a swiss quartz movement.", price: 780, material: "Rose gold PVD stainless steel", weight: "62 g", dim: "Case 28mm" },
  { name: "Lune Diamond Bezel", sub: "Diamond", short: "Diamond-set bezel, MOP dial", desc: "A diamond-set bezel surrounds a hand-finished mother-of-pearl dial.", price: 2480, material: "Stainless steel, 0.8ctw diamond", weight: "92 g", dim: "Case 34mm", badges: ["featured"] },
  { name: "Mira Leather Strap", sub: "Fashion", short: "Minimal silver dial on leather", desc: "A clean silver dial with applied indices on a Italian-tanned leather strap.", price: 480, material: "Stainless steel, leather", weight: "48 g", dim: "Case 34mm" },
  { name: "Atelier Gold Skeleton", sub: "Luxury", short: "Skeletonised automatic", desc: "A skeletonised automatic movement visible through the front and back, in 18k gold plating.", price: 3680, material: "18k Gold PVD, sapphire crystal", weight: "104 g", dim: "Case 38mm", badges: ["featured", "limited"] },
  { name: "Nuit Black Ceramic", sub: "Diamond", short: "Black ceramic, diamond markers", desc: "A monochrome black ceramic case with diamond markers and a sunray dial.", price: 1980, material: "Black ceramic, 0.2ctw diamond", weight: "82 g", dim: "Case 36mm" },
  { name: "Demi Steel Classic", sub: "Fashion", short: "Stainless steel everyday", desc: "A classic 34mm stainless steel watch with an integrated bracelet.", price: 580, material: "Stainless steel", weight: "98 g", dim: "Case 34mm" },
  { name: "Lyra Pavé Diamond", sub: "Diamond", short: "Full pavé diamond face", desc: "A full pavé diamond dial and bezel with a polished steel bracelet.", price: 4880, material: "Stainless steel, 3.2ctw diamond", weight: "118 g", dim: "Case 36mm", badges: ["limited"] },
  { name: "Soft Mesh Gold", sub: "Gold", short: "Milanese gold mesh", desc: "A 14k gold-plated milanese mesh strap with a minimalist dial.", price: 680, material: "Gold PVD stainless steel", weight: "72 g", dim: "Case 32mm" },
  { name: "Argent Slim Silver", sub: "Fashion", short: "Slim silver watch", desc: "A slim 32mm polished silver watch on a mesh strap.", price: 380, material: "Stainless steel", weight: "62 g", dim: "Case 32mm" },
  { name: "Verde Emerald Markers", sub: "Luxury", short: "Emerald hour markers", desc: "A green-dial luxury watch with emerald hour markers.", price: 5280, material: "18k Gold PVD, emeralds, sapphire crystal", weight: "108 g", dim: "Case 36mm", badges: ["limited"] },
  { name: "Onde Two-Tone", sub: "Gold", short: "Steel and gold two-tone", desc: "A two-tone steel and rose gold dress watch.", price: 1180, material: "Stainless steel + rose gold PVD", weight: "96 g", dim: "Case 34mm" },
  { name: "Atelier Moonphase", sub: "Luxury", short: "Moonphase complication", desc: "A hand-painted moonphase complication on a guilloché dial.", price: 2880, material: "Stainless steel, mother-of-pearl moonphase", weight: "98 g", dim: "Case 36mm", badges: ["new"] },
];

function buildProducts(): Product[] {
  const cats: { slug: CategorySlug; seeds: Seed[] }[] = [
    { slug: "rings", seeds: RING_SEEDS },
    { slug: "necklaces", seeds: NECK_SEEDS },
    { slug: "earrings", seeds: EAR_SEEDS },
    { slug: "bracelets", seeds: BRAC_SEEDS },
    { slug: "watches", seeds: WATCH_SEEDS },
  ];
  const out: Product[] = [];
  let i = 0;
  for (const { slug, seeds } of cats) {
    const pool = IMG_MAP[slug];
    seeds.forEach((s, idx) => {
      i++;
      const id = `${slug.slice(0, 3)}-${String(i).padStart(3, "0")}`;
      const primary = pool[idx % pool.length];
      const images = [primary, pool[(idx + 1) % pool.length], pool[(idx + 2) % pool.length], pool[(idx + 3) % pool.length]];
      // pseudo-deterministic rating + reviews
      const seed = (id.charCodeAt(0) + idx * 13) % 100;
      const rating = +(4.5 + (seed % 50) / 100).toFixed(1); // 4.5–4.99
      const reviews = 18 + (seed * 7) % 980;
      out.push({
        id,
        sku: `AV-${slug.slice(0, 2).toUpperCase()}-${String(i).padStart(4, "0")}`,
        name: s.name,
        category: slug,
        subcategory: s.sub,
        shortDescription: s.short,
        description: s.desc,
        price: s.price,
        salePrice: s.sale,
        rating,
        reviewCount: reviews,
        stock: 6 + (seed % 18),
        material: s.material,
        weight: s.weight,
        dimensions: s.dim,
        warranty: "Lifetime AURAÉ VERA warranty against manufacturing defects",
        shipping: "Complimentary insured worldwide shipping. Delivery 3–5 business days.",
        care: "Store in the provided pouch. Clean with the included polishing cloth. Avoid contact with perfumes, lotions and chlorine.",
        images,
        badges: s.badges ?? [],
      });
    });
  }
  return out;
}

export const PRODUCTS: Product[] = buildProducts();

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getByCategory = (slug: CategorySlug) => PRODUCTS.filter((p) => p.category === slug);
export const featured = () => PRODUCTS.filter((p) => p.badges.includes("featured"));
export const bestsellers = () => PRODUCTS.filter((p) => p.badges.includes("bestseller"));
export const newArrivals = () => PRODUCTS.filter((p) => p.badges.includes("new"));
export const onSale = () => PRODUCTS.filter((p) => p.salePrice != null);

export function searchProducts(q: string): Product[] {
  const s = q.trim().toLowerCase();
  if (!s) return [];
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(s) ||
      p.subcategory.toLowerCase().includes(s) ||
      p.category.includes(s) ||
      p.material.toLowerCase().includes(s) ||
      p.shortDescription.toLowerCase().includes(s),
  ).slice(0, 12);
}

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
