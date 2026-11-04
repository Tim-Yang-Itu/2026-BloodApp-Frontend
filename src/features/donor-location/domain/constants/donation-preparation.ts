/**
 * Syarat donor & perlengkapan yang perlu dibawa.
 * Sama untuk semua lokasi, jadi diletakkan sebagai konstanta domain
 * (sumber tunggal untuk halaman detail PDN-03 dan halaman form PDN-05).
 */
export const DONATION_REQUIREMENTS = [
  'Usia 17 sampai 60 tahun',
  'Berat badan minimal 45 kg',
  'Sehat dan cukup tidur',
  'Jarak donor sebelumnya sekitar 3 bulan',
] as const

export const DONATION_BRING_ITEMS = [
  'KTP atau kartu identitas',
  'Tiket QR dari DonorKu',
  'Makan dan minum dulu sebelum datang',
] as const
