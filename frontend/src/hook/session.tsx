import { useContext } from 'react'
import { SessionContext } from '../context/session'

export const useSession = () => {
  const { session, setSession } = useContext(SessionContext)
  return { session, setSession }
}
