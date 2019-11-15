import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(state, ...middleWare) {
  return createStore(rootReducer, state, ...middleWare)
}
