import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import HudBar from "@/components/HudBar";
import Hero from "@/components/Hero";
import CoverFlow from "@/components/CoverFlow";
import ProfessionalSection from "@/components/ProfessionalSection";
import TerminalSection from "@/components/TerminalSection";
import { projects } from "@/lib/projects";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <SiteHeader />
        <Hero />
      </div>

      <div className="relative flex min-h-screen flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-96"
          style={{ background: "linear-gradient(0deg, #0a1428 0%, transparent 100%)" }}
        />

        <div className="relative z-10 pt-16 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
            {t("sectionLabel")}
          </div>
        </div>

        <div id="projects" className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
          <CoverFlow
            items={projects.map((p) => ({ id: p.id, gradient: p.gradient, glow: p.glow, coverImage: p.coverImage }))}
            namespace="projects"
            basePath="/projects"
            storageKey="cf-active-project"
            ariaLabel={t("sectionLabel")}
            moreSoonLabel={t("moreSoon")}
            defaultActive={1}
          />
        </div>

        <HudBar />
      </div>

      <ProfessionalSection />
      <TerminalSection />
    </main>
  );
}
