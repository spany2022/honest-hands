const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export const rupees = (n: number) => inr.format(n);

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
