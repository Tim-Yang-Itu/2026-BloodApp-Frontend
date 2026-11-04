/**
 * Jenis penyelenggara layanan donor darah.
 * Dipakai untuk label di UI dan pengelompokan daftar lokasi.
 */
export const LOCATION_TYPES = ['utd', 'rumah-sakit', 'mobil-donor', 'event'] as const

export type LocationType = (typeof LOCATION_TYPES)[number]

export const LOCATION_TYPE_LABEL: Record<LocationType, string> = {
  utd: 'UTD PMI',
  'rumah-sakit': 'Rumah Sakit',
  'mobil-donor': 'Mobil Donor',
  event: 'Event Donor',
}
