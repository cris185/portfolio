import { ArrowDown } from "lucide-react";

export default function LayerStackDiagram({
  layers,
  accentText,
  textPrimary,
  textSecondary,
  pillBorder,
  pillBg,
  isDark,
}: {
  layers: { title: string; detail: string }[];
  accentText: string;
  textPrimary: string;
  textSecondary: string;
  pillBorder: string;
  pillBg: string;
  isDark: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      {layers.map((layer, i) => (
        <div key={layer.title} className="flex w-full max-w-md flex-col items-center">
          <div
            className="w-full rounded-lg px-5 py-3.5 text-center"
            style={{
              background: isDark ? "#00000030" : "#ffffff",
              border: `1px solid ${pillBorder}`,
              borderLeft: `3px solid ${accentText}`,
            }}
          >
            <div className="text-[13px] font-semibold" style={{ color: textPrimary }}>
              {layer.title}
            </div>
            <div className="mt-0.5 font-mono text-[11.5px]" style={{ color: textSecondary }}>
              {layer.detail}
            </div>
          </div>
          {i < layers.length - 1 && (
            <ArrowDown size={16} className="my-1.5 shrink-0" style={{ color: accentText, opacity: 0.6 }} />
          )}
        </div>
      ))}
    </div>
  );
}
