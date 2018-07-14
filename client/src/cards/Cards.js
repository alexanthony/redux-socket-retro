import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'
import createInnerList from '../atoms/InnerList'
import { selectors } from '../blocks/duck'

const CardsWrapper = styled.div`
  background-color: #e2e4e6;
  padding: 10px 5px 10px 5px;
  min-height: 20px;
`
const InnerList = createInnerList(Card, 'cardIds', 'cardId')

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
            <InnerList cardIds={cardIds} />
            {provided.placeholder}
          </CardsWrapper>
        )}
      </Droppable>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  cardIds: selectors.getBlock(state, ownProps.blockId).cards
})

export default connect(mapStateToProps)(Cards)
