import type { BloodComponent, BloodGroup, Rhesus } from '@/domain/enums/blood'
import type { BloodRequestStatus, RequestUrgency } from '@/domain/enums/blood-request'
import type { EntityId, IsoDateTime } from '@/shared/types/common'

/** Satu baris permintaan darah (golongan + komponen + jumlah) — AR-03. */
export interface BloodRequestItem {
  readonly id: EntityId
  readonly bloodGroup: BloodGroup
  readonly rhesus: Rhesus
  readonly component: BloodComponent
  readonly quantity: number
}

/**
 * Data pasien seminimal mungkin — PRD §5 (tidak ada data sensitif berlebih).
 */
export interface BloodRequestPatient {
  readonly patientName: string
  readonly medicalRecordNumber: string
  readonly room: string | null
}

/** Jejak perubahan status request (append-only) — PRD §5. */
export interface BloodRequestStatusChange {
  readonly status: BloodRequestStatus
  readonly changedAt: IsoDateTime
  readonly changedBy: EntityId
  readonly note: string | null
}

/** Permintaan darah dari Admin RS ke UTD/PMI — PRD DS-01..DS-03. */
export interface BloodRequest {
  readonly id: EntityId
  readonly requestNumber: string
  readonly hospitalId: EntityId
  readonly utdId: EntityId
  readonly requestedBy: EntityId
  readonly items: readonly BloodRequestItem[]
  readonly urgency: RequestUrgency
  readonly status: BloodRequestStatus
  readonly patient: BloodRequestPatient
  /** Wajib diisi bila status `rejected` — PRD §6. */
  readonly rejectionReason: string | null
  readonly statusHistory: readonly BloodRequestStatusChange[]
  readonly createdAt: IsoDateTime
  readonly updatedAt: IsoDateTime
}
