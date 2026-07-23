import { CATEGORIES, PLACES, type Category } from '../data/places'

const COUNTS = PLACES.reduce(
  (acc, p) => {
    acc[p.category] += 1
    return acc
  },
  { outpost: 0, station: 0, uninhabited: 0, ghost: 0, apart: 0, pole: 0 } as Record<Category, number>,
)

interface LegendProps {
  active: Category[]
  onToggle: (category: Category) => void
}

/** A map legend that is also the filter — click a row to show or hide its places. */
export function Legend({ active, onToggle }: LegendProps) {
  return (
    <nav className="legend" aria-label="Place categories">
      <p className="legend-title">Legend — {PLACES.length} places</p>
      {(Object.keys(CATEGORIES) as Category[]).map((key) => {
        const on = active.includes(key)
        return (
          <button
            key={key}
            className={`legend-row ${on ? '' : 'legend-off'}`}
            onClick={() => onToggle(key)}
            aria-pressed={on}
          >
            <span className="cat-dot" style={{ background: CATEGORIES[key].color }} aria-hidden="true" />
            <span className="legend-label">{CATEGORIES[key].label}</span>
            <span className="legend-count">{COUNTS[key]}</span>
          </button>
        )
      })}
    </nav>
  )
}
