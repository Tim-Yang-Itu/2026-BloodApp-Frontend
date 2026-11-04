import { Plus, Timer, Check, X, Droplet } from "lucide-react";

import { REQUESTS, STATUS_STYLES } from "../data";
import { StatCard } from "../components/StatCard";

export function RequestsPage() {
  return (
    <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">
            Pelacakan pengajuan
          </p>
          <h1 className="mt-1 text-3xl font-bold text-heading">
            Permintaan Saya
          </h1>
          <p className="mt-2 text-sm text-muted">
            Pantau status semua permintaan darah rumah sakit.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary shadow-field hover:bg-primary-hover"
          type="button"
        >
          <Plus className="size-4" />
          Permintaan baru
        </button>
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Timer}
          label="Menunggu Approval"
          tone="green"
          value="1 Permintaan"
        />
        <StatCard
          icon={Check}
          label="Telah Disetujui"
          tone="green"
          value="23 Permintaan"
        />
        <StatCard
          icon={X}
          label="Ditolak"
          tone="red"
          value="3 Permintaan"
        />
        <StatCard
          icon={Droplet}
          label="Diterima Bulan Ini"
          tone="green"
          value="30 Permintaan"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-surface-muted text-xs text-muted">
              <tr>
                <th className="px-5 py-4 font-semibold">ID Permintaan</th>
                <th className="px-5 py-4 font-semibold">Pasien</th>
                <th className="px-5 py-4 font-semibold">Golongan</th>
                <th className="px-5 py-4 font-semibold">Jumlah</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4 font-semibold">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {REQUESTS.map((request) => (
                <tr className="text-label" key={request.id}>
                  <td className="px-5 py-4 font-bold text-heading">
                    {request.id}
                  </td>
                  <td className="px-5 py-4">{request.patient}</td>
                  <td className="px-5 py-4 font-bold text-primary">
                    {request.blood}
                  </td>
                  <td className="px-5 py-4">{request.amount}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-[12px] font-bold ${STATUS_STYLES[request.status]}`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-muted">
                    {request.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
