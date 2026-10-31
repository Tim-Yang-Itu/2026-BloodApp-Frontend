/**
 * Public API fitur `notification`.
 *
 * Cakupan PRD:
 * - UTD-05 Notifikasi kantong darah mendekati / melewati tanggal expired
 * - RS-05  Push notifikasi saat request ditolak
 * - EXT-01 Notifikasi ke RS saat request disetujui (sebaiknya)
 * - EXT-04 Pengingat jadwal donor (bonus)
 *
 * Rencana ekspor:
 * - use case: notifyExpiringBags, notifyRequestRejected, notifyRequestApproved,
 *             notifyDonorSchedule, listNotifications, markAsRead
 * - tipe publik: AppNotification, NotificationKind, NotificationChannel
 */
export {}
