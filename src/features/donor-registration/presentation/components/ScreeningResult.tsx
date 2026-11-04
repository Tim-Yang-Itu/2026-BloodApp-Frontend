import { CheckCircle2 } from 'lucide-react'

import { Button } from '@/shared/ui'

type ScreeningResultProps = {
  passed: boolean
  onViewTicket: () => void
}

/** Layar hasil screening setelah form donor dikirim. */
export function ScreeningResult({ passed, onViewTicket }: ScreeningResultProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-heading">Hasil screening</h2>

      <div
        className={`mt-6 rounded-2xl px-5 py-4 ${
          passed ? 'bg-success/10' : 'bg-warning/10'
        }`}
      >
        <p
          className={`m-0 flex items-center gap-2 text-sm font-bold ${
            passed ? 'text-success' : 'text-warning'
          }`}
        >
          <CheckCircle2 aria-hidden="true" className="size-4" />
          {passed ? 'Kamu memenuhi syarat untuk donor' : 'Jawabanmu perlu diperiksa petugas'}
        </p>
        <p
          className={`mt-1.5 mb-0 text-sm leading-relaxed ${
            passed ? 'text-success' : 'text-warning'
          }`}
        >
          {passed
            ? 'Tiket digital dengan QR Code siap diterbitkan untuk jadwal yang kamu pilih.'
            : 'Tetap datang ke lokasi. Petugas akan memeriksa ulang kondisimu sebelum donor.'}
        </p>
      </div>

      <div className="mt-4 rounded-2xl bg-surface-muted px-5 py-4">
        <p className="m-0 text-xs leading-relaxed text-muted">
          Hasil ini dari jawabanmu. Petugas PMI tetap memeriksa hemoglobin, tekanan darah, suhu, dan
          berat badan saat kamu tiba di lokasi.
        </p>
      </div>

      <Button className="mt-6" fullWidth onClick={onViewTicket} type="button">
        Dapatkan Tiket Digital
      </Button>
    </div>
  )
}
