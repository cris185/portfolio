import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getProfessionalWork, professionalWorks } from "@/lib/professional";
import BackLink from "@/components/BackLink";
import ProjectDocs from "@/components/ProjectDocs";

export function generateStaticParams() {
  return professionalWorks.filter((p) => !p.locked).map((p) => ({ id: p.id }));
}

export default async function ProfessionalDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const work = getProfessionalWork(id);
  if (!work || work.locked) notFound();

  const t = await getTranslations("projectPage");
  const tp = await getTranslations(`professional.${work.id}`);

  const isDark = work.mode === "dark";
  const hasAcademicCredit = tp.has("university");
  const teammates = hasAcademicCredit ? (tp.raw("teammates") as string[]) : [];
  const advisors = hasAcademicCredit ? (tp.raw("advisors") as string[]) : [];
  const isThesis = work.id === "thesis";

  return (
    <main style={{ background: work.bodyBg }} className="min-h-screen">
      {/* hero band */}
      <div style={{ background: work.heroBg }} className="relative overflow-hidden pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-40 h-[620px] w-[620px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${work.accentText}55 0%, transparent 70%)` }}
        />

        <div className="relative flex items-center justify-between px-6 pt-7 sm:px-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-lg font-bold text-white">
              CP<span style={{ color: "#d9a441" }}>.</span>
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <BackLink color={work.glow} />
          </div>
        </div>

        <div className="relative px-6 pt-11 sm:px-12">
          <h1 className="inline-block -skew-x-[7deg] font-display text-6xl font-bold tracking-tight text-white sm:text-8xl">
            {tp("name")}
          </h1>
        </div>
      </div>

      {/* seam */}
      <div
        aria-hidden
        className="h-16"
        style={{ background: `linear-gradient(180deg, ${work.heroBg} 0%, ${work.bodyBg} 100%)` }}
      />

      {/* body */}
      <div className="relative px-6 pb-16 sm:px-12">
        <div className="max-w-2xl">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.1em]" style={{ color: work.accentText }}>
            {tp("category")}
          </div>
          <p className="mb-4 text-lg leading-relaxed" style={{ color: work.textPrimary }}>
            {tp("description")}
          </p>

          {work.hasStats && (
            <div className="mb-7 font-mono text-xs" style={{ color: work.accentText }}>
              {tp("stats")}
            </div>
          )}

          <div className="mb-6 flex flex-wrap gap-2">
            {work.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded font-mono text-[11px]"
                style={{
                  color: work.accentText,
                  background: work.pillBg,
                  border: `1px solid ${work.pillBorder}`,
                  padding: "5px 10px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* university / authorship credit — thesis only */}
          {hasAcademicCredit && (
            <div
              className="mb-9 flex flex-wrap items-center gap-4 rounded-lg px-4 py-3"
              style={{ background: work.pillBg, border: `1px solid ${work.pillBorder}` }}
            >
              <Image src="/utb-logo.png" alt={tp("university")} width={37} height={18} className="shrink-0" />
              <div className="text-[12.5px] leading-relaxed" style={{ color: work.textSecondary }}>
                <span style={{ color: work.textPrimary }}>{tp("university")}</span>
                {" · "}
                {tp("period")}
                <br />
                {t("withTeammates")} {teammates.join(", ")}
                {" — "}
                {t("advisedBy")} {advisors.join(", ")}
              </div>
            </div>
          )}

          {work.href && (
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded font-mono text-sm font-medium"
                style={{ background: work.accentText, color: isDark ? "#0a0a0c" : "#ffffff", padding: "12px 22px" }}
              >
                {isThesis ? t("viewCatalog") : t("visitLive")}
                <ArrowUpRight size={15} />
              </a>
            </div>
          )}
          {isThesis && (
            <p className="mt-3 text-[11.5px]" style={{ color: work.textSecondary }}>
              {t("sourcePrivateNote")}
            </p>
          )}
        </div>

        {work.hasProblem && (
          <div className="mt-14 max-w-xl">
            <div className="mb-3 inline-block -skew-x-[4deg] font-display text-2xl font-bold" style={{ color: work.textPrimary }}>
              {tp("problemTitle")}
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: work.textPrimary }}>
              {tp("problem")}
            </p>
          </div>
        )}

        <div className="mt-14 max-w-xl">
          <div className="mb-4 inline-block -skew-x-[4deg] font-display text-2xl font-bold" style={{ color: work.textPrimary }}>
            {t("featuresTitle")}
          </div>
          <ul className="flex flex-col gap-3">
            {(tp.raw("features") as string[]).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed" style={{ color: work.textPrimary }}>
                <Check size={15} className="mt-0.5 shrink-0" style={{ color: work.accentText }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {work.docs && (
          <ProjectDocs
            projectId={work.id}
            namespace="professional"
            docs={work.docs}
            accentText={work.accentText}
            textPrimary={work.textPrimary}
            textSecondary={work.textSecondary}
            pillBorder={work.pillBorder}
            pillBg={work.pillBg}
            isDark={isDark}
          />
        )}
      </div>
    </main>
  );
}
