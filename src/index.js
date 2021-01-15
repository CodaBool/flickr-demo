import React from 'react'
import ReactDOM from 'react-dom'
import Container from 'react-bootstrap/Container'
import App from './App'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Container className="content">
    <App />
  </Container>,
  document.getElementById('root')
)