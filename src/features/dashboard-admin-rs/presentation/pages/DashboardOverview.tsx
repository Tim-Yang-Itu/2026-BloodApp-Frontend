import {
  Activity,
  AlertTriangle,
  CircleCheck,
  Clock3,
  Droplets,
  Plus,
} from "lucide-react";

import { BLOOD_STOCK, REQUESTS } from "../data";
import { RecentRequests } from "../components/RecentRequests";
import { StatCard } from "../components/StatCard";
import { StockSummary } from "../components/StockSummary";
import type { DashboardTab } from "../types";

export function DashboardOverview({
  onNavigate,
}: {
  onNavigate: (tab: DashboardTab) => void;
}) {
  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">
            Rabu, 14 Mei 2026
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
            Selamat pagi, Admin!
          </h1>
          <p className="mt-2 text-sm text-muted">
            Pantau kebutuhan darah rumah sakitmu hari ini.
          </p>
        </div>
        <button
          className="inline-flex items-center cursor-pointer gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-on-primary shadow-field hover:bg-primary-hover"
          onClick={() => onNavigate("requests")}
          type="button"
        >
          <Plus className="size-4" />
          Buat permintaan
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Droplets}
          label="Total stok darah"
          note="Dari 8 golongan darah"
          tone="red"
          value="56 kantong"
        />
        <StatCard
          icon={Clock3}
          label="Permintaan aktif"
          note="2 menunggu persetujuan"
          tone="orange"
          value="4 permintaan"
        />
        <StatCard
          icon={CircleCheck}
          label="Permintaan selesai"
          note="Bulan ini"
          tone="green"
          value="28 permintaan"
        />
        <StatCard
          icon={Activity}
          label="Kebutuhan rata-rata"
          note="7 hari terakhir"
          tone="dark"
          value="12 kantong"
        />
      </div>
      <section className="mt-6 flex items-start gap-3 rounded-2xl border border-primary-200 bg-primary-50 p-5">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-bold text-primary-800">Perhatian stok</p>
          <p className="mt-1 text-xs leading-relaxed text-primary-800/80">
            Stok golongan darah AB+ mulai menipis. Pertimbangkan untuk membuat
            permintaan tambahan ke UTD terdekat.
          </p>
        </div>
        <button
          className="ml-auto shrink-0 text-xs font-bold text-primary hover:underline"
          onClick={() => onNavigate("stock")}
          type="button"
        >
          Cek stok
        </button>
      </section>
    
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1fr]">
        <StockSummary
          onViewAll={() => onNavigate("stock")}
          stocks={BLOOD_STOCK}
        />
        <RecentRequests
          onViewAll={() => onNavigate("requests")}
          requests={REQUESTS}
        />
      </div>
      </>
  );
}
