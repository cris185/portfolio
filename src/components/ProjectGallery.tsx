"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectGallery({
  screenshots,
  alt,
  accentText,
  pillBorder,
  isDark,
}: {
  screenshots: { label: string; src: string }[];
  alt: string;
  accentText: string;
  pillBorder: string;
  isDark: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 8" }}>
        <Image
          key={screenshots[active].src}
          src={screenshots[active].src}
          alt={`${alt} — ${screenshots[active].label}`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 900px) 100vw, 900px"
        />
      </div>

      {screenshots.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {screenshots.map((shot, i) => (
            <button
              key={shot.label}
              type="button"
              onClick={() => setActive(i)}
              className="rounded font-mono text-[11px] transition-colors"
              style={{
                padding: "6px 12px",
                color: active === i ? (isDark ? "#0a0a0c" : "#ffffff") : accentText,
                background: active === i ? accentText : "transparent",
                border: `1px solid ${active === i ? accentText : pillBorder}`,
              }}
            >
              {shot.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}