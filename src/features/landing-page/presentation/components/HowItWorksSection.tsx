const STEPS = [
  {
    number: "01",
    title: "Cari Lokasi Donor",
    description: "Lihat lokasi, jadwal, dan sisa kuota donor tanpa perlu login.",
  },
  {
    number: "02",
    title: "Daftar & Masuk",
    description: "Buat akun pendonor sekali saja, lalu pilih jadwal yang cocok.",
  },
  {
    number: "03",
    title: "Isi Form & Screening",
    description: "Jawab pertanyaan kesehatan singkat dari rumah supaya di lokasi lebih cepat.",
  },
  {
    number: "04",
    title: "Tunjukkan Tiket QR",
    description: "Datang sesuai jadwal dan tunjukkan tiket digital ke petugasPMI.",
  },
] as const;

const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-primary";

export function HowItWorksSection() {
  return (
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-8 pb-20"
      id="cara-kerja"
    >
      <div className="mb-10 max-w-screen text-center items-center">
        <p className={eyebrow}>Cara kerja</p>
        <h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading">
          Cara Donor di DonorKu
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-4">
        {STEPS.map((step) => (
          <article
            className=" rounded-xl border border-border bg-surface p-7"
            key={step.number}
          >
            <span className="mb-6 block text-xs font-bold tracking-[0.1em] text-primary">
              {step.number}
            </span>
            <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
            <p className="m-0 text-sm leading-relaxed text-muted">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
