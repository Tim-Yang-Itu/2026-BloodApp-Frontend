import { Link } from 'react-router-dom'

const eyebrow = 'text-xs font-bold uppercase tracking-[0.14em] text-primary'
const button = 'inline-flex min-h-13 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors'

export function CallToActionSection() {
  return (
    <section className="mx-auto mb-20 flex w-[calc(100%-3rem)] max-w-[1180px] items-center justify-between gap-8 rounded-2xl bg-primary px-[clamp(1.5rem,5vw,4rem)] py-14 text-on-primary max-md:flex-col max-md:items-start">
      <div>
        <p className={`${eyebrow} text-white`}>Bersama kita bisa</p>
        <h2 className="my-2 max-w-[600px] text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em]">Jadilah bagian dari gerakan kemanusiaan.</h2>
      </div>
      <Link className={`${button} bg-surface text-primary hover:bg-primary-50`} to="/register">Daftar sekarang</Link>
    </section>
  )
}
