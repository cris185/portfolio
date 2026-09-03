"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronDown,
  FileText,
  Lightbulb,
  Scale,
  GitBranch,
  Database,
  Users,
  AlertTriangle,
  Layers,
  Map as MapIcon,
  Terminal,
} from "lucide-react";
import type { ProjectId, Project } from "@/lib/projects";
import MermaidDiagram from "./MermaidDiagram";

type TabKey = "overview" | "decisions" | "rules" | "architecture" | "schema" | "roles" | "limitations" | "stack" | "roadmap" | "setup";

const TAB_ICONS: Record<TabKey, typeof FileText> = {
  overview: FileText,
  decisions: Lightbulb,
  rules: Scale,
  architecture: GitBranch,
  schema: Database,
  roles: Users,
  limitations: AlertTriangle,
  stack: Layers,
  roadmap: MapIcon,
  setup: Terminal,
};

const TAB_ORDER: TabKey[] = ["overview", "decisions", "rules", "architecture", "schema", "roles", "limitations", "stack", "roadmap", "setup"];

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="mb-4 font-mono text-xs uppercase tracking-[0.1em]" style={{ color }}>
      {children}
    </div>
  );
}

function CodeBlock({ code, isDark, pillBorder }: { code: string; isDark: boolean; pillBorder: string }) {
  return (
    <pre
      className="overflow-x-auto whitespace-pre rounded-lg p-4 font-mono text-[12px] leading-relaxed"
      style={{
        background: isDark ? "#00000040" : "#0b1b3a",
        border: `1px solid ${pillBorder}`,
        color: isDark ? "#e5e7eb" : "#dbeafe",
      }}
    >
      {code}
    </pre>
  );
}

