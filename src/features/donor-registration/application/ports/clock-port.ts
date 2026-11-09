/**
 * Port waktu untuk fitur `donor-registration`.
 *
 * Use case tidak boleh memanggil `new Date()` langsung: waktu harus datang dari
 * port agar bisa diuji dan hasilnya stabil (lihat `docs/ARCHITECTURE.md` §8.5).
 */
export type ClockPort = {
  /** Waktu sekarang dalam ISO string (`2026-11-02T03:40:00.000Z`). */
  nowIso: () => string
  /** Tanggal kalender hari ini (`2026-11-02`), dipakai sebagai batas input tanggal. */
  today: () => string
}
