const globalActions = {
  INITIAL_STATE: 'INITIAL_STATE',
  CLEAR_ALL: 'send/CLEAR_ALL',
  CLEAR_ALL_RECEIVE: 'receive/CLEAR_ALL'
}

export default globalActions

export const clearAll = () => ({
  type: globalActions.CLEAR_ALL
})
