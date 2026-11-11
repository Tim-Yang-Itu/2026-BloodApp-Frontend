type DonationPreparationCardProps = {
  requirements: readonly string[]
  bringItems: readonly string[]
}

/** Syarat donor & barang yang perlu dibawa (PDN-03). */
export function DonationPreparationCard({
  requirements,
  bringItems,
}: DonationPreparationCardProps) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-heading font-sans">Syarat donor</h2>
          <ul className="mt-3 list-none space-y-2 p-0">
            {requirements.map((item) => (
              <li className="text-sm text-muted" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-heading font-sans">Yang perlu dibawa</h2>
          <ul className="mt-3 list-none space-y-2 p-0">
            {bringItems.map((item) => (
              <li className="text-sm text-muted" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
