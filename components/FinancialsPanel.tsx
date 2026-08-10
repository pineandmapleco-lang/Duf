import { PanelCard } from "@/components/shared/PanelCard";
import { PanelEmpty, PanelError, PanelLoading } from "@/components/shared/PanelStates";
import type { FinancialItem } from "@/lib/types";

function formatCurrency(value: number, currency: string | null): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency ?? "USD",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${currency ?? "USD"} ${value.toLocaleString()}`;
  }
}

export function FinancialsPanel({
  data,
  error,
  loading,
}: {
  data: FinancialItem[] | null;
  error: string | null;
  loading: boolean;
}) {
  const items = data ?? [];
  const maxRevenue = Math.max(1, ...items.map((i) => i.revenue));

  return (
    <PanelCard title="Revenue & Financials">
      {loading && !data && <PanelLoading rows={3} />}
      {error && !data && <PanelError message={error} />}

      {data && items.length === 0 && (
        <PanelEmpty
          title="No financial data connected"
          hint="Set NOTION_FINANCIALS_DATABASE_ID in .env to pull entity revenue from Notion. Until then this panel stays empty rather than breaking."
        />
      )}

      {items.length > 0 && (
        <div className="space-y-3">
          {items
            .sort((a, b) => b.revenue - a.revenue)
            .map((item) => (
              <div key={item.entityName} className="animate-fadeIn">
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-medium text-white">{item.entityName}</span>
                  <span className="text-base-500">
                    {formatCurrency(item.revenue, item.currency)}
                    {item.period ? ` · ${item.period}` : ""}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-base-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-teal to-accent-teal/60 transition-all duration-500"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </PanelCard>
  );
}
