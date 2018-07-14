import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'
import actions, { selectors } from './duck'
import { Draggable } from 'react-beautiful-dnd'

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
`

const CardText = styled(Textarea)`
  resize: none;
  border: none;
  width: 90%;
  border-radius: 5px;
  margin: 5px;
  background: none;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  &:focus {
    outline: none;
  }
`

const CardDeleteButton = styled.span`
  position: absolute;
  right: 4px;
  top: 0;
  z-index: 10;
  cursor: pointer;
`

class Card extends React.Component {
  updateText = event => {
    this.props.updateText(this.props.cardId, event.target.value)
  }
  deleteCard = () => {
    this.props.deleteCard(this.props.cardId)
  }
  render() {
    const { card } = this.props
    return (
      <Draggable draggableId={this.props.cardId} index={this.props.index}>
        {(provided, snapshot) => (
          <CardWrapper
            innerRef={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <CardDeleteButton onClick={this.deleteCard}>x</CardDeleteButton>
            <CardText
              value={card.text}
              placeholder="New card"
              onChange={this.updateText}
            />
          </CardWrapper>
        )}
      </Draggable>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    card: selectors.getCard(state, ownProps.cardId)
  }),
  {
    updateText: actions.updateCardText,
    deleteCard: actions.deleteCard
  }
)(Card)
