const SERVICES = [
  { icon: '♥', title: 'Donor lebih mudah', description: 'Temukan lokasi dan jadwal donor terdekat yang sesuai dengan waktu Anda.' },
  { icon: '✚', title: 'Stok transparan', description: 'Pantau ketersediaan darah secara akurat untuk membantu kebutuhan medis.' },
  { icon: '⌁', title: 'Terhubung lebih cepat', description: 'Hubungkan pendonor, UTD, dan rumah sakit dalam satu ekosistem terpercaya.' },
] as const

const eyebrow = 'text-xs font-bold uppercase tracking-[0.14em] text-primary'

export function ServicesSection() {
  return (
    <section className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-20" id="layanan">
      <div className="mb-10 max-w-screen text-center items-center">
        <p className={eyebrow}>Mengapa DonorKu?</p>
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
  )
}
