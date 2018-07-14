import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import actions, { selectors } from './duck'
// import InlineEdit from '../atoms/InlineEdit'
import Card from '../cards/Card'
import cardActions from '../cards/duck'
import { Draggable } from 'react-beautiful-dnd'

const BlockContainer = styled.div`
  border-radius: 5px;
  width: 270px;
  margin: 5px;
`
const BlockHeader = styled.div`
  display: flex;
  background-color: #e2e4e6;
  padding-bottom: 10px;
  flex-direction: row;
  align-items: center;
  padding: 5px 5px 0 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`

const BlockFooter = styled.div`
  background-color: #e2e4e6;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0 5px 5px 5px;
  margin-top: -10px;
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
  cursor: pointer;
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
const CardsWrapper = styled.div`
  background-color: #e2e4e6;
  padding: 10px 5px 10px 5px;
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
      <Draggable draggableId={this.props.blockId} index={this.props.index}>
        {(provided, snapshot) => (
          <BlockContainer
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <BlockHeader>
              <BlockTitle
                value={block.description}
                onChange={this.updateDescription}
              />
              <BlockDeleteButton onClick={this.deleteBlock}>
                X
              </BlockDeleteButton>
            </BlockHeader>
            <CardsWrapper>
              {block.cards.map(cardId => <Card key={cardId} cardId={cardId} />)}
            </CardsWrapper>
            <BlockFooter>
              <AddCardButton onClick={this.addCard}>Add card...</AddCardButton>
            </BlockFooter>
          </BlockContainer>
        )}
      </Draggable>
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
