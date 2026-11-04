type AgreementKey = 'data' | 'consent'

type ReviewStepProps = {
  donorName: string
  bloodTypeLabel: string
  locationName: string
  dateLabel: string
  time: string
  agreements: Record<AgreementKey, boolean>
  onToggle: (key: AgreementKey) => void
}

const AGREEMENTS: readonly { key: AgreementKey; label: string }[] = [
  { key: 'data', label: 'Saya menyatakan data dan jawaban screening di atas benar.' },
  {
    key: 'consent',
    label:
      'Saya bersedia menjalani pemeriksaan di lokasi dan darah saya diuji sesuai ketentuan PMI.',
  },
]

/** Langkah 4: ringkasan + pernyataan persetujuan sebelum dikirim. */
export function ReviewStep({
  donorName,
  bloodTypeLabel,
  locationName,
  dateLabel,
  time,
  agreements,
  onToggle,
}: ReviewStepProps) {
  const rows = [
    { label: 'Nama', value: donorName },
    { label: 'Golongan darah', value: bloodTypeLabel },
    { label: 'Lokasi', value: locationName },
    { label: 'Jadwal', value: `${dateLabel} · ${time}` },
  ]

  return (
    <div>
      <h2 className="text-lg font-bold text-heading">Periksa dan setujui</h2>
      <p className="mt-1 text-sm text-muted">Pastikan datanya benar sebelum dikirim.</p>

      <dl className="mt-6 divide-y divide-border rounded-2xl bg-surface-muted px-5 py-2">
        {rows.map((row) => (
          <div
            className="flex flex-wrap items-baseline justify-between gap-2 py-3 text-sm"
            key={row.label}
          >
            <dt className="m-0 text-muted">{row.label}</dt>
            <dd className="m-0 text-right font-bold text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 space-y-3">
        {AGREEMENTS.map((agreement) => (
          <label
            className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-foreground"
            htmlFor={`agreement-${agreement.key}`}
            key={agreement.key}
          >
            <input
              checked={agreements[agreement.key]}
              className="mt-0.5 size-4 shrink-0 cursor-pointer rounded-sm border-border accent-primary"
              id={`agreement-${agreement.key}`}
              onChange={() => onToggle(agreement.key)}
              type="checkbox"
            />
            {agreement.label}
          </label>
        ))}
      </div>

      <p className="mt-3 text-xs text-muted">Centang kedua pernyataan untuk melanjutkan.</p>
    </div>
  )
}
