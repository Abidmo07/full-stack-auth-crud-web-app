import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routing from './Routing.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context/ContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
          <BrowserRouter>
      <Routing />
    </BrowserRouter>
    </ContextProvider>

    
    
  </StrictMode>,
)
