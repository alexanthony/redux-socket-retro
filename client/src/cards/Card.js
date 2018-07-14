import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import actions from './duck'
import CardTextInput from './CardTextInput'

const draggingStyle = css`
  background-color: rgba(50, 171, 240, 0.8);
`

const CardWrapper = styled.div`
  position: relative;
  width: 100%;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  background: #fff;
  border-radius: 5px;
  min-height: 30px;
  transition: 0.15s;
  margin-bottom: 10px;
  padding: 10px 0 10px 0;
  &:hover {
    background: #f7f7f7;
  }
  ${props => props.isDragging && draggingStyle};
`

const CardDeleteButton = styled.span`
  position: absolute;
  right: 4px;
  top: 0;
  z-index: 10;
  cursor: pointer;
`

class Card extends React.PureComponent {
  deleteCard = () => {
    this.props.deleteCard(this.props.cardId)
  }
  render() {
    return (
      <Draggable draggableId={this.props.cardId} index={this.props.index}>
        {(provided, snapshot) => (
          <CardWrapper
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <CardDeleteButton onClick={this.deleteCard}>x</CardDeleteButton>
            <CardTextInput cardId={this.props.cardId} />
          </CardWrapper>
        )}
      </Draggable>
    )
  }
}

export default connect(null, {
  updateText: actions.updateCardText,
  deleteCard: actions.deleteCard
})(Card)
