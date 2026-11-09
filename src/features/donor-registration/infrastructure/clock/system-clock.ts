import type { ClockPort } from '../../application/ports/clock-port'

/** Implementasi `ClockPort` memakai jam sistem perangkat. */
export function createSystemClock(): ClockPort {
  return {
    nowIso: () => new Date().toISOString(),
    today: () => new Date().toISOString().slice(0, 10),
  }
}
