/**
 * Kanal notifikasi — PRD §9 (keputusan terbuka: in-app/email/WhatsApp).
 */
export const NOTIFICATION_CHANNELS = ['in_app', 'email', 'whatsapp'] as const

export type NotificationChannel = (typeof NOTIFICATION_CHANNELS)[number]

/** Jenis notifikasi yang dibutuhkan alur MVP. */
export const NOTIFICATION_TYPES = [
  'blood_bag_expiring',
  'request_created',
  'request_approved',
  'request_rejected',
  'request_received',
  'donation_ticket_issued',
  'donor_eligible',
] as const

export type NotificationType = (typeof NOTIFICATION_TYPES)[number]
