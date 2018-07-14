import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { clearAll } from './globalActions'

const HeaderContainer = styled.header`
  background-color: rgba(0, 0, 0, 0.12);
  height: 40px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const HeaderLeft = styled.div``
const Title = styled.h1`
  font-size: 1.3em;
`
const Button = styled.button`
  background-color: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border: none;
  outline: none;
  margin-right: 10px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`
const Header = ({ clearAll }) => (
  <HeaderContainer>
    <HeaderLeft />
    <Title>Let's Retro</Title>
    <Button onClick={clearAll}>Clear All</Button>
  </HeaderContainer>
)

export default connect(null, { clearAll })(Header)
