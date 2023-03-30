import React from 'react'
import ReactDOM from 'react-dom/client'

import Layout from './components/templates/Layout'

import Home from './pages/Home'

import './style/main.css'
import "./style/styles.css"
import "./style/variables.css"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Layout>
      <Home />
    </Layout>
  </React.StrictMode>,
)
