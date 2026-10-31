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
 * Rencana ekspor:
 * - use case: listLocations, getLocationDetail, listSchedules,
 *             createLocation, updateLocation, publishSchedule
 * - tipe publik: DonorLocation, DonorSchedule, LocationFilter
 */
export {}
