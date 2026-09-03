import { Folder, File } from "lucide-react";
import type { TreeNode } from "@/lib/projects";

function TreeRow({
  node,
  depth,
  accentText,
  textPrimary,
  textSecondary,
}: {
  node: TreeNode;
  depth: number;
  accentText: string;
  textPrimary: string;
  textSecondary: string;
}) {
  const isDir = !!node.children?.length;
  const Icon = isDir ? Folder : File;

  return (
    <div>
      <div className="flex items-center gap-2 py-1" style={{ paddingLeft: `${depth * 18}px` }}>
        <Icon size={13} className="shrink-0" style={{ color: isDir ? accentText : textSecondary, opacity: isDir ? 0.9 : 0.6 }} />
        <span className="font-mono text-[12.5px]" style={{ color: isDir ? textPrimary : textSecondary }}>
          {node.name}
        </span>
        {node.comment && (
          <span className="truncate text-[11.5px]" style={{ color: textSecondary, opacity: 0.7 }}>
            {node.comment}
          </span>
        )}
      </div>
      {node.children?.map((child) => (
        <TreeRow key={child.name} node={child} depth={depth + 1} accentText={accentText} textPrimary={textPrimary} textSecondary={textSecondary} />
      ))}
    </div>
  );
}

export default function FileTree({
  nodes,
  accentText,
  textPrimary,
  textSecondary,
}: {
  nodes: TreeNode[];
  accentText: string;
  textPrimary: string;
  textSecondary: string;
}) {
  return (
    <div>
      {nodes.map((node) => (
        <TreeRow key={node.name} node={node} depth={0} accentText={accentText} textPrimary={textPrimary} textSecondary={textSecondary} />
      ))}
    </div>
  );
}
