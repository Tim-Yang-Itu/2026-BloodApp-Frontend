/**
 * Public API fitur `blood-request`.
 *
 * Cakupan PRD:
 * - UTD-06 Terima request darah dari RS
 * - UTD-07 Verifikasi & cek stok terhadap permintaan
 * - UTD-08 Setujui / tolak request (tolak wajib alasan)
 * - UTD-09 Update status request agar terlihat oleh RS
 * - RS-03  Form request darah
 * - RS-04  Pelacakan status request
 * - RS-06  Konfirmasi penerimaan darah
 *
 * Rencana ekspor:
 * - use case: createRequest, verifyRequest, approveRequest, rejectRequest,
 *             confirmReceipt, listRequests, getRequest
 * - tipe publik: BloodRequest, RequestStatus, RequestUrgency, RequestStatusHistory
 */
export {}
