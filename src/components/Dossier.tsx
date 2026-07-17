import { useEffect, useState } from 'react'
import { CATEGORIES, type LonesomePlace } from '../data/places'
import { formatDMS, formatKm } from '../lib/geo'
import { fetchWikiSummary, type WikiSummary } from '../lib/wiki'

interface DossierProps {
  place: LonesomePlace
  onClose: () => void
}

export function Dossier({ place, onClose }: DossierProps) {
  const [wiki, setWiki] = useState<WikiSummary | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    setWiki(null)
    setLoading(true)
    fetchWikiSummary(place.wikipedia).then((summary) => {
      if (!alive) return
      setWiki(summary)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [place])

  const category = CATEGORIES[place.category]
  const [lng, lat] = place.coords
  const mapsUrl = `https://www.google.com/maps/@?api=1&map_action=map&center=${lat},${lng}&zoom=13&basemap=satellite`

  return (
    <aside className="dossier" aria-label={`Dossier: ${place.name}`}>
      <button className="dossier-close" onClick={onClose} aria-label="Close dossier">
        ×
      </button>

      <p className="dossier-eyebrow">
        <span className="cat-dot" style={{ background: category.color }} aria-hidden="true" />
        {category.label}
        <span className="eyebrow-sep"> · </span>
        {place.territory}
      </p>

      <h2 className="dossier-name">{place.name}</h2>
      <p className="dossier-tagline">{place.tagline}</p>

      <div className="lonesome-stat">
        <p className="stat-label">{place.nearest.label ?? 'Nearest inhabited place'}</p>
        <p className="stat-distance">{formatKm(place.nearest.km)}</p>
        <p className="stat-neighbor">to {place.nearest.name}</p>
      </div>

      <dl className="stat-grid">
        <div>
          <dt>Position</dt>
          <dd>{formatDMS(place.coords)}</dd>
        </div>
        <div>
          <dt>Population</dt>
          <dd>{place.population}</dd>
        </div>
      </dl>

      {loading && <div className="wiki-image placeholder" aria-hidden="true" />}
      {wiki?.thumbnail && (
        <figure className="wiki-image">
          <img src={wiki.thumbnail} alt={place.name} loading="lazy" />
        </figure>
      )}

      <section className="dossier-section">
        <h3>Getting there</h3>
        <p>{place.gettingThere}</p>
      </section>

      <section className="dossier-section">
        <h3>Field notes</h3>
        <p>{place.blurb}</p>
        {place.note && <p className="dossier-note">{place.note}</p>}
      </section>

      {wiki && (
        <section className="dossier-section wiki-extract">
          <h3>From the encyclopedia</h3>
          <p>{wiki.extract}</p>
        </section>
      )}

      <p className="dossier-links">
        <a href={wiki?.pageUrl ?? `https://en.wikipedia.org/wiki/${encodeURIComponent(place.wikipedia)}`} target="_blank" rel="noreferrer">
          Read on Wikipedia
        </a>
        <a href={mapsUrl} target="_blank" rel="noreferrer">
          Open satellite view
        </a>
      </p>
    </aside>
  )
}
