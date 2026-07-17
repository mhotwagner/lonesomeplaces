# Lonely Places

*An atlas of the ends of the earth.*

A quiet satellite globe dotted with the most remote and isolated places in the
world — Tristan da Cunha, Bouvet Island, Point Nemo, and some fifty other
specks of land (and non-land) that are a very long way from everything else.

Click a beacon and a dossier slides in: an evocative field note, live Wikipedia
summary and imagery, how you'd actually get there, and the hero stat of every
entry — the distance to the nearest inhabited place, drawn on the globe as an
animated great-circle line to that neighbor. Or press **"Take me somewhere
lonely"** and let the atlas choose.

## Running it

```sh
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

## How it's put together

- **Vite + React + TypeScript**, no server — deployable as a static site.
- **MapLibre GL JS** with its native globe projection and atmosphere, over the
  free [EOX Sentinel-2 cloudless](https://s2maps.eu) satellite tiles.
- **`src/data/places.ts`** is the heart: a hand-curated dataset of 57 places
  in five categories (inhabited outposts, stations & bases, uninhabited,
  abandoned, poles of inaccessibility). Every entry has coordinates, honest
  approximate stats (marked ≈), a nearest-neighbor for the loneliness line,
  a "getting there" note, and a short blurb. Adding a place = adding one object.
- **Wikipedia REST API** provides live summaries and photos at view time.
- Deep links: `?place=edinburgh-of-the-seven-seas` opens straight to a dossier.

## Notes

- The map legend doubles as the category filter.
- The globe drifts slowly until you touch it; `prefers-reduced-motion` is
  respected throughout (no drift, no line animation, camera jumps instead of
  flying).
- Mercator tiles end at 85.05°S, so the South Pole station's marker sits at the
  edge of the drawable world — its dossier explains the honest cartographic
  compromise.
