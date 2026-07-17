/** Geographic helpers: great-circle arcs and chart-style coordinate formatting. */

const DEG = Math.PI / 180

/**
 * Points along the great circle between two [lng, lat] coords (spherical interpolation).
 * Longitudes are unwrapped so the line never jumps across the antimeridian —
 * MapLibre renders out-of-range longitudes onto the adjacent world copy correctly.
 */
export function greatCircleArc(
  from: [number, number],
  to: [number, number],
  steps = 96,
): [number, number][] {
  const [lng1, lat1] = [from[0] * DEG, from[1] * DEG]
  const [lng2, lat2] = [to[0] * DEG, to[1] * DEG]

  const x1 = Math.cos(lat1) * Math.cos(lng1)
  const y1 = Math.cos(lat1) * Math.sin(lng1)
  const z1 = Math.sin(lat1)
  const x2 = Math.cos(lat2) * Math.cos(lng2)
  const y2 = Math.cos(lat2) * Math.sin(lng2)
  const z2 = Math.sin(lat2)

  const omega = Math.acos(Math.min(1, Math.max(-1, x1 * x2 + y1 * y2 + z1 * z2)))
  if (omega < 1e-9) return [from, to]

  const points: [number, number][] = []
  let prevLng = from[0]
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const a = Math.sin((1 - t) * omega) / Math.sin(omega)
    const b = Math.sin(t * omega) / Math.sin(omega)
    const x = a * x1 + b * x2
    const y = a * y1 + b * y2
    const z = a * z1 + b * z2
    const lat = Math.atan2(z, Math.sqrt(x * x + y * y)) / DEG
    let lng = Math.atan2(y, x) / DEG
    // Unwrap longitude to stay continuous with the previous point.
    while (lng - prevLng > 180) lng -= 360
    while (lng - prevLng < -180) lng += 360
    prevLng = lng
    points.push([lng, lat])
  }
  return points
}

/** 37°04′S · 12°19′W — the way a chart would say it. */
export function formatDMS([lng, lat]: [number, number]): string {
  const part = (value: number, pos: string, neg: string) => {
    const hemi = value < 0 ? neg : pos
    const abs = Math.abs(value)
    const deg = Math.floor(abs)
    const min = Math.round((abs - deg) * 60)
    const d = min === 60 ? deg + 1 : deg
    const m = min === 60 ? 0 : min
    return `${d}°${String(m).padStart(2, '0')}′${hemi}`
  }
  return `${part(lat, 'N', 'S')} · ${part(lng, 'E', 'W')}`
}

export function formatKm(km: number): string {
  return `≈${new Intl.NumberFormat('en-US').format(km)} km`
}
