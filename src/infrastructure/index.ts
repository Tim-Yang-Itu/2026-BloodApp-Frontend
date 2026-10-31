/**
 * Titik masuk publik lapisan infrastructure.
 *
 * Hanya composition root yang boleh diakses dari lapisan presentation.
 * Import lewat barrel ini (`@/infrastructure`) agar path modul tidak berubah
 * ketika lokasi berkas di dalam folder dipindahkan.
 */
export { container } from '@/infrastructure/container'
