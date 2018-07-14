import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import actions, { selectors } from './duck'

const TitleComponent = styled.input`
  padding: 5px;
  outline: 0;
  border: none;
  background: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  font-size: 1.3em;
  min-width: 0;
`

class BlockTitle extends React.Component {
  updateDescription = event => {
    this.props.updateBlockDescription(this.props.blockId, event.target.value)
  }
  render() {
    return (
      <TitleComponent
        value={this.props.description}
        onChange={this.updateDescription}
        placeholder="New block"
      />
    )
  }
}

export default connect(
  (state, ownProps) => ({
    description: selectors.getBlock(state, ownProps.blockId).description
  }),
  {
    updateBlockDescription: actions.updateBlockDescription
  }
)(BlockTitle)
