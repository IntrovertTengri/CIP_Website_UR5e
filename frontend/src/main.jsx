import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthContext' // ✅ import your provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ✅ wrap everything in AuthProvider */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
