"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({
  value,
  color,
}: {
  value: string;
  color: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy"
      className="inline-flex shrink-0 items-center justify-center rounded p-1 transition-opacity hover:opacity-70"
      style={{ color }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}
