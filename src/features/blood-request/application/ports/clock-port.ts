/**
 * Port waktu untuk fitur `blood-request`.
 *
 * Waktu pengajuan tidak boleh diambil dari `new Date()` di dalam use case:
 * nilainya harus datang dari port agar bisa diuji dan stabil
 * (lihat `docs/ARCHITECTURE.md` §8.5).
 */
export type ClockPort = {
  /** Waktu sekarang dalam ISO string (`2026-11-02T03:40:00.000Z`). */
  nowIso: () => string
}
