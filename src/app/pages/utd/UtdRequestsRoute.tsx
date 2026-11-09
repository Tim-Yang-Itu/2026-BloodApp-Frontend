import { useBloodStock } from '@/features/blood-stock'
import { BloodRequestsPage } from '@/features/blood-request'

/** Menghubungkan stok nyata ke panel "Cek stok" pada halaman permintaan RS. */
export function UtdRequestsRoute() {
  const { summary } = useBloodStock()

  const stockAvailability = Object.fromEntries(
    summary.groups.flatMap((group) => [
      [`${group.bloodType}+`, group.positive],
      [`${group.bloodType}−`, group.negative],
    ]),
  )

  return <BloodRequestsPage stockAvailability={stockAvailability} />
}
