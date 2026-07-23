import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import type { StyleSpecification } from 'maplibre-gl'
import type { FeatureCollection } from 'geojson'
import 'maplibre-gl/dist/maplibre-gl.css'
import { CATEGORIES, PLACES, type Category, type LonesomePlace } from '../data/places'
import { formatDMS, greatCircleArc } from '../lib/geo'

const MOBILE_QUERY = '(max-width: 720px)'
const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

/** Mercator tiles end at ±85.05°; keep drawable geometry inside that. */
const clampLat = ([lng, lat]: [number, number]): [number, number] => [
  lng,
  Math.max(-85.02, Math.min(85.02, lat)),
]

const placesGeoJSON: FeatureCollection = {
  type: 'FeatureCollection',
  features: PLACES.map((p) => ({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: p.displayCoords ?? p.coords },
    properties: { id: p.id, name: p.name, category: p.category },
  })),
}

const EMPTY: FeatureCollection = { type: 'FeatureCollection', features: [] }

const categoryColor: maplibregl.ExpressionSpecification = [
  'match',
  ['get', 'category'],
  'outpost', CATEGORIES.outpost.color,
  'station', CATEGORIES.station.color,
  'uninhabited', CATEGORIES.uninhabited.color,
  'ghost', CATEGORIES.ghost.color,
  'apart', CATEGORIES.apart.color,
  CATEGORIES.pole.color,
]

const isSelected: maplibregl.ExpressionSpecification = ['boolean', ['feature-state', 'selected'], false]
const isHovered: maplibregl.ExpressionSpecification = ['boolean', ['feature-state', 'hover'], false]

const mapStyle: StyleSpecification = {
  version: 8,
  projection: { type: 'globe' },
  sources: {
    satellite: {
      type: 'raster',
      tiles: ['https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg'],
      tileSize: 256,
      minzoom: 0,
      maxzoom: 14,
      attribution:
        '<a href="https://s2maps.eu" target="_blank" rel="noreferrer">Sentinel-2 cloudless</a> by EOX (Copernicus data 2020)',
    },
    places: { type: 'geojson', data: placesGeoJSON, promoteId: 'id' },
    'lonesome-line': { type: 'geojson', data: EMPTY },
  },
  sky: {
    'sky-color': '#0B1526',
    'horizon-color': '#7FA3D4',
    'fog-color': '#0B1526',
    'atmosphere-blend': ['interpolate', ['linear'], ['zoom'], 0, 1, 5, 1, 7, 0],
  },
  layers: [
    { id: 'satellite', type: 'raster', source: 'satellite' },
    {
      id: 'lonesome-line-path',
      type: 'line',
      source: 'lonesome-line',
      filter: ['==', ['geometry-type'], 'LineString'],
      paint: {
        'line-color': '#F2EFE4',
        'line-width': 1.5,
        'line-opacity': 0.85,
        'line-dasharray': [0, 4, 3],
      },
    },
    {
      id: 'lonesome-line-end',
      type: 'circle',
      source: 'lonesome-line',
      filter: ['==', ['geometry-type'], 'Point'],
      paint: {
        'circle-radius': 3,
        'circle-color': '#04060A',
        'circle-stroke-color': '#F2EFE4',
        'circle-stroke-width': 1.5,
        'circle-opacity': 0.8,
      },
    },
    {
      id: 'place-halo',
      type: 'circle',
      source: 'places',
      paint: {
        'circle-color': categoryColor,
        'circle-blur': 1,
        'circle-radius': [
          'interpolate', ['linear'], ['zoom'],
          0, ['+', 9, ['case', isHovered, 4, isSelected, 4, 0]],
          4, ['+', 14, ['case', isHovered, 4, isSelected, 4, 0]],
          8, ['+', 20, ['case', isHovered, 4, isSelected, 4, 0]],
        ],
        'circle-opacity': ['case', isSelected, 0.55, isHovered, 0.5, 0.3],
      },
    },
    {
      id: 'place-core',
      type: 'circle',
      source: 'places',
      paint: {
        'circle-color': categoryColor,
        'circle-radius': [
          'interpolate', ['linear'], ['zoom'],
          0, ['+', 3.2, ['case', isHovered, 1.5, isSelected, 1.5, 0]],
          4, ['+', 5, ['case', isHovered, 1.5, isSelected, 1.5, 0]],
          8, ['+', 7, ['case', isHovered, 1.5, isSelected, 1.5, 0]],
        ],
        'circle-stroke-color': ['case', isSelected, '#F2EFE4', 'rgba(4, 6, 10, 0.55)'],
        'circle-stroke-width': ['case', isSelected, 1.5, 1],
      },
    },
  ],
}

// Marching-ants sequence for the loneliness line (from the classic MapLibre example).
const DASH_SEQUENCE: number[][] = [
  [0, 4, 3], [0.5, 4, 2.5], [1, 4, 2], [1.5, 4, 1.5], [2, 4, 1], [2.5, 4, 0.5], [3, 4, 0],
  [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5], [0, 2, 3, 2], [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5],
]

interface GlobeMapProps {
  activeCategories: Category[]
  selected: LonesomePlace | null
  onSelect: (id: string | null) => void
}

