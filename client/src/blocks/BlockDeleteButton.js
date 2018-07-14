import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectors } from './duck'
import cardActions from '../cards/duck'

const Button = styled.button`
  z-index: 10;
  cursor: pointer;
  margin: 5px;
  background: none;
  outline: none;
  border: none;
  border-radius: 5px;
  &:hover {
    background: rgba(0, 0, 0, 0.12);
  }
`

class BlockDeleteButton extends React.Component {
  deleteBlock = () => {
    this.props.deleteBlock(this.props.blockId, this.props.cardIds)
  }

  render() {
    return <Button onClick={this.deleteBlock}>X</Button>
  }
}

export default connect(
  (state, ownProps) => ({
    cardIds: selectors.getBlock(state, ownProps.blockId).cards
  }),
  {
    deleteBlock: cardActions.deleteBlock
  }
)(BlockDeleteButton)
