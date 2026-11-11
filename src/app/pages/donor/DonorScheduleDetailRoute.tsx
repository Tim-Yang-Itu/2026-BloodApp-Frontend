import { useState } from 'react'

import { DonorFormFlow } from '@/features/donor-registration'
import { DonorLocationDetailPage } from '@/features/donor-location'
import type { DonorScheduleSelection } from '@/features/donor-location'

/**
 * Rute `jadwal-donor/:locationId` di area pendonor.
 *
 * Tombol "Saya Ingin Donor" tidak berpindah halaman: form donor langsung
 * ditampilkan di halaman ini, dan kembali ke detail jadwal saat dibatalkan.
 */
export function DonorScheduleDetailRoute() {
  const [selection, setSelection] = useState<DonorScheduleSelection | null>(null)

  if (selection) {
    return (
      <div className="w-full">
        <DonorFormFlow
          date={selection.date}
          locationAddress={selection.locationAddress}
          locationId={selection.locationId}
          locationName={selection.locationName}
          onCancel={() => setSelection(null)}
          time={selection.time}
        />
      </div>
    )
  }

  return <DonorLocationDetailPage embedded onSubmitDonor={setSelection} />
}
