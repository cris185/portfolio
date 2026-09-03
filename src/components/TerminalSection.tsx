"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

interface Line {
  type: "input" | "output" | "comment";
  text: string;
}

const LINKS = {
  github: "https://github.com/cris185",
  linkedin: "https://www.linkedin.com/in/cpd2001",
  email: "rugal8546@gmail.com",
};

export default function TerminalSection() {
  const t = useTranslations("hero");
  const [lines, setLines] = useState<Line[]>([
    { type: "input", text: "whoami" },
    { type: "output", text: t("bio") },
    { type: "input", text: "help" },
    { type: "output", text: "projects     -> jump to the work" },
    { type: "output", text: "skills       -> tech I actually use" },
    { type: "output", text: "contact      -> say hi" },
    { type: "output", text: "???          -> try something" },
    { type: "comment", text: "# there's more here if you're curious enough to look." },
  ]);
  const [value, setValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "nearest" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const next: Line[] = [...lines, { type: "input", text: raw }];

    switch (cmd) {
      case "":
        break;
      case "help":
        next.push(
          { type: "output", text: "projects     -> jump to the work" },
          { type: "output", text: "skills       -> tech I actually use" },
          { type: "output", text: "contact      -> say hi" },
          { type: "output", text: "clear        -> clear the screen" }
        );
        break;
      case "whoami":
        next.push({ type: "output", text: t("bio") });
        break;
      case "skills":
        next.push({
          type: "output",
          text: "React, Next.js, TypeScript, Django, Node.js, PostgreSQL, AWS, Docker",
        });
        break;
      case "projects":
        next.push({ type: "output", text: "opening #projects..." });
        setTimeout(() => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        }, 250);
        break;
      case "contact":
        next.push(
          { type: "output", text: `email    ${LINKS.email}` },
          { type: "output", text: `github   ${LINKS.github}` },
          { type: "output", text: `linkedin ${LINKS.linkedin}` }
        );
        break;
      case "clear":
        setLines([]);
        setValue("");
        return;
      case "sudo hell":
      case "doom":
        next.push({
          type: "output",
          text: "not yet — the game is still loading somewhere. check back soon.",
        });
        break;
      default:
        next.push({ type: "output", text: `command not found: ${raw}` });
    }
    setLines(next);
    setValue("");
  };

  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#050505] px-6 py-20 sm:px-12"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, #0a0a0c 0%, #000000 75%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, #ffffff05 0px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-[#0c0c0e] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#101012] px-[18px] py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a4a4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a4a4f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4a4a4f]" />
          <span className="mx-auto -translate-x-2 font-mono text-xs text-[#6f6f75]">
            cristian@portfolio: ~
          </span>
        </div>

        <div className="max-h-[420px] overflow-y-auto px-8 py-[26px] font-mono text-[14px] leading-[1.9]">
          {lines.map((line, i) =>
            line.type === "input" ? (
              <div key={i}>
                <span className="text-accent">cristian@portfolio</span>
                <span className="text-[#5c5c61]">:~$</span> <span className="text-[#e8e8e6]">{line.text}</span>
              </div>
            ) : line.type === "comment" ? (
              <div key={i} className="mt-1 text-[#45454a]">
                {line.text}
              </div>
            ) : (
              <div key={i} className="text-[#8f8f95]">
                {line.text}
              </div>
            )
          )}

          <div className="mt-1 flex items-center">
            <span className="text-accent">cristian@portfolio</span>
            <span className="text-[#5c5c61]">:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") run(value);
              }}
              className="ml-2.5 flex-1 bg-transparent text-[#e8e8e6] outline-none"
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
}
