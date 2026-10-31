import { USER_ROLE_LABELS } from '@/shared/constants/labels'
import type { UserRole } from '@/domain/enums/user'

/** Lencana peran pengguna pada header dashboard — PRD §2. */
export const RoleBadge = ({ role }: { readonly role: UserRole }) => (
  <span className={`badge badge--${role}`}>{USER_ROLE_LABELS[role]}</span>
)
