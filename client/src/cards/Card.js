import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'
import actions, { selectors } from './duck'

const CardContainer = styled.div`
  padding: 10px;
`
const CardWrapper = styled.div`
  width: 100%;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
  background: #fff;
  border-radius: 5px;
  min-height: 30px;
  transition: 0.15s;
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
`

class Card extends React.Component {
  updateText = event => {
    this.props.updateText(this.props.cardId, event.target.value)
  }
  render() {
    const { card } = this.props
    return (
      <CardContainer>
        <CardWrapper>
          <CardText value={card.text} onChange={this.updateText} />
        </CardWrapper>
      </CardContainer>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    card: selectors.getCard(state, ownProps.cardId)
  }),
  { updateText: actions.updateCardText }
)(Card)
