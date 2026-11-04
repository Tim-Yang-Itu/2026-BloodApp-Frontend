import { BLOOD_STOCK } from "../data";

export function StockPage() {
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold text-primary">
          Manajemen persediaan
        </p>
        <h1 className="mt-1 text-3xl font-bold text-heading">Stok Darah</h1>
        <p className="mt-2 text-sm text-muted">
          Kelola dan pantau ketersediaan darah rumah sakit.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {BLOOD_STOCK.map((stock) => (
          <article
            className="rounded-2xl border border-border bg-surface p-5"
            key={stock.type}
          >
            <div className="flex items-center justify-between">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-lg font-bold text-primary">
                {stock.type}
              </span>
              <span className={`text-xs font-bold ${stock.statusClass}`}>
                {stock.status}
              </span>
            </div>
            <p className="mt-5 text-3xl font-bold text-heading">
              {stock.amount}
            </p>
            <p className="text-xs text-muted">kantong tersedia</p>
          </article>
        ))}
      </div>
    </section>
  );
}
