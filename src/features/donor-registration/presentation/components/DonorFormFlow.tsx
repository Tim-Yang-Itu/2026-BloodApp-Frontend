import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@/features/auth'
import type { AuthUser } from '@/features/auth'
import { Button } from '@/shared/ui'
import { formatLongDate } from '@/shared/utils/format-date'

import type {
  DonorIdentityInput,
  RegistrationDto,
} from '../../application/dto/donor-registration.dto'
import { registrationErrorMessage } from '../../domain/errors/registration-error'
import { isScreeningComplete } from '../../domain/rules/screening'
import type { ScreeningAnswer, ScreeningAnswers } from '../../domain/rules/screening'
import { useRegistrationUseCases } from '../contexts/registration-context'
import { DonorFormStepper } from './DonorFormStepper'
import { IdentityStep } from './IdentityStep'
import { ReviewStep } from './ReviewStep'
import { ScheduleStep } from './ScheduleStep'
import { ScreeningResult } from './ScreeningResult'
import { ScreeningStep } from './ScreeningStep'

type DonorFormFlowProps = {
  locationId: string
  locationName: string
  locationAddress: string
  /** Tanggal kalender `yyyy-mm-dd`. */
  date: string
  /** Jam mulai `HH.mm`. */
  time: string
  /** Dipanggil saat pengguna membatalkan langkah pertama (kembali ke jadwal). */
  onCancel: () => void
}

function initialIdentity(user: AuthUser | null): DonorIdentityInput {
  return {
    fullName: user?.profile.fullName ?? '',
    nik: '',
    birthDate: user?.profile.birthDate ?? '',
    gender: user?.profile.gender ?? 'male',
    address: '',
    phone: user?.profile.phone ?? '',
    occupation: '',
    bloodType: user?.profile.bloodType ?? null,
    rhesus: user?.profile.rhesus ?? null,
    weightKg: 0,
    lastDonation: 'never',
    emergencyContactName: '',
    emergencyContactPhone: '',
  }
}

function FormHeader() {
  return (
    <header>
      <h1 className="m-0 text-3xl font-bold tracking-[-0.02em] text-heading">
        Form Donor Darah
      </h1>
      <p className="mt-2 mb-0 text-sm text-muted">
        Isi dari rumah supaya proses di lokasi lebih cepat.
      </p>
    </header>
  )
}

/**
 * PDN-05 / PDN-06: alur form donor empat langkah + screening kesehatan.
 *
 * Komponen ini tidak mengatur layout halaman, sehingga bisa dipakai sebagai
 * halaman tersendiri maupun ditampilkan langsung di halaman jadwal donor.
 */
export function DonorFormFlow({
  locationId,
  locationName,
  locationAddress,
  date,
  time,
  onCancel,
}: DonorFormFlowProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { submitRegistration } = useRegistrationUseCases()

  const [step, setStep] = useState(0)
  const [identity, setIdentity] = useState<DonorIdentityInput>(() => initialIdentity(user))
  const [screening, setScreening] = useState<ScreeningAnswers>({})
  const [agreements, setAgreements] = useState({ data: false, consent: false })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ticket, setTicket] = useState<RegistrationDto | null>(null)

  if (!user) {
    return null
  }

  const userId = user.id

  function updateIdentity<K extends keyof DonorIdentityInput>(
    field: K,
    value: DonorIdentityInput[K],
  ) {
    setIdentity((previous) => ({ ...previous, [field]: value }))
    setError(null)
  }

  function updateAnswer(questionId: string, answer: ScreeningAnswer) {
    setScreening((previous) => ({ ...previous, [questionId]: answer }))
    setError(null)
  }

  function toggleAgreement(key: 'data' | 'consent') {
    setAgreements((previous) => ({ ...previous, [key]: !previous[key] }))
    setError(null)
  }

  async function submit() {
    if (!agreements.data || !agreements.consent) {
      setError('Centang kedua pernyataan dulu sebelum mengirim.')
      return
    }

    if (!isScreeningComplete(screening, identity.gender)) {
      setError('Masih ada pertanyaan screening yang belum dijawab.')
      return
    }

    setError(null)
    setIsSubmitting(true)

    try {
      const created = await submitRegistration({
        userId,
        locationId,
        locationName,
        locationAddress,
        date,
        time,
        identity,
        screening,
      })

      setTicket(created)
    } catch (caught) {
      setError(registrationErrorMessage(caught))
    } finally {
      setIsSubmitting(false)
    }
  }

  function goNext() {
    setError(null)

    if (step === 2 && !isScreeningComplete(screening, identity.gender)) {
      setError('Masih ada pertanyaan screening yang belum dijawab.')
      return
    }

    if (step === 3) {
      void submit()
      return
    }

    setStep((current) => Math.min(current + 1, 3))
  }

  function goBack() {
    setError(null)

    if (step === 0) {
      onCancel()
      return
    }

    setStep((current) => current - 1)
  }

  if (ticket) {
    return (
      <>
        <FormHeader />
        <DonorFormStepper activeIndex={4} />

        <section className="mt-8 rounded-3xl bg-surface p-6 shadow-panel sm:p-9">
          <ScreeningResult
            onViewTicket={() => navigate(`/tiket-saya/${ticket.bookingCode}`)}
            passed={ticket.passedScreening}
          />
        </section>
      </>
    )
  }

  return (
    <>
      <FormHeader />
      <DonorFormStepper activeIndex={step} />

      <form
        className="mt-8 rounded-3xl bg-surface p-6 shadow-panel sm:p-9"
        onSubmit={(event) => {
          event.preventDefault()
          goNext()
        }}
      >
        {step === 0 ? (
          <ScheduleStep
            dateLabel={formatLongDate(date)}
            locationAddress={locationAddress}
            locationName={locationName}
            time={time}
          />
        ) : null}

        {step === 1 ? <IdentityStep onChange={updateIdentity} values={identity} /> : null}

        {step === 2 ? (
          <ScreeningStep answers={screening} gender={identity.gender} onChange={updateAnswer} />
        ) : null}

        {step === 3 ? (
          <ReviewStep
            agreements={agreements}
            bloodTypeLabel={
              identity.bloodType
                ? `${identity.bloodType}${identity.rhesus === 'negative' ? '−' : identity.rhesus === 'positive' ? '+' : ''}`
                : 'Belum diketahui'
            }
            dateLabel={formatLongDate(date)}
            donorName={identity.fullName}
            locationName={locationName}
            onToggle={toggleAgreement}
            time={time}
          />
        ) : null}

        {error ? (
          <p
            className="mt-5 rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-xs leading-relaxed text-danger"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <Button onClick={goBack} type="button" variant="outline">
            {step === 0 ? 'Batal' : 'Kembali'}
          </Button>
          <Button disabled={isSubmitting} type="submit">
            {step === 3 ? (isSubmitting ? 'Mengirim…' : 'Kirim') : 'Lanjut'}
          </Button>
        </div>
      </form>
    </>
  )
}
