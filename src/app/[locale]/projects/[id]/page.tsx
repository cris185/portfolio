import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getProject, projects, type ProjectId } from "@/lib/projects";

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
            <Link
              href="/"
              className="flex items-center gap-2 font-mono text-xs text-white/60 transition-colors hover:text-white/90"
            >
              <ArrowLeft size={13} />
              {t("back")}
            </Link>
          </div>
        </div>

        <div className="relative px-6 pt-11 sm:px-12">
          <h1 className="inline-block -skew-x-[7deg] font-display text-6xl font-bold tracking-tight text-white sm:text-8xl">
            {tp("name")}
          </h1>
        </div>
      </div>

      {/* diagonal seam */}
      <div style={{ background: project.heroBg, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 100%)" }} className="-mt-px h-14" />

      {/* body */}
      <div className="relative -mt-5 px-6 pb-16 sm:px-12">
        <div className="max-w-2xl">
          <div
            className="mb-4 font-mono text-xs uppercase tracking-[0.1em]"
            style={{ color: project.accentText }}
          >
            {tp("category")}
          </div>
          <p
            className="mb-7 text-lg leading-relaxed"
            style={{ color: project.textSecondary }}
          >
            {tp("description")}
          </p>

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
        </div>

        {project.hasProblem && (
          <div className="mt-14 max-w-xl">
            <div
              className="mb-3 inline-block -skew-x-[4deg] font-display text-2xl font-bold"
              style={{ color: project.textPrimary }}
            >
              {tp("problemTitle")}
            </div>
            <p className="text-[15px] leading-relaxed" style={{ color: project.textSecondary }}>
              {tp("problem")}
            </p>
          </div>
        )}

        {project.demoAccounts && (
          <div className="mt-14 max-w-xl">
            <div
              className="mb-4 font-mono text-xs uppercase tracking-[0.1em]"
              style={{ color: project.accentText }}
            >
              {t("demoAccount")}
            </div>
            <div className="flex flex-wrap gap-3">
              {project.demoAccounts.map((acc) => (
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
            <p className="mt-3 text-xs" style={{ color: project.textSecondary }}>
              {t("demoNote")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
