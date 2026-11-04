const SIZE = 21

/**
 * QR pada tiket hanya representasi visual dari kode booking (belum memakai
 * pustaka QR sungguhan). Pola dibuat deterministik supaya kode berbeda
 * menghasilkan pola berbeda dan tidak berubah saat halaman dimuat ulang.
 */

function hashOf(text: string): number {
  let hash = 2166136261

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }

  return hash >>> 0
}

function isInFinderArea(x: number, y: number): boolean {
  const onLeft = x < 7
  const onRight = x >= SIZE - 7
  const onTop = y < 7
  const onBottom = y >= SIZE - 7

  return (onLeft || onRight) && (onTop || onBottom)
}

function isFinderModule(x: number, y: number): boolean {
  const localX = x < 7 ? x : x - (SIZE - 7)
  const localY = y < 7 ? y : y - (SIZE - 7)

  const isRing = localX === 0 || localX === 6 || localY === 0 || localY === 6
  const isCore = localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4

  return isRing || isCore
}

function isFilled(seed: number, x: number, y: number): boolean {
  if (isInFinderArea(x, y)) {
    return isFinderModule(x, y)
  }

  return ((hashOf(`${seed}:${x}:${y}`) >>> 7) & 1) === 1
}

type TicketQrProps = {
  value: string
  className?: string
}

export function TicketQr({ value, className = 'size-40' }: TicketQrProps) {
  const seed = hashOf(value)
  const cells: { key: string; x: number; y: number }[] = []

  for (let y = 0; y < SIZE; y += 1) {
    for (let x = 0; x < SIZE; x += 1) {
      if (isFilled(seed, x, y)) {
        cells.push({ key: `${x}-${y}`, x, y })
      }
    }
  }

  return (
    <svg
      aria-label={`QR tiket ${value}`}
      className={`${className} text-heading`}
      role="img"
      shapeRendering="crispEdges"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
    >
      <rect fill="transparent" height={SIZE} width={SIZE} />
      {cells.map((cell) => (
        <rect fill="currentColor" height={1} key={cell.key} width={1} x={cell.x} y={cell.y} />
      ))}
    </svg>
  )
}
