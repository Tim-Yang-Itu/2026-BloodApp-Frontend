import type { ApproveRequestUseCase } from '../application/use-cases/approve-request.use-case'
import { createApproveRequestUseCase } from '../application/use-cases/approve-request.use-case'
import type { CreateRequestUseCase } from '../application/use-cases/create-request.use-case'
import { createCreateRequestUseCase } from '../application/use-cases/create-request.use-case'
import type { ListRequestsUseCase } from '../application/use-cases/list-requests.use-case'
import { createListRequestsUseCase } from '../application/use-cases/list-requests.use-case'
import type { RejectRequestUseCase } from '../application/use-cases/reject-request.use-case'
import { createRejectRequestUseCase } from '../application/use-cases/reject-request.use-case'
import { createSystemClock } from './clock/system-clock'
import { InMemoryBloodRequestRepository } from './repositories/in-memory-blood-request-repository'

export type BloodRequestModule = {
  listRequests: ListRequestsUseCase
  createRequest: CreateRequestUseCase
  approveRequest: ApproveRequestUseCase
  rejectRequest: RejectRequestUseCase
  subscribeToChanges: (listener: () => void) => () => void
}

export function createBloodRequestModule(): BloodRequestModule {
  const repository = new InMemoryBloodRequestRepository()
  const clock = createSystemClock()

  return {
    listRequests: createListRequestsUseCase(repository),
    createRequest: createCreateRequestUseCase(repository, clock),
    approveRequest: createApproveRequestUseCase(repository),
    rejectRequest: createRejectRequestUseCase(repository),
    subscribeToChanges: (listener) => repository.subscribe(listener),
  }
}
