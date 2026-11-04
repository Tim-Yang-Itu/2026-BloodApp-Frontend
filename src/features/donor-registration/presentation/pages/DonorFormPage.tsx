import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { DonorFormFlow } from '../components/DonorFormFlow'

const listLinkClass =
  'inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary no-underline transition-colors hover:bg-primary-hover'

/**
 * PDN-05 / PDN-06: form donor empat langkah + screening kesehatan.
 *
 * Pada area pendonor form tampil langsung di halaman jadwal donor
 * (`DonorScheduleDetailRoute`), jadi rute ini hanya dipakai bila halaman
 * dibuka lewat tautan langsung.
 */
export function DonorFormPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const locationId = searchParams.get('location') ?? ''
  const locationName = searchParams.get('name') ?? ''
  const locationAddress = searchParams.get('address') ?? ''
  const date = searchParams.get('date') ?? ''
  const time = searchParams.get('time') ?? ''

  if (!locationId || !date || !time) {
    return (
      <div className="w-full px-6 py-24 text-center">
        <h1 className="m-0 text-2xl font-bold text-heading">Pilih jadwal donor dulu</h1>
        <p className="mt-2 text-sm text-muted">
          Form donor butuh lokasi, tanggal, dan jam. Pilih jadwal dari halaman lokasi donor.
        </p>
        <Link className={`${listLinkClass} mt-6`} to="/jadwal-donor">
          Cari lokasi donor
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full px-6 py-10 pb-20">
      <DonorFormFlow
        date={date}
        locationAddress={locationAddress}
        locationId={locationId}
        locationName={locationName}
        onCancel={() => navigate('/jadwal-donor')}
        time={time}
      />
    </div>
  )
}

export default DonorFormPage
