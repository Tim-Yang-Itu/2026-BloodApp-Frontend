import type { BloodRequest } from "../types";
import { STATUS_STYLES } from "../data";

export function RecentRequests({
  requests,
  onViewAll,
}: {
  requests: BloodRequest[];
  onViewAll: () => void;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-heading">Permintaan terbaru</h2>
          <p className="mt-1 text-xs text-muted">
            Aktivitas permintaan darah terakhir
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
      <div className="mt-5 divide-y divide-border">
        {requests.map((request) => (
          <div
            className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
            key={request.id}
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-sm font-bold text-primary">
              {request.blood}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-heading">
                {request.patient}
              </p>
              <p className="mt-0.5 text-xs text-muted">
                {request.id} · {request.amount}
              </p>
            </div>
            <div className="text-right">
              <span
                className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${STATUS_STYLES[request.status]}`}
              >
                {request.status}
              </span>
              <p className="mt-1 text-[10px] text-muted">{request.date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
