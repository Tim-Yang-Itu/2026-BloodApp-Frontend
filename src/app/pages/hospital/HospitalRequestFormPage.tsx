import { ArrowLeft, Droplet, Info, Send } from 'lucide-react'
import type { FormEvent } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth'
import {
  MAX_REQUEST_QUANTITY,
  MIN_REQUEST_QUANTITY,
  REQUEST_URGENCIES,
  REQUEST_URGENCY_LABEL,
  bloodRequestErrorMessage,
  useBloodRequests,
  type RequestUrgency,
} from '@/features/blood-request'
import {
  BLOOD_TYPES,
  RHESUS_LABEL,
  RHESUS_TYPES,
  formatBloodType,
  type BloodType,
  type RhesusType,
} from '@/shared/domain/blood'
import { ROUTES } from '@/shared/constants/routes'
import { Button, PageHeader, SelectField, TextField, labelClass } from '@/shared/ui'

type RequestFormValues = {
  bloodType: '' | BloodType
  rhesus: '' | RhesusType
  quantity: string
  urgency: '' | RequestUrgency
}

const INITIAL_VALUES: RequestFormValues = {
  bloodType: '',
  rhesus: '',
  quantity: '',
  urgency: '',
}

const BLOOD_TYPE_OPTIONS = BLOOD_TYPES.map((type) => ({ value: type, label: type }))

const RHESUS_OPTIONS = RHESUS_TYPES.map((rhesus) => ({
  value: rhesus,
  label: RHESUS_LABEL[rhesus],
}))

const URGENCY_OPTIONS = REQUEST_URGENCIES.map((urgency) => ({
  value: urgency,
  label: REQUEST_URGENCY_LABEL[urgency],
}))

/**
 * RS-03: form pengajuan permintaan darah.
 *
 * Rumah sakit tidak memilih identitasnya sendiri — nama RS diambil dari akun
 * yang sedang masuk agar pengajuan tidak bisa dialamatkan ke RS lain.
 */
