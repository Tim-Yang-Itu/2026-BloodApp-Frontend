/**
 * Aksi yang wajib tercatat pada audit log — PRD §5 (setiap perubahan stok &
 * status request tercatat dan tidak dapat diubah).
 */
export const AUDIT_ACTIONS = [
  'auth.login',
  'auth.logout',
  'blood_bag.created',
  'blood_bag.status_changed',
  'blood_bag.test_result_recorded',
  'blood_request.created',
  'blood_request.approved',
  'blood_request.rejected',
  'blood_request.received',
  'donor_registration.checked_in',
  'donor_registration.completed',
  'donor_registration.deferred',
  'donor_registration.rejected',
  'donor_location.updated',
] as const

export type AuditAction = (typeof AUDIT_ACTIONS)[number]
