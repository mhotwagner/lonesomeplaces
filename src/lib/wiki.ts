/** Live Wikipedia summaries via the REST API (CORS-open, follows redirects). */

export interface WikiSummary {
  extract: string
  thumbnail: string | null
  pageUrl: string
}

const cache = new Map<string, Promise<WikiSummary | null>>()

export function fetchWikiSummary(title: string): Promise<WikiSummary | null> {
  const cached = cache.get(title)
  if (cached) return cached

  const promise = fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, '_'))}`,
    { headers: { Accept: 'application/json' } },
  )
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (!data || !data.extract) return null
      return {
        extract: data.extract as string,
        thumbnail: (data.originalimage?.source ?? data.thumbnail?.source ?? null) as string | null,
        pageUrl: (data.content_urls?.desktop?.page ??
          `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`) as string,
      }
    })
    .catch(() => null)

  cache.set(title, promise)
  return promise
}