export function HospitalRequestFormPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const hospitalName = user?.hospitalName ?? null

  const [values, setValues] = useState<RequestFormValues>(INITIAL_VALUES)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { create: createRequest } = useBloodRequests()

  const previewLabel =
    values.bloodType === '' || values.rhesus === ''
      ? null
      : formatBloodType(values.bloodType, values.rhesus)
  const previewQuantity = values.quantity === '' ? '—' : `${values.quantity} kantong`
  const previewUrgency = values.urgency === '' ? '—' : REQUEST_URGENCY_LABEL[values.urgency]

  function updateField<K extends keyof RequestFormValues>(
    field: K,
    value: RequestFormValues[K],
  ) {
    setValues((previous) => ({ ...previous, [field]: value }))
    setError(null)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (!hospitalName) {
      setError('Akun ini belum terhubung ke rumah sakit mana pun.')
      return
    }

    if (values.bloodType === '' || values.rhesus === '' || values.urgency === '') {
      setError('Lengkapi golongan darah, rhesus, dan tingkat urgensi.')
      return
    }

    const quantity = Number(values.quantity)

    if (
      values.quantity === '' ||
      !Number.isInteger(quantity) ||
      quantity < MIN_REQUEST_QUANTITY ||
      quantity > MAX_REQUEST_QUANTITY
    ) {
      setError(
        `Jumlah kantong harus ${MIN_REQUEST_QUANTITY}–${MAX_REQUEST_QUANTITY} kantong.`,
      )
      return
    }

    setIsSubmitting(true)

    try {
      await createRequest({
        hospitalName,
        bloodType: values.bloodType,
        rhesus: values.rhesus,
        quantity,
        urgency: values.urgency,
      })

      navigate(ROUTES.hospitalRequests)
    } catch (caught) {
      setError(bloodRequestErrorMessage(caught))
      setIsSubmitting(false)
    }
  }

  return (
    <section>
      <div className="mb-8">
        <PageHeader
          actions={
            <Button onClick={() => navigate(ROUTES.hospitalRequests)} variant="outline">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Kembali
            </Button>
          }
          description="Ajukan kebutuhan kantong darah ke UTD. Permintaan akan diverifikasi sebelum disetujui."
          eyebrow="Pengajuan baru"
          title="Buat Permintaan Darah"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <form
          className="rounded-2xl border border-border bg-surface p-6"
          noValidate
          onSubmit={handleSubmit}
        >
          <h2 className="font-sans text-base font-bold text-heading">Detail kebutuhan</h2>
          <p className="mt-1 text-sm text-muted">
            Isi golongan darah, jumlah kantong, dan seberapa mendesak kebutuhan ini.
          </p>

          <div className="mt-5">
            <label className={labelClass} htmlFor="request-hospital">
              Rumah sakit pengaju
            </label>
            <input
              className="w-full rounded-lg border border-border bg-surface-muted px-3.5 py-2.5 text-sm font-semibold text-foreground"
              id="request-hospital"
              readOnly
              value={hospitalName ?? 'Belum terhubung ke rumah sakit'}
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SelectField
              id="request-blood-type"
              label="Golongan darah"
              onChange={(event) =>
                updateField('bloodType', event.target.value as '' | BloodType)
              }
              options={BLOOD_TYPE_OPTIONS}
              placeholder="Pilih golongan"
              value={values.bloodType}
            />
            <SelectField
              id="request-rhesus"
              label="Rhesus"
              onChange={(event) =>
                updateField('rhesus', event.target.value as '' | RhesusType)
              }
              options={RHESUS_OPTIONS}
              placeholder="Pilih rhesus"
              value={values.rhesus}
            />
            <TextField
              hint={`Minimal ${MIN_REQUEST_QUANTITY}, maksimal ${MAX_REQUEST_QUANTITY} kantong per pengajuan.`}
              id="request-quantity"
              inputMode="numeric"
              label="Jumlah kantong"
              max={MAX_REQUEST_QUANTITY}
              min={MIN_REQUEST_QUANTITY}
              onChange={(event) => updateField('quantity', event.target.value)}
              placeholder="Contoh: 5"
              type="number"
              value={values.quantity}
            />
            <SelectField
              hint="Urgensi tinggi diprioritaskan UTD."
              id="request-urgency"
              label="Tingkat urgensi"
              onChange={(event) =>
                updateField('urgency', event.target.value as '' | RequestUrgency)
              }
              options={URGENCY_OPTIONS}
              placeholder="Pilih urgensi"
              value={values.urgency}
            />
          </div>

          {error ? (
            <p
              className="mt-4 rounded-xl border border-danger/40 bg-danger/5 px-4 py-3 text-sm text-danger"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button disabled={isSubmitting || !hospitalName} type="submit">
              <Send aria-hidden="true" className="size-4" />
              {isSubmitting ? 'Mengirim…' : 'Kirim permintaan'}
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={() => {
                setValues(INITIAL_VALUES)
                setError(null)
              }}
              variant="ghost"
            >
              Reset form
            </Button>
          </div>
        </form>

        <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-sans text-base font-bold text-heading">Ringkasan pengajuan</h2>
          <p className="mt-1 text-sm text-muted">
            Periksa kembali sebelum dikirim ke UTD.
          </p>

          <div className="mt-5 flex items-center gap-4 rounded-xl bg-surface-highlight p-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-base font-bold text-on-primary">
              {previewLabel ?? <Droplet aria-hidden="true" className="size-5" />}
            </span>
            <div className="min-w-0">
              <p className="m-0 text-sm font-bold text-heading">
                {previewLabel ? `Darah ${previewLabel}` : 'Golongan belum dipilih'}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted">
                {hospitalName ?? 'Rumah sakit belum diketahui'}
              </p>
            </div>
          </div>

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Jumlah</dt>
              <dd className="m-0 font-bold text-heading">{previewQuantity}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Urgensi</dt>
              <dd className="m-0 font-bold text-heading">{previewUrgency}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">Status awal</dt>
              <dd className="m-0 font-bold text-heading">Menunggu verifikasi</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-primary-200 bg-primary-50 p-4">
            <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <p className="m-0 text-xs leading-relaxed text-primary-800/80">
              Permintaan masuk ke antrean Admin UTD. Anda bisa memantau statusnya di
              halaman Permintaan Darah.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
