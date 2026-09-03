import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, Download, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.014c0 4.424 2.865 8.174 6.839 9.499.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.833.09-.647.35-1.088.636-1.339-2.221-.253-4.556-1.113-4.556-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.014C22 6.484 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4-.02 2 2 0 0 1 4 .02ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-3.96 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.68-2.91V8.48Z" />
    </svg>
  );
}

const LINKS = {
  github: "https://github.com/cris185",
  linkedin: "https://www.linkedin.com/in/cpd2001",
  email: "rugal8546@gmail.com",
};

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24 sm:px-12">
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
        className="pointer-events-none absolute -left-40 top-0 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #d9a44122 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-12 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <div className="h-40 w-40 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:h-52 sm:w-52">
            <Image
              src="/avatar.jpg"
              alt="Cristian Puentes"
              width={208}
              height={208}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="max-w-xl text-center sm:text-left">
          <div className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            {t("role")}
          </div>
          <h1 className="mb-1 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t("name")}
          </h1>
          <div className="mb-5 flex items-center justify-center gap-1.5 font-mono text-xs text-muted sm:justify-start">
            <MapPin size={13} />
            {t("location")}
          </div>

          <p className="mb-7 text-[15px] leading-relaxed text-muted">{t("bio")}</p>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Link
              href="/#projects"
              className="rounded bg-accent px-6 py-3 font-mono text-[13px] font-medium text-[#14100a]"
            >
              {t("cta")} &rarr;
            </Link>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 rounded border border-white/20 px-6 py-3 font-mono text-[13px] text-foreground"
            >
              <Download size={14} />
              {t("resume")}
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 sm:justify-start">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted transition-colors hover:text-foreground"
            >
              <GithubIcon width={19} height={19} />
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted transition-colors hover:text-foreground"
            >
              <LinkedinIcon width={19} height={19} />
            </a>
            <a
              href={`mailto:${LINKS.email}`}
              aria-label="Email"
              className="text-muted transition-colors hover:text-foreground"
            >
              <Mail size={19} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
