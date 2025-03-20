import { API_URL } from '../config'

export const getDeck = async (userId: string, deckId: string) => {
  const url = new URL(`${API_URL}/decks/user/cards`)
  url.searchParams.set('id_user', userId)
  url.searchParams.set('id_deck', deckId)

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error(response.statusText)
  return await response.json() as Deck
}
export const getDeckByUser = async (userId: string) => {
  const url = new URL(`${API_URL}/decks/${userId}`)

  const response = await fetch(url.toString())
  if (!response.ok) throw new Error(response.statusText)
  return await response.json() as Deck[]
}
