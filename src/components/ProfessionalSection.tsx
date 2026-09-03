import { getTranslations } from "next-intl/server";
import { Lock, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function ProfessionalSection() {
  const t = await getTranslations("professional");

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

      <div className="relative mx-auto max-w-5xl text-center">
        <h2 className="inline-block -skew-x-[8deg] font-display text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          {t("headline")}
        </h2>
        <p className="mt-3 font-mono text-xs tracking-[0.08em] text-muted sm:text-sm">
          {t("sub").toUpperCase()}
        </p>
      </div>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-3">
        <ProCard
          icon={<LockedIcon />}
          badge={t("pendingApproval")}
          badgeColor="#d9a441"
          name={t("dashboardanalytics.name")}
          role={t("dashboardanalytics.role")}
          description={t("dashboardanalytics.description")}
          pillColor="#8fc4d8"
        />
        <ProCard
          icon={<LockedIcon />}
          badge={t("pendingApproval")}
          badgeColor="#d9a441"
          name={t("verifylead.name")}
          role={t("verifylead.role")}
          description={t("verifylead.description")}
          pillColor="#d9a441"
          featured
        />
        <ProCard
          href="/professional/thesis"
          badge={t("openLabel")}
          badgeColor="#1d4ed8"
          name={t("thesis.name")}
          role={t("thesis.role")}
          description={t("thesis.description")}
          pillColor="#8fb3ff"
          gradient="linear-gradient(155deg, #0e2350, #1d4ed8 75%)"
          cta={t("readPaper")}
        />
      </div>

      <p className="relative mx-auto mt-12 max-w-md text-center font-mono text-[11px] text-muted">
        {t("footerNote")}
      </p>
    </section>
  );
}

function LockedIcon() {
  return (
    <div className="flex h-13 w-13 items-center justify-center rounded-full border border-white/15 bg-white/5 p-3">
      <Lock size={18} className="text-white/50" />
    </div>
  );
}

function ProCard({
  href,
  icon,
  badge,
  badgeColor,
  name,
  role,
  description,
  pillColor,
  gradient,
  featured,
  cta,
}: {
  href?: string;
  icon?: React.ReactNode;
  badge: string;
  badgeColor: string;
  name: string;
  role: string;
  description: string;
  pillColor: string;
  gradient?: string;
  featured?: boolean;
  cta?: string;
}) {
  const card = (
    <div
      className={`overflow-hidden rounded-lg border transition-colors ${featured ? "sm:scale-105" : ""} ${
        href ? "hover:border-white/25" : ""
      }`}
      style={{ borderColor: "#ffffff14", background: gradient ?? "#101013" }}
    >
      <div
        className="relative flex h-[160px] items-center justify-center"
        style={{
          backgroundImage: gradient
            ? "linear-gradient(#ffffff14 1px, transparent 1px), linear-gradient(90deg, #ffffff14 1px, transparent 1px)"
            : "repeating-linear-gradient(45deg, #ffffff08 0px, #ffffff08 1px, transparent 1px, transparent 10px)",
          backgroundSize: gradient ? "24px 24px" : undefined,
        }}
      >
        {icon}
        <span
          className="absolute right-3.5 top-3.5 rounded-full px-2.5 py-1 font-mono text-[10px]"
          style={{ color: badgeColor, background: `${badgeColor}1a`, border: `1px solid ${badgeColor}3a` }}
        >
          {badge}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-1.5 font-display text-base font-semibold text-white">{name}</div>
        <div className="mb-2.5 font-mono text-[10.5px]" style={{ color: pillColor }}>
          {role.toUpperCase()}
        </div>
        <p className="text-xs leading-relaxed text-white/60">{description}</p>
        {cta && (
          <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-white">
            {cta}
            <ArrowUpRight size={12} />
          </div>
        )}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="block">
      {card}
    </Link>
  ) : (
    card
  );
}
