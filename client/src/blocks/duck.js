import shortid from 'shortid'
import createReducer from '../utils/createReducer'
import { actions as cardActions } from '../cards/duck'
import globalActions from '../globalActions'
export const actions = {
  ADD_BLOCK: 'send/ADD_BLOCK',
  UPDATE_BLOCK_DESCRIPTION: 'send/UPDATE_BLOCK_DESCRIPTION',
  ADD_BLOCK_RECEIVE: 'receive/ADD_BLOCK',
  UPDATE_BLOCK_DESCRIPTION_RECEIVE: 'receive/UPDATE_BLOCK_DESCRIPTION',
  REORDER_BLOCK: 'send/REORDER_BLOCK',
  REORDER_BLOCK_RECEIVE: 'receive/REORDER_BLOCK',
  REORDER_CARD: 'send/REORDER_CARD',
  REORDER_CARD_RECEIVE: 'receive/REORDER_CARD'
}

const actionCreators = {
  addBlock: () => ({ type: actions.ADD_BLOCK, id: shortid.generate() }),
  updateBlockDescription: (blockId, newDescription) => ({
    type: actions.UPDATE_BLOCK_DESCRIPTION,
    blockId,
    newDescription
  }),
  reorderBlock: (blockId, sourceIndex, targetIndex) => ({
    type: actions.REORDER_BLOCK,
    blockId,
    sourceIndex,
    targetIndex
  }),
  reorderCard: (cardId, source, destination) => ({
    type: actions.REORDER_CARD,
    source,
    destination
  })
}

export default actionCreators
const initialState = {
  blocksById: {},
  blockIds: []
}

const addBlockBehaviour = (state, action) => {
  state.blocksById[action.id] = { description: '', cards: [] }
  state.blockIds.push(action.id)
}

const updateDescriptionBehaviour = (state, action) => {
  state.blocksById[action.blockId].description = action.newDescription
}

const addCardBehaviour = (state, action) => {
  state.blocksById[action.blockId].cards.push(action.cardId)
}

const deleteCardBehaviour = (state, action) => {
  state.blockIds.forEach(
    blockId =>
      (state.blocksById[blockId].cards = state.blocksById[blockId].cards.filter(
        cardId => cardId !== action.cardId
      ))
  )
}

const deleteBlockBehaviour = (state, action) => {
  delete state.blocksById[action.blockId]
  state.blockIds = state.blockIds.filter(blockId => blockId !== action.blockId)
}

const reorderBlockBehaviour = (state, action) => {
  // Remove the item
  const [movedItem] = state.blockIds.splice(action.sourceIndex, 1)
  // Insert back in
  state.blockIds.splice(action.targetIndex, 0, movedItem)
}

const reorderCardBehaviour = (state, action) => {
  const [movedItem] = state.blocksById[action.source.droppableId].cards.splice(
    action.source.index,
    1
  )
  state.blocksById[action.destination.droppableId].cards.splice(
    action.destination.index,
    0,
    movedItem
  )
}

const behaviours = {
  [actions.ADD_BLOCK]: addBlockBehaviour,
  [actions.ADD_BLOCK_RECEIVE]: addBlockBehaviour,
  [actions.UPDATE_BLOCK_DESCRIPTION]: updateDescriptionBehaviour,
  [actions.UPDATE_BLOCK_DESCRIPTION_RECEIVE]: updateDescriptionBehaviour,
  [cardActions.ADD_CARD]: addCardBehaviour,
  [cardActions.ADD_CARD_RECEIVE]: addCardBehaviour,
  [globalActions.INITIAL_STATE]: (state, action) => action.state.blocks,
  [globalActions.CLEAR_ALL]: (state, action) => initialState,
  [globalActions.CLEAR_ALL_RECEIVE]: () => initialState,
  [cardActions.DELETE_CARD]: deleteCardBehaviour,
  [cardActions.DELETE_CARD_RECEIVE]: deleteCardBehaviour,
  [cardActions.DELETE_BLOCK]: deleteBlockBehaviour,
  [cardActions.DELETE_BLOCK_RECEIVE]: deleteBlockBehaviour,
  [actions.REORDER_BLOCK]: reorderBlockBehaviour,
  [actions.REORDER_BLOCK_RECEIVE]: reorderBlockBehaviour,
  [actions.REORDER_CARD]: reorderCardBehaviour,
  [actions.REORDER_CARD_RECEIVE]: reorderCardBehaviour
}

export const reducer = createReducer(behaviours, initialState)

const getBlockIds = state => state.blocks.blockIds
const getBlock = (state, blockId) => state.blocks.blocksById[blockId]
// const memoiseByBlock = (state, blockId) => blockId

export const selectors = {
  getBlockIds,
  getBlock
}
