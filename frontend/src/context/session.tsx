import { createContext, useEffect, useState } from 'react'
import { getToken } from '../utils/token'

interface Session {
  username: string,
  id: string
}
interface SessionContext {
  session: Session | null
  setSession: (session: Session) => void
}

export const SessionContext = createContext<SessionContext>({
  session: null,
  setSession: () => {}
})

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<SessionContext['session']>(null)

  useEffect(() => {
    if (!getToken()) return setSession(null)
    const session = localStorage.getItem('user')
    console.log(session)
    if (!session) return setSession(null)
    const parsedSession = JSON.parse(session)
    if (!parsedSession.id || !parsedSession.username) return setSession(null)
    setSession({ id: parsedSession.id, username: parsedSession.username })
  }, [])

  const newSession = (session: Session) => {
    setSession(session)
    localStorage.setItem('session', JSON.stringify(session))
  }

  return (
    <SessionContext.Provider value={{
      session,
      setSession: newSession
    }}>
      {children}
    </SessionContext.Provider>
  )
}
