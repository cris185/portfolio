"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRouter } from "@/i18n/navigation";

interface TransitionCtx {
  navigate: (href: string, color: string) => void;
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

  const panels = [PORTFOLIO_BLACK, PORTFOLIO_AMBER, color];

  return (
    <Ctx.Provider value={{ navigate }}>
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
                  top: `${-14 + i * 34}vh`,
                  left: "-22vw",
                  width: "96vw",
                  height: "40vh",
                  transform: "rotate(-14deg)",
                  transformOrigin: "left center",
                  clipPath: "polygon(0 0, 100% 0, calc(100% - 160px) 100%, 0 100%)",
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
