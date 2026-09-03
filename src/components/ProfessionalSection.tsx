import { getTranslations } from "next-intl/server";
import CoverFlow from "@/components/CoverFlow";
import { professionalWorks } from "@/lib/professional";

export default async function ProfessionalSection() {
  const t = await getTranslations("professional");

  const items = professionalWorks.map((w) => ({
    id: w.id,
    gradient: w.gradient,
    glow: w.glow,
    coverImage: w.coverImage,
    locked: w.locked,
    badge: w.locked ? t("pendingApproval") : undefined,
    badgeColor: w.locked ? "#d9a441" : undefined,
  }));

  return (
    <section id="professional" className="relative overflow-hidden bg-[#060607] px-6 py-24 sm:px-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff06 1px, transparent 1px), linear-gradient(90deg, #ffffff06 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-24 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(ellipse, #d9a44120 0%, transparent 70%)" }}
      />

      <div className="relative z-10 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{t("sectionLabel")}</div>
        <p className="mx-auto mt-3 max-w-md font-mono text-[11px] text-muted">{t("sub")}</p>
      </div>

      <CoverFlow
        items={items}
        namespace="professional"
        basePath="/professional"
        storageKey="cf-active-professional"
        ariaLabel={t("sectionLabel")}
        defaultActive={items.findIndex((w) => w.id === "verifylead")}
      />

      <p className="relative mx-auto mt-4 max-w-md text-center font-mono text-[11px] text-muted">
        {t("footerNote")}
      </p>
    </section>
  );
}
