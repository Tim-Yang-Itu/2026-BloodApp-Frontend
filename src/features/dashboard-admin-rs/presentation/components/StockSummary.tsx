import type { BloodStock } from "../types";

export function StockSummary({
  stocks,
  onViewAll,
}: {
  stocks: BloodStock[];
  onViewAll: () => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-heading">Ringkasan stok</h2>
          <p className="mt-1 text-xs text-muted">
            Ketersediaan kantong darah saat ini
          </p>
        </div>
        <button
          className="text-xs font-bold text-primary hover:underline"
          onClick={onViewAll}
          type="button"
        >
          Lihat semua
        </button>
      </div>
      <div className="mt-6 space-y-5">
        {stocks.map((stock) => (
          <div key={stock.type}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-bold text-heading">{stock.type}</span>
              <span className="font-semibold text-heading">
                {stock.amount}{" "}
                <span className="font-normal text-muted">kantong</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-highlight">
              <div
                className={`h-full rounded-full ${stock.barClass}`}
                style={{ width: `${Math.min(stock.amount * 3, 100)}%` }}
              />
            </div>
            <p
              className={`mt-1.5 text-[11px] font-semibold ${stock.statusClass}`}
            >
              {stock.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
