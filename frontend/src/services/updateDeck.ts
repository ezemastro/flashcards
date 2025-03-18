import { API_URL } from '../config'
import { FetchError, ValidationError } from '../utils/errors'

interface Props {
  id: string,
  title: string,
  isPublic: boolean,
  desc: string
}

export const updateDeck = async ({ id, title, isPublic, desc }: Props) => {
  const url = new URL(`${API_URL}/decks`)

  let response: Response
  try {
    response = await fetch(url.toString(), {
      method: 'PATCH',
      body: JSON.stringify({
        id,
        name: title,
        public: isPublic,
        description: desc
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

  return true
}
