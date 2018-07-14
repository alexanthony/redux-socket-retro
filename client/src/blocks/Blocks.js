import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Block from './Block'
import NewBlockPlaceholder from './NewBlockPlaceholder'
import actions, { selectors } from './duck'
import createInnerList from '../atoms/InnerList'

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 0 auto;
`
const InnerList = createInnerList(Block, 'blockIds', 'blockId')

class Blocks extends React.PureComponent {
  handleDragEnd = result => {
    // dropped nowhere
    if (!result.destination) {
      return
    }

    const source = result.source
    const destination = result.destination

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }
    if (result.type === 'BLOCK') {
      this.props.reorderBlock(
        result.draggableId,
        source.index,
        destination.index
      )
    }
    if (result.type === 'CARD') {
      this.props.reorderCard(result.draggableId, source, destination)
    }
  }
  render() {
    const { blockIds } = this.props
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="board" type="BLOCK" direction="horizontal">
          {provided => (
            <BlocksWrapper
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              <InnerList blockIds={blockIds} />
              {provided.placeholder}
              <NewBlockPlaceholder />
            </BlocksWrapper>
          )}
        </Droppable>
        {/* <BlockItemContainer> */}
        {/* </BlockItemContainer> */}
      </DragDropContext>
    )
  }
}

const mapStateToProps = state => ({
  blockIds: selectors.getBlockIds(state)
})
const mapDispatchToProps = {
  reorderBlock: actions.reorderBlock,
  reorderCard: actions.reorderCard
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks)
