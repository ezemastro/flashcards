import { createContext, useEffect, useState } from 'react'

interface ThemeContext {
  theme: 'light' | 'dark'
  setTheme: (theme: ThemeContext['theme']) => void
}

export const ThemeContext = createContext<ThemeContext>({
  theme: 'dark',
  setTheme: () => {}
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeContext['theme']>('light')
  // TODO - Save in localstorage

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const newTheme = (theme: ThemeContext['theme']) => {
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: newTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
