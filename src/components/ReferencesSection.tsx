import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Globe } from "lucide-react";
import { LinkedinIcon } from "@/components/icons";
import { references } from "@/lib/references";

export default async function ReferencesSection() {
  const t = await getTranslations("references");

  return (
    <section id="references" className="relative overflow-hidden bg-[#0a0a0c] px-6 py-24 sm:px-12">
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
        style={{ background: "radial-gradient(ellipse, #5b8def18 0%, transparent 70%)" }}
      />

      <div className="relative z-10 text-center">
        <div className="font-mono text-xs uppercase tracking-[0.14em] text-accent">{t("sectionLabel")}</div>
        <p className="mx-auto mt-3 max-w-md font-mono text-[11px] text-muted">{t("sub")}</p>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {references.map((r) => (
          <div
            key={r.id}
            className="flex h-full flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center transition-colors hover:border-white/20"
          >
            <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/10">
              <Image src={r.photo} alt={r.name} fill sizes="80px" className="object-cover" />
            </div>
            <div className="mt-4 font-display text-sm font-semibold text-white">{r.name}</div>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{r.role}</p>
            <div className="mt-auto flex w-[72px] items-center justify-center gap-2 pt-4">
              <a
                href={r.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${r.name} — LinkedIn`}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
              {r.portfolio && (
                <a
                  href={r.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${r.name} — ${t("portfolio")}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
