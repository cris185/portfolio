import SiteHeader from "@/components/SiteHeader";
import HudBar from "@/components/HudBar";
import CoverFlow from "@/components/CoverFlow";
import ProfessionalSection from "@/components/ProfessionalSection";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background">
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

        <SiteHeader />

        <div id="projects" className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
          <CoverFlow />
        </div>

        <HudBar />
      </div>

      <ProfessionalSection />
    </main>
  );
}
