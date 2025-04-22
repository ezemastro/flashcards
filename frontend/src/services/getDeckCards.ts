import { API_URL } from '../config'

export const getDeckCards = async (deckId: string) => {
  const url = new URL(`${API_URL}/decks/user/cards`)
  url.searchParams.set('id_deck', deckId)

  const response = await fetch(url.toString(),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  if (!response.ok) throw new Error(response.statusText)
  const data = await response.json()

  return data.cards as Card[]
}
