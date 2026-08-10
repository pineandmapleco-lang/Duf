import type { QuickLink } from "@/lib/config";

export function QuickLinksFooter({ links }: { links: QuickLink[] }) {
  return (
    <footer className="border-t border-base-700 px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-base-500">
          Quick Actions
        </p>
        {links.length === 0 ? (
          <p className="text-xs text-base-500/80">
            No quick links configured — set NEXT_PUBLIC_QUICK_LINKS in .env.
          </p>
        ) : (
          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-base-600 bg-base-800 px-3 py-1.5 text-xs font-medium text-base-500 transition-colors hover:border-accent-teal/50 hover:text-accent-teal"
              >
                {link.label} ↗
              </a>
            ))}
          </nav>
        )}
      </div>
    </footer>
  );
}
