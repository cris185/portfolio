"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, RotateCcw, Maximize2, X } from "lucide-react";

const MIN_SCALE = 0.4;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.25;

function clampScale(s: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
}

interface DragState {
  startX: number;
  startY: number;
  panX: number;
  panY: number;
}

/** Pan/zoom viewport for one rendered diagram — drag to pan, buttons or
 * ctrl/cmd+scroll to zoom, double-click to reset. Used both inline (fixed
 * height, auto-fits the diagram to the available width on mount) and inside
 * the fullscreen modal (fills the modal instead of self-sizing).
 */
function Viewport({
  svg,
  accentText,
  pillBg,
  pillBorder,
  onExpand,
  fillHeight,
}: {
  svg: string;
  accentText: string;
  pillBg: string;
  pillBorder: string;
  onExpand?: () => void;
  fillHeight?: boolean;
}) {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [boxHeight, setBoxHeight] = useState(320);
  // The mermaid SVG is `width="100%"` internally — inside a `width:
  // fit-content` wrapper that's circular (browsers fall back to the
  // replaced-element default of 300x150) unless the wrapper is given an
  // explicit pixel size instead. This is that size, read from the SVG's
  // own viewBox once it's rendered.
  const [naturalSize, setNaturalSize] = useState({ w: 800, h: 400 });
  const dragRef = useRef<DragState | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fitToWidth = useCallback(() => {
    const svgEl = contentRef.current?.querySelector("svg");
    const container = containerRef.current;
    if (!svgEl || !container) return;
    const natW = svgEl.viewBox?.baseVal?.width || svgEl.getBoundingClientRect().width;
    const natH = svgEl.viewBox?.baseVal?.height || svgEl.getBoundingClientRect().height;
    if (natW > 0 && natH > 0) setNaturalSize({ w: natW, h: natH });
    const availW = container.clientWidth - 24;
    const fit = natW > 0 && availW > 0 ? clampScale(Math.min(1, availW / natW)) : 1;
    setScale(fit);
    setPan({ x: 0, y: 0 });
    if (!fillHeight && natH > 0) {
      setBoxHeight(Math.min(560, Math.max(180, Math.round(natH * fit) + 32)));
    }
  }, [fillHeight]);

  // Fit once the SVG markup is in the DOM.
  useEffect(() => {
    const id = requestAnimationFrame(fitToWidth);
    return () => cancelAnimationFrame(id);
  }, [svg, fitToWidth]);

  const zoomIn = useCallback(() => setScale((s) => clampScale(+(s + ZOOM_STEP).toFixed(2))), []);
  const zoomOut = useCallback(() => setScale((s) => clampScale(+(s - ZOOM_STEP).toFixed(2))), []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return; // otherwise let the page scroll normally
    e.preventDefault();
    setScale((s) => clampScale(+(s - e.deltaY * 0.0015).toFixed(3)));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
    setDragging(true);
  }, [pan]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    setPan({
      x: dragRef.current.panX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.panY + (e.clientY - dragRef.current.startY),
    });
  }, []);

  const endDrag = useCallback(() => {
    dragRef.current = null;
    setDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-md"
      style={{ height: fillHeight ? "100%" : boxHeight }}
      onWheel={onWheel}
    >
      <div
        ref={contentRef}
        className="flex h-full w-full justify-center select-none [&_svg]:block [&_svg]:max-w-none"
        style={{ cursor: dragging ? "grabbing" : "grab", touchAction: "none", WebkitUserSelect: "none", userSelect: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onDoubleClick={fitToWidth}
      >
        {/* flex + justify-center, not margin:auto — margin:auto collapses to
            0 (not symmetric overflow) once this box is wider than its
            container, which it always is before it's scaled down. */}
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: "center top",
            transition: dragging ? "none" : "transform 0.12s ease-out",
            width: naturalSize.w,
            flexShrink: 0,
            paddingTop: 12,
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <div
        className="absolute bottom-2 right-2 flex items-center gap-0.5 rounded-md px-1.5 py-1"
        style={{ background: pillBg, border: `1px solid ${pillBorder}`, backdropFilter: "blur(6px)" }}
      >
        <button type="button" onClick={zoomOut} aria-label="Zoom out" className="rounded p-1 transition-opacity hover:opacity-70" style={{ color: accentText }}>
          <Minus size={13} />
        </button>
        <span className="min-w-[36px] text-center font-mono text-[10.5px]" style={{ color: accentText }}>
          {Math.round(scale * 100)}%
        </span>
        <button type="button" onClick={zoomIn} aria-label="Zoom in" className="rounded p-1 transition-opacity hover:opacity-70" style={{ color: accentText }}>
          <Plus size={13} />
        </button>
        <button type="button" onClick={fitToWidth} aria-label="Reset view" className="rounded p-1 transition-opacity hover:opacity-70" style={{ color: accentText }}>
          <RotateCcw size={12} />
        </button>
        {onExpand && (
          <button type="button" onClick={onExpand} aria-label="Expand" className="ml-0.5 rounded p-1 transition-opacity hover:opacity-70" style={{ color: accentText }}>
            <Maximize2 size={12} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function MermaidDiagram({
  chart,
  dark,
  accentText = "#7c7c86",
  pillBg = "#ffffff10",
  pillBorder = "#ffffff1f",
}: {
  chart: string;
  dark: boolean;
  accentText?: string;
  pillBg?: string;
  pillBorder?: string;
}) {
  const rawId = useId().replace(/[:]/g, "");
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: dark ? "dark" : "neutral",
        fontFamily: "var(--font-mono, monospace)",
        securityLevel: "strict",
        // A bit more breathing room than the defaults — dense flowcharts
        // (several edges converging on two stacked nodes) otherwise render
        // with arrowheads and labels crammed right at the node boundary.
        flowchart: { nodeSpacing: 45, rankSpacing: 65, padding: 12 },
        er: { entityPadding: 14 },
      });
      try {
        const { svg: rendered } = await mermaid.render(`mmd-${rawId}`, chart);
        if (!cancelled) setSvg(rendered);
      } catch {
        if (!cancelled) setFailed(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [chart, dark, rawId]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  if (failed) {
    return <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[11px] opacity-60">{chart}</pre>;
  }

  if (!svg) {
    return <div className="flex h-[200px] items-center justify-center font-mono text-[11px] opacity-50">Rendering…</div>;
  }

  return (
    <>
      {!expanded && (
        <Viewport svg={svg} accentText={accentText} pillBg={pillBg} pillBorder={pillBorder} onExpand={() => setExpanded(true)} />
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpanded(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Diagram"
              className="relative flex h-full max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg border shadow-2xl"
              style={{ background: dark ? "#0c0c0e" : "#ffffff", borderColor: pillBorder }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded p-1.5 transition-opacity hover:opacity-70"
                style={{ color: accentText, background: pillBg, border: `1px solid ${pillBorder}` }}
              >
                <X size={16} />
              </button>
              {/* min-h-0: a flex item's default min-height is "auto" (its
                  content's intrinsic size), which would keep this at the
                  diagram's full unscaled height instead of actually filling
                  the modal — the classic flexbox shrink bug. */}
              <div className="min-h-0 flex-1 p-2">
                <Viewport svg={svg} accentText={accentText} pillBg={pillBg} pillBorder={pillBorder} fillHeight />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
