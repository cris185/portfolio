import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Mail, Download, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const LINKS = {
  github: "https://github.com/cris185",
  linkedin: "https://www.linkedin.com/in/cpd2001",
  email: "rugal8546@gmail.com",
};

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Django",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Docker",
];

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-28 sm:px-12">
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

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* left: identity */}
        <div>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] sm:h-40 sm:w-40">
              <Image
                src="/avatar.jpg"
                alt="Cristian Puentes"
                width={160}
                height={160}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="text-center sm:text-left">
              <div className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {t("role")}
              </div>
              <h1 className="mb-1 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {t("name")}
              </h1>
              <div className="flex items-center justify-center gap-1.5 font-mono text-xs text-muted sm:justify-start">
                <MapPin size={13} />
                {t("location")}
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-[15px] leading-relaxed text-muted sm:mx-0 sm:text-left">
            {t("bio")}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
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

          <div className="mt-6 flex items-center justify-center gap-4 sm:justify-start">
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

        {/* right: decorative status card */}
        <div className="hidden justify-self-end lg:flex">
          <div className="w-[380px] overflow-hidden rounded-xl border border-white/10 bg-[#131316] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 border-b border-white/10 px-[18px] py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2 font-mono text-[11px] text-white/40">status.ts</span>
            </div>
            <div className="px-5 py-[22px] font-mono text-[13px] leading-loose">
              <div>
                <span className="text-[#7c93c9]">const</span>{" "}
                <span className="text-foreground">cristian</span>{" "}
                <span className="text-white/40">=</span> <span className="text-white/40">{"{"}</span>
              </div>
              <div className="pl-5">
                <span className="text-[#e0a9d0]">role</span>
                <span className="text-white/40">:</span>{" "}
                <span className="text-accent">&quot;Systems Engineer&quot;</span>
                <span className="text-white/40">,</span>
              </div>
              <div className="pl-5">
                <span className="text-[#e0a9d0]">currently</span>
                <span className="text-white/40">:</span>{" "}
                <span className="text-accent">&quot;Geeks5g&quot;</span>
                <span className="text-white/40">,</span>
              </div>
              <div className="pl-5">
                <span className="text-[#e0a9d0]">since</span>
                <span className="text-white/40">:</span> <span className="text-[#7c93c9]">&quot;2025-06&quot;</span>
                <span className="text-white/40">,</span>
              </div>
              <div className="pl-5">
                <span className="text-[#e0a9d0]">focus</span>
                <span className="text-white/40">:</span>{" "}
                <span className="text-white/40">[</span>
                <span className="text-accent">&quot;Django&quot;</span>
                <span className="text-white/40">,</span> <span className="text-accent">&quot;Next.js&quot;</span>
                <span className="text-white/40">],</span>
              </div>
              <div className="pl-5">
                <span className="text-[#e0a9d0]">status</span>
                <span className="text-white/40">:</span> <span className="text-[#7fb37a]">&quot;shipping&quot;</span>
              </div>
              <div className="text-white/40">{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
