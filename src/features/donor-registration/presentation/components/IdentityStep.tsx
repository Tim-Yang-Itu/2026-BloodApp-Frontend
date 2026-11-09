import { controlClass, labelClass, SelectField, TextField } from '@/shared/ui'
import type { SelectOption } from '@/shared/ui'

import type { DonorIdentityInput } from '../../application/dto/donor-registration.dto'
import { LAST_DONATION_OPTIONS } from '../../domain/entities/donor-registration'

const GENDER_OPTIONS: readonly SelectOption[] = [
  { value: 'male', label: 'Laki-laki' },
  { value: 'female', label: 'Perempuan' },
]

const BLOOD_TYPE_OPTIONS: readonly SelectOption[] = [
  { value: '', label: 'Belum tahu' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
]

const RHESUS_OPTIONS: readonly SelectOption[] = [
  { value: '', label: 'Belum tahu' },
  { value: 'positive', label: 'Positif (+)' },
  { value: 'negative', label: 'Negatif (−)' },
]

type IdentityStepProps = {
  values: DonorIdentityInput
  /** Batas atas tanggal lahir (`yyyy-mm-dd`) dari port `Clock`. */
  maxBirthDate: string
  onChange: <K extends keyof DonorIdentityInput>(field: K, value: DonorIdentityInput[K]) => void
}

/** Langkah 2: identitas calon pendonor sesuai kartu identitas. */
export function IdentityStep({ values, maxBirthDate, onChange }: IdentityStepProps) {
  return (
    <div>
      <h2 className="text-lg font-bold text-heading">Data diri</h2>
      <p className="mt-1 text-sm text-muted">
        Sebagian terisi dari akunmu. Pastikan sesuai kartu identitas.
      </p>

      <div className="mt-6 space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            autoComplete="name"
            id="fullName"
            label="Nama lengkap"
            onChange={(event) => onChange('fullName', event.target.value)}
            required
            value={values.fullName}
          />
          <TextField
            id="nik"
            inputMode="numeric"
            label="Nomor KTP (NIK)"
            maxLength={16}
            minLength={16}
            onChange={(event) => onChange('nik', event.target.value)}
            pattern="[0-9]{16}"
            placeholder="16 digit"
            required
            value={values.nik}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            hint="Usia donor 17 sampai 60 tahun. Usia 17 tahun perlu izin tertulis orang tua atau wali."
            id="birthDate"
            label="Tanggal lahir"
            max={maxBirthDate}
            onChange={(event) => onChange('birthDate', event.target.value)}
            required
            type="date"
            value={values.birthDate}
          />
          <SelectField
            id="gender"
            label="Jenis kelamin"
            onChange={(event) => onChange('gender', event.target.value as DonorIdentityInput['gender'])}
            options={GENDER_OPTIONS}
            required
            value={values.gender}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="address">
            Alamat
          </label>
          <textarea
            className={`${controlClass} min-h-20 resize-y`}
            id="address"
            onChange={(event) => onChange('address', event.target.value)}
            placeholder="Alamat sesuai KTP atau domisili"
            required
            rows={2}
            value={values.address}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            autoComplete="tel"
            id="phone"
            inputMode="tel"
            label="Nomor HP"
            onChange={(event) => onChange('phone', event.target.value)}
            pattern="[0-9+]*"
            placeholder="08xxxxxxxxxx"
            required
            value={values.phone}
          />
          <TextField
            id="occupation"
            label="Pekerjaan (opsional)"
            onChange={(event) => onChange('occupation', event.target.value)}
            value={values.occupation}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            id="bloodType"
            label="Golongan darah"
            onChange={(event) =>
              onChange('bloodType', (event.target.value || null) as DonorIdentityInput['bloodType'])
            }
            options={BLOOD_TYPE_OPTIONS}
            value={values.bloodType ?? ''}
          />
          <SelectField
            id="rhesus"
            label="Rhesus"
            onChange={(event) =>
              onChange('rhesus', (event.target.value || null) as DonorIdentityInput['rhesus'])
            }
            options={RHESUS_OPTIONS}
            value={values.rhesus ?? ''}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="weightKg"
            inputMode="numeric"
            label="Berat badan (kg)"
            min={1}
            onChange={(event) => onChange('weightKg', Number(event.target.value) || 0)}
            required
            type="number"
            value={values.weightKg === 0 ? '' : String(values.weightKg)}
          />
          <SelectField
            id="lastDonation"
            label="Terakhir donor darah"
            onChange={(event) =>
              onChange(
                'lastDonation',
                event.target.value as DonorIdentityInput['lastDonation'],
              )
            }
            options={LAST_DONATION_OPTIONS}
            value={values.lastDonation}
          />
        </div>

        <fieldset className="border-0 p-0">
          <legend className="m-0 text-sm font-bold text-heading">Kontak darurat (opsional)</legend>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <TextField
              id="emergencyName"
              label="Nama"
              onChange={(event) => onChange('emergencyContactName', event.target.value)}
              value={values.emergencyContactName}
            />
            <TextField
              id="emergencyPhone"
              inputMode="tel"
              label="Nomor HP"
              onChange={(event) => onChange('emergencyContactPhone', event.target.value)}
              value={values.emergencyContactPhone}
            />
          </div>
        </fieldset>
      </div>
    </div>
  )
}
