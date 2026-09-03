"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function SiteHeader() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const otherLocale = locale === "en" ? "es" : "en";

  return (
    <header className="relative z-30 flex items-center justify-between px-6 pt-8 sm:px-12">
      <Link href="/" className="font-display text-lg font-bold text-foreground">
        CP<span className="text-accent">.</span>
      </Link>
      <nav className="flex items-center gap-6">
        <Link
          href="/#projects"
          className="hidden font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-foreground sm:inline"
        >
          {t("projects")}
        </Link>
        <Link
          href="/#professional"
          className="hidden font-mono text-xs uppercase tracking-[0.08em] text-muted transition-colors hover:text-foreground sm:inline"
        >
          {t("professional")}
        </Link>
        <Link
          href={pathname}
          locale={otherLocale}
          className="rounded border border-white/20 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-foreground"
          aria-label={`Switch to ${otherLocale === "en" ? "English" : "Español"}`}
        >
          {locale === "en" ? (
            <>
              <span className="text-foreground">EN</span> / ES
            </>
          ) : (
            <>
              EN / <span className="text-foreground">ES</span>
            </>
          )}
        </Link>
      </nav>
    </header>
  );
}