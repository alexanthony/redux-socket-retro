import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import actions, { selectors } from './duck'
// import InlineEdit from '../atoms/InlineEdit'
import Card from '../cards/Card'
import cardActions from '../cards/duck'

const BlockContainer = styled.div`
  border-radius: 5px;
  background-color: #e2e4e6;
  padding: 10px;
`
const BlockHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
`

const AddCardButton = styled.button`
  background: none;
  transition: 0.15s;
  border: none;
  width: 90%;
  height: 30px;
  padding: 0;
  border-radius: 5px;
  outline: 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
  &:focus {
    outline: 0;
  }
`

const BlockTitle = styled.input`
  padding: 5px;
  outline: 0;
  border: none;
  background: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  font-size: 1.3em;
  min-width: 0;
`
const BlockDeleteButton = styled.button`
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

class Block extends React.Component {
  updateDescription = event => {
    this.props.updateBlockDescription(this.props.blockId, event.target.value)
  }

  addCard = () => {
    this.props.addCard(this.props.blockId)
  }

  deleteBlock = () => {
    this.props.deleteBlock(this.props.blockId, this.props.block.cards)
  }

  render() {
    const { block } = this.props
    return (
      <BlockContainer>
        <BlockHeader>
          <BlockTitle
            value={block.description}
            onChange={this.updateDescription}
          />
          <BlockDeleteButton onClick={this.deleteBlock}>X</BlockDeleteButton>
        </BlockHeader>
        {block.cards.map(cardId => <Card key={cardId} cardId={cardId} />)}
        <AddCardButton onClick={this.addCard}>Add card...</AddCardButton>
      </BlockContainer>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    block: selectors.getBlock(state, ownProps.blockId)
  }),
  {
    updateBlockDescription: actions.updateBlockDescription,
    addCard: cardActions.addCard,
    deleteBlock: cardActions.deleteBlock
  }
)(Block)
