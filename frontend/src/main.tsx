import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SessionProvider } from './context/session.tsx'
import App from './App.tsx'
import './reset.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <App />
    </SessionProvider>
  </StrictMode>
)
