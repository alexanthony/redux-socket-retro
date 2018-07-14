import React, { Component } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Blocks from './blocks/Blocks'
import Header from './Header'

const store = configureStore()

const AppContainer = styled.div`
  text-align: center;
  background-color: #0079bf;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <Header />
          <Blocks />
        </AppContainer>
      </Provider>
    )
  }
}

export default App
