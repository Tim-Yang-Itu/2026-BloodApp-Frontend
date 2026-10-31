/**
 * Port waktu. Use case tidak boleh memanggil `new Date()` langsung agar
 * logika kedaluwarsa & interval donor mudah diuji (AU-03, EX-04).
 */
export interface Clock {
  now(): Date
}
