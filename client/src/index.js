import React, { Fragment } from 'react'
import { render } from 'react-dom'
import App from './App'
import '../node_modules/bulma/css/bulma.css'
import './index.css'

render(
  <Fragment>
    <App />
  </Fragment>,
  document.getElementById('root')
)

