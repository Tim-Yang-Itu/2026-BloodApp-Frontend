import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { PublicNavbar } from '@/shared/ui'

import { DonationIntentCard } from '../components/DonationIntentCard'
import { DonationPreparationCard } from '../components/DonationPreparationCard'
import { LocationOverviewCard } from '../components/LocationOverviewCard'
import { SchedulePicker } from '../components/SchedulePicker'
import { primaryLinkClass } from '../components/link-styles'
import { useLocationDetail } from '../hooks/use-location-detail'

const backLinkClass =
  'inline-flex items-center gap-1.5 text-sm font-semibold text-primary no-underline hover:underline'

function BackLink() {
  return (
    <Link className={backLinkClass} to="/lokasi-donor">
      <ChevronLeft aria-hidden="true" className="size-4" />
      Kembali ke daftar lokasi
    </Link>
  )
}

/**
 * PDN-03: detail lokasi donor + pemilihan jadwal (tanggal & jam).
 * Bila lokasi tidak ditemukan, halaman menampilkan keadaan kosong, bukan error.
 */
export function DonorLocationDetailPage() {
  const { locationId } = useParams<{ locationId: string }>()
  const { detail, isLoading, notFound, error } = useLocationDetail(locationId)

  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null)

  // Pilih otomatis hari pertama yang masih punya kursi + jam pertamanya.
  useEffect(() => {
    if (!detail) {
      return
    }

    const firstDay = detail.schedule.find((day) => day.remaining > 0) ?? detail.schedule[0]
    if (!firstDay) {
      setSelectedDate(null)
      setSelectedSlotId(null)
      return
    }

    setSelectedDate(firstDay.date)
    setSelectedSlotId(detail.slotsByDate[firstDay.date]?.find((slot) => !slot.full)?.id ?? null)
  }, [detail])

  const activeDay = detail?.schedule.find((day) => day.date === selectedDate) ?? null
  const activeSlots = detail && selectedDate ? (detail.slotsByDate[selectedDate] ?? []) : []
  const activeSlot = activeSlots.find((slot) => slot.id === selectedSlotId) ?? null

  function handleSelectDate(date: string) {
    setSelectedDate(date)
    setSelectedSlotId(detail?.slotsByDate[date]?.find((slot) => !slot.full)?.id ?? null)
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar activeNav="lokasi" />

      {isLoading ? (
        <main className="mx-auto w-[calc(100%-3rem)] max-w-[640px] py-20 text-center">
          <p className="m-0 text-sm text-muted">Memuat detail lokasi…</p>
        </main>
      ) : null}

      {!isLoading && (notFound || error || !detail) ? (
        <main className="mx-auto w-[calc(100%-3rem)] max-w-[640px] py-20 text-center">
          <h1 className="text-2xl font-bold text-heading">
            {error ? 'Detail lokasi gagal dimuat' : 'Lokasi tidak ditemukan'}
          </h1>
          <p className="mt-2 text-muted">
            {error ?? 'Lokasi yang kamu cari mungkin sudah dihapus atau tautannya salah.'}
          </p>
          <Link className={`${primaryLinkClass} mt-6 max-w-[280px]`} to="/lokasi-donor">
            Kembali ke daftar lokasi
          </Link>
        </main>
      ) : null}

      {!isLoading && detail ? (
        <main className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-8 pb-20">
          <BackLink />

          <div className="mt-5 grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)]">
            <div className="flex flex-col gap-6">
              <LocationOverviewCard detail={detail} />

              <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <h2 className="text-lg font-bold text-heading">Pilih jadwal donor</h2>
                <div className="mt-4">
                  <SchedulePicker
                    days={detail.schedule}
                    onSelectDate={handleSelectDate}
                    onSelectSlot={setSelectedSlotId}
                    selectedDate={selectedDate}
                    selectedSlotId={selectedSlotId}
                    slots={activeSlots}
                  />
                </div>
              </section>

              <DonationPreparationCard
                bringItems={detail.bringItems}
                requirements={detail.requirements}
              />
            </div>

            <div className="lg:sticky lg:top-24">
              <DonationIntentCard
                dateLabel={activeDay?.longDate ?? 'Pilih tanggal'}
                locationName={detail.name}
                timeLabel={activeSlot?.time ?? 'Pilih jam'}
              />
            </div>
          </div>
        </main>
      ) : null}
    </div>
  )
}

export default DonorLocationDetailPage
