const STEPS = [
  {
    number: "01",
    question: "Apakah saya harus login untuk melihat lokasi donor?",
    answer: "Tidak. Lokasi, jadwal, dan detail donor bisa dilihat tanpa login. Akun hanya dibutuhkan saat kamu ingin donor.",
  },
  {
    number: "02",
    question: "Apa itu screening kesehatan?",
    answer: "Beberapa pertanyaan singkat tentang kondisimu hari ini. Pemeriksaan lanjutan tetap dilakukan petugas PMI di lokasi.",
  },
  {
    number: "03",
    question: "Bagaimana kalau hasil screening saya tidak lolos?",
    answer: "Kamu akan melihat alasannya dan kapan boleh mencoba lagi. Tiket tidak diterbitkan sampai syarat terpenuhi.",
  },
  {
    number: "04",
    question: "Untuk apa tiket QR?",
    answer: "Petugas memindai tiket saat kamu datang, jadi data donormu langsung tercatat tanpa mengisi ulang.",
  },
] as const;

const eyebrow = "text-xs font-bold uppercase tracking-[0.14em] text-primary";

export function FAQSection() {
  return (
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] scroll-mt-24 py-8 pb-20"
      id="faq"
    >
      <div className="mb-10 max-w-[600px]">
        <p className={eyebrow}>FAQ</p>
        <h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading">
          Pertanyaan yang sering muncul
        </h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {STEPS.map((step) => (
          <article
            className=" rounded-xl border border-border bg-surface p-7"
            key={step.number}
          >
            <h3 className="mb-2 text-lg font-bold text-primary">{step.question}</h3>
            <p className="m-0 text-sm leading-relaxed text-muted">
              {step.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
