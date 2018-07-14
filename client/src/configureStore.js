import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  const socket = io()
  const socketIoMiddleware = createSocketIoMiddleware(socket, 'send/')
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(
      rootReducer,
      composeEnhancers(applyMiddleware(sagaMiddleware, socketIoMiddleware))
    ),
    runSaga: sagaMiddleware.run(rootSaga)
  }
}

export default configureStore
