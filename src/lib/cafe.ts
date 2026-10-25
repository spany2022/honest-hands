// Honest Kappi menu — items and prices from the café's printed menu card.
export type CafeItem = {
  name: string;
  price: number;
  note: string;
  icon: "cup" | "pot" | "lemon";
};

export const cafeMenu: CafeItem[] = [
  { name: "Filter Coffee", price: 30, note: "Decoction brewed in a brass filter, finished with hot milk.", icon: "cup" },
  { name: "Black Coffee", price: 30, note: "Our ground coffee, brewed strong and served without milk.", icon: "cup" },
  { name: "Green Tea", price: 30, note: "Light, grassy and gently brewed.", icon: "pot" },
  { name: "Lemon Tea", price: 20, note: "Bright, tangy and refreshing.", icon: "lemon" },
];
