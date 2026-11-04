/**
 * Kuesioner screening kesehatan (PDN-06).
 * Setiap pertanyaan punya jawaban "lolos"; jawaban lain membuat peserta
 * perlu diperiksa ulang petugas di lokasi.
 */

export const SCREENING_ANSWERS = ['yes', 'no'] as const
export type ScreeningAnswer = (typeof SCREENING_ANSWERS)[number]

export type ScreeningQuestion = {
  id: string
  question: string
  /** Jawaban yang dianggap aman untuk donor. */
  expected: ScreeningAnswer
}

export type ScreeningGroup = {
  id: string
  title: string
  /** Pertanyaan khusus perempuan, mis. kehamilan. */
  onlyForGender?: 'female'
  questions: readonly ScreeningQuestion[]
}

export const SCREENING_GROUPS: readonly ScreeningGroup[] = [
  {
    id: 'kondisi-hari-ini',
    title: 'Kondisi hari ini',
    questions: [
      { id: 'sehat', question: 'Apakah kamu merasa sehat hari ini?', expected: 'yes' },
      {
        id: 'tidur-cukup',
        question: 'Apakah tidurmu semalam cukup (minimal 5 jam)?',
        expected: 'yes',
      },
      {
        id: 'sudah-makan',
        question: 'Apakah kamu sudah makan dalam 3 sampai 4 jam terakhir?',
        expected: 'yes',
      },
      {
        id: 'demam',
        question: 'Apakah kamu demam, batuk, atau flu dalam 7 hari terakhir?',
        expected: 'no',
      },
    ],
  },
  {
    id: 'obat-tindakan',
    title: 'Obat dan tindakan',
    questions: [
      {
        id: 'antibiotik',
        question:
          'Apakah kamu sedang minum antibiotik atau pengencer darah, atau minum aspirin dalam 3 hari terakhir?',
        expected: 'no',
      },
      {
        id: 'tato-tindik',
        question: 'Apakah kamu membuat tato atau tindik dalam 6 bulan terakhir?',
        expected: 'no',
      },
      {
        id: 'operasi',
        question:
          'Apakah kamu menjalani operasi atau tindakan medis besar dalam beberapa bulan terakhir?',
        expected: 'no',
      },
      {
        id: 'vaksin',
        question: 'Apakah kamu baru menerima vaksin dalam beberapa hari terakhir?',
        expected: 'no',
      },
    ],
  },
  {
    id: 'riwayat-kesehatan',
    title: 'Riwayat kesehatan',
    questions: [
      {
        id: 'pembekuan-darah',
        question:
          'Apakah kamu pernah didiagnosis gangguan pembekuan darah (misalnya hemofilia) atau kelainan darah lainnya?',
        expected: 'no',
      },
      {
        id: 'penyakit-kronis',
        question:
          'Apakah kamu memiliki penyakit kronis, seperti penyakit jantung, hepatitis, HIV/AIDS, kanker, atau diabetes yang tidak terkontrol?',
        expected: 'no',
      },
      {
        id: 'alkohol-narkoba',
        question: 'Apakah kamu memiliki ketergantungan alkohol atau narkoba?',
        expected: 'no',
      },
    ],
  },
  {
    id: 'khusus-perempuan',
    title: 'Khusus perempuan',
    onlyForGender: 'female',
    questions: [
      {
        id: 'hamil-menyusui',
        question: 'Apakah kamu sedang hamil atau menyusui?',
        expected: 'no',
      },
      {
        id: 'haid-berat',
        question: 'Apakah kamu sedang haid dengan nyeri berat atau darah sangat deras?',
        expected: 'no',
      },
    ],
  },
]

/** Jawaban boleh kosong selama form belum diisi. */
export type ScreeningAnswers = Record<string, ScreeningAnswer | undefined>

export function screeningQuestionsFor(gender: 'male' | 'female'): readonly ScreeningQuestion[] {
  return SCREENING_GROUPS.filter(
    (group) => !group.onlyForGender || group.onlyForGender === gender,
  ).flatMap((group) => group.questions)
}

export function isScreeningComplete(answers: ScreeningAnswers, gender: 'male' | 'female'): boolean {
  return screeningQuestionsFor(gender).every((question) => Boolean(answers[question.id]))
}

/** `true` bila semua jawaban sama dengan jawaban yang diharapkan. */
export function passedScreening(answers: ScreeningAnswers, gender: 'male' | 'female'): boolean {
  return screeningQuestionsFor(gender).every(
    (question) => answers[question.id] === question.expected,
  )
}
