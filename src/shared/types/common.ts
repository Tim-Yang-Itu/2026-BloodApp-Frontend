/**
 * Tipe primitif bersama. Lapisan `shared` tidak boleh bergantung pada lapisan lain
 * sehingga aman dipakai oleh domain, application, infrastructure, dan presentation.
 */

/** Identitas unik entitas (UUID dari backend). */
export type EntityId = string

/** Waktu dalam format ISO-8601, sesuai payload REST API. */
export type IsoDateTime = string
