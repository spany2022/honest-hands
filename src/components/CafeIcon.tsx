import type { CafeItem } from "@/lib/cafe";

// Line icons in the style of the Honest Kappi menu card, with a little steam.
export function CafeIcon({ name, className }: { name: CafeItem["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {name !== "lemon" && (
        <g>
          <path d="M16 6c-1.5 1.5 1.5 3 0 4.5" className="[animation:steam_2.6s_ease-in-out_infinite]" />
          <path d="M21 5c-1.5 1.5 1.5 3 0 4.5" className="[animation:steam_2.6s_ease-in-out_.8s_infinite]" />
        </g>
      )}
      {name === "cup" && (
        <>
          <path d="M8 15h22v6a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9v-6Z" />
          <path d="M30 17h2.5a3 3 0 0 1 0 6H30" />
          <path d="M5 33h28" />
        </>
      )}
      {name === "pot" && (
        <>
          <path d="M9 18c0-3 4.5-5 10-5s10 2 10 5v6a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8v-6Z" />
          <path d="M29 19l4-3v4l-4 3" />
          <path d="M9 20c-3 0-4 2-3 4s3 2 3 2" />
          <path d="M17 13v-1.5h4V13" />
        </>
      )}
      {name === "lemon" && (
        <>
          <path d="M5 18h30a15 15 0 0 1-30 0Z" />
          <path d="M9 18a11 11 0 0 0 22 0" opacity=".6" />
          <path d="M20 18l-7 7M20 18v10M20 18l7 7" opacity=".6" />
        </>
      )}
    </svg>
  );
}
