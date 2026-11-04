import type { ScheduleDayDto, TimeSlotDto } from '../../application/dto/donor-location.dto'

type SchedulePickerProps = {
  days: readonly ScheduleDayDto[]
  slots: readonly TimeSlotDto[]
  selectedDate: string | null
  selectedSlotId: string | null
  onSelectDate: (date: string) => void
  onSelectSlot: (slotId: string) => void
}

/** Pemilih tanggal & jam donor pada halaman detail lokasi (PDN-03). */
export function SchedulePicker({
  days,
  slots,
  selectedDate,
  selectedSlotId,
  onSelectDate,
  onSelectSlot,
}: SchedulePickerProps) {
  return (
    <div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {days.map((day) => {
          const isActive = day.date === selectedDate
          const isFull = day.remaining === 0

          return (
            <button
              aria-pressed={isActive}
              className={`flex min-w-[110px] shrink-0 flex-col items-center gap-1 rounded-lg border px-4 py-3 transition-colors ${
                isActive ? 'border-primary bg-primary-50' : 'border-border bg-surface hover:border-border-strong'
              } ${isFull ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              disabled={isFull}
              key={day.date}
              onClick={() => onSelectDate(day.date)}
              type="button"
            >
              <span className={`text-xs ${isActive ? 'text-primary' : 'text-muted'}`}>{day.weekday}</span>
              <span className={`text-base font-bold ${isActive ? 'text-primary' : 'text-foreground'}`}>
                {day.shortDate}
              </span>
              <span className={`text-xs ${isActive ? 'text-primary' : 'text-success'}`}>
                {isFull ? 'Penuh' : `Sisa ${day.remaining}`}
              </span>
            </button>
          )
        })}
      </div>

      <p className="mt-6 mb-3 text-sm font-semibold text-foreground">Jam tersedia</p>

      {slots.length === 0 ? (
        <p className="m-0 rounded-lg bg-surface-muted px-4 py-3 text-sm text-muted">
          Belum ada jam layanan pada tanggal ini. Pilih tanggal lain.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3">
          {slots.map((slot) => {
            const isActive = slot.id === selectedSlotId

            return (
              <button
                aria-pressed={isActive}
                className={`min-w-[86px] rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  slot.full
                    ? 'cursor-not-allowed border-transparent bg-surface-muted text-placeholder'
                    : isActive
                      ? 'cursor-pointer border-primary bg-primary text-on-primary'
                      : 'cursor-pointer border-border bg-surface text-foreground hover:border-primary hover:text-primary'
                }`}
                disabled={slot.full}
                key={slot.id}
                onClick={() => onSelectSlot(slot.id)}
                type="button"
              >
                {slot.time}
                {slot.full ? ' (penuh)' : ''}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
