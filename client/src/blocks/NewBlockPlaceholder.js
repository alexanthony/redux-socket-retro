import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import actions from './duck'
const NewBlockPlaceholderContainer = styled.div`
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.12);
  cursor: pointer;
  display: flex;
  align-self: flex-start;
  width: 270px;
  color: rgba(255, 255, 255, 0.8);
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const NewBlockPlaceholder = ({ addBlock }) => (
  <NewBlockPlaceholderContainer onClick={addBlock}>
    <span>Add...</span>
  </NewBlockPlaceholderContainer>
)

export default connect(null, { addBlock: actions.addBlock })(
  NewBlockPlaceholder
)
