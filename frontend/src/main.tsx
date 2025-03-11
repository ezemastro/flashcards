import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from './context/session.tsx'
import { ThemeProvider } from './context/theme.tsx'
import App from './App.tsx'
import './css/reset.css'
import './css/colors.css'
import './css/font.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <SessionProvider>
        <App />
      </SessionProvider>
    </ThemeProvider>
  </StrictMode>
)
