# HonestHands — website

Next.js 16 + Tailwind CSS 4 storefront for HonestHands Private Limited, Bhubaneswar.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Where things live

| What | File |
| --- | --- |
| Business details (phone, WhatsApp, address, FSSAI, GSTIN, social links) | `src/lib/site.ts` |
| Products, pack sizes, prices, stock | `src/lib/products.ts` |
| Honest Kappi café menu | `src/lib/cafe.ts` |
| Recipes | `src/lib/recipes.ts` |
| Curated collections (Odisha Heritage) | `src/lib/collections.ts` |
| Brand colours and fonts | `src/app/globals.css` (`@theme`) |
| Product photos | `public/images/products/<slug>.jpg` |

## Before launch

1. **Prices** come from the client's price sheet (Oct 2026). Products not on the sheet are marked `enquire: "price"` in `products.ts` and show an "Ask for price" WhatsApp button; give them `variants` with real prices and remove the `enquire` line to sell them online.
2. **Photos.** Most product photos were taken from the catalogue PDF and look like web stock images — replace them with your own photography. Products without a photo show an illustrated HonestHands pouch: Koraput Kala Jeera Rice, Palua, Dry Ginger (Sunthi), Handmade Coconut Oil, Jaggery, Pattachitra, Sambalpuri Saree, Jhuna Dhoop, Sal Leaf Plates. Add `image: "/images/products/<slug>.jpg"` to show a photo.
3. **Orders** are sent to WhatsApp (`site.whatsapp`) — confirm that number has WhatsApp.
4. **Newsletter:** set `NEWSLETTER_WEBHOOK_URL` to your email tool's webhook. Until then the form politely says the newsletter isn't open yet.
5. Set `NEXT_PUBLIC_SITE_URL` to the real domain, and add Instagram/Facebook links in `site.ts`.
6. Review the Help, Privacy and Terms pages.
