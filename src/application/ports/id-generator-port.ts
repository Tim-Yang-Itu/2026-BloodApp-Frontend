/** Port pembuat identitas unik (UUID) untuk entitas baru. */
export interface IdGenerator {
  generate(): string
}
