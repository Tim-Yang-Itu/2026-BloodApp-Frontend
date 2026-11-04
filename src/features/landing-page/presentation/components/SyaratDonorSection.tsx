const DONOR_REQUIREMENTS = [
  "Berusia 17 sampai 60 tahun.",
  "Berat badan minimal 45 kg.",
  "Sehat dan cukup tidur pada hari donor.",
  "Jarak donor sebelumnya sekitar 3 bulan.",
] as const;

const DONORKU_BENEFITS = [
  {
    title: "Tanpa antre pendaftaran",
    description:
      "Form dan screening diisi dari rumah, tiket QR menggantikan pendaftaran di lokasi.",
  },
  {
    title: "Tahu golongan yang dibutuhkan",
    description: "Kebutuhan darah ditampilkan langsung dari data UTD PMI.",
  },
  {
    title: "Jadwal jelas",
    description: "Pilih lokasi, tanggal, dan jam yang masih tersedia.",
  },
] as const;

const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-primary";

export function SyaratDonorSection() {
  return (
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-8 pb-20"
      id="syarat"
    >
      <div className="mb-10 max-w-[600px]">
        <p className={eyebrow}>Cara kerja</p>
        <h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading">
          Cara Donor di DonorKu
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl bg-primary-soft p-8">
          <h3 className="mb-6 text-2xl font-bold text-heading">Syarat donor</h3>
          <ul className="m-0 grid gap-5 p-0">
            {DONOR_REQUIREMENTS.map((requirement) => (
              <li className="flex items-center gap-3 text-base text-foreground" key={requirement}>
                <span
                  className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-on-primary"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl bg-surface-muted p-8">
          <h3 className="mb-6 text-2xl font-bold text-heading">Kenapa lewat DonorKu</h3>
          <div className="grid gap-5">
            {DONORKU_BENEFITS.map((benefit) => (
              <div key={benefit.title}>
                <h4 className="mb-1 text-base font-bold text-heading">{benefit.title}</h4>
                <p className="m-0 text-sm leading-relaxed text-muted">{benefit.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
