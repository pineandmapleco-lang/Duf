import { STATUS_META } from "@/lib/status";
import type { StatusLevel } from "@/lib/types";

export function StatusDot({ status, className = "" }: { status: StatusLevel; className?: string }) {
  const meta = STATUS_META[status];
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${meta.dot} ${className}`} />;
}

export function StatusBadge({ status, label }: { status: StatusLevel; label?: string }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.bg} ${meta.border} ${meta.text}`}
    >
      <StatusDot status={status} />
      {label ?? meta.label}
    </span>
  );
}
