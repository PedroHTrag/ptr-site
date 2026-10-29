import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Liga o sistema de animações apenas para quem não pediu menos movimento.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ok')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
