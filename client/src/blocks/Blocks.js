import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Block from './Block'
import NewBlockPlaceholder from './NewBlockPlaceholder'
import { selectors } from './duck'

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 auto;
`
const BlockItemContainer = styled.div`
  width: 270px;
  margin: 5px 10px;
`

const Blocks = ({ blockIds = [] }) => (
  <BlocksWrapper>
    {blockIds.map(blockId => (
      <BlockItemContainer key={blockId}>
        <Block blockId={blockId} />
      </BlockItemContainer>
    ))}
    <BlockItemContainer>
      <NewBlockPlaceholder />
    </BlockItemContainer>
  </BlocksWrapper>
)

const mapStateToProps = state => ({
  blockIds: selectors.getBlockIds(state)
})

export default connect(mapStateToProps)(Blocks)
