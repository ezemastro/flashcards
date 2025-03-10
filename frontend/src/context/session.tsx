import { createContext, useState } from 'react'

interface Session {
  username: string
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
  // in useEffect get session

  const newSession = (session: Session) => {
    setSession(session)
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
