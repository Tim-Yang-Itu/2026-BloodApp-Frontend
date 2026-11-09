import { X } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'

import { BLOOD_TYPES } from '@/shared/domain/blood'
import type { BloodType, RhesusType } from '@/shared/domain/blood'
import { Button, SelectField, TextField } from '@/shared/ui'

import type { CreateBloodBagInput } from '../../application/dto/blood-stock.dto'
import { bloodStockErrorMessage } from '../../domain/errors/blood-stock-error'

type AddBloodBagDialogProps = {
  today: string
  onClose: () => void
  onSubmit: (input: CreateBloodBagInput) => Promise<void>
}

const BLOOD_TYPE_OPTIONS = BLOOD_TYPES.map((type) => ({
  value: type,
  label: `Golongan ${type}`,
}))

const RHESUS_OPTIONS = [
  { value: 'positive', label: 'Positif (+)' },
  { value: 'negative', label: 'Negatif (−)' },
]

/** UTD-02: dialog input kantong darah baru. */
export function AddBloodBagDialog({ today, onClose, onSubmit }: AddBloodBagDialogProps) {
  const [bloodType, setBloodType] = useState<BloodType>('A')
  const [rhesus, setRhesus] = useState<RhesusType>('positive')
  const [collectedAt, setCollectedAt] = useState(today)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    try {
      await onSubmit({ bloodType, rhesus, collectedAt })
      onClose()
    } catch (caught) {
      setError(bloodStockErrorMessage(caught))
      setIsSubmitting(false)
    }
  }

  return (
    <div
      aria-labelledby="add-blood-bag-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup dialog"
        className="absolute inset-0 cursor-default border-0 bg-heading/40"
        onClick={onClose}
        type="button"
      />

      <form
        className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-panel"
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="m-0 text-xl font-bold text-heading" id="add-blood-bag-title">
              Tambah Kantong
            </h2>
            <p className="mt-1 mb-0 text-xs text-muted">
              Nomor kantong dibuat otomatis dan kedaluwarsa dihitung dari tanggal masuk.
            </p>
          </div>
          <button
            aria-label="Tutup"
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg border-0 bg-transparent text-muted hover:bg-surface-muted hover:text-foreground"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <SelectField
            id="blood-type"
            label="Golongan darah"
            onChange={(event) => setBloodType(event.target.value as BloodType)}
            options={BLOOD_TYPE_OPTIONS}
            value={bloodType}
          />
          <SelectField
            id="rhesus"
            label="Rhesus"
            onChange={(event) => setRhesus(event.target.value as RhesusType)}
            options={RHESUS_OPTIONS}
            value={rhesus}
          />
          <TextField
            hint="Kantong berlaku 35 hari sejak tanggal masuk."
            id="collected-at"
            label="Tanggal masuk"
            max={today}
            onChange={(event) => setCollectedAt(event.target.value)}
            required
            type="date"
            value={collectedAt}
          />
        </div>

        {error ? (
          <p
            className="mt-4 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-xs leading-relaxed text-danger"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} variant="ghost">
            Batal
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Menyimpan…' : 'Simpan kantong'}
          </Button>
        </div>
      </form>
    </div>
  )
}
