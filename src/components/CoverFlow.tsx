"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { projects } from "@/lib/projects";

const SPACING = 350;

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

export default function CoverFlow() {
  const t = useTranslations("home");
  const tp = useTranslations("projects");
  const router = useRouter();
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(1); // CHOHEALTH featured by default

  const select = useCallback((index: number) => {
    setActive((prev) => {
      const clamped = Math.max(0, Math.min(projects.length, index));
      return clamped;
    });
  }, []);

  const openActive = useCallback(() => {
    if (active >= projects.length) return; // "more soon" ghost slot
    const project = projects[active];
    router.push(`/projects/${project.id}`);
  }, [active, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") select(active - 1);
      if (e.key === "ArrowRight") select(active + 1);
      if (e.key === "Enter") openActive();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, select, openActive]);

  const activeProject = active < projects.length ? projects[active] : null;

  return (
    <div className="relative flex flex-col items-center">
      {/* ambient glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        animate={{
          background: `radial-gradient(ellipse, ${activeProject?.glow ?? "#d9a441"}3d 0%, transparent 65%)`,
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
          {activeProject ? tp(`${activeProject.id}.name`) : t("moreSoon")}
        </motion.h1>
        <p className="mt-3 font-mono text-xs tracking-[0.1em] text-[color:var(--chohealth-3)] sm:text-sm">
          {activeProject ? tp(`${activeProject.id}.tagline`).toUpperCase() : ""}
        </p>
      </div>

      {/* shelf */}
      <div
        className="relative mt-8 h-[380px] w-full"
        style={{ perspective: 1600 }}
        role="listbox"
        aria-label={t("sectionLabel")}
      >
        {projects.map((project, i) => {
          const offset = i - active;
          if (Math.abs(offset) > 2) return null;
          const s = slotStyle(offset, reduceMotion);
          return (
            <motion.button
              key={project.id}
              type="button"
              role="option"
              aria-selected={offset === 0}
              aria-label={tp(`${project.id}.name`)}
              onClick={() => (offset === 0 ? openActive() : select(i))}
              className="absolute left-1/2 top-1/2 h-[380px] w-[300px] cursor-pointer overflow-hidden rounded-md border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
              style={{ background: project.gradient, marginLeft: -150, marginTop: -190 }}
              animate={{ x: s.x, rotateY: s.rotateY, scale: s.scale, opacity: s.opacity, zIndex: s.zIndex }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(90deg, #ffffff22 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-left font-mono text-xs tracking-wide text-white/90">
                {tp(`${project.id}.name`).toUpperCase()}
              </div>
            </motion.button>
          );
        })}

        {/* ghost "more soon" slot */}
        {(() => {
          const offset = projects.length - active;
          if (Math.abs(offset) > 2) return null;
          const s = slotStyle(offset, reduceMotion);
          return (
            <motion.button
              type="button"
              role="option"
              aria-selected={offset === 0}
              aria-label={t("moreSoon")}
              onClick={() => select(projects.length)}
              className="absolute left-1/2 top-1/2 flex h-[380px] w-[300px] items-center justify-center rounded-md border border-dashed border-white/20 bg-surface text-muted"
              style={{ marginLeft: -150, marginTop: -190 }}
              animate={{ x: s.x, rotateY: s.rotateY, scale: s.scale, opacity: s.opacity * 0.9, zIndex: s.zIndex }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-center">
                <div className="text-2xl leading-none">+</div>
                <div className="mt-1.5 font-mono text-[10px] tracking-[0.08em]">
                  {t("moreSoon").toUpperCase()}
                </div>
              </div>
            </motion.button>
          );
        })()}
      </div>
    </div>
  );
}