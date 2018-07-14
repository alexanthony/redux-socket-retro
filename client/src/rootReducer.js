import { combineReducers } from 'redux'
import { reducer as blocks } from './blocks/duck'
import { reducer as cards } from './cards/duck'
const rootReducer = combineReducers({ blocks, cards })

export default rootReducer
