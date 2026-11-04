/**
 * Public API fitur `donor-location`.
 *
 * Cakupan PRD:
 * - PDN-02 Eksplorasi lokasi donor (daftar/peta tempat donor)
 * - PDN-03 Detail donor darah (informasi lengkap lokasi / kegiatan)
 * - EXT-03 Filter lokasi berdasarkan jarak atau tanggal (sebaiknya)
 * - Data lokasi & jadwal diinput Admin UTD/PMI (PRD §10 no. 5)
 *
 * Catatan: halaman landing PDN-01 tidak berada di fitur ini karena menggabungkan
 * beberapa fitur (stok + lokasi) sehingga diletakkan di `src/app/pages/public/`.
 *
 * Pemakaian dari `src/app`:
 *
 * ```tsx
 * const donorLocation = createDonorLocationModule()
 *
 * <DonorLocationProvider useCases={donorLocation}>
 *   <DonorLocationsPage />
 * </DonorLocationProvider>
 * ```
 */
export { createDonorLocationModule } from './infrastructure/container'
export type { DonorLocationModule } from './infrastructure/container'

export type {
  ListLocationsResult,
  LocationDetailDto,
  LocationFilterInput,
  LocationSummaryDto,
  ScheduleDayDto,
  TimeSlotDto,
} from './application/dto/donor-location.dto'

export { DonorLocationProvider } from './presentation/contexts/donor-location-context'
export type { DonorLocationUseCases } from './presentation/contexts/donor-location-context'
export { DonorLocationDetailPage } from './presentation/pages/DonorLocationDetailPage'
export type { DonorScheduleSelection } from './presentation/pages/DonorLocationDetailPage'
export { DonorLocationsPage } from './presentation/pages/DonorLocationsPage'
