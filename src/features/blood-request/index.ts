/**
 * Public API fitur `blood-request`.
 *
 * Cakupan PRD:
 * - RS-03 Pemilihan golongan darah, rhesus, dan jumlah
 * - UTD-05 Verifikasi & persetujuan permintaan
 * - UTD-06 Penolakan permintaan dengan alasan
 */

export { createBloodRequestModule } from './infrastructure/container'
export type { BloodRequestModule } from './infrastructure/container'

export type { BloodRequestDto } from './application/dto/blood-request.dto'

export type { BloodRequestStatus, RequestUrgency } from './domain/entities/blood-request'
export { REQUEST_STATUS_LABEL } from './domain/enums/request-status'

export { BloodRequestProvider } from './presentation/contexts/blood-request-context'
export { useBloodRequests } from './presentation/hooks/use-blood-requests'
export { BloodRequestsPage } from './presentation/pages/BloodRequestsPage'
