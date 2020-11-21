import { combineReducers } from 'redux'
import { moviesReducer } from './moviesReducer'

export const rootReducer = combineReducers({
  moviesReducer: moviesReducer
})

export type RootState = ReturnType<typeof rootReducer>