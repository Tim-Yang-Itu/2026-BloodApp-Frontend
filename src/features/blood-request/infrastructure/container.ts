import type { ApproveRequestUseCase } from '../application/use-cases/approve-request.use-case'
import { createApproveRequestUseCase } from '../application/use-cases/approve-request.use-case'
import type { ListRequestsUseCase } from '../application/use-cases/list-requests.use-case'
import { createListRequestsUseCase } from '../application/use-cases/list-requests.use-case'
import type { RejectRequestUseCase } from '../application/use-cases/reject-request.use-case'
import { createRejectRequestUseCase } from '../application/use-cases/reject-request.use-case'
import { InMemoryBloodRequestRepository } from './repositories/in-memory-blood-request-repository'

export type BloodRequestModule = {
  listRequests: ListRequestsUseCase
  approveRequest: ApproveRequestUseCase
  rejectRequest: RejectRequestUseCase
}

export function createBloodRequestModule(): BloodRequestModule {
  const repository = new InMemoryBloodRequestRepository()

  return {
    listRequests: createListRequestsUseCase(repository),
    approveRequest: createApproveRequestUseCase(repository),
    rejectRequest: createRejectRequestUseCase(repository),
  }
}
