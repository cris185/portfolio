"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, AlertTriangle } from "lucide-react";
import type { ProjectId, Project } from "@/lib/projects";

export default function EngineeringMode({
  projectId,
  engineering,
  accentText,
  textPrimary,
  textSecondary,
  pillBorder,
  pillBg,
}: {
  projectId: ProjectId;
  engineering: NonNullable<Project["engineering"]>;
  accentText: string;
  textPrimary: string;
  textSecondary: string;
  pillBorder: string;
  pillBg: string;
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("projectPage");
  const tp = useTranslations(`projects.${projectId}`);

  const decisions = (tp.raw("engineering.decisions") ?? []) as { title: string; rationale: string }[];
  const limitations = (tp.raw("engineering.limitations") ?? []) as string[];

  return (
    <div className="mt-14 max-w-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded font-mono text-xs uppercase tracking-[0.1em]"
        style={{ color: accentText, padding: "10px 16px", border: `1px solid ${pillBorder}`, background: pillBg }}
      >
        {open ? t("engineeringMode") : t("engineeringModeOff")}
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div className="mt-6 flex flex-col gap-10">
          {decisions.length > 0 && (
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.1em]" style={{ color: accentText }}>
                {t("keyDecisions")}
              </div>
              <div className="flex flex-col gap-5">
                {decisions.map((d) => (
                  <div key={d.title} className="rounded-lg p-4" style={{ border: `1px solid ${pillBorder}`, background: pillBg }}>
                    <div className="mb-1.5 text-[13.5px] font-medium leading-snug" style={{ color: textPrimary }}>
                      {d.title}
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                      {d.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {engineering.fullStack.length > 0 && (
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.1em]" style={{ color: accentText }}>
                {t("fullStackTitle")}
              </div>
              <div className="flex flex-col overflow-hidden rounded-lg" style={{ border: `1px solid ${pillBorder}` }}>
                {engineering.fullStack.map((row, i) => (
                  <div
                    key={row.layer}
                    className="flex gap-4 px-4 py-2.5 text-[12.5px]"
                    style={{ borderTop: i === 0 ? "none" : `1px solid ${pillBorder}` }}
                  >
                    <div className="w-32 shrink-0 font-mono" style={{ color: accentText }}>
                      {row.layer}
                    </div>
                    <div style={{ color: textSecondary }}>{row.tech}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {limitations.length > 0 && (
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.1em]" style={{ color: accentText }}>
                {t("knownLimitations")}
              </div>
              <ul className="flex flex-col gap-3">
                {limitations.map((l) => (
                  <li key={l} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                    <AlertTriangle size={14} className="mt-0.5 shrink-0" style={{ color: accentText }} />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}