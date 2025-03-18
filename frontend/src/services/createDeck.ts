import { API_URL } from '../config'
import { FetchError, ValidationError } from '../utils/errors'

interface Props {
  userId: string,
  title: string,
  isPublic: boolean,
  desc: string,
  cards: Card[]
}

export const createDeck = async ({ userId, title, isPublic, desc, cards }: Props) => {
  const url = new URL(`${API_URL}/decks/newdeck`)

  let response: Response
  try {
    response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({
        id_creator: userId,
        name: title,
        public: isPublic,
        description: desc,
        cards: cards.map(card => {
          return {
            question: card.question,
            answer: card.answer,
            category: card.category
          }
        })
      })
    })
  } catch (error) {
    throw new FetchError((error as Error).message)
  }

  if (!response.ok) {
    let data
    try {
      data = await response.json()
    } catch (error) {
      if (error ! instanceof Error) console.error('error')
    }
    if (data) throw new ValidationError(data.message)
    throw new FetchError(response.statusText)
  }

  return await response.json() as Deck
}
