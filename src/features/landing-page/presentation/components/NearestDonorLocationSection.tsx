import { Link } from "react-router-dom";

const STEPS = [
  {
    number: "01",
    tempat: "UTD PMI",
    title: "UTD PMI Kota Surabaya",
    address: "Jl. Raya Darmo No. 2, Surabaya",
    time: "Senin - Sabtu, 08.00 - 15.00 WIB",
    jarak: "1.2 km",
  },
  {
    number: "02",
    tempat: "RUMAH SAKIT",
    title: "RS Harapan Sehat",
    address: "Jl. Raya Darmo No. 2, Surabaya",
    time: "Setiap hari, 08.00 - 17.00 WIB",
    jarak: "2.5 km",
  },
  {
    number: "03",
    tempat: "MOBIL DONOR",
    title: "Mobil Donor Balai Kota",
    address: "Jl. Raya Darmo No. 2, Surabaya",
    time: "Sabtu & Minggu, 09.00 - 14.00 WIB",
    jarak: "3.8 km",
  },
] as const;

const button =
  "inline-flex max-h-20 max-w-40  rounded-lg mt-5 text-sm font-semibold no-underline transition-colors";

export function NearestDonorLocationSection() {
  return (
    <section
      className="mx-auto w-[calc(100%-3rem)] max-w-[1180px] py-8 pb-20"
      id="cara-kerja"
    >
      <div className="flex justify-between items-center mb-5">
        <h2 className="my-2 text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.015em] text-heading">
          Lokasi Donor Terdekat
        </h2>
        <a href="/all-location">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary cursor-pointer">
            Lihat Semua Lokasi
          </p>
        </a>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {STEPS.map((step) => (
          <article
            className=" rounded-xl border border-border bg-surface p-7"
            key={step.number}
          >
            <span className="mb-6 block text-xs font-bold tracking-[0.1em] text-primary">
              {step.tempat}
            </span>
            <h3 className="mb-1 text-lg font-bold">{step.title}</h3>
            <p className="mb-8 text-sm leading-relaxed text-muted">
              {step.address}
            </p>

            <div className="flex flex-col justify-between ">
              <div className="flex justify-between">
                <p className="m-0 text-sm leading-relaxed text-muted">
                  {step.time}
                </p>
                <p className="m-0 text-sm leading-relaxed text-primary font-bold">
                  {step.jarak}
                </p>
              </div>
              <Link
                className={`${button} bg-transparent text-primary hover:text-primary-hover`}
                to="/detail-location"
              >
                Lihat Detail
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
