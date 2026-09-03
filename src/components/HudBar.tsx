"use client";

import { useTranslations } from "next-intl";

function Key({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-white/20 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/80">
      {children}
    </span>
  );
}

export default function HudBar() {
  const t = useTranslations("home");

  return (
    <div className="relative z-30 flex items-center justify-between gap-4 bg-gradient-to-t from-black/75 to-transparent px-6 py-5 sm:px-12">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Key>&crarr;</Key>
          <span className="hidden font-mono text-[11px] text-muted sm:inline">{t("hudSelect")}</span>
        </div>
        <div className="flex items-center gap-2">
          <Key>&larr;</Key>
          <Key>&rarr;</Key>
          <span className="hidden font-mono text-[11px] text-muted sm:inline">{t("hudBrowse")}</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Key>~</Key>
          <span className="font-mono text-[11px] text-muted">{t("hudTerminal")}</span>
        </div>
      </div>
      <div className="hidden font-mono text-[11px] tracking-[0.06em] text-muted md:block">
        STACK: DJANGO &middot; NEXT.JS &middot; POSTGRES &nbsp;|&nbsp; {t("availableForWork").toUpperCase()}
      </div>
    </div>
  );
}