import Image from "next/image";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/format";

type Props = {
  product: Product;
  // Overrides the product photo, e.g. with the selected design's photo.
  image?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

// Product photo, or — until a photograph is supplied — an illustration of the
// brand's real packaging: a clear pouch showing the contents, with the logo label.
export function ProductVisual({ product, image, sizes = "(min-width: 1024px) 25vw, 50vw", priority, className, imgClassName }: Props) {
  const src = image ?? product.image;
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-beige", className)}>
        <Image
          key={src}
          src={src}
          alt={`${product.name}${product.localName ? ` (${product.localName})` : ""}`}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover [animation:fade-in_.5s_ease]", imgClassName)}
        />
      </div>
    );
  }
  return product.kind === "craft" ? (
    <CraftArt product={product} className={className} />
  ) : (
    <PouchArt product={product} className={className} imgClassName={imgClassName} />
  );
}

function PouchArt({ product, className, imgClassName }: { product: Product; className?: string; imgClassName?: string }) {
  return (
    <div
      role="img"
      aria-label={`${product.name} in a HonestHands pouch (illustration)`}
      className={cn("@container relative overflow-hidden", className)}
      style={{ background: `radial-gradient(120% 90% at 30% 10%, #fffaf0 0%, #efe4cd 60%, #e2d3b4 100%)` }}
    >
      <div className={cn("absolute inset-0 flex items-center justify-center", imgClassName)}>
        <svg viewBox="0 0 200 240" className="h-[78%] w-auto drop-shadow-[0_18px_22px_rgba(59,33,20,0.25)]" aria-hidden>
          <defs>
            <linearGradient id={`g-${product.slug}`} x1="0" x2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".55" />
              <stop offset=".18" stopColor="#fff" stopOpacity=".05" />
              <stop offset=".85" stopColor="#fff" stopOpacity=".0" />
              <stop offset="1" stopColor="#fff" stopOpacity=".35" />
            </linearGradient>
            <pattern id={`d-${product.slug}`} width="7" height="7" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.3" fill="#000" opacity=".12" />
              <circle cx="5.5" cy="5" r="1" fill="#fff" opacity=".18" />
            </pattern>
          </defs>
          {/* pouch body */}
          <path d="M28 18 Q100 10 172 18 L178 222 Q100 232 22 222 Z" fill="#f4efe6" opacity=".9" />
          {/* contents */}
          <path d="M26 92 Q100 80 175 92 L178 222 Q100 232 22 222 Z" fill={product.tint} />
          <path d="M26 92 Q100 80 175 92 L178 222 Q100 232 22 222 Z" fill={`url(#d-${product.slug})`} />
          <path d="M28 18 Q100 10 172 18 L178 222 Q100 232 22 222 Z" fill={`url(#g-${product.slug})`} stroke="#d9cdb6" />
          {/* zip */}
          <path d="M32 34 Q100 27 168 34" stroke="#cfc2a8" strokeWidth="3" fill="none" />
          {/* label */}
          <rect x="50" y="78" width="100" height="112" rx="6" fill="#fffdf7" stroke="#e7dcc7" />
          <text x="100" y="164" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fontWeight="700" fill="#95441c">
            {shorten(product.name)}
          </text>
          {product.localName && (
            <text x="100" y="178" textAnchor="middle" fontFamily="Georgia, serif" fontSize="8" fontStyle="italic" fill="#6c5e53">
              {shorten(product.localName)}
            </text>
          )}
        </svg>
        <Image
          src="/images/brand/logo.png"
          alt=""
          width={120}
          height={120}
          className="absolute left-1/2 top-1/2 h-auto w-[19%] -translate-x-1/2 -translate-y-[62%]"
        />
      </div>
      <span className="absolute bottom-3 right-3 hidden rounded-full bg-ivory/80 px-2 py-0.5 text-[10px] font-medium text-muted @[10rem]:block">
        Illustration
      </span>
    </div>
  );
}

function CraftArt({ product, className }: { product: Product; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${product.name} (illustration)`}
      className={cn("@container relative overflow-hidden", className)}
      style={{ background: product.tint }}
    >
      <svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id={`c-${product.slug}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 2 L18 10 L10 18 L2 10 Z" fill="none" stroke="#f7f4e4" strokeOpacity=".35" />
            <circle cx="10" cy="10" r="2" fill="#d9a23b" fillOpacity=".7" />
          </pattern>
        </defs>
        <rect width="200" height="240" fill={`url(#c-${product.slug})`} />
        <rect x="18" y="18" width="164" height="204" fill={product.tint} stroke="#d9a23b" strokeWidth="2" />
        <rect x="26" y="26" width="148" height="188" fill="none" stroke="#f7f4e4" strokeOpacity=".7" strokeDasharray="2 4" />
        {/* lotus motif */}
        <g transform="translate(100 112)" fill="none" stroke="#f7f4e4" strokeWidth="1.4">
          {[-60, -30, 0, 30, 60].map((r) => (
            <path key={r} d="M0 0 C-10 -18 -8 -38 0 -50 C8 -38 10 -18 0 0" transform={`rotate(${r})`} />
          ))}
          <path d="M-46 8 C-20 20 20 20 46 8" />
          <path d="M-36 18 C-14 28 14 28 36 18" stroke="#d9a23b" />
        </g>
        <text x="100" y="184" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#f7f4e4">
          {shorten(product.name)}
        </text>
      </svg>
      <span className="absolute bottom-3 right-3 hidden rounded-full bg-ivory/80 px-2 py-0.5 text-[10px] font-medium text-muted @[10rem]:block">
        Illustration
      </span>
    </div>
  );
}

function shorten(s: string) {
  return s.length > 20 ? s.split(" ").slice(0, 2).join(" ") : s;
}
