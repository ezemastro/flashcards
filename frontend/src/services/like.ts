import { API_URL } from '../config'

export const like = async (deckId: string) => {
  const url = new URL(`${API_URL}/decks/like/${deckId}`)

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!response.ok) throw new Error(response.statusText)
}

export const unlike = async (deckId: string) => {
  const url = new URL(`${API_URL}/decks/unlike/${deckId}`)

  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (!response.ok) throw new Error(response.statusText)
}
