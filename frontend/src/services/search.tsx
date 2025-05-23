import { API_URL } from '../config'

interface Props<T extends 'decks' | 'cards'> {
  query?: string,
  categories?: string[],
  page?: number,
  type: T
}
export interface Search<T extends 'decks' | 'cards'> {
  type: T,
  results: SearchResponse<T>
}

export const search = async <T extends 'decks' | 'cards'>({ query, categories, page, type }: Props<T>): Promise<Search<T>> => {
  const url = new URL(`${API_URL}/${type}/public/${type}`)

  if (query) url.searchParams.set('search', query)
  if (categories?.length && categories.length > 0) url.searchParams.set('category', categories.join(','))
  if (page) url.searchParams.set('page', String(page))

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error(response.statusText)
  const data = await response.json()

  return { type, results: Array.isArray(data) ? data as SearchResponse<T> : [] as unknown as SearchResponse<T> }
}
