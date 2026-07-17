import { useCallback, useEffect, useMemo, useState } from 'react'
import { GlobeMap } from './components/GlobeMap'
import { Dossier } from './components/Dossier'
import { Legend } from './components/Legend'
import { CATEGORIES, PLACES, PLACE_INDEX, type Category } from './data/places'

const ALL_CATEGORIES = Object.keys(CATEGORIES) as Category[]

const initialPlace = () => {
  const id = new URLSearchParams(window.location.search).get('place')
  return id && PLACE_INDEX.has(id) ? id : null
}

export default function App() {
  const [activeCategories, setActiveCategories] = useState<Category[]>(ALL_CATEGORIES)
  const [selectedId, setSelectedId] = useState<string | null>(initialPlace)

  const selected = selectedId ? (PLACE_INDEX.get(selectedId) ?? null) : null
  const visiblePlaces = useMemo(
    () => PLACES.filter((p) => activeCategories.includes(p.category)),
    [activeCategories],
  )

  const toggleCategory = useCallback((category: Category) => {
    setActiveCategories((prev) => {
      const next = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
      // Never allow an empty map; re-enable everything instead.
      return next.length === 0 ? ALL_CATEGORIES : next
    })
    setSelectedId((id) => {
      const place = id ? PLACE_INDEX.get(id) : null
      return place && place.category === category ? null : id
    })
  }, [])

  const takeMeSomewhereLonesome = useCallback(() => {
    const pool = visiblePlaces.filter((p) => p.id !== selectedId)
    if (pool.length === 0) return
    setSelectedId(pool[Math.floor(Math.random() * pool.length)].id)
  }, [visiblePlaces, selectedId])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Keep the URL shareable: ?place=<id> follows the selection.
  useEffect(() => {
    const url = new URL(window.location.href)
    if (selectedId) url.searchParams.set('place', selectedId)
    else url.searchParams.delete('place')
    window.history.replaceState(null, '', url)
    document.title = selected
      ? `${selected.name} — Lonesome Places`
      : 'Lonesome Places — an atlas of the ends of the earth'
  }, [selectedId, selected])

  return (
    <div className={`app ${selected ? 'has-selection' : ''}`}>
      <GlobeMap activeCategories={activeCategories} selected={selected} onSelect={setSelectedId} />

      <header className="wordmark">
        <h1>Lonesome Places</h1>
        <p>An atlas of the ends of the earth</p>
      </header>

      <Legend active={activeCategories} onToggle={toggleCategory} />

      <button className="lonesome-button" onClick={takeMeSomewhereLonesome}>
        Take me somewhere lonesome
      </button>

      {selected && <Dossier place={selected} onClose={() => setSelectedId(null)} />}
    </div>
  )
}
