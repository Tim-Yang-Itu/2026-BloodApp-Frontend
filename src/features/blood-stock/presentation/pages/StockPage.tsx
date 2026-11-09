import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'

import { Button, StatusBadge } from '@/shared/ui'

import type { StockGroupDto } from '../../application/dto/blood-stock.dto'
import type { BloodBagStatus } from '../../domain/entities/blood-bag'
import { BLOOD_BAG_STATUSES } from '../../domain/entities/blood-bag'
import { BLOOD_BAG_STATUS_LABEL } from '../../domain/enums/blood-bag-status'
import { AddBloodBagDialog } from '../components/AddBloodBagDialog'
import { useBloodStock } from '../hooks/use-blood-stock'

const PAGE_SIZE = 8

type StatusFilter = 'all' | BloodBagStatus

function StockTypeCard({ group }: { group: StockGroupDto }) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-5 shadow-field">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-50 text-xs font-bold text-primary-700">
          {group.bloodType}
        </span>
        <p className="m-0 font-display text-2xl leading-none font-bold text-heading">{group.total}</p>
        <span className="text-xs text-muted">Kantong</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-surface-muted px-3 py-2">
          <p className="m-0 text-[11px] text-muted">Rhesus +</p>
          <p className="m-0 text-sm font-bold text-foreground">{group.positive}</p>
        </div>
        <div className="rounded-lg bg-surface-muted px-3 py-2">
          <p className="m-0 text-[11px] text-muted">Rhesus −</p>
          <p className="m-0 text-sm font-bold text-foreground">{group.negative}</p>
        </div>
      </div>
    </article>
  )
}

function expiryHint(days: number): string {
  if (days <= 0) {
    return 'Hari ini'
  }

  return `${days} hari lagi`
}

/** UTD-02 / UTD-03: pencatatan dan pemantauan kantong darah. */
export function StockPage() {
  const { bags, summary, isLoading, error, today, addBag } = useBloodStock()
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [page, setPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredBags = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return bags.filter((bag) => {
      const matchesQuery = keyword.length === 0 || bag.id.toLowerCase().includes(keyword)
      const matchesStatus = statusFilter === 'all' || bag.status === statusFilter

      return matchesQuery && matchesStatus
    })
  }, [bags, query, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredBags.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visibleBags = filteredBags.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function resetFilters() {
    setQuery('')
    setStatusFilter('all')
    setPage(1)
  }

  return (
    <div className="w-full px-6 py-8 pb-16 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-3xl font-bold tracking-[-0.02em] text-heading">Stok Darah</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus aria-hidden="true" className="size-4" />
          Tambah Kantong
        </Button>
      </header>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summary.groups.map((group) => (
          <StockTypeCard group={group} key={group.bloodType} />
        ))}
      </div>

      <section className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-field">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
          <h2 className="m-0 text-lg font-bold text-heading">Daftar Kantong</h2>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
              />
              <input
                aria-label="Cari ID kantong"
                className="w-56 max-w-full rounded-lg border border-border bg-surface py-2.5 pr-3 pl-9 text-sm text-foreground outline-none transition placeholder:text-placeholder focus:border-primary focus:ring-2 focus:ring-primary-100"
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                placeholder="Cari ID kantong"
                type="search"
                value={query}
              />
            </div>

            <div className="relative">
              <SlidersHorizontal
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted"
              />
              <select
                aria-label="Filter status kantong"
                className="cursor-pointer appearance-none rounded-lg border border-border bg-surface py-2.5 pr-9 pl-9 text-sm font-semibold text-label outline-none transition focus:border-primary focus:ring-2 focus:ring-primary-100"
                onChange={(event) => {
                  setStatusFilter(event.target.value as StatusFilter)
                  setPage(1)
                }}
                value={statusFilter}
              >
                <option value="all">Filter</option>
                {BLOOD_BAG_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {BLOOD_BAG_STATUS_LABEL[status]}
                  </option>
                ))}
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted"
              />
            </div>

            <button
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-transparent px-3 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
              onClick={resetFilters}
              type="button"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Reset
            </button>
          </div>
        </div>

        {isLoading ? (
          <p className="m-0 px-5 py-10 text-sm text-muted">Memuat kantong darah…</p>
        ) : null}

        {error ? (
          <p className="m-0 px-5 py-6 text-sm text-danger" role="alert">
            {error}
          </p>
        ) : null}

        {!isLoading && !error ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-sm">
                <thead>
                  <tr className="text-left text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
                    <th className="border-b border-border px-5 py-3.5 font-semibold">ID Kantong</th>
                    <th className="border-b border-border px-5 py-3.5 font-semibold">Golongan</th>
                    <th className="border-b border-border px-5 py-3.5 font-semibold">Rhesus</th>
                    <th className="border-b border-border px-5 py-3.5 font-semibold">Tanggal Masuk</th>
                    <th className="border-b border-border px-5 py-3.5 font-semibold">
                      Tanggal Expired
                    </th>
                    <th className="border-b border-border px-5 py-3.5 text-right font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleBags.length === 0 ? (
                    <tr>
                      <td className="px-5 py-10 text-center text-sm text-muted" colSpan={6}>
                        Tidak ada kantong yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    visibleBags.map((bag) => (
                      <tr key={bag.id} className="transition-colors hover:bg-surface-muted/60">
                        <td className="border-b border-border px-5 py-3.5 font-bold text-foreground">
                          {bag.id}
                        </td>
                        <td className="border-b border-border px-5 py-3.5 text-foreground">
                          {bag.bloodType}
                        </td>
                        <td className="border-b border-border px-5 py-3.5 text-foreground">
                          {bag.rhesusLabel}
                        </td>
                        <td className="border-b border-border px-5 py-3.5 text-muted">
                          {bag.collectedAtLabel}
                        </td>
                        <td className="border-b border-border px-5 py-3.5 text-muted">
                          <div className="flex flex-wrap items-center gap-2">
                            <span>{bag.expiresAtLabel}</span>
                            {bag.expiringSoon ? (
                              <span className="rounded-md bg-warning/10 px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap text-warning">
                                {expiryHint(bag.daysUntilExpiry)}
                              </span>
                            ) : null}
                          </div>
                        </td>
                        <td className="border-b border-border px-5 py-3.5 text-right">
                          <StatusBadge label={bag.statusLabel} tone={bag.statusTone} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <p className="m-0 text-xs text-muted">
                Menampilkan {visibleBags.length} dari {filteredBags.length} kantong
              </p>

              <div className="flex items-center gap-1">
                <button
                  aria-label="Halaman sebelumnya"
                  className="grid size-8 cursor-pointer place-items-center rounded-lg border border-border bg-surface text-muted transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  type="button"
                >
                  <ChevronLeft aria-hidden="true" className="size-4" />
                </button>

                {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                  <button
                    className={`grid size-8 cursor-pointer place-items-center rounded-lg border text-xs font-bold transition-colors ${
                      pageNumber === currentPage
                        ? 'border-primary bg-primary text-on-primary'
                        : 'border-border bg-surface text-label hover:bg-surface-muted'
                    }`}
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    type="button"
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  aria-label="Halaman berikutnya"
                  className="grid size-8 cursor-pointer place-items-center rounded-lg border border-border bg-surface text-muted transition-colors hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          </>
        ) : null}
      </section>

      {isDialogOpen ? (
        <AddBloodBagDialog
          onClose={() => setIsDialogOpen(false)}
          onSubmit={addBag}
          today={today}
        />
      ) : null}
    </div>
  )
}