export default function ProjectDocs({
  projectId,
  docs,
  accentText,
  textPrimary,
  textSecondary,
  pillBorder,
  pillBg,
  isDark,
}: {
  projectId: ProjectId;
  docs: NonNullable<Project["docs"]>;
  accentText: string;
  textPrimary: string;
  textSecondary: string;
  pillBorder: string;
  pillBg: string;
  isDark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabKey>("overview");
  const t = useTranslations("projectPage");
  const tp = useTranslations(`projects.${projectId}`);

  const decisions = (tp.raw("docs.decisions") ?? []) as { title: string; rationale: string }[];
  const businessRules = (tp.raw("docs.businessRules") ?? []) as { category: string; rules: string[] }[];
  const roles = (tp.raw("docs.roles") ?? []) as { role: string; capabilities: { label: string; text: string }[] }[];
  const notifications = (tp.raw("docs.notifications") ?? { intro: "", items: [], note: "" }) as {
    intro: string;
    items: { trigger: string; when: string; attachment: string }[];
    note: string;
  };
  const limitations = (tp.raw("docs.limitations") ?? []) as string[];
  const roadmap = (tp.raw("docs.roadmap") ?? []) as string[];
  const schemaDiagramTitles = (tp.raw("docs.schemaDiagramTitles") ?? {}) as Record<string, string>;
  const gettingStarted = (tp.raw("docs.gettingStarted") ?? { prerequisites: [] }) as {
    prerequisites: string[];
    backendNote: string;
    closingNote: string;
  };

  const availableTabs = TAB_ORDER.filter((key) => {
    if (key === "overview") return true;
    if (key === "decisions") return decisions.length > 0;
    if (key === "rules") return businessRules.length > 0;
    if (key === "architecture") return !!docs.architectureDiagram;
    if (key === "schema") return !!docs.schemaDiagrams?.length;
    if (key === "roles") return roles.length > 0;
    if (key === "limitations") return limitations.length > 0;
    if (key === "stack") return docs.fullStack.length > 0;
    if (key === "roadmap") return roadmap.length > 0;
    if (key === "setup") return !!docs.gettingStarted;
    return false;
  });

  return (
    <div className="mt-14 max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded font-mono text-xs uppercase tracking-[0.1em]"
        style={{ color: accentText, padding: "10px 16px", border: `1px solid ${pillBorder}`, background: pillBg }}
      >
        {open ? t("docsToggleOn") : t("docsToggleOff")}
        <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
      </button>

      {open && (
        <div className="mt-6">
          <p className="mb-6 max-w-xl text-[13px] leading-relaxed" style={{ color: textSecondary }}>
            {t("docsSub")}
          </p>

          {/* tab bar */}
          <div className="mb-8 flex flex-wrap gap-2 border-b pb-4" style={{ borderColor: pillBorder }}>
            {availableTabs.map((key) => {
              const Icon = TAB_ICONS[key];
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className="flex items-center gap-1.5 rounded font-mono text-[11px] uppercase tracking-[0.06em] transition-colors"
                  style={{
                    padding: "7px 12px",
                    background: active ? accentText : pillBg,
                    color: active ? (isDark ? "#0a0a0c" : "#ffffff") : textSecondary,
                    border: `1px solid ${active ? accentText : pillBorder}`,
                  }}
                >
                  <Icon size={12} />
                  {t(`tabs.${key}`)}
                </button>
              );
            })}
          </div>

          {/* overview */}
          {tab === "overview" && (
            <div>
              <SectionLabel color={accentText}>{t("problemStatement")}</SectionLabel>
              <p className="max-w-2xl text-[14px] leading-relaxed" style={{ color: textPrimary }}>
                {tp("docs.problemLong")}
              </p>
            </div>
          )}

          {/* decisions */}
          {tab === "decisions" && (
            <div>
              <SectionLabel color={accentText}>{t("keyDecisions")}</SectionLabel>
              <div className="grid gap-4 sm:grid-cols-2">
                {decisions.map((d) => (
                  <div key={d.title} className="rounded-lg p-4" style={{ border: `1px solid ${pillBorder}`, background: pillBg }}>
                    <div className="mb-1.5 text-[13px] font-medium leading-snug" style={{ color: textPrimary }}>
                      {d.title}
                    </div>
                    <p className="text-[12.5px] leading-relaxed" style={{ color: textSecondary }}>
                      {d.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* business rules */}
          {tab === "rules" && (
            <div>
              <SectionLabel color={accentText}>{t("businessRules")}</SectionLabel>
              <p className="mb-6 max-w-2xl text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                {tp("docs.businessRulesIntro")}
              </p>
              <div className="flex flex-col gap-7">
                {businessRules.map((group) => (
                  <div key={group.category}>
                    <div className="mb-2.5 text-[13px] font-semibold" style={{ color: textPrimary }}>
                      {group.category}
                    </div>
                    <ul className="flex flex-col gap-2">
                      {group.rules.map((rule, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-[12.5px] leading-relaxed"
                          style={{ color: textSecondary }}
                        >
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: accentText }} />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* architecture */}
          {tab === "architecture" && docs.architectureDiagram && (
            <div>
              <SectionLabel color={accentText}>{t("systemArchitecture")}</SectionLabel>
              <div className="rounded-lg p-5" style={{ border: `1px solid ${pillBorder}`, background: isDark ? "#00000020" : "#ffffff" }}>
                <MermaidDiagram chart={docs.architectureDiagram} dark={isDark} />
              </div>
              <p className="mt-4 max-w-2xl text-[12.5px] leading-relaxed" style={{ color: textSecondary }}>
                {tp("docs.architectureNote")}
              </p>
            </div>
          )}

          {/* database schema */}
          {tab === "schema" && !!docs.schemaDiagrams?.length && (
            <div>
              <SectionLabel color={accentText}>{t("databaseSchema")}</SectionLabel>
              <p className="mb-6 max-w-2xl text-[13px] leading-relaxed" style={{ color: textSecondary }}>
                {tp("docs.schemaIntro")}
              </p>
              <div className="flex flex-col gap-8">
                {docs.schemaDiagrams.map((d) => (
                  <div key={d.key}>
                    <div className="mb-3 text-[13px] font-semibold" style={{ color: textPrimary }}>
                      {schemaDiagramTitles[d.key] ?? d.key}
                    </div>
                    <div className="rounded-lg p-5" style={{ border: `1px solid ${pillBorder}`, background: isDark ? "#00000020" : "#ffffff" }}>
                      <MermaidDiagram chart={d.mermaid} dark={isDark} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 max-w-2xl text-[12.5px] leading-relaxed" style={{ color: textSecondary }}>
                {tp("docs.schemaNote")}
              </p>
            </div>
          )}

          {/* roles */}
          {tab === "roles" && (
            <div>
              <SectionLabel color={accentText}>{t("capabilitiesByRole")}</SectionLabel>
              <div className="grid gap-6 sm:grid-cols-2">
                {roles.map((r) => (
                  <div key={r.role}>
                    <div className="mb-3 text-[13.5px] font-semibold" style={{ color: accentText }}>
                      {r.role}
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {r.capabilities.map((c) => (
                        <li key={c.label} className="text-[12.5px] leading-relaxed" style={{ color: textSecondary }}>
                          <span className="font-medium" style={{ color: textPrimary }}>
                            {c.label}:
                          </span>{" "}
                          {c.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {notifications.items.length > 0 && (
                <div className="mt-10">
                  <div className="mb-2.5 text-[13px] font-semibold" style={{ color: textPrimary }}>
                    {t("emailNotifications")}
                  </div>
                  <p className="mb-4 max-w-2xl text-[12.5px] leading-relaxed" style={{ color: textSecondary }}>
                    {notifications.intro}
                  </p>
                  <div className="overflow-x-auto rounded-lg" style={{ border: `1px solid ${pillBorder}` }}>
                    <table className="w-full min-w-[520px] border-collapse text-[12px]">
                      <thead>
                        <tr style={{ borderBottom: `1px solid ${pillBorder}` }}>
                          <th className="px-3 py-2 text-left font-mono text-[10.5px] uppercase tracking-[0.06em]" style={{ color: accentText }}>
                            {t("trigger")}
                          </th>
                          <th className="px-3 py-2 text-left font-mono text-[10.5px] uppercase tracking-[0.06em]" style={{ color: accentText }}>
                            {t("firedWhen")}
                          </th>
                          <th className="px-3 py-2 text-left font-mono text-[10.5px] uppercase tracking-[0.06em]" style={{ color: accentText }}>
                            {t("attachment")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.items.map((row, i) => (
                          <tr key={row.trigger} style={{ borderTop: i === 0 ? "none" : `1px solid ${pillBorder}` }}>
                            <td className="px-3 py-2" style={{ color: textPrimary }}>
                              {row.trigger}
                            </td>
                            <td className="px-3 py-2" style={{ color: textSecondary }}>
                              {row.when}
                            </td>
                            <td className="px-3 py-2" style={{ color: textSecondary }}>
                              {row.attachment}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-3 max-w-2xl text-[12px] leading-relaxed" style={{ color: textSecondary }}>
                    {notifications.note}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* limitations */}
          {tab === "limitations" && (
            <div>
              <SectionLabel color={accentText}>{t("knownLimitations")}</SectionLabel>
              <ul className="flex flex-col gap-5">
                {limitations.map((l, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed" style={{ color: textPrimary }}>
                    <AlertTriangle size={15} className="mt-0.5 shrink-0" style={{ color: accentText }} />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* tech stack */}
          {tab === "stack" && (
            <div>
              <SectionLabel color={accentText}>{t("fullStackTitle")}</SectionLabel>
              <div className="flex flex-col overflow-hidden rounded-lg" style={{ border: `1px solid ${pillBorder}` }}>
                {docs.fullStack.map((row, i) => (
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

          {/* roadmap */}
          {tab === "roadmap" && (
            <div>
              <SectionLabel color={accentText}>{t("roadmapTitle")}</SectionLabel>
              <ul className="flex flex-col gap-4">
                {roadmap.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] leading-relaxed" style={{ color: textPrimary }}>
                    <MapIcon size={14} className="mt-0.5 shrink-0" style={{ color: accentText }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* getting started */}
          {tab === "setup" && docs.gettingStarted && (
            <div>
              <SectionLabel color={accentText}>{t("gettingStartedTitle")}</SectionLabel>

              <div className="mb-2.5 text-[13px] font-semibold" style={{ color: textPrimary }}>
                {t("prerequisites")}
              </div>
              <ul className="mb-8 flex flex-col gap-1.5">
                {gettingStarted.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[12.5px] leading-relaxed" style={{ color: textSecondary }}>
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: accentText }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mb-2.5 text-[13px] font-semibold" style={{ color: textPrimary }}>
                {t("backendSetup")}
              </div>
              <CodeBlock code={docs.gettingStarted.backendCommands} isDark={isDark} pillBorder={pillBorder} />
              <div className="mt-4 mb-2.5 text-[12px] font-medium" style={{ color: textSecondary }}>
                {t("envVars")}
              </div>
              <CodeBlock code={docs.gettingStarted.backendEnv} isDark={isDark} pillBorder={pillBorder} />
              <p className="mt-3 mb-8 text-[12px]" style={{ color: textSecondary }}>
                {gettingStarted.backendNote}
              </p>

              <div className="mb-2.5 text-[13px] font-semibold" style={{ color: textPrimary }}>
                {t("frontendSetup")}
              </div>
              <CodeBlock code={docs.gettingStarted.frontendCommands} isDark={isDark} pillBorder={pillBorder} />
              <div className="mt-4 mb-2.5 text-[12px] font-medium" style={{ color: textSecondary }}>
                {t("envVars")}
              </div>
              <CodeBlock code={docs.gettingStarted.frontendEnv} isDark={isDark} pillBorder={pillBorder} />
              <p className="mt-3 text-[12px]" style={{ color: textSecondary }}>
                {gettingStarted.closingNote}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}