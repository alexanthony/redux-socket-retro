import React, { Component } from 'react'
import styled from 'styled-components'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import Blocks from './blocks/Blocks'

const store = configureStore()

const AppContainer = styled.div`
  text-align: center;
  background-color: #0079bf;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Header = styled.header`
  background-color: rgba(0, 0, 0, 0.12);
  height: 40px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.3em;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <Header>
            <Title className="App-title">Let's Retro</Title>
          </Header>
          <Blocks />
        </AppContainer>
      </Provider>
    )
  }
}

export default App
