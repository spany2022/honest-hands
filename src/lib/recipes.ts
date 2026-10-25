// Kitchen inspiration written for the site. Times are typical home-cooking
// estimates, not lab-tested figures.
export type Recipe = {
  slug: string;
  title: string;
  intro: string;
  image: string;
  time: string;
  serves: string;
  ingredients: { text: string; product?: string }[];
  steps: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "dry-fruits-chatua-drink",
    title: "Morning Chatua Sharbat",
    intro: "A cooling Odia breakfast drink — chatua whisked with water, jaggery and a squeeze of lemon.",
    image: "/images/mood/dry-fruits-chatua-loose.jpg",
    time: "5 min",
    serves: "2",
    ingredients: [
      { text: "4 tbsp Premium Dry Fruits Chatua", product: "dry-fruits-chatua" },
      { text: "2 tbsp grated jaggery, or to taste", product: "jaggery" },
      { text: "2 glasses cold water" },
      { text: "Juice of half a lemon" },
      { text: "A pinch of roasted jeera powder", product: "jeera-powder" },
    ],
    steps: [
      "Whisk the chatua into a little water to make a smooth, lump-free paste.",
      "Add the rest of the water and the jaggery, and stir until it dissolves.",
      "Finish with lemon juice and a pinch of jeera powder. Serve chilled.",
    ],
  },
  {
    slug: "kolatha-dal",
    title: "Village-Style Kolatha Dal",
    intro: "Earthy horse gram slow-cooked with garlic and tempered in mustard oil — a winter favourite across Odisha.",
    image: "/images/mood/roasted-horse-gram-loose.jpg",
    time: "45 min (plus soaking)",
    serves: "4",
    ingredients: [
      { text: "1 cup Roasted Horse Gram (Kolatha), soaked overnight", product: "roasted-horse-gram" },
      { text: "½ tsp Kandhamal turmeric", product: "kandhamal-turmeric" },
      { text: "1 tbsp wood cold-pressed mustard oil", product: "wood-pressed-mustard-oil" },
      { text: "1 tsp panch phoron", product: "panch-phoron" },
      { text: "6 cloves garlic, crushed; 2 dried red chillies" },
      { text: "Salt to taste" },
    ],
    steps: [
      "Pressure-cook the soaked kolatha with turmeric, salt and 3 cups of water until soft (5–6 whistles).",
      "Heat mustard oil until it just smokes, then lower the heat.",
      "Add panch phoron, garlic and dried chillies; let them crackle and turn golden.",
      "Pour the tempering over the dal, simmer for 5 minutes and serve with rice.",
    ],
  },
  {
    slug: "soft-chakki-atta-rotis",
    title: "Soft Chakki Atta Rotis with Ghee",
    intro: "Stone-ground atta makes rotis that stay soft — brushed with bilona ghee straight off the tawa.",
    image: "/images/mood/chakki-atta-loose.jpg",
    time: "30 min",
    serves: "4 (12 rotis)",
    ingredients: [
      { text: "2 cups Chakki Atta", product: "chakki-atta" },
      { text: "About ¾ cup warm water" },
      { text: "A pinch of salt" },
      { text: "A2 Desi Cow Ghee, to brush", product: "a2-desi-cow-ghee" },
    ],
    steps: [
      "Mix atta and salt, then add warm water a little at a time and knead to a soft dough.",
      "Cover and rest for 15–20 minutes.",
      "Divide into balls, roll thin and cook on a hot tawa, flipping once bubbles appear.",
      "Puff over an open flame and brush with ghee while hot.",
    ],
  },
  {
    slug: "ragi-porridge",
    title: "Roasted Ragi Porridge",
    intro: "A warm, nutty mandia porridge sweetened with jaggery — ready in ten minutes.",
    image: "/images/mood/roasted-ragi-powder-loose.jpg",
    time: "10 min",
    serves: "2",
    ingredients: [
      { text: "3 tbsp Roasted Ragi Powder", product: "roasted-ragi-powder" },
      { text: "1½ cups milk or water" },
      { text: "1–2 tbsp jaggery", product: "jaggery" },
      { text: "A pinch of dry ginger powder (sunthi)", product: "dry-ginger-powder" },
    ],
    steps: [
      "Whisk ragi powder into ½ cup of cold milk or water until smooth.",
      "Bring the remaining liquid to a simmer and stir in the ragi mixture.",
      "Cook on low heat, stirring, for 5–6 minutes until it thickens.",
      "Stir in jaggery and a pinch of sunthi. Serve warm.",
    ],
  },
  {
    slug: "south-indian-filter-coffee",
    title: "Filter Coffee at Home",
    intro: "The Honest Kappi way — a slow decoction, frothy hot milk, and a little patience.",
    image: "/images/products/coffee.jpg",
    time: "20 min",
    serves: "2",
    ingredients: [
      { text: "3 tbsp filter coffee powder" },
      { text: "½ cup boiling water" },
      { text: "1½ cups hot milk" },
      { text: "Sugar or jaggery, to taste", product: "jaggery" },
    ],
    steps: [
      "Add the coffee to the upper chamber of a filter and press it lightly.",
      "Pour boiling water over it, cover, and let the decoction drip for 15 minutes.",
      "Mix 2–3 tbsp decoction with hot milk and sweetener.",
      "Pour between tumbler and dabarah from a height to froth, and serve.",
    ],
  },
];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);
