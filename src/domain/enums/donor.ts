/**
 * Status pendaftaran donor setelah tiket QR terbit — EX-03.
 */
export const DONOR_REGISTRATION_STATUSES = [
  'registered',
  'checked_in',
  'donated',
  'deferred',
  'rejected',
  'no_show',
] as const

export type DonorRegistrationStatus = (typeof DONOR_REGISTRATION_STATUSES)[number]

/** Hasil screening kesehatan — PD-04. */
export const SCREENING_RESULTS = ['pending', 'eligible', 'ineligible'] as const

export type ScreeningResult = (typeof SCREENING_RESULTS)[number]
