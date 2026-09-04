"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Terminal as TerminalIcon } from "lucide-react";
import { projects } from "@/lib/projects";
import { professionalWorks } from "@/lib/professional";
import { references } from "@/lib/references";
import CommandsModal, { type CommandEntry } from "@/components/CommandsModal";

interface Line {
  type: "input" | "output" | "comment";
  text: string;
}

const LINKS = {
  github: "https://github.com/cris185",
  linkedin: "https://www.linkedin.com/in/cpd2001",
  email: "rugal8546@gmail.com",
};

const SKILLS_LINE = "React, Next.js, TypeScript, Django, Node.js, PostgreSQL, AWS, Docker";

const COMMANDS: CommandEntry[] = [
  { cmd: "whoami", desc: "About me" },
  { cmd: "whoami name | role | stack", desc: "One specific fact about me" },
  { cmd: "projects", desc: "Summary of all personal projects" },
  { cmd: "projects <name>", desc: "Details on one personal project" },
  { cmd: "experience", desc: "Summary of all professional work" },
  { cmd: "experience <name>", desc: "Details on one client project" },
  { cmd: "references", desc: "Summary of all references" },
  { cmd: "references <name>", desc: "Details on one reference (or: reference -<name>)" },
  { cmd: "skills", desc: "Tech I actually use" },
  { cmd: "contact", desc: "Say hi" },
  { cmd: "clear", desc: "Clear the screen" },
  { cmd: "commands", desc: "Open this list" },
];

/** Normalizes for loose matching: "Seven Lever" / "seven-lever" / "sevenlever" all match. */
function norm(s: string): string {
  return s.toLowerCase().replace(/[\s\-_]/g, "");
}

function parseCommand(raw: string): { cmd: string; arg: string } {
  const trimmed = raw.trim();
  const [cmd, ...rest] = trimmed.split(/\s+/);
  let arg = rest.join(" ").trim();
  if (arg.startsWith("-")) arg = arg.slice(1).trim();
  arg = arg.replace(/^["']|["']$/g, "").replace(/["']$/, "");
  return { cmd: (cmd ?? "").toLowerCase(), arg };
}

function padList(entries: { name: string; sub: string }[]): string[] {
  const width = Math.max(0, ...entries.map((e) => e.name.length)) + 3;
  return entries.map((e) => `${e.name.padEnd(width)}-> ${e.sub}`);
}

function findEntry<T extends { id: string; name: string }>(entries: T[], query: string): T | undefined {
  const q = norm(query);
  if (!q) return undefined;
  return (
    entries.find((e) => norm(e.id) === q || norm(e.name) === q) ??
    entries.find((e) => norm(e.name).includes(q) || norm(e.id).includes(q))
  );
}

