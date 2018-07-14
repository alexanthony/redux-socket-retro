import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  html {
    height: 100%;
    width: 100%;
  }
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  height: 100%;
}
body div#root {
  height: 100%;
  width: 100%;
}
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
