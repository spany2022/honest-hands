// Product catalogue.
// Names and descriptions come from the HonestHands catalogue PDF and the
// owner's product list. Prices and pack sizes come from the client's price
// sheet (Oct 2026) plus a flat ₹10 increase per pack; products not on that sheet are "price on request".

export type CategorySlug =
  | "monthly-box"
  | "grains-atta"
  | "pulses-dals-flours"
  | "spices-condiments"
  | "oils-ghee"
  | "sweeteners-beverages-snacks"
  | "fresh-produce-wellness"
  | "handmade-heritage";

export type Category = {
  slug: CategorySlug;
  name: string;
  short: string;
  description: string;
  image?: string;
};

export type Variant = {
  id: string;
  label: string;
  price: number;
  // Photo for this design, when designs look different (e.g. painted pots).
  image?: string;
};

export type Product = {
  slug: string;
  name: string;
  localName?: string;
  category: CategorySlug;
  short: string;
  description: string;
  image?: string;
  // Where the product is sourced from (district, state), per the client's list.
  origin?: string;
  // Made in-house by HonestHands rather than sourced.
  madeByUs?: boolean;
  // For bundles: what is inside, linking to each product where it is sold singly.
  contents?: { name: string; qty: string; product?: string }[];
  // Colour used for the illustrated pack when there is no photograph yet.
  tint: string;
  kind?: "food" | "craft";
  badges?: string[];
  variants: Variant[];
  inStock: boolean;
  // No fixed online price: "harvest" = fresh produce priced daily,
  // "price" = not on the current price list, ask on WhatsApp.
  enquire?: "harvest" | "price";
  featured?: boolean;
  keywords?: string[];
};

export const categories: Category[] = [
  {
    slug: "monthly-box",
    name: "Monthly Ration Box",
    short: "A month of essentials",
    description: "Twenty everyday HonestHands staples — rice, atta, dal, oil, chatua, honey and spices — packed together for a month of home cooking.",
    image: "/images/products/monthly-ration-box.webp",
  },
  {
    slug: "grains-atta",
    name: "Grains, Atta & Pulses",
    short: "Heritage grains & atta",
    description:
      "Hand-pounded and heirloom rice, stone-ground chakki atta and everyday pantry staples.",
    image: "/images/mood/rosematta-rice-loose.jpg",
  },
  {
    slug: "pulses-dals-flours",
    name: "Pulses, Dals & Flours",
    short: "Roasted, unpolished, honest",
    description:
      "Unpolished dals, roasted pulses and traditional flours — from kolatha to chatua — for wholesome Indian meals.",
    image: "/images/mood/roasted-moong-dal-loose.jpg",
  },
  {
    slug: "spices-condiments",
    name: "Spices, Condiments & Cooking Essentials",
    short: "Ground for aroma",
    description:
      "GI-tagged Kandhamal turmeric, sun-dried chillies, hand-blended masalas and pure tamarind paste.",
    image: "/images/mood/kandhamal-turmeric-loose.jpg",
  },
  {
    slug: "oils-ghee",
    name: "Cold-Pressed Oils & Ghee",
    short: "Wood-pressed & bilona-churned",
    description:
      "Wood cold-pressed mustard and groundnut oils, handmade coconut oil and A2 desi cow ghee.",
    image: "/images/mood/mustard-oil-loose.jpg",
  },
  {
    slug: "sweeteners-beverages-snacks",
    name: "Natural Sweeteners, Beverages & Snacks",
    short: "Honey, jaggery & snacks",
    description:
      "Wild and farm honey, unrefined jaggery, badam ladoo, ragi and salty biscuits, and traditional Odia snacks like mixture and chuda bhaja.",
    image: "/images/mood/honey-loose.jpg",
  },
  {
    slug: "fresh-produce-wellness",
    name: "Fresh Produce & Wellness",
    short: "Mushrooms & herbal powders",
    description:
      "Gourmet mushrooms and herbal powders like amla and triphala.",
    image: "/images/products/mushroom.jpg",
  },
  {
    slug: "handmade-heritage",
    name: "Handmade & Odisha Heritage",
    short: "Crafted by hand",
    description:
      "Pattachitra painted pots, Sambalpuri sarees, sal leaf plates, jhuna dhoop and other handmade goods from Odisha.",
    image: "/images/products/pattachitra-jagannath-handi.webp",
  },
];

const w = (id: string, label: string, price: number): Variant => ({ id, label, price });

