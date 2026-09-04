"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface CommandEntry {
  cmd: string;
  desc: string;
}

export default function CommandsModal({
  open,
  onClose,
  commands,
}: {
  open: boolean;
  onClose: () => void;
  commands: CommandEntry[];
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Terminal commands"
            className="relative w-full max-w-lg overflow-hidden rounded-lg border border-white/10 bg-[#0c0c0e] shadow-[0_60px_120px_-40px_rgba(0,0,0,0.85)]"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-[#101012] px-5 py-3.5">
              <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#6f6f75]">
                Available commands
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-[#6f6f75] transition-colors hover:text-[#e8e8e6]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
              <table className="w-full border-collapse font-mono text-[12.5px]">
                <tbody>
                  {commands.map((c) => (
                    <tr key={c.cmd} className="border-b border-white/5 last:border-0">
                      <td className="py-2.5 pr-4 align-top whitespace-nowrap text-accent">{c.cmd}</td>
                      <td className="py-2.5 text-[#9a9aa0]">{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
