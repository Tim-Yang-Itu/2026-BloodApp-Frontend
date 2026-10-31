import type { User } from '@/domain/entities/user'
import type { EntityId } from '@/shared/types/common'

/**
 * Kontrak akses data pengguna. Implementasi konkret berada di
 * `src/infrastructure/repositories`.
 */
export interface UserRepository {
  findById(id: EntityId): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
}
