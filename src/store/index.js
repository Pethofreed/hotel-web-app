import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { RoomReducer } from './StorageReducer';
import { SectionReducer } from './SectionReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const appReducers = combineReducers({
  // RoomReducer,
  SectionReducer,
})

const rootReducer = (state, action) => {
  if(action.type === 'USER_LOGOUT'){
    state = undefined
  }
  return appReducers(state, action)
}

const middlewares = applyMiddleware(thunk, logger)

export const store = createStore(rootReducer, middlewares)