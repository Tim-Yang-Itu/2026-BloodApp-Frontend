import type { BloodRequest } from '@/domain/entities/blood-request'
import type { EntityId } from '@/shared/types/common'

/** Kontrak akses data request darah — AU-04..AU-06, AR-03..AR-06. */
export interface BloodRequestRepository {
  findById(id: EntityId): Promise<BloodRequest | null>
  listByHospital(hospitalId: EntityId): Promise<readonly BloodRequest[]>
  listByUtd(utdId: EntityId): Promise<readonly BloodRequest[]>
  save(request: BloodRequest): Promise<BloodRequest>
}
