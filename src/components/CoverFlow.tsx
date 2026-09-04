"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ImageIcon, Lock } from "lucide-react";
import { useCoverTransition } from "@/components/TransitionProvider";

const SPACING = 350;

/** True only for an actual page reload (F5) — not a fresh visit or SPA back/forward navigation. */
function isHardReload(): boolean {
  if (typeof performance === "undefined") return false;
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  return nav?.type === "reload";
}

export interface CoverFlowItem {
  id: string;
  gradient: string;
  glow: string;
  coverImage?: string;
  /** Shown with a lock icon instead of a placeholder image; the active card does nothing on click/Enter */
  locked?: boolean;
  /** Small corner badge, e.g. "Pending approval" — shown on every card, not just the active one */
  badge?: string;
  badgeColor?: string;
}

function slotStyle(offset: number, reduceMotion: boolean) {
  const abs = Math.abs(offset);
  return {
    x: offset * SPACING,
    rotateY: reduceMotion ? 0 : offset === 0 ? 0 : offset > 0 ? -46 - (abs - 1) * 9 : 46 + (abs - 1) * 9,
    scale: abs === 0 ? 1 : abs === 1 ? 0.8 : 0.62,
    opacity: abs === 0 ? 1 : abs === 1 ? 0.88 : 0.5,
    zIndex: 10 - abs,
  };
}

