import type { ReactNode } from "react";

export function PanelCard({
  title,
  action,
  children,
  className = "",
  bodyClassName = "",
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-base-700 bg-base-900/60 shadow-panel ${className}`}
    >
      <header className="flex items-center justify-between border-b border-base-700 px-5 py-3.5">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-base-500">{title}</h2>
        {action}
      </header>
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
    </section>
  );
}
