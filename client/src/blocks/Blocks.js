import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Block from './Block'
import NewBlockPlaceholder from './NewBlockPlaceholder'
import actions, { selectors } from './duck'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const BlocksWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex: 1 0 auto;
`
// const BlockItemContainer = styled.div`
//   width: 270px;
//   margin: 5px 10px;
// `

class Blocks extends React.Component {
  handleDragEnd = result => {
    console.log('onDragEnd')
    console.log(result)
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
    if (result.type === 'COLUMN') {
      this.props.reorderBlock(
        result.draggableId,
        source.index,
        destination.index
      )
    }
  }
  render() {
    const { blockIds } = this.props
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {provided => (
            <BlocksWrapper
              innerRef={provided.innerRef}
              {...provided.droppableProps}
            >
              {blockIds.map((blockId, index) => (
                <Block blockId={blockId} index={index} key={blockId} />
              ))}
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
  reorderBlock: actions.reorderBlock
}

export default connect(mapStateToProps, mapDispatchToProps)(Blocks)
