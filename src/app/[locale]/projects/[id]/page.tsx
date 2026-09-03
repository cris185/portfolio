import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getProject, projects, type ProjectId } from "@/lib/projects";
import BackLink from "@/components/BackLink";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectDocs from "@/components/ProjectDocs";
import { GithubIcon } from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const t = await getTranslations("projectPage");
  const tp = await getTranslations(`projects.${project.id as ProjectId}`);

  const isDark = project.mode === "dark";

  return (
    <main style={{ background: project.bodyBg }} className="min-h-screen">
      {/* hero band */}
      <div style={{ background: project.heroBg }} className="relative overflow-hidden pb-16">
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
          style={{ background: `radial-gradient(circle, ${project.accentText}55 0%, transparent 70%)` }}
        />

        <div className="relative flex items-center justify-between px-6 pt-7 sm:px-12">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-display text-lg font-bold text-white">
              CP<span style={{ color: "#d9a441" }}>.</span>
            </Link>
            <div className="h-4 w-px bg-white/20" />
            <BackLink color={project.glow} />
          </div>
        </div>

        <div className="relative px-6 pt-11 sm:px-12">
          <h1 className="inline-block -skew-x-[7deg] font-display text-6xl font-bold tracking-tight text-white sm:text-8xl">
            {tp("name")}
          </h1>
        </div>
      </div>

      {/* seam: smooth gradient from hero into the body, no more broken clip-path */}
      <div
        aria-hidden
        className="h-16"
        style={{ background: `linear-gradient(180deg, ${project.heroBg} 0%, ${project.bodyBg} 100%)` }}
      />

      {/* body */}
      <div className="relative px-6 pb-16 sm:px-12">
        <div className="max-w-2xl">
          <div
            className="mb-4 font-mono text-xs uppercase tracking-[0.1em]"
            style={{ color: project.accentText }}
          >
            {tp("category")}
          </div>
          <p
            className="mb-4 text-lg leading-relaxed"
            style={{ color: project.textPrimary }}
          >
            {tp("description")}
          </p>

          {project.hasStats && (
            <div
              className="mb-7 font-mono text-xs"
              style={{ color: project.accentText }}
            >
              {tp("stats")}
            </div>
          )}

          <div className="mb-11 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded font-mono text-[11px]"
                style={{
                  color: project.accentText,
                  background: project.pillBg,
                  border: `1px solid ${project.pillBorder}`,
                  padding: "5px 10px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded font-mono text-sm font-medium"
              style={{ background: project.accentText, color: isDark ? "#0a0a0c" : "#ffffff", padding: "12px 22px" }}
            >
              {t("visitLive")}
              <ArrowUpRight size={15} />
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded font-mono text-sm font-medium"
              style={{ border: `1px solid ${project.pillBorder}`, color: project.textPrimary, padding: "12px 22px" }}
            >
              <GithubIcon width={15} height={15} />
              {t("viewRepo")}
            </a>
          </div>
        </div>

        {/* preview panel */}
        <div
          className="mt-11 max-w-4xl rounded-2xl p-5"
          style={{
            background: isDark ? "#00000030" : "#ffffff",
            border: `1px solid ${project.pillBorder}`,
            boxShadow: `0 30px 60px -30px ${project.accentText}40`,
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: project.pillBorder }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: project.pillBorder }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: project.pillBorder }} />
            <span className="ml-2 font-mono text-[11px]" style={{ color: project.textSecondary }}>
              {new URL(project.href).host}
            </span>
          </div>
          {project.screenshots && project.screenshots.length > 0 ? (
            <ProjectGallery
              screenshots={project.screenshots}
              alt={tp("name")}
              accentText={project.accentText}
              pillBorder={project.pillBorder}
              isDark={isDark}
            />
          ) : (
            <div
              className="flex h-72 gap-4 rounded-lg p-5"
              style={{ background: isDark ? "#00000020" : project.bodyBg }}
            >
              <div className="w-44 rounded-md" style={{ background: isDark ? "#ffffff08" : "#ffffff", border: `1px solid ${project.pillBorder}` }} />
              <div className="flex flex-1 flex-col gap-3.5">
                <div className="flex gap-3.5">
                  <div className="h-20 flex-1 rounded-md" style={{ background: isDark ? "#ffffff08" : "#ffffff", border: `1px solid ${project.pillBorder}` }} />
                  <div className="h-20 flex-1 rounded-md opacity-90" style={{ background: project.accentText }} />
                  <div className="h-20 flex-1 rounded-md" style={{ background: isDark ? "#ffffff08" : "#ffffff", border: `1px solid ${project.pillBorder}` }} />
                </div>
                <div className="flex-1 rounded-md" style={{ background: isDark ? "#ffffff08" : "#ffffff", border: `1px solid ${project.pillBorder}` }} />
              </div>
            </div>
          )}
        </div>

        {project.hasProblem && (
          <div className="mt-14 max-w-xl">
            <div
              className="mb-3 inline-block -skew-x-[4deg] font-display text-2xl font-bold"
              style={{ color: project.textPrimary }}
            >
              {tp("problemTitle")}
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: project.textPrimary }}>
              {tp("problem")}
            </p>
          </div>
        )}

        <div className="mt-14 max-w-xl">
          <div
            className="mb-4 inline-block -skew-x-[4deg] font-display text-2xl font-bold"
            style={{ color: project.textPrimary }}
          >
            {t("featuresTitle")}
          </div>
          <ul className="flex flex-col gap-3">
            {(tp.raw("features") as string[]).map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-[14.5px] leading-relaxed" style={{ color: project.textPrimary }}>
                <Check size={15} className="mt-0.5 shrink-0" style={{ color: project.accentText }} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {project.docs && (
          <ProjectDocs
            projectId={project.id}
            docs={project.docs}
            accentText={project.accentText}
            textPrimary={project.textPrimary}
            textSecondary={project.textSecondary}
            pillBorder={project.pillBorder}
            pillBg={project.pillBg}
            isDark={isDark}
          />
        )}

        {project.demoAccounts && (
          <div className="mt-14 max-w-3xl">
            <div
              className="mb-4 font-mono text-xs uppercase tracking-[0.1em]"
              style={{ color: project.accentText }}
            >
              {t("demoAccount")}
            </div>

            {project.demoAccounts.accounts && project.demoAccounts.accounts.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-3">
                {project.demoAccounts.accounts.map((acc) => (
                  <div
                    key={acc.email}
                    className="rounded-lg px-4 py-3 font-mono text-xs"
                    style={{
                      background: project.pillBg,
                      border: `1px solid ${project.pillBorder}`,
                      color: project.textPrimary,
                    }}
                  >
                    <div className="mb-1 font-medium" style={{ color: project.accentText }}>
                      {acc.label}
                    </div>
                    <div>{acc.email}</div>
                    <div style={{ color: project.textSecondary }}>{acc.password}</div>
                  </div>
                ))}
              </div>
            )}

            {project.demoAccounts.doctors && project.demoAccounts.doctors.length > 0 && (
              <div>
                <div className="mb-2.5 text-[12px] font-semibold" style={{ color: project.textPrimary }}>
                  {t("demoDoctors")}
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {project.demoAccounts.doctors.map((doc) => (
                    <div
                      key={doc.email}
                      className="rounded-lg px-4 py-3 font-mono text-[11px]"
                      style={{
                        background: project.pillBg,
                        border: `1px solid ${project.pillBorder}`,
                        color: project.textPrimary,
                      }}
                    >
                      <div className="mb-1.5 flex items-center justify-between gap-2 font-sans">
                        <span className="text-[12px] font-medium">{doc.name}</span>
                        <span
                          className="shrink-0 rounded px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.04em]"
                          style={{ background: `${project.accentText}1a`, color: project.accentText }}
                        >
                          {tp(`demoSpecializations.${doc.specKey}`)}
                        </span>
                      </div>
                      <div className="break-all">{doc.email}</div>
                      <div style={{ color: project.textSecondary }}>{doc.password}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-4 text-xs" style={{ color: project.textSecondary }}>
              {t("demoNote")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
