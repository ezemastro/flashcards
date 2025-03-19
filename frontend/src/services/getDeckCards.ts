import { API_URL } from '../config'

export const getDeckCards = async (deckId: string) => {
  const url = new URL(`${API_URL}/decks/user/cards`)
  url.searchParams.set('id_deck', deckId)

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error(response.statusText)
  return await response.json() as Card[]
}
