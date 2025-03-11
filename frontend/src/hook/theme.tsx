import { useContext } from 'react'
import { ThemeContext } from '../context/theme'

export const useSession = () => {
  const { theme, setTheme } = useContext(ThemeContext)
  return { theme, setTheme }
}
