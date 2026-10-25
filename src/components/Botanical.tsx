// Hand-drawn line art. The default "branch" is HonestHands' hanging flower
// drawing, used as a mask so it takes the text colour (rust on cream, cream on rust).
// `tilt` swings the branch so it grows out of a top-right corner and reaches left.
type Props = { className?: string; variant?: "branch" | "wheat" | "marigold"; tilt?: boolean };

export function Botanical({ className, variant = "branch", tilt }: Props) {
  if (variant === "wheat") {
    return (
      <svg viewBox="0 0 60 200" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M30 198 C30 140 31 90 30 20" />
        {Array.from({ length: 8 }).map((_, i) => {
          const y = 30 + i * 18;
          return (
            <g key={i}>
              <path d={`M30 ${y + 10} C22 ${y + 6} 18 ${y - 2} 19 ${y - 10} C26 ${y - 6} 30 ${y} 30 ${y + 10}`} />
              <path d={`M30 ${y + 10} C38 ${y + 6} 42 ${y - 2} 41 ${y - 10} C34 ${y - 6} 30 ${y} 30 ${y + 10}`} />
            </g>
          );
        })}
        <path d="M30 20 C28 12 29 6 30 2 C31 6 32 12 30 20" />
      </svg>
    );
  }
  if (variant === "marigold") {
    return (
      <svg viewBox="0 0 100 100" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.1">
        {Array.from({ length: 14 }).map((_, i) => (
          <ellipse key={i} cx="50" cy="28" rx="7" ry="20" transform={`rotate(${(360 / 14) * i} 50 50)`} />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <ellipse key={`i${i}`} cx="50" cy="38" rx="5" ry="11" transform={`rotate(${36 * i + 18} 50 50)`} />
        ))}
        <circle cx="50" cy="50" r="6" />
      </svg>
    );
  }
  return (
    <span
      aria-hidden
      className={`block bg-current ${className ?? ""}`}
      style={{
        WebkitMaskImage: "url(/images/brand/flower-branch.webp)",
        maskImage: "url(/images/brand/flower-branch.webp)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "top center",
        maskPosition: "top center",
        ...(tilt ? { transformOrigin: "top center", transform: "rotate(62deg)" } : {}),
      }}
    />
  );
}
