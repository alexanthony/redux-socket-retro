import shortid from 'shortid'
// import { createSelector } from 'reselect'
import createReducer from '../utils/createReducer'
import globalActions from '../globalActions'
export const actions = {
  ADD_CARD: 'send/ADD_CARD',
  ADD_CARD_RECEIVE: 'receive/ADD_CARD',
  UPDATE_CARD_TEXT: 'send/UPDATE_CARD_TEXT',
  UPDATE_CARD_TEXT_RECEIVE: 'receive/UPDATE_CARD_TEXT'
}

const actionCreators = {
  addCard: blockId => ({
    type: actions.ADD_CARD,
    blockId,
    cardId: shortid.generate()
  }),
  updateCardText: (cardId, newText) => ({
    type: actions.UPDATE_CARD_TEXT,
    cardId,
    newText
  })
}

export default actionCreators

const initialState = {}

const newCardBehaviour = (state, action) => {
  state[action.cardId] = { text: 'New card' }
}

const updateTextBehaviour = (state, action) => {
  state[action.cardId].text = action.newText
}

const behaviours = {
  [actions.ADD_CARD]: newCardBehaviour,
  [actions.ADD_CARD_RECEIVE]: newCardBehaviour,
  [actions.UPDATE_CARD_TEXT]: updateTextBehaviour,
  [actions.UPDATE_CARD_TEXT_RECEIVE]: updateTextBehaviour,
  [globalActions.INITIAL_STATE]: (state, action) => action.state.cards,
  [globalActions.CLEAR_ALL]: () => initialState,
  [globalActions.CLEAR_ALL_RECEIVE]: () => initialState
}

export const reducer = createReducer(behaviours, initialState)

const getCard = (state, cardId) => state.cards[cardId]
export const selectors = {
  getCard
}
