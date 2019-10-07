import { createAction } from 'redux-actions'

export const USER_NAME_CHANGE = 'user-name-change'
export const SELECT_PIECE = 'select-piece'

export const userNameChange = createAction(USER_NAME_CHANGE)
export const selectPiece = createAction(SELECT_PIECE)
