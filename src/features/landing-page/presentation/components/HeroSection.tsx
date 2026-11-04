import { Link } from 'react-router-dom'

const button = 'inline-flex min-h-13 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors'
const eyebrow = 'text-xs font-bold uppercase tracking-[0.14em] text-primary'

export function HeroSection() {
  return (
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
  )
}
