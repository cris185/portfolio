"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCoverTransition } from "@/components/TransitionProvider";

export default function BackLink({ color }: { color: string }) {
  const t = useTranslations("projectPage");
  const { navigate } = useCoverTransition();

  return (
    <button
      type="button"
      onClick={() => navigate("/", color)}
      className="flex items-center gap-2 font-mono text-xs text-white/60 transition-colors hover:text-white/90"
    >
      <ArrowLeft size={13} />
      {t("back")}
    </button>
  );
}
