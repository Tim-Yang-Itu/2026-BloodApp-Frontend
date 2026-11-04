import { Link } from 'react-router-dom'

import { Navbar } from '@/features/landing-page/presentation/components/Navbar'

const SERVICES = [
  { icon: '♥', title: 'Donor lebih mudah', description: 'Temukan lokasi dan jadwal donor terdekat yang sesuai dengan waktu Anda.' },
  { icon: '✚', title: 'Stok transparan', description: 'Pantau ketersediaan darah secara akurat untuk membantu kebutuhan medis.' },
  { icon: '⌁', title: 'Terhubung lebih cepat', description: 'Hubungkan pendonor, UTD, dan rumah sakit dalam satu ekosistem terpercaya.' },
] as const

const STEPS = [
  { number: '01', title: 'Daftar akun', description: 'Buat akun sebagai pendonor atau institusi kesehatan.' },
  { number: '02', title: 'Temukan kebutuhan', description: 'Cari jadwal donor atau ajukan kebutuhan darah.' },
  { number: '03', title: 'Berikan dampak', description: 'Satu aksi Anda membantu menyelamatkan lebih banyak nyawa.' },
] as const

const eyebrow = 'text-xs font-bold uppercase tracking-[0.14em] text-primary'
const button = 'inline-flex min-h-13 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-background text-foreground">
        <section className="mx-auto grid min-h-[620px] w-[calc(100%-3rem)] max-w-[1180px] items-center gap-16 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]" id="beranda">
          <div>
            <p className={eyebrow}>Satu tetes, sejuta harapan</p>
            <h1 className="my-3 max-w-[660px] text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.03] tracking-[-0.025em] text-heading">
              Donor darah jadi lebih <span className="text-primary">mudah,</span> nyawa bisa terselamatkan.
            </h1>
            <p className="max-w-[540px] text-[1.1rem] leading-relaxed text-muted">
              Temukan lokasi donor terdekat, isi form dan screening kesehatan dari rumah, lalu tunjukkan tiket QR ke petugas PMI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className={`${button} bg-primary text-on-primary hover:bg-primary-hover`} to="/register">Mulai berdonor</Link>
              <a className={`${button} border border-primary text-primary hover:bg-primary-soft`} href="#cara-kerja">Cari Lokasi Donor</a>
            </div>
          </div>
          <div className="relative grid min-h-[390px] place-items-center max-lg:mx-auto max-lg:w-full">
            <div className="hero-orb grid aspect-square w-[min(360px,75vw)] rotate-[-7deg] place-items-center rounded-full shadow-hero">
              <span className="grid h-[150px] w-[115px] rotate-45 place-items-center rounded-[60%_60%_60%_10%] bg-primary text-[2.8rem] text-on-primary shadow-heart" aria-hidden="true">♥</span>
            </div>
            <div className="absolute right-0 bottom-[10%] flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-xs leading-tight text-muted shadow-sm">
              <strong className="text-4xl text-primary">1</strong><span>donor dapat<br />menyelamatkan 3 nyawa</span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-20" id="layanan">
          <div className="mb-10 max-w-[600px]">
            <p className={eyebrow}>Mengapa DarahTerpadu?</p>
            <h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading">Berbuat baik jadi lebih sederhana.</h2>
            <p className="text-muted">Kami hadir untuk membuat setiap langkah kebaikan terasa mudah dan berarti.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((service) => (
              <article className="rounded-xl border border-border bg-surface p-7" key={service.title}>
                <span className="mb-6 grid size-12 place-items-center rounded-full bg-primary-soft text-xl text-primary" aria-hidden="true">{service.icon}</span>
                <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-muted">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-8 pb-20" id="cara-kerja">
          <div className="mb-10 max-w-[600px]"><p className={eyebrow}>Cara kerja</p><h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading">Mulai dari satu langkah kecil.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => <article className="bg-transparent p-7" key={step.number}><span className="mb-6 block text-xs font-bold tracking-[0.1em] text-primary">{step.number}</span><h3 className="mb-2 text-lg font-bold">{step.title}</h3><p className="m-0 text-sm leading-relaxed text-muted">{step.description}</p></article>)}
          </div>
        </section>

        <section className="mx-auto mb-20 flex w-[calc(100%-3rem)] max-w-[1180px] items-center justify-between gap-8 rounded-2xl bg-primary px-[clamp(1.5rem,5vw,4rem)] py-14 text-on-primary max-md:flex-col max-md:items-start">
          <div><p className={`${eyebrow} text-on-primary`}>Bersama kita bisa</p><h2 className="my-2 max-w-[600px] text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em]">Jadilah bagian dari gerakan kemanusiaan.</h2></div>
          <Link className={`${button} bg-surface text-primary hover:bg-primary-50`} to="/register">Daftar sekarang</Link>
        </section>
      </main>
    </>
  )
}

export default LandingPage
