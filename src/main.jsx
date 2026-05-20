import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import './index.css'
import App from './App.jsx'

const ResumePage = lazy(() => import('./pages/ResumePage.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/resume"
          element={
            <Suspense fallback={<div style={{ background: '#FAFAFA', height: '100vh' }} />}>
              <ResumePage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
