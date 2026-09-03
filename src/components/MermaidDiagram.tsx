"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function MermaidDiagram({ chart, dark }: { chart: string; dark: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId().replace(/[:]/g, "");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: dark ? "dark" : "neutral",
        fontFamily: "var(--font-mono, monospace)",
        securityLevel: "strict",
      });
      try {
        const { svg } = await mermaid.render(`mmd-${rawId}`, chart);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (!cancelled) setFailed(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, dark, rawId]);

  if (failed) {
    return (
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[11px] opacity-60">{chart}</pre>
    );
  }

  return <div ref={ref} className="mermaid-diagram flex justify-center overflow-x-auto [&_svg]:mx-auto [&_svg]:min-w-[520px]" />;
}