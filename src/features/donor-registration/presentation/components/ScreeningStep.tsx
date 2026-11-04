import type { Gender } from '@/shared/domain/blood'

import { SCREENING_GROUPS } from '../../domain/rules/screening'
import type { ScreeningAnswer, ScreeningAnswers } from '../../domain/rules/screening'

const ANSWER_OPTIONS: readonly { value: ScreeningAnswer; label: string }[] = [
  { value: 'yes', label: 'Ya' },
  { value: 'no', label: 'Tidak' },
]

type ScreeningStepProps = {
  answers: ScreeningAnswers
  gender: Gender
  onChange: (questionId: string, answer: ScreeningAnswer) => void
}

function answerButtonClass(isSelected: boolean): string {
  return [
    'min-w-16 cursor-pointer rounded-md border px-4 py-1.5 text-xs font-semibold transition-colors',
    isSelected
      ? 'border-primary bg-primary text-on-primary'
      : 'border-border bg-surface text-muted hover:border-border-strong hover:text-foreground',
  ].join(' ')
}

/** Langkah 3: kuesioner screening kesehatan sebelum donor. */
export function ScreeningStep({ answers, gender, onChange }: ScreeningStepProps) {
  const groups = SCREENING_GROUPS.filter(
    (group) => !group.onlyForGender || group.onlyForGender === gender,
  )

  return (
    <div>
      <h2 className="text-lg font-bold text-heading">Screening kesehatan</h2>
      <p className="mt-1 text-sm text-muted">
        Jawab sejujurnya. Petugas PMI tetap memeriksa ulang di lokasi.
      </p>

      <div className="mt-7 space-y-7">
        {groups.map((group) => (
          <section key={group.id}>
            <h3 className="m-0 text-xs font-bold text-primary">{group.title}</h3>
            <ul className="mt-3 list-none space-y-2.5 p-0">
              {group.questions.map((question) => (
                <li
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-muted px-4 py-3"
                  key={question.id}
                >
                  <p className="m-0 max-w-[62%] text-sm leading-snug text-foreground">
                    {question.question}
                  </p>
                  <div className="flex shrink-0 gap-1.5">
                    {ANSWER_OPTIONS.map((option) => (
                      <button
                        aria-pressed={answers[question.id] === option.value}
                        className={answerButtonClass(answers[question.id] === option.value)}
                        key={option.value}
                        onClick={() => onChange(question.id, option.value)}
                        type="button"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-7 rounded-2xl border border-primary-200 bg-primary-50 p-5">
        <h3 className="m-0 text-sm font-bold text-primary-800">Dicek petugas di lokasi</h3>
        <ul className="mt-2 list-none space-y-1 p-0 text-xs leading-relaxed text-primary-800">
          <li>Hemoglobin sekitar 12,5 sampai 17,0 g/dL</li>
          <li>Tekanan darah sistolik 100 sampai 160 dan diastolik 70 sampai 100 mmHg</li>
          <li>Suhu tubuh sekitar 36,5 sampai 37,5 °C</li>
          <li>Berat badan minimal 45 kg</li>
        </ul>
        <p className="mt-2 text-xs leading-relaxed text-primary-800">
          Angka bisa berbeda sedikit di tiap UTD, mengikuti ketentuan PMI setempat.
        </p>
      </div>
    </div>
  )
}
