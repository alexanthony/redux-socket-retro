import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Textarea from 'react-textarea-autosize'
import actions, { selectors } from './duck'

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

class CardTextInput extends React.PureComponent {
  updateText = event => {
    this.props.updateText(this.props.cardId, event.target.value)
  }
  render() {
    return (
      <CardText
        value={this.props.text}
        placeholder="New card"
        onChange={this.updateText}
      />
    )
  }
}

export default connect(
  (state, ownProps) => ({
    text: selectors.getCard(state, ownProps.cardId).text
  }),
  {
    updateText: actions.updateCardText
  }
)(CardTextInput)