export const products: Product[] = [
  // ——— Monthly Ration Box ———
  {
    slug: "monthly-ration-box",
    name: "Monthly Ration Box",
    localName: "Daily essentials for a month",
    category: "monthly-box",
    short: "20 everyday staples for a month of home cooking, in one box.",
    description:
      "Everything a family kitchen reaches for every day — hand-pounded rice, chakki atta, roasted moong dal, cold-pressed mustard oil, chatua, wild honey and a full set of spices — packed together in one HonestHands box for the month.",
    image: "/images/products/monthly-ration-box.webp",
    contents: [
      { name: "Hand Pound Rice (Dhinki Kuta)", qty: "10 kg", product: "hand-pound-rice" },
      { name: "Desi Puffed Rice (Mudhi)", qty: "2 packets", product: "desi-puffed-rice" },
      { name: "Roasted Moong Dal", qty: "2 kg", product: "roasted-moong-dal" },
      { name: "Chakki Atta", qty: "10 kg", product: "chakki-atta" },
      { name: "Cold-Pressed Mustard Oil (Ghana Sorisa Tela)", qty: "3 L", product: "wood-pressed-mustard-oil" },
      { name: "Besan", qty: "2 kg", product: "besan" },
      { name: "Premium Dry Fruits Chatua (Sattu)", qty: "3 kg", product: "dry-fruits-chatua" },
      { name: "Jaggery (Kalasa Guda)", qty: "1 kg", product: "jaggery" },
      { name: "Badi", qty: "3 packets", product: "badi" },
      { name: "Wild Honey (Jungli Mahu)", qty: "200 g", product: "wild-honey" },
      { name: "Roasted Ragi Powder (Mandia)", qty: "1 kg", product: "roasted-ragi-powder" },
      { name: "Turmeric Powder", qty: "500 g", product: "kandhamal-turmeric" },
      { name: "Chilli Powder", qty: "500 g", product: "chilli-powder" },
      { name: "Kashmiri Chilli Powder", qty: "200 g", product: "kashmiri-chilli-powder" },
      { name: "Garam Masala", qty: "200 g", product: "garam-masala" },
      { name: "Curry Powder", qty: "100 g", product: "curry-powder" },
      { name: "Black Pepper Powder", qty: "100 g", product: "black-pepper-powder" },
      { name: "Coriander Powder", qty: "100 g", product: "coriander-powder" },
      { name: "Jeera Powder", qty: "200 g", product: "jeera-powder" },
      { name: "Panch Phoron", qty: "100 g", product: "panch-phoron" },
    ],
    tint: "#95441C",
    badges: ["20 items"],
    variants: [w("box", "1 box", 5999)],
    inStock: true,
    keywords: ["monthly box", "ration", "monthly ration", "combo", "grocery box", "kit", "bundle"],
  },

  // ——— Grains, Atta & Pulses ———
  {
    slug: "hand-pound-rice",
    name: "Hand Pound Rice",
    localName: "Dhinki Kuta Chaula",
    category: "grains-atta",
    short: "Traditionally pounded rice that keeps its bran.",
    description:
      "Traditionally pounded to retain maximum bran, natural fiber, and essential minerals. Ideal for slow-cooked, wholesome meals.",
    image: "/images/products/hand-pound-rice.webp",
    origin: "Kandhamal, Odisha",
    tint: "#A8532C",
    badges: ["Hand-pounded"],
    variants: [w("500g", "500 g", 82), w("1kg", "1 kg", 153)],
    inStock: true,
    featured: true,
    keywords: ["dhinki", "dhenki", "chawal", "red rice", "unpolished"],
  },
  {
    slug: "rosematta-rice",
    name: "Rosematta Rice",
    localName: "Mugei Chaula",
    category: "grains-atta",
    short: "Coarse-grained red rice, high in fiber.",
    description:
      "Nutrient-rich, coarse-grained red rice. High in fiber and ideal for robust, traditional, and healthy culinary preparations.",
    image: "/images/products/rosematta-rice.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#9C4A3A",
    variants: [w("500g", "500 g", 76), w("1kg", "1 kg", 142)],
    inStock: true,
    keywords: ["mugei", "matta", "red rice", "kerala"],
  },
  {
    slug: "koraput-kala-jeera-rice",
    name: "Koraput Kala Jeera Rice",
    localName: "Kalajeera Chaula",
    category: "grains-atta",
    short: "GI-tagged aromatic heirloom rice from Koraput.",
    description:
      "A GI-tagged aromatic rice from the Koraput hills of Odisha, named for its small, dark, cumin-like grains. Cooks fragrant and soft — a heirloom grain for festive pulao, kheer and everyday rice.",
    image: "/images/products/koraput-kala-jeera-rice.webp",
    origin: "Koraput, Odisha",
    tint: "#3B2A26",
    badges: ["GI-tagged"],
    // Sold as "Black Rice" on the client's price sheet.
    variants: [w("500g", "500 g", 164)],
    inStock: true,
    featured: true,
    keywords: ["kalajeera", "kala jeera", "koraput", "aromatic rice", "gi tag", "black rice", "purple rice"],
  },
  {
    slug: "basmati-rice",
    name: "Basmati Rice (Govind Bhog)",
    category: "grains-atta",
    short: "Fragrant rice for pulao, bhog and festive meals.",
    description:
      "Fragrant Govind Bhog rice with a delicate aroma and soft texture — for pulao, bhog, payesh and festive meals.",
    image: "/images/products/basmati-rice.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C9B48A",
    variants: [w("500g", "500 g", 90), w("1kg", "1 kg", 170)],
    inStock: true,
    keywords: ["biryani", "pulao", "long grain"],
  },
  {
    slug: "chakki-atta",
    name: "Chakki Atta",
    category: "grains-atta",
    short: "Stone-ground whole wheat flour for soft rotis.",
    description:
      "Stone-ground whole wheat flour retaining the vital wheat germ and natural oils for soft, highly digestible breads and rotis.",
    image: "/images/products/chakki-atta.webp",
    madeByUs: true,
    tint: "#B99A6B",
    badges: ["Stone-ground"],
    variants: [w("1kg", "1 kg", 70)],
    inStock: true,
    featured: true,
    keywords: ["wheat flour", "atta", "roti", "chapati", "gehu"],
  },
  {
    slug: "desi-puffed-rice",
    name: "Desi Puffed Rice",
    localName: "Mudhi",
    category: "grains-atta",
    short: "Light, crispy, traditionally processed puffed rice.",
    description:
      "Light, crispy, and traditionally processed puffed rice — a clean, versatile base for chef-special salads and healthy appetizers.",
    image: "/images/products/desi-puffed-rice.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#D8C49A",
    variants: [w("200g", "200 g", 55), w("1kg", "1 kg", 180)],
    inStock: true,
    keywords: ["mudhi", "murmura", "muri", "puffed rice"],
  },

  {
    slug: "kheer-rice",
    name: "Basmati Rice (Kheer Rice)",
    category: "grains-atta",
    short: "Short, fragrant rice that cooks soft and creamy.",
    description:
      "Short-grain fragrant rice that cooks soft and creamy — ideal for kheer, payesh and festive puddings.",
    image: "/images/products/kheer-rice.webp",
    origin: "Kandhamal, Odisha",
    tint: "#E3D7B8",
    variants: [w("500g", "500 g", 77), w("1kg", "1 kg", 140)],
    inStock: true,
    keywords: ["kheer", "payesh", "khiri", "basmati", "rice"],
  },
  {
    slug: "desi-beaten-rice",
    name: "Desi Beaten Rice",
    localName: "Chuda / Poha",
    category: "grains-atta",
    short: "Flattened rice for poha and quick breakfasts.",
    description:
      "Traditional flattened rice for poha, chuda santula, dahi chuda and quick, light breakfasts.",
    image: "/images/products/desi-beaten-rice.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#E6D6AE",
    variants: [w("500g", "500 g", 60)],
    inStock: true,
    keywords: ["poha", "chuda", "chura", "flattened rice", "beaten rice"],
  },
  {
    slug: "bajra-atta",
    name: "Bajra Atta",
    category: "grains-atta",
    short: "Pearl millet flour for rotis and bhakri.",
    description:
      "Pearl millet flour with an earthy, nutty taste — for bajra rotis, bhakri and millet pancakes.",
    madeByUs: true,
    tint: "#9C8A6A",
    variants: [w("500g", "500 g", 60), w("1kg", "1 kg", 110)],
    inStock: true,
    keywords: ["bajra", "pearl millet", "millet flour", "atta"],
  },

  // ——— Pulses, Dals & Flours ———
  {
    slug: "dry-fruits-chatua",
    name: "Premium Dry Fruits Chatua",
    localName: "Dry Fruits Sattu",
    category: "pulses-dals-flours",
    short: "Roasted gram flour with almonds, cashews and cardamom.",
    description:
      "Energy-boosting roasted gram flour enriched with almonds, cashews, and cardamom. Available with or without sugar — perfect for summer drinks and breakfast.",
    image: "/images/products/dry-fruits-chatua.webp",
    madeByUs: true,
    tint: "#B88A4E",
    badges: ["Bestseller"],
    variants: [w("sugar-500g", "With sugar · 500 g", 110), w("sugar-1kg", "With sugar · 1 kg", 205), w("nosugar-500g", "No sugar · 500 g", 110), w("nosugar-1kg", "No sugar · 1 kg", 205)],
    inStock: true,
    featured: true,
    keywords: ["chatua", "sattu", "dry fruits", "breakfast", "drink"],
  },
  {
    slug: "roasted-moong-dal",
    name: "Roasted Moong Dal",
    category: "pulses-dals-flours",
    short: "Dry-roasted split yellow lentils with a deep nutty flavour.",
    description:
      "Split yellow lentils dry-roasted for superior digestibility, enhanced aroma, and deep nutty flavor in soups and dals.",
    image: "/images/products/roasted-moong-dal.webp",
    tint: "#D1A43E",
    badges: ["Dry-roasted"],
    variants: [w("250g", "250 g", 64), w("500g", "500 g", 115)],
    inStock: true,
    featured: true,
    keywords: ["moong", "mung", "yellow dal", "bhaja muga"],
  },
  {
    slug: "urad-dal",
    name: "Urad Dal",
    localName: "Biri",
    category: "pulses-dals-flours",
    short: "Unpolished split black lentils for batters and dals.",
    description:
      "Unpolished split black lentils delivering natural stickiness and richness for traditional batters, dal makhani, and tempering.",
    image: "/images/products/urad-dal.webp",
    origin: "Koraput, Odisha",
    tint: "#C8B68E",
    badges: ["Unpolished"],
    variants: [w("250g", "250 g", 61)],
    inStock: true,
    keywords: ["biri", "black gram", "idli", "dosa", "vada"],
  },
  {
    slug: "roasted-horse-gram",
    name: "Roasted Horse Gram",
    localName: "Kolatha",
    category: "pulses-dals-flours",
    short: "Earthy, protein-rich legume, gently roasted.",
    description:
      "Nutrient-dense legume valued for its rich earthy taste, high protein content, and exceptional dietary iron.",
    image: "/images/products/roasted-horse-gram.webp",
    origin: "Kandhamal, Odisha",
    tint: "#8A5A3A",
    variants: [w("500g", "500 g", 120), w("1kg", "1 kg", 225)],
    inStock: true,
    keywords: ["kolatha", "kulthi", "horse gram", "kollu"],
  },
  {
    slug: "green-gram",
    name: "Green Gram (Whole Moong)",
    category: "pulses-dals-flours",
    short: "Whole green lentils for sprouting and stews.",
    description:
      "Whole green lentils ideal for sprouting, wholesome stews, and high-protein side dishes.",
    image: "/images/products/green-gram.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#6E7F3C",
    variants: [w("500g", "500 g", 73)],
    inStock: true,
    keywords: ["moong", "sprouts", "whole moong"],
  },
  {
    slug: "mix-tadka-dal",
    name: "Mix Tadka Dal",
    category: "pulses-dals-flours",
    short: "A balanced blend of unpolished pulses.",
    description:
      "A curated blend of essential unpolished pulses balanced for flavor, texture, and quick preparation.",
    image: "/images/products/mix-tadka-dal.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C07A3A",
    variants: [w("500g", "500 g", 89)],
    inStock: true,
    keywords: ["mixed dal", "panchmel", "tadka"],
  },
  {
    slug: "besan",
    name: "Besan (Gram Flour)",
    category: "pulses-dals-flours",
    short: "Finely milled from unpolished chana dal.",
    description:
      "Finely milled from unpolished chana dal, providing rich aroma and essential texture for savory batters and sweets.",
    image: "/images/products/besan.webp",
    tint: "#D9B867",
    variants: [w("500g", "500 g", 75), w("1kg", "1 kg", 139)],
    inStock: true,
    keywords: ["gram flour", "chana", "pakoda", "bhaji"],
  },
  {
    slug: "roasted-ragi-powder",
    name: "Roasted Ragi Powder",
    localName: "Mandia",
    category: "pulses-dals-flours",
    short: "Gently roasted finger millet flour.",
    description:
      "Nutritious finger millet flour, gently roasted for a warm nutty aroma. Perfect for porridges, flatbreads, and healthy baking.",
    image: "/images/products/roasted-ragi-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#7A4A3A",
    variants: [w("500g", "500 g", 93), w("1kg", "1 kg", 175)],
    inStock: true,
    keywords: ["mandia", "ragi", "finger millet", "millet", "nachni"],
  },
  {
    slug: "palua",
    name: "Palua",
    localName: "Arrowroot Powder",
    category: "pulses-dals-flours",
    short: "Fine arrowroot starch for Odia sweets and light meals.",
    description:
      "Fine, white arrowroot starch — a much-loved Odia pantry staple for traditional sweets, puddings and light, easy-to-digest preparations.",
    image: "/images/products/palua.webp",
    tint: "#E7E1D2",
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["palua", "arrowroot", "araroot", "starch"],
  },

  {
    slug: "badi",
    name: "Badi",
    localName: "Sun-dried lentil nuggets",
    category: "pulses-dals-flours",
    short: "Sun-dried lentil dumplings for curries and saag.",
    description:
      "Sun-dried lentil dumplings — fry until crisp and add to curries, saag and dalma for crunch and depth, the Odia way.",
    image: "/images/products/badi.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#D8C59A",
    variants: [w("200g", "200 g", 135)],
    inStock: true,
    keywords: ["badi", "bori", "vadi", "wadi", "lentil nuggets"],
  },

  // ——— Spices, Condiments & Cooking Essentials ———
  {
    slug: "kandhamal-turmeric",
    name: "Kandhamal Turmeric",
    localName: "Kandhamal Haladi",
    category: "spices-condiments",
    short: "GI-tagged, high-curcumin turmeric from Kandhamal.",
    description:
      "GI-tagged turmeric from the hills of Kandhamal, Odisha — ground from whole roots for a deep golden hue and strong natural aroma.",
    image: "/images/products/kandhamal-turmeric.webp",
    origin: "Kandhamal, Odisha",
    tint: "#D99A1E",
    badges: ["GI-tagged"],
    variants: [w("100g", "100 g", 49), w("200g", "200 g", 87), w("500g", "500 g", 203)],
    inStock: true,
    featured: true,
    keywords: ["haldi", "haladi", "turmeric", "kandhamal", "gi tag"],
  },
  {
    slug: "chilli-powder",
    name: "Chilli Powder",
    category: "spices-condiments",
    short: "Ground from naturally sun-dried red chillies.",
    description:
      "Bold red chili ground from naturally sun-dried peppers, delivering a fiery heat and rich natural color to gravies.",
    image: "/images/products/chilli-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#B23A22",
    variants: [w("100g", "100 g", 76), w("200g", "200 g", 142), w("500g", "500 g", 340)],
    inStock: true,
    keywords: ["lanka", "mirch", "red chilli"],
  },
  {
    slug: "kashmiri-chilli-powder",
    name: "Kashmiri Chilli Powder",
    category: "spices-condiments",
    short: "Vibrant colour with a mild, pleasant heat.",
    description:
      "Renowned for imparting a vibrant red color to dishes with a mild, pleasant heat profile. Perfect for rich curries.",
    image: "/images/products/kashmiri-chilli-powder.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C4412A",
    variants: [w("50g", "50 g", 70), w("100g", "100 g", 130), w("500g", "500 g", 483)],
    inStock: true,
    keywords: ["kashmiri mirch", "colour"],
  },
  {
    slug: "jeera-powder",
    name: "Jeera Powder",
    category: "spices-condiments",
    short: "Roasted, finely ground cumin.",
    description:
      "Roasted and finely ground cumin seeds providing a warm, earthy, and smoky note essential across cuisines.",
    image: "/images/products/jeera-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#8A6A42",
    variants: [w("50g", "50 g", 50), w("100g", "100 g", 89)],
    inStock: true,
    keywords: ["cumin", "jeera", "bhaja jeera"],
  },
  {
    slug: "curry-powder",
    name: "Curry Powder",
    category: "spices-condiments",
    short: "A versatile, aromatic everyday blend.",
    description:
      "Versatile, aromatic spice blend crafted for balanced curries, stews, marinades, and signature sauces.",
    image: "/images/products/curry-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#B76E2A",
    variants: [w("50g", "50 g", 53), w("100g", "100 g", 93), w("200g", "200 g", 130)],
    inStock: true,
    keywords: ["curry masala"],
  },
  {
    slug: "dry-ginger-powder",
    name: "Dry Ginger Powder",
    localName: "Sunthi",
    category: "spices-condiments",
    short: "Warming ground dry ginger for chai and kadha.",
    description:
      "Sun-dried ginger root ground into a fine, warming powder — for masala chai, kadha, laddoos and winter cooking.",
    image: "/images/products/dry-ginger-powder.webp",
    tint: "#C9A46A",
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["sunthi", "saunth", "sonth", "ginger"],
  },
  {
    slug: "garam-masala",
    name: "Garam Masala",
    category: "spices-condiments",
    short: "Hand-blended, slow-roasted whole spices.",
    description:
      "Signature hand-blended mix of whole fragrant spices, slow-roasted and ground to add warm depth to your cooking.",
    image: "/images/products/garam-masala.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#6E3B24",
    variants: [w("50g", "50 g", 77), w("100g", "100 g", 142)],
    inStock: true,
    keywords: ["masala"],
  },
  {
    slug: "coriander-powder",
    name: "Coriander Powder",
    category: "spices-condiments",
    short: "Freshly ground with a light, citrusy body.",
    description:
      "Freshly ground from aromatic coriander seeds, providing a light, citrusy body to curries and broths.",
    image: "/images/products/coriander-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#9C8A4E",
    variants: [w("50g", "50 g", 31), w("100g", "100 g", 52)],
    inStock: true,
    keywords: ["dhania", "dhaniya"],
  },
  {
    slug: "black-pepper-powder",
    name: "Black Pepper Powder",
    category: "spices-condiments",
    short: "Coarsely ground for a sharp, fresh bite.",
    description:
      "Coarsely ground black peppercorns offering sharp, fresh bite and fragrant essential oils for finishing.",
    image: "/images/products/black-pepper-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#3A322C",
    variants: [w("50g", "50 g", 87)],
    inStock: true,
    keywords: ["golmirch", "pepper", "kali mirch"],
  },
  {
    slug: "panch-phoron",
    name: "Panch Phoron",
    category: "spices-condiments",
    short: "The classic five-spice tempering blend.",
    description:
      "The classic regional 5-spice mix (mustard, cumin, fennel, nigella, fenugreek) essential for authentic tempering.",
    image: "/images/products/panch-phoron.webp",
    origin: "Kandhamal, Odisha",
    tint: "#7C6A3A",
    variants: [w("50g", "50 g", 40), w("100g", "100 g", 67)],
    inStock: true,
    keywords: ["pancha phutana", "panch phoran", "tempering"],
  },
  {
    slug: "chicken-masala",
    name: "Chicken Masala",
    category: "spices-condiments",
    short: "Classic aroma and deep colour for poultry.",
    description:
      "Balanced spice formulation providing classic rich aroma, deep color, and authentic taste to poultry dishes.",
    image: "/images/products/chicken-masala.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#9A4A26",
    variants: [w("50g", "50 g", 55), w("100g", "100 g", 100)],
    inStock: true,
  },
  {
    slug: "meat-masala",
    name: "Meat Masala",
    category: "spices-condiments",
    short: "Robust blend for rich gravies and roasts.",
    description:
      "Robust, deeply aromatic spice blend formulated for rich, savory gravies and roasts.",
    image: "/images/products/meat-masala.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#7A3420",
    variants: [w("50g", "50 g", 55), w("100g", "100 g", 100)],
    inStock: true,
    keywords: ["mutton masala"],
  },
  {
    slug: "tamarind-paste",
    name: "Tamarind Paste",
    localName: "Imli Paste",
    category: "spices-condiments",
    short: "Concentrated pure tamarind pulp.",
    description:
      "Concentrated, pure tamarind pulp free from artificial preservatives — delivering authentic tangy notes, natural acidity, and deep flavor to soups, glazes, gravies, and marinades.",
    image: "/images/products/tamarind-paste.webp",
    origin: "Kandhamal, Odisha",
    tint: "#5A2E1E",
    variants: [w("200g", "200 g", 105)],
    inStock: true,
    keywords: ["imli", "tentuli", "tamarind"],
  },

  {
    slug: "whole-jeera",
    name: "Whole Jeera",
    localName: "Cumin Seeds",
    category: "spices-condiments",
    short: "Whole cumin seeds for tempering and roasting.",
    description:
      "Whole cumin seeds for tempering dals and curries, or dry-roasting and grinding fresh.",
    image: "/images/products/whole-jeera.webp",
    origin: "Kandhamal, Odisha",
    tint: "#8A6A42",
    variants: [w("50g", "50 g", 48), w("100g", "100 g", 84)],
    inStock: true,
    keywords: ["jeera", "cumin", "whole spices"],
  },
  {
    slug: "sambar-masala",
    name: "Sambar Masala",
    category: "spices-condiments",
    short: "Spice blend for sambar and rasam.",
    description:
      "An aromatic spice blend for South Indian sambar, rasam and vegetable curries.",
    image: "/images/products/sambar-masala.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#B0582A",
    variants: [w("50g", "50 g", 48), w("100g", "100 g", 85)],
    inStock: true,
    keywords: ["sambar", "sambhar", "rasam", "masala"],
  },
  {
    slug: "dalchini-powder",
    name: "Dalchini Powder",
    localName: "Cinnamon Powder",
    category: "spices-condiments",
    short: "Ground cinnamon for chai, sweets and curries.",
    description:
      "Finely ground cinnamon for chai, desserts, baking and warming curries.",
    origin: "Mayurbhanj, Odisha",
    tint: "#8A4A2A",
    variants: [w("50g", "50 g", 57)],
    inStock: true,
    keywords: ["dalchini", "cinnamon", "spice powder"],
  },
  {
    slug: "ajwain-dhaniya-mix",
    name: "Ajwain Dhaniya Mix",
    localName: "Mouth Freshener",
    category: "spices-condiments",
    short: "Traditional after-meal mouth freshener.",
    description:
      "A traditional after-meal mouth freshener of roasted ajwain (carom seeds), dhaniya (coriander seeds) and fennel.",
    image: "/images/products/ajwain-dhaniya-mix.webp",
    madeByUs: true,
    tint: "#9A8A5A",
    variants: [w("100g", "100 g", 67)],
    inStock: true,
    keywords: ["ajwain", "ajwin", "dhaniya", "carom", "coriander seeds"],
  },
  {
    slug: "lemon-chilli-pickle",
    name: "Lemon Chilli Mix Pickle",
    category: "spices-condiments",
    short: "Tangy lemon and green chilli pickle.",
    description:
      "A tangy, spicy pickle of lemon and green chilli — the perfect side for dal-rice and parathas.",
    madeByUs: true,
    tint: "#C9A12A",
    variants: [w("pack", "1 pack", 110)],
    inStock: true,
    keywords: ["pickle", "achar", "lemon", "chilli", "condiment"],
  },

  // ——— Cold-Pressed Oils & Ghee ———
  {
    slug: "a2-desi-cow-ghee",
    name: "A2 Desi Cow Ghee",
    category: "oils-ghee",
    short: "Hand-churned by the bilona method.",
    description:
      "Hand-churned using the traditional Bilona method from pure A2 cow milk. Rich grainy texture, golden color, and unforgettable aroma.",
    image: "/images/products/a2-desi-cow-ghee.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#E0A92E",
    badges: ["Bilona method"],
    variants: [w("200g", "200 g", 370)],
    inStock: true,
    featured: true,
    keywords: ["ghee", "ghia", "bilona", "a2"],
  },
  {
    slug: "wood-pressed-mustard-oil",
    name: "Wood Cold-Pressed Mustard Oil",
    localName: "Ghana Tela",
    category: "oils-ghee",
    short: "Kachi ghani oil with its natural pungent kick.",
    description:
      "Kachi Ghani oil extracted at low temperatures in a wooden press to keep its natural pungent kick and rich natural hue intact.",
    image: "/images/products/wood-pressed-mustard-oil.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C99A1E",
    badges: ["Wood-pressed"],
    variants: [w("500ml", "500 ml", 160), w("1l", "1 L", 310)],
    inStock: true,
    featured: true,
    keywords: ["sorisa tela", "sarson", "mustard oil", "kachi ghani", "cold pressed"],
  },
  {
    slug: "wood-pressed-groundnut-oil",
    name: "Wood Cold-Pressed Peanut Oil",
    localName: "Groundnut Oil",
    category: "oils-ghee",
    short: "Pressed without chemical refining.",
    description:
      "Wood cold-pressed without chemical refining. High smoke point with a subtle nutty aroma, ideal for deep-frying and sautéing.",
    image: "/images/products/wood-pressed-groundnut-oil.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#D8B24A",
    badges: ["Wood-pressed"],
    variants: [w("1l", "1 L", 300)],
    inStock: true,
    keywords: ["badam tela", "groundnut", "peanut", "moongphali", "cold pressed"],
  },
  {
    slug: "handmade-coconut-oil",
    name: "Handmade Coconut Oil",
    category: "oils-ghee",
    short: "Small-batch coconut oil for cooking, hair and skin.",
    description:
      "Small-batch coconut oil made by hand — clear, mild and fragrant for cooking, as well as traditional hair and skin care.",
    image: "/images/products/handmade-coconut-oil.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#E9E2C8",
    badges: ["Handmade"],
    variants: [w("200ml", "200 ml", 170), w("250ml", "250 ml", 210), w("500ml", "500 ml", 410)],
    inStock: true,
    keywords: ["nadia tela", "coconut", "nariyal"],
  },

  // ——— Natural Sweeteners, Beverages & Snacks ———
  {
    slug: "wild-honey",
    name: "Wild Honey",
    category: "sweeteners-beverages-snacks",
    short: "Raw forest honey with natural pollen and enzymes.",
    description:
      "Raw, unprocessed honey retaining natural live enzymes, pollen, and floral aromas. Sourced directly from forest apiaries.",
    image: "/images/products/wild-honey.webp",
    origin: "Similipal forest, Mayurbhanj, Odisha",
    tint: "#B8741E",
    badges: ["Raw"],
    variants: [w("200g", "200 g", 175), w("500g", "500 g", 402)],
    inStock: true,
    featured: true,
    keywords: ["mahu", "honey", "forest honey", "shahad"],
  },
  {
    slug: "farm-honey",
    name: "Farm Honey",
    category: "sweeteners-beverages-snacks",
    short: "Raw honey from farm apiaries.",
    description:
      "Raw, unprocessed honey retaining natural live enzymes, pollen, and floral aromas. Sourced directly from farm apiaries.",
    image: "/images/products/farm-honey.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#D49A2A",
    badges: ["Raw"],
    variants: [w("200g", "200 g", 115), w("500g", "500 g", 215)],
    inStock: true,
    keywords: ["mahu", "honey", "shahad"],
  },
  {
    slug: "jaggery",
    name: "Jaggery",
    localName: "Gur",
    category: "sweeteners-beverages-snacks",
    short: "Unrefined sugarcane jaggery.",
    description:
      "Unrefined, chemical-free sugarcane jaggery with its natural minerals. An excellent natural alternative to refined sugar.",
    image: "/images/products/jaggery.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#8A4A1E",
    variants: [w("500g", "500 g", 60), w("1kg", "1 kg", 110)],
    inStock: true,
    keywords: ["guda", "gur", "gud", "sweetener"],
  },

  {
    slug: "mixture",
    name: "Mixture",
    localName: "Namkeen",
    category: "sweeteners-beverages-snacks",
    short: "Crunchy, savoury tea-time mixture.",
    description:
      "A crunchy, savoury namkeen mixture — made for tea-time and travel.",
    image: "/images/products/mixture.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C98A3A",
    variants: [w("500g", "500 g", 85), w("1kg", "1 kg", 160)],
    inStock: true,
    keywords: ["mixture", "namkeen", "snacks"],
  },
  {
    slug: "chuda-bhaja-mixture",
    name: "Chuda Bhaja Mixture",
    category: "sweeteners-beverages-snacks",
    short: "Crisp fried flattened rice with a savoury mix.",
    description:
      "Crisp fried chuda (flattened rice) in a savoury mix — a classic Odia tea-time snack.",
    image: "/images/products/chuda-bhaja-mixture.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#D9B060",
    variants: [w("pack", "1 pack", 75)],
    inStock: true,
    keywords: ["chuda bhaja", "poha mixture", "snacks", "namkeen"],
  },
  {
    slug: "chaula-bhaja",
    name: "Chaula Bhaja",
    category: "sweeteners-beverages-snacks",
    short: "Roasted rice snack, light and crunchy.",
    description:
      "Roasted rice — light, crunchy and lightly seasoned, for snacking with tea.",
    image: "/images/products/chaula-bhaja.webp",
    tint: "#D8C08A",
    variants: [w("pack", "1 pack", 115)],
    inStock: true,
    keywords: ["chaula bhaja", "roasted rice", "snacks"],
  },
  {
    slug: "badam-ladoo",
    name: "Badam Ladoo",
    category: "sweeteners-beverages-snacks",
    short: "Roasted peanuts bound with jaggery.",
    description:
      "Crunchy ladoos of roasted peanuts (china badam) bound in jaggery — a traditional Odia sweet for tea-time, festivals and gifting.",
    image: "/images/products/badam-ladoo.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C99A5A",
    variants: [w("box", "1 box", 115)],
    inStock: true,
    keywords: ["ladoo", "laddu", "badam", "almond", "sweets"],
  },

  {
    slug: "ragi-biscuits",
    name: "Ragi Biscuits",
    category: "sweeteners-beverages-snacks",
    short: "Crisp, oven-baked finger millet cookies.",
    description:
      "Crisp, oven-baked cookies made from finger millet (mandia) and wholesome ingredients — ideal with your evening tea.",
    image: "/images/products/ragi-biscuits.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#7A4A32",
    variants: [w("pack", "1 pack", 89)],
    inStock: true,
    keywords: ["mandia biscuit", "ragi", "millet cookies", "biscuits", "snacks"],
  },
  {
    slug: "salty-stick-biscuits",
    name: "Salty Stick Biscuits",
    category: "sweeteners-beverages-snacks",
    short: "Crisp, salted stick biscuits.",
    description:
      "Crisp, salted stick biscuits — an easy companion to tea and coffee.",
    image: "/images/products/salty-stick-biscuits.webp",
    tint: "#D8B880",
    variants: [w("pack", "1 pack", 89)],
    inStock: true,
    keywords: ["biscuits", "salty", "sticks", "snacks"],
  },

  // ——— Fresh Produce & Wellness ———
  {
    slug: "gourmet-mushrooms",
    name: "Gourmet Mushrooms",
    category: "fresh-produce-wellness",
    short: "Button, oyster, milky and shiitake varieties.",
    description:
      "Carefully cultivated gourmet mushroom varieties (Button, Oyster, Milky, Shiitake) grown under controlled conditions for peak firmness and earthy flavor.",
    image: "/images/products/mushroom.jpg",
    tint: "#CDBFA6",
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["chhatu", "mushroom", "oyster", "shiitake"],
  },
  {
    slug: "amla-powder",
    name: "Amla Powder",
    category: "fresh-produce-wellness",
    short: "Dried Indian gooseberry powder.",
    description:
      "Vitamin C-rich dried Indian gooseberry powder, ideal for detox drinks, wellness teas, and herbal preparations.",
    image: "/images/products/amla-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#8A9A4A",
    variants: [w("50g", "50 g", 65)],
    inStock: true,
    keywords: ["amla", "anla", "gooseberry"],
  },
  {
    slug: "triphala-powder",
    name: "Triphala Powder",
    category: "fresh-produce-wellness",
    short: "Classic blend of amla, haritaki and bibhitaki.",
    description:
      "Classic Ayurvedic blend of three fruits (Amla, Haritaki, Bibhitaki) for wellness preparations.",
    image: "/images/products/triphala-powder.webp",
    origin: "Kandhamal, Odisha",
    tint: "#7A6A3A",
    variants: [w("50g", "50 g", 52), w("100g", "100 g", 94)],
    inStock: true,
    keywords: ["trifala", "triphala", "ayurveda"],
  },

  // ——— Handmade & Odisha Heritage ———
  {
    slug: "jagannath-pattachitra-handi",
    name: "Jagannath Pattachitra Handi",
    category: "handmade-heritage",
    kind: "craft",
    short: "Round clay handi hand-painted with Lord Jagannath.",
    description:
      "A round clay handi hand-painted in Odisha's Pattachitra style — Lord Jagannath's face framed by lotus petals and marigolds in bold red, blue and yellow. Use it as a planter, a puja pot or a statement piece. Painted by hand, so every piece varies slightly.",
    image: "/images/products/pattachitra-jagannath-handi.webp",
    tint: "#A3341C",
    badges: ["Hand-painted"],
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["pattachitra", "patachitra", "jagannath", "handi", "pot", "painted pot", "puja", "decor"],
  },
  {
    slug: "jagannath-pattachitra-kalasa",
    name: "Jagannath Pattachitra Kalasa",
    category: "handmade-heritage",
    kind: "craft",
    short: "Tall kalasa pot with Lord Jagannath and painted borders.",
    description:
      "A tall kalasa-shaped clay pot hand-painted in Pattachitra style, with Lord Jagannath at its heart and bands of traditional borders rising to the rim. A festive centrepiece for puja rooms, entrances and celebrations. Painted by hand, so every piece varies slightly.",
    image: "/images/products/pattachitra-jagannath-kalasa.webp",
    tint: "#2F7A3A",
    badges: ["Hand-painted"],
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["pattachitra", "patachitra", "jagannath", "kalasa", "kalash", "pot", "painted pot", "puja", "decor"],
  },
  {
    slug: "tribal-folk-art-planter",
    name: "Tribal Folk-Art Planter",
    category: "handmade-heritage",
    kind: "craft",
    short: "Bucket planter painted with dancing figures and village life.",
    description:
      "A bucket-shaped planter with handles, hand-painted in a tribal folk-art style — rows of dancing figures, hunters and scenes of village life in fine black linework with bright colour. Lovely with indoor plants or as a decor piece. Painted by hand, so every piece varies slightly.",
    image: "/images/products/pattachitra-folk-art-bucket.webp",
    tint: "#E9E2D2",
    badges: ["Hand-painted"],
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["tribal art", "folk art", "saura", "warli", "planter", "bucket", "painted pot", "decor"],
  },
  {
    slug: "sambalpuri-saree",
    name: "Sambalpuri Saree",
    category: "handmade-heritage",
    kind: "craft",
    short: "Handwoven bandha (ikat) saree from western Odisha.",
    description:
      "Handwoven Sambalpuri saree in the traditional bandha (tie-dye ikat) technique, where the yarn is dyed before weaving. Colours and patterns vary by piece — message us to see what's in store.",
    image: "/images/products/sambalpuri-saree.webp",
    tint: "#7A1E2A",
    badges: ["Handwoven"],
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["saree", "sari", "sambalpuri", "ikat", "bandha", "handloom"],
  },
  {
    slug: "jhuna-dhoop",
    name: "Jhuna Dhoop",
    category: "handmade-heritage",
    kind: "craft",
    short: "Natural sal resin for puja and dhoop.",
    description:
      "Jhuna is the natural resin of the sal tree, traditionally burnt as dhoop in Odia homes and temples for its warm, smoky fragrance.",
    image: "/images/products/jhuna-dhoop.webp",
    origin: "Mayurbhanj, Odisha",
    tint: "#C9A36A",
    variants: [w("100g", "100 g", 70)],
    inStock: true,
    keywords: ["jhuna", "dhoop", "dhuna", "sal resin", "puja"],
  },
  {
    slug: "sal-leaf-plates",
    name: "Sal Leaf Plates",
    localName: "Khali",
    category: "handmade-heritage",
    kind: "craft",
    short: "Handmade, compostable plates from sal leaves.",
    description:
      "Plates hand-stitched from sal leaves — a traditional, compostable way to serve food at festivals, feasts and everyday meals.",
    image: "/images/products/sal-leaf-plates.webp",
    tint: "#6E7A3A",
    badges: ["Handmade"],
    variants: [w("ask", "Price on request", 0)],
    inStock: true,
    enquire: "price",
    keywords: ["khali", "sal leaf", "patra", "pattal", "plates", "eco"],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (slug: CategorySlug) => products.filter((p) => p.category === slug);
export const featuredProducts = () => products.filter((p) => p.featured);

// WhatsApp text and button copy for products without a fixed online price.
export function enquiryCopy(p: Product) {
  return p.enquire === "harvest"
    ? { note: "Harvested to order — price and availability change daily.", button: "Ask for today's harvest", message: `Hello HonestHands, I'd like to know today's availability and price for ${p.name}.` }
    : { note: "Price on request — message us for the current price and availability.", button: "Ask for price", message: `Hello HonestHands, could you share the price and availability of ${p.name}?` };
}

export function originLabel(p: Product) {
  if (p.madeByUs) return "Made by HonestHands, Bhubaneswar";
  return p.origin ? `Sourced from ${p.origin}` : undefined;
}

export const fromPrice = (p: Product) => (p.enquire ? Infinity : Math.min(...p.variants.map((v) => v.price)));

export function relatedProducts(p: Product, n = 4) {
  return products.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, n);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.localName, p.short, p.origin, ...(p.keywords ?? [])]
      .filter(Boolean)
      .some((s) => s!.toLowerCase().includes(q)),
  );
}