export default function TerminalSection() {
  const t = useTranslations("hero");
  const tProjects = useTranslations("projects");
  const tProfessional = useTranslations("professional");
  const [commandsOpen, setCommandsOpen] = useState(false);

  const projectEntries = projects.map((p) => ({
    id: p.id,
    name: tProjects(`${p.id}.name`),
    category: tProjects(`${p.id}.category`),
    tagline: tProjects(`${p.id}.tagline`),
    href: p.href,
    repo: p.repo,
    techStack: p.techStack ?? [],
  }));

  const experienceEntries = professionalWorks
    .filter((w) => !w.locked)
    .map((w) => ({
      id: w.id,
      name: tProfessional(`${w.id}.name`),
      category: tProfessional(`${w.id}.category`),
      tagline: tProfessional(`${w.id}.tagline`),
      href: w.href,
      techStack: w.techStack ?? [],
    }));

  const referenceEntries = references.map((r) => ({
    id: r.id,
    name: r.name,
    role: r.role,
    linkedin: r.linkedin,
    portfolio: r.portfolio,
  }));

  const [lines, setLines] = useState<Line[]>([
    { type: "input", text: "whoami" },
    { type: "output", text: t("bio") },
    { type: "input", text: "help" },
    { type: "output", text: "projects     -> summary of my personal projects" },
    { type: "output", text: "experience   -> summary of my professional work" },
    { type: "output", text: "references   -> people I've worked with" },
    { type: "output", text: "skills       -> tech I actually use" },
    { type: "output", text: "contact      -> say hi" },
    { type: "output", text: "commands     -> full list, in a window" },
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
    const { cmd, arg } = parseCommand(raw);
    const next: Line[] = [...lines, { type: "input", text: raw }];
    const out = (text: string) => next.push({ type: "output", text });

    switch (cmd) {
      case "":
        break;

      case "help":
        out("projects     -> summary of my personal projects");
        out("experience   -> summary of my professional work");
        out("references   -> people I've worked with");
        out("skills       -> tech I actually use");
        out("contact      -> say hi");
        out("clear        -> clear the screen");
        out("commands     -> full list, in a window");
        break;

      case "commands":
        out("opening command list...");
        setCommandsOpen(true);
        break;

      case "whoami": {
        if (!arg) {
          out(t("bio"));
          break;
        }
        const field = norm(arg);
        if (field === "name") out(t("name"));
        else if (field === "role") out(t("role"));
        else if (field === "stack") out(SKILLS_LINE);
        else out(`whoami: no field "${arg}" (try name, role, or stack)`);
        break;
      }

      case "skills":
        out(SKILLS_LINE);
        break;

      case "projects": {
        if (!arg) {
          padList(projectEntries.map((e) => ({ name: e.name, sub: e.tagline }))).forEach(out);
          out('type "projects <name>" for details on one');
          break;
        }
        const entry = findEntry(projectEntries, arg);
        if (!entry) {
          out(`projects: no match for "${arg}"`);
          break;
        }
        out(entry.name);
        out(entry.category);
        out(entry.tagline);
        if (entry.techStack.length) out(`stack   ${entry.techStack.join(", ")}`);
        if (entry.href) out(`live    ${entry.href}`);
        if (entry.repo) out(`repo    ${entry.repo}`);
        break;
      }

      case "experience": {
        if (!arg) {
          padList(experienceEntries.map((e) => ({ name: e.name, sub: e.tagline }))).forEach(out);
          out('type "experience <name>" for details on one');
          break;
        }
        const entry = findEntry(experienceEntries, arg);
        if (!entry) {
          out(`experience: no match for "${arg}"`);
          break;
        }
        out(entry.name);
        out(entry.category);
        out(entry.tagline);
        if (entry.techStack.length) out(`stack   ${entry.techStack.join(", ")}`);
        if (entry.href) out(`live    ${entry.href}`);
        break;
      }

      case "references":
      case "reference": {
        if (!arg) {
          padList(referenceEntries.map((e) => ({ name: e.name, sub: e.role }))).forEach(out);
          out('type "references <name>" for details on one');
          break;
        }
        const entry = findEntry(referenceEntries, arg);
        if (!entry) {
          out(`references: no match for "${arg}"`);
          break;
        }
        out(entry.name);
        out(entry.role);
        out(`linkedin  ${entry.linkedin}`);
        if (entry.portfolio) out(`portfolio ${entry.portfolio}`);
        break;
      }

      case "contact":
        out(`email    ${LINKS.email}`);
        out(`github   ${LINKS.github}`);
        out(`linkedin ${LINKS.linkedin}`);
        break;

      case "clear":
        setLines([]);
        setValue("");
        return;

      case "sudo hell":
      case "doom":
        out("not yet — the game is still loading somewhere. check back soon.");
        break;

      default:
        out(`command not found: ${raw}`);
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
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a4a4f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a4a4f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#4a4a4f]" />
          </div>
          <span className="flex-1 text-center font-mono text-xs text-[#6f6f75]">
            cristian@portfolio: ~
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCommandsOpen(true);
            }}
            className="flex items-center gap-1.5 rounded border border-white/10 px-2.5 py-1 font-mono text-[10.5px] text-[#8f8f95] transition-colors hover:border-accent hover:text-accent"
          >
            <TerminalIcon size={11} />
            commands
          </button>
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

      <CommandsModal open={commandsOpen} onClose={() => setCommandsOpen(false)} commands={COMMANDS} />
    </section>
  );
}
