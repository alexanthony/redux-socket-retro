import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { Provider } from 'react-redux'
import logo from './logo.svg'
import configureStore from './configureStore'

const store = configureStore()

const AppContainer = styled.div`
  text-align: center;
`

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`
const logoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const Logo = styled.img`
  animation: ${logoSpin} infinite 20s linear;
  height: 80px;
`

const Title = styled.h1`
  font-size: 1.5em;
`

const Intro = styled.p`
  font-size: large;
`

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer>
          <Header>
            <Logo src={logo} className="App-logo" alt="logo" />
            <Title className="App-title">Welcome to React</Title>
          </Header>
          <Intro className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </Intro>
        </AppContainer>
      </Provider>
    )
  }
}

export default App
