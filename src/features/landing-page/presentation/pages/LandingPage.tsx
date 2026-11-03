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

const eyebrow = 'text-xs font-bold uppercase tracking-[0.14em] text-[#b3261e]'
const button = 'inline-flex min-h-13 items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold no-underline transition-colors'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-[#fffaf7] font-['Segoe_UI',system-ui,sans-serif] text-[#1f1b1a]">
        <section className="mx-auto grid min-h-[620px] w-[calc(100%-3rem)] max-w-[1180px] items-center gap-16 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)]" id="beranda">
          <div>
            <p className={eyebrow}>Satu tetes, sejuta harapan</p>
            <h1 className="my-3 max-w-[660px] text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.03] tracking-[-0.055em] text-[#281e1b]">
              Donor darah jadi lebih <span className="text-[#b3261e]">mudah,</span> nyawa bisa terselamatkan.
            </h1>
            <p className="max-w-[540px] text-[1.1rem] leading-relaxed text-[#6b6461]">
              Temukan lokasi donor terdekat, isi form dan screening kesehatan dari rumah, lalu tunjukkan tiket QR ke petugas PMI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className={`${button} bg-[#b3261e] text-white hover:bg-[#8c1d17]`} to="/register">Mulai berdonor</Link>
              <a className={`${button} border border-[#b3261e] text-[#b3261e] hover:bg-[#fbe9e7]`} href="#cara-kerja">Cari Lokasi Donor</a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-[#6b6461]">
              <span className="text-xs tracking-[-0.25em] text-[#b3261e]" aria-hidden="true">● ● ●</span>
              <span><strong className="text-[#1f1b1a]">10.000+</strong> orang telah bergabung</span>
            </div>
          </div>
          <div className="relative grid min-h-[390px] place-items-center max-lg:mx-auto max-lg:w-full">
            <div className="grid aspect-square w-[min(360px,75vw)] rotate-[-7deg] place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff_0_5%,#ffd8cf_45%,#e8a79a_100%)] shadow-[24px_24px_0_rgb(179_38_30/8%)]">
              <span className="grid h-[150px] w-[115px] rotate-45 place-items-center rounded-[60%_60%_60%_10%] bg-[#b3261e] text-[2.8rem] text-white shadow-[-14px_-16px_0_rgb(112_19_14/18%)_inset]" aria-hidden="true">♥</span>
            </div>
            <div className="absolute right-0 bottom-[10%] flex items-center gap-3 rounded-xl border border-[#e3dedb] bg-white px-5 py-4 text-xs leading-tight text-[#6b6461] shadow-sm">
              <strong className="text-4xl text-[#b3261e]">1</strong><span>donor dapat<br />menyelamatkan 3 nyawa</span>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-20" id="layanan">
          <div className="mb-10 max-w-[600px]">
            <p className={eyebrow}>Mengapa DarahTerpadu?</p>
            <h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[#281e1b]">Berbuat baik jadi lebih sederhana.</h2>
            <p className="text-[#6b6461]">Kami hadir untuk membuat setiap langkah kebaikan terasa mudah dan berarti.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {SERVICES.map((service) => (
              <article className="rounded-xl border border-[#e3dedb] bg-white p-7" key={service.title}>
                <span className="mb-6 grid size-12 place-items-center rounded-full bg-[#fbe9e7] text-xl text-[#b3261e]" aria-hidden="true">{service.icon}</span>
                <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                <p className="m-0 text-sm leading-relaxed text-[#6b6461]">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-8 pb-20" id="cara-kerja">
          <div className="mb-10 max-w-[600px]"><p className={eyebrow}>Cara kerja</p><h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] text-[#281e1b]">Mulai dari satu langkah kecil.</h2></div>
          <div className="grid gap-5 md:grid-cols-3">
            {STEPS.map((step) => <article className="bg-transparent p-7" key={step.number}><span className="mb-6 block text-xs font-bold tracking-[0.1em] text-[#b3261e]">{step.number}</span><h3 className="mb-2 text-lg font-bold">{step.title}</h3><p className="m-0 text-sm leading-relaxed text-[#6b6461]">{step.description}</p></article>)}
          </div>
        </section>

        <section className="mx-auto mb-20 flex w-[calc(100%-3rem)] max-w-[1180px] items-center justify-between gap-8 rounded-2xl bg-[#b3261e] px-[clamp(1.5rem,5vw,4rem)] py-14 text-white max-md:flex-col max-md:items-start">
          <div><p className={`${eyebrow} text-white`}>Bersama kita bisa</p><h2 className="my-2 max-w-[600px] text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em]">Jadilah bagian dari gerakan kemanusiaan.</h2></div>
          <Link className={`${button} bg-white text-[#b3261e] hover:bg-[#fff4f0]`} to="/register">Daftar sekarang</Link>
        </section>
      </main>
    </>
  )
}

export default LandingPage
