import { API_URL } from '../config'

export const getDeckByUser = async () => {
  const url = new URL(`${API_URL}/decks`)

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!response.ok) throw new Error(response.statusText)
  return await response.json() as Deck[]
}
