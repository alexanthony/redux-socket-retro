import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import cardActions from '../cards/duck'
import Cards from '../cards/Cards'
import BlockTitle from './BlockTitle'
import BlockDeleteButton from './BlockDeleteButton'

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
  &::-moz-focus-inner {
    border: 0;
  }
`

class Block extends React.PureComponent {
  addCard = () => {
    this.props.addCard(this.props.blockId)
  }

  render() {
    return (
      <Draggable draggableId={this.props.blockId} index={this.props.index}>
        {(provided, snapshot) => (
          <BlockContainer
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <BlockHeader>
              <BlockTitle blockId={this.props.blockId} />
              <BlockDeleteButton blockId={this.props.blockId} />
            </BlockHeader>
            <Cards blockId={this.props.blockId} />
            <BlockFooter>
              <AddCardButton onClick={this.addCard}>Add card...</AddCardButton>
            </BlockFooter>
          </BlockContainer>
        )}
      </Draggable>
    )
  }
}

export default connect(null, {
  addCard: cardActions.addCard
})(Block)
