"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";

interface TransitionCtx {
  navigate: (href: string, color: string) => void;
  goBack: (color: string) => void;
}

const Ctx = createContext<TransitionCtx | null>(null);

export function useCoverTransition() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useCoverTransition must be used within TransitionProvider");
  }
  return ctx;
}

const PORTFOLIO_BLACK = "#060607";
const PORTFOLIO_AMBER = "#d9a441";
const COVER_DURATION = 0.42;
const STAGGER = 0.06;

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const [color, setColor] = useState(PORTFOLIO_AMBER);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Manual scroll restoration: the browser's own restore-on-back was disabled above
  // (needed to stop reloads from landing at a stale position), so without this, going
  // back from a detail page keeps whatever scrollY the detail page had instead of
  // returning to where the card was. Remember scrollY per pathname as the visitor
  // scrolls, and restore it on any back/forward (browser button, mobile back gesture,
  // or our own goBack()) — all of these fire a native popstate event.
  useEffect(() => {
    const scrollKey = (pathname: string) => `scrollY:${pathname}`;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        sessionStorage.setItem(scrollKey(window.location.pathname), String(window.scrollY));
      });
    };
    const onPopState = () => {
      const saved = sessionStorage.getItem(scrollKey(window.location.pathname));
      window.setTimeout(() => window.scrollTo(0, saved ? parseInt(saved, 10) : 0), 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  const navigate = useCallback(
    (href: string, destColor: string) => {
      if (reduceMotion) {
        router.push(href);
        return;
      }
      setColor(destColor);
      setPhase("covering");
      const coverTime = (COVER_DURATION + STAGGER * 2) * 1000;
      window.setTimeout(() => {
        router.push(href);
        window.setTimeout(() => setPhase("revealing"), 90);
      }, coverTime);
    },
    [reduceMotion, router]
  );

  const goBack = useCallback(
    (destColor: string) => {
      if (reduceMotion) {
        router.back();
        return;
      }
      setColor(destColor);
      setPhase("covering");
      const coverTime = (COVER_DURATION + STAGGER * 2) * 1000;
      window.setTimeout(() => {
        router.back();
        window.setTimeout(() => setPhase("revealing"), 90);
      }, coverTime);
    },
    [reduceMotion, router]
  );

  const panels = [PORTFOLIO_BLACK, PORTFOLIO_AMBER, color];

  return (
    <Ctx.Provider value={{ navigate, goBack }}>
      {children}
      <AnimatePresence
        onExitComplete={() => {
          if (phase === "revealing") setPhase("idle");
        }}
      >
        {phase !== "idle" && (
          <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden>
            {panels.map((c, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  background: c,
                  top: `${-25 + i * 30}vh`,
                  left: "-30vw",
                  width: "140vw",
                  height: "70vh",
                  transform: "rotate(-14deg)",
                  transformOrigin: "left center",
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 0 100%)",
                }}
                initial={{ x: "-130%" }}
                animate={{ x: phase === "covering" ? "0%" : "130%" }}
                exit={{ x: "130%" }}
                transition={{
                  duration: phase === "revealing" ? 0.5 : COVER_DURATION,
                  delay: i * STAGGER,
                  ease: [0.76, 0, 0.24, 1],
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
