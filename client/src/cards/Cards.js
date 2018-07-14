import React from 'react'
// import { connect } from 'react-redux'
import styled from 'styled-components'
// import actions, { selectors } from './duck'
// import InlineEdit from '../atoms/InlineEdit'
import Card from './Card'
// import cardActions from './duck'
import { Droppable } from 'react-beautiful-dnd'

const CardsWrapper = styled.div`
  background-color: #e2e4e6;
  padding: 10px 5px 10px 5px;
  min-height: 20px;
`

class Cards extends React.Component {
  render() {
    const { cardIds, blockId } = this.props
    return (
      <Droppable droppableId={blockId} type="CARD">
        {(provided, snapshot) => (
          <CardsWrapper
            {...provided.droppableProps}
            innerRef={provided.innerRef}
          >
            {cardIds.map((cardId, index) => (
              <Card key={cardId} index={index} cardId={cardId} />
            ))}
            {provided.placeholder}
          </CardsWrapper>
        )}
      </Droppable>
    )
  }
}

export default Cards
