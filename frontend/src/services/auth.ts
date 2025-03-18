import { API_URL } from '../config'
import { ValidationError, FetchError } from '../utils/errors'
import { saveToken } from '../utils/token'

export const login = async (email: string, password: string) => {
  const url = new URL(`${API_URL}/auth/login`)

  let response
  try {
    response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({ email, password })
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
      throw new FetchError(response.statusText)
    }
    if (data) throw new ValidationError(data.message)
  }

  const data = await response.json()
  saveToken(data.jwt)

  if (!data.id || !data.username) console.error('No id or username in response')

  return { id: data.id as string, username: data.username as string }
}
export const register = async (username :string, email: string, password: string) => {
  const url = new URL(`${API_URL}/auth/register`)

  let response
  try {
    response = await fetch(url.toString(), {
      method: 'POST',
      body: JSON.stringify({ user_name: username, email, password })
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
      throw new FetchError(response.statusText)
    }
    if (data) throw new ValidationError(data.message)
  }
}
