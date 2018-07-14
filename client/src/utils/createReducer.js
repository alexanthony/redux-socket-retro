import produce from 'immer'
const createReducer = (behaviours, initialState) => (
  state = initialState,
  action
) => {
  const behaviour = behaviours[action.type]
  return behaviour ? produce(state, draft => behaviour(draft, action)) : state
}

export default createReducer