export default function CoverFlow({
  items,
  namespace,
  basePath,
  storageKey,
  ariaLabel,
  moreSoonLabel,
  defaultActive = 0,
}: {
  items: CoverFlowItem[];
  /** Messages namespace holding `${namespace}.${id}.name` / `.tagline` */
  namespace: string;
  /** Route prefix an unlocked active card navigates to, e.g. "/projects" */
  basePath: string;
  /** sessionStorage key used to restore the active card across navigations — must be unique per carousel instance */
  storageKey: string;
  ariaLabel: string;
  /** Ghost ("+ more soon") slot at the end of the shelf; omit to disable it */
  moreSoonLabel?: string;
  defaultActive?: number;
}) {
  const tp = useTranslations(namespace);
  const { navigate } = useCoverTransition();
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(defaultActive);
  const showMoreSoon = !!moreSoonLabel;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewRef = useRef(false);

  // Only this carousel's own keyboard shortcuts should fire — track whether it's
  // the one actually in view, so scrolling to another shelf doesn't move this one too.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.6;
      },
      { threshold: [0, 0.6, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Restore whichever card the visitor last had active (e.g. after visiting a
  // detail page and coming back) instead of always resetting to the default.
  // A hard reload is treated as a fresh visit, so it starts from the default card instead.
  useEffect(() => {
    if (isHardReload()) return;
    const stored = sessionStorage.getItem(storageKey);
    if (!stored) return;
    const idx = items.findIndex((p) => p.id === stored);
    if (idx >= 0) setActive(idx);
  }, [storageKey, items]);

  const select = useCallback(
    (index: number) => {
      setActive(() => {
        const max = showMoreSoon ? items.length : items.length - 1;
        const clamped = Math.max(0, Math.min(max, index));
        const item = items[clamped];
        if (item) sessionStorage.setItem(storageKey, item.id);
        return clamped;
      });
    },
    [items, storageKey, showMoreSoon]
  );

  const [lockedShakeId, setLockedShakeId] = useState<string | null>(null);

  const openActive = useCallback(() => {
    if (active >= items.length) return; // "more soon" ghost slot
    const item = items[active];
    if (item.locked) {
      setLockedShakeId(item.id);
      window.setTimeout(() => setLockedShakeId(null), 420);
      return;
    }
    navigate(`${basePath}/${item.id}`, item.glow);
  }, [active, items, basePath, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isInViewRef.current) return;
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (typing) return;
      if (e.key === "ArrowLeft") select(active - 1);
      if (e.key === "ArrowRight") select(active + 1);
      if (e.key === "Enter") openActive();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select, openActive]);

  const activeItem = active < items.length ? items[active] : null;

  return (
    <div ref={containerRef} className="relative flex flex-col items-center">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        animate={{
          background: `radial-gradient(ellipse, ${activeItem?.glow ?? "#d9a441"}3d 0%, transparent 65%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* title */}
      <div className="relative z-10 text-center">
        <motion.h1
          key={active}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block -skew-x-[8deg] font-display text-6xl font-bold tracking-tight text-foreground sm:text-8xl"
        >
          {activeItem ? tp(`${activeItem.id}.name`) : moreSoonLabel}
        </motion.h1>
        <p className="mt-3 font-mono text-xs tracking-[0.1em] text-[color:var(--chohealth-3)] sm:text-sm">
          {activeItem && tp.has(`${activeItem.id}.tagline`) ? tp(`${activeItem.id}.tagline`).toUpperCase() : ""}
        </p>
      </div>

      {/* shelf */}
      <div
        className="relative mt-8 h-[380px] w-full"
        style={{ perspective: 1600 }}
        role="listbox"
        aria-label={ariaLabel}
      >
        {items.map((item, i) => {
          const offset = i - active;
          if (Math.abs(offset) > 2) return null;
          const s = slotStyle(offset, reduceMotion);
          return (
            <motion.button
              key={item.id}
              type="button"
              role="option"
              aria-selected={offset === 0}
              aria-label={tp(`${item.id}.name`)}
              onClick={() => (offset === 0 ? openActive() : select(i))}
              className="absolute left-1/2 top-1/2 h-[380px] w-[300px] cursor-pointer overflow-hidden rounded-md border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
              style={{ background: item.gradient, marginLeft: -150, marginTop: -190 }}
              animate={{ x: s.x, rotateY: s.rotateY, scale: s.scale, opacity: s.opacity, zIndex: s.zIndex }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-0"
                animate={lockedShakeId === item.id && !reduceMotion ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
              {item.coverImage ? (
                <NextImage src={item.coverImage} alt={tp(`${item.id}.name`)} fill className="object-cover" sizes="300px" />
              ) : (
                <>
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(90deg, #ffffff22 1px, transparent 1px)",
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    {item.locked ? <Lock size={40} className="text-white" /> : <ImageIcon size={44} className="text-white" />}
                  </div>
                </>
              )}
              {item.badge && (
                <span
                  className="absolute right-3 top-3 rounded-full px-2.5 py-1 font-mono text-[10px]"
                  style={{
                    color: item.badgeColor,
                    background: `${item.badgeColor}1a`,
                    border: `1px solid ${item.badgeColor}3a`,
                  }}
                >
                  {item.badge}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 pt-10 text-left">
                <div className="font-mono text-xs tracking-wide text-white/95">{tp(`${item.id}.name`).toUpperCase()}</div>
                {offset === 0 && tp.has(`${item.id}.tagline`) && (
                  <div className="mt-1 font-mono text-[10px] leading-snug text-white/60">{tp(`${item.id}.tagline`)}</div>
                )}
              </div>
              </motion.div>
            </motion.button>
          );
        })}

        {/* ghost "more soon" slot */}
        {showMoreSoon &&
          (() => {
            const offset = items.length - active;
            if (Math.abs(offset) > 2) return null;
            const s = slotStyle(offset, reduceMotion);
            return (
              <motion.button
                type="button"
                role="option"
                aria-selected={offset === 0}
                aria-label={moreSoonLabel}
                onClick={() => select(items.length)}
                className="absolute left-1/2 top-1/2 flex h-[380px] w-[300px] items-center justify-center rounded-md border border-dashed border-white/20 bg-surface text-muted"
                style={{ marginLeft: -150, marginTop: -190 }}
                animate={{ x: s.x, rotateY: s.rotateY, scale: s.scale, opacity: s.opacity * 0.9, zIndex: s.zIndex }}
                transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-center">
                  <div className="text-2xl leading-none">+</div>
                  <div className="mt-1.5 font-mono text-[10px] tracking-[0.08em]">{moreSoonLabel?.toUpperCase()}</div>
                </div>
              </motion.button>
            );
          })()}
      </div>
    </div>
  );
}
