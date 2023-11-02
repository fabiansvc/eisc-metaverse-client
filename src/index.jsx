import React from 'react'
import ReactDOM from 'react-dom/client'
import Experience from './Experience'
import './index.css'
import { SocketManager } from './pages/Components/Socket/SocketManager'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <SocketManager/>
      <Experience />
  </React.StrictMode>
)
