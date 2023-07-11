import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Experience from './Experience'
import './stylesIndex.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Experience />
    </BrowserRouter>
  </React.StrictMode>
)
