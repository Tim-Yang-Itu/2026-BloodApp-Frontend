/** Port pembuatan QR Code tiket digital donor — PD-05. */
export interface QrCodeService {
  /** Mengembalikan data URL gambar QR siap pakai pada elemen <img>. */
  toDataUrl(payload: string): Promise<string>
}
