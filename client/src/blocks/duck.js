import shortid from 'shortid'
import { createSelector } from 'reselect'
import createReducer from '../utils/createReducer'
import { actions as cardActions } from '../cards/duck'
import globalActions from '../globalActions'
export const actions = {
  ADD_BLOCK: 'send/ADD_BLOCK',
  UPDATE_BLOCK_DESCRIPTION: 'send/UPDATE_BLOCK_DESCRIPTION',
  ADD_BLOCK_RECEIVE: 'receive/ADD_BLOCK',
  UPDATE_BLOCK_DESCRIPTION_RECEIVE: 'receive/UPDATE_BLOCK_DESCRIPTION'
}

const actionCreators = {
  addBlock: () => ({ type: actions.ADD_BLOCK, id: shortid.generate() }),
  updateBlockDescription: (blockId, newDescription) => ({
    type: actions.UPDATE_BLOCK_DESCRIPTION,
    blockId,
    newDescription
  })
}

export default actionCreators
const initialState = {}

const addBlockBehaviour = (state, action) => {
  state[action.id] = { description: 'New block', cards: [] }
}

const updateDescriptionBehaviour = (state, action) => {
  state[action.blockId].description = action.newDescription
}

const addCardBehaviour = (state, action) => {
  state[action.blockId].cards.push(action.cardId)
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
  [globalActions.CLEAR_ALL_RECEIVE]: () => initialState
}

export const reducer = createReducer(behaviours, initialState)

const getBlocksObject = state => state.blocks
const getBlockIds = createSelector([getBlocksObject], blocksObject =>
  Object.keys(blocksObject)
)
const getBlock = (state, blockId) => state.blocks[blockId]
// const memoiseByBlock = (state, blockId) => blockId

export const selectors = {
  getBlockIds,
  getBlock
}
