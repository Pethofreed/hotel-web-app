import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { RoomReducer } from './RoomReducer';
import { SectionReducer } from './SectionReducer';
import { ContractReducer } from './ContractReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const appReducers = combineReducers({
  RoomReducer,
  SectionReducer,
  ContractReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)