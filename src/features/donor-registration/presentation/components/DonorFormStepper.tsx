import { Check } from 'lucide-react'

const STEPS = ['Jadwal', 'Data diri', 'Screening', 'Persetujuan'] as const

type DonorFormStepperProps = {
  /** Indeks langkah aktif (0–3). */
  activeIndex: number
}

/** Penanda langkah form donor: nomor berubah jadi centang setelah dilewati. */
export function DonorFormStepper({ activeIndex }: DonorFormStepperProps) {
  return (
    <ol className="mt-7 flex list-none flex-wrap items-center gap-y-3 p-0">
      {STEPS.map((label, index) => {
        const isDone = index < activeIndex
        const isCurrent = index === activeIndex

        return (
          <li className="flex items-center" key={label}>
            <span
              aria-hidden="true"
              className={`grid size-6 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                isCurrent || isDone
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-highlight text-muted'
              }`}
            >
              {isDone ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
            </span>
            <span
              className={`ml-2 text-sm ${
                isCurrent
                  ? 'font-bold text-heading'
                  : isDone
                    ? 'font-semibold text-label'
                    : 'text-muted'
              }`}
            >
              {label}
            </span>
            {index < STEPS.length - 1 ? (
              <span
                aria-hidden="true"
                className={`mx-3 h-px w-6 sm:w-10 ${
                  isDone ? 'bg-primary-300' : 'bg-border-strong'
                }`}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
