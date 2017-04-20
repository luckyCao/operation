import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as reducers from 'reducers'

const rootReducer = combineReducers({
  routing: routerReducer,
  ...reducers
})

export default rootReducer