export function GlobeMap({ activeCategories, selected, onSelect }: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [ready, setReady] = useState(false)
  const [tip, setTip] = useState<{ x: number; y: number; name: string } | null>(null)
  const [cursor, setCursor] = useState<[number, number] | null>(null)

  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect
  const selectedRef = useRef<LonesomePlace | null>(selected)
  selectedRef.current = selected
  const hoverIdRef = useRef<string | null>(null)

  // ——— init (once)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const reducedMotion = window.matchMedia(REDUCED_MOTION).matches

    const map = new maplibregl.Map({
      container,
      style: mapStyle,
      center: [-14, -30],
      zoom: 1.7,
      minZoom: 0.8,
      maxZoom: 12,
      attributionControl: { compact: true },
    })
    mapRef.current = map

    map.on('load', () => setReady(true))

    const query = (point: maplibregl.Point) =>
      map.queryRenderedFeatures(
        [
          [point.x - 6, point.y - 6],
          [point.x + 6, point.y + 6],
        ],
        { layers: ['place-core', 'place-halo'] },
      )

    map.on('click', (e) => {
      const hit = query(e.point)
      onSelectRef.current(hit.length ? (hit[0].properties.id as string) : null)
    })

    const clearHover = () => {
      if (hoverIdRef.current) {
        map.setFeatureState({ source: 'places', id: hoverIdRef.current }, { hover: false })
        hoverIdRef.current = null
      }
      map.getCanvas().style.cursor = ''
      setTip(null)
    }

    map.on('mousemove', (e) => {
      setCursor([e.lngLat.lng, e.lngLat.lat])
      const hit = query(e.point)
      if (hit.length) {
        const id = hit[0].properties.id as string
        if (hoverIdRef.current !== id) {
          if (hoverIdRef.current)
            map.setFeatureState({ source: 'places', id: hoverIdRef.current }, { hover: false })
          map.setFeatureState({ source: 'places', id }, { hover: true })
          hoverIdRef.current = id
        }
        map.getCanvas().style.cursor = 'pointer'
        setTip({ x: e.point.x, y: e.point.y, name: hit[0].properties.name as string })
      } else {
        clearHover()
      }
    })
    map.getCanvas().addEventListener('mouseleave', () => {
      clearHover()
      setCursor(null)
    })

    // ——— ambient drift: the globe turns slowly until you touch it,
    // and resumes only when idle, zoomed out, with nothing selected.
    let lastInteraction = 0
    const markInteraction = () => {
      lastInteraction = Date.now()
    }
    ;(['mousedown', 'wheel', 'touchstart', 'dragstart'] as const).forEach((ev) =>
      map.on(ev, markInteraction),
    )

    let driftTimer: ReturnType<typeof setInterval> | undefined
    if (!reducedMotion) {
      driftTimer = setInterval(() => {
        if (map.isMoving() || selectedRef.current) return
        if (Date.now() - lastInteraction < 15000 && lastInteraction !== 0) return
        if (map.getZoom() > 2.4) return
        const center = map.getCenter()
        map.easeTo({ center: [center.lng - 1.5, center.lat], duration: 1300, easing: (n) => n })
      }, 1300)
    }

    return () => {
      if (driftTimer) clearInterval(driftTimer)
      map.remove()
      mapRef.current = null
    }
  }, [])

  // ——— category filter
  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready) return
    const filter: maplibregl.ExpressionSpecification = [
      'in',
      ['get', 'category'],
      ['literal', activeCategories],
    ]
    map.setFilter('place-core', filter)
    map.setFilter('place-halo', filter)
  }, [activeCategories, ready])

  // ——— selection: feature state, loneliness line, camera
  useEffect(() => {
    const map = mapRef.current
    if (!map || !ready) return
    const reducedMotion = window.matchMedia(REDUCED_MOTION).matches
    const source = map.getSource('lonesome-line') as maplibregl.GeoJSONSource

    if (!selected) {
      source.setData(EMPTY)
      map.easeTo({ padding: { top: 0, right: 0, bottom: 0, left: 0 }, duration: 500 })
      return
    }

    map.setFeatureState({ source: 'places', id: selected.id }, { selected: true })

    const from = clampLat(selected.displayCoords ?? selected.coords)
    const to = clampLat(selected.nearest.coords)
    source.setData({
      type: 'FeatureCollection',
      features: [
        { type: 'Feature', geometry: { type: 'LineString', coordinates: greatCircleArc(from, to) }, properties: {} },
        { type: 'Feature', geometry: { type: 'Point', coordinates: to }, properties: {} },
      ],
    })

    const isMobile = window.matchMedia(MOBILE_QUERY).matches
    const camera = {
      center: from as [number, number],
      zoom: selected.flyZoom ?? 5.2,
      padding: isMobile
        ? { top: 0, right: 0, bottom: Math.round(window.innerHeight * 0.48), left: 0 }
        : { top: 0, right: 440, bottom: 0, left: 0 },
    }
    if (reducedMotion) {
      map.jumpTo(camera)
    } else {
      map.flyTo({ ...camera, speed: 0.85, essential: false })
    }

    // marching ants
    let raf = 0
    let step = 0
    let lastTick = 0
    if (!reducedMotion) {
      const animate = (t: number) => {
        if (t - lastTick > 70) {
          lastTick = t
          step = (step + 1) % DASH_SEQUENCE.length
          if (map.getLayer('lonesome-line-path')) {
            map.setPaintProperty('lonesome-line-path', 'line-dasharray', DASH_SEQUENCE[step])
          }
        }
        raf = requestAnimationFrame(animate)
      }
      raf = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(raf)
      if (map.getLayer('place-core')) {
        map.setFeatureState({ source: 'places', id: selected.id }, { selected: false })
      }
    }
  }, [selected, ready])

  return (
    <div className="globe-shell">
      <div ref={containerRef} className="globe-map" />
      {tip && (
        <div className="map-tooltip" style={{ left: tip.x, top: tip.y }}>
          {tip.name}
        </div>
      )}
      {cursor && (
        <div className="cursor-readout" aria-hidden="true">
          {formatDMS(cursor)}
        </div>
      )}
    </div>
  )
}
