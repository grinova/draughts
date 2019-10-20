import {
  WHITE_MAN,
  BLACK_MAN,
  WHITE_KING,
  BLACK_KING
} from '../../common/game/common'

export const WHITE_CELL = 'var(--white-cell-color)'
export const BLACK_CELL = 'var(--black-cell-color)'
export const WHITE_PIECE_COLOR = 'var(--white-piece-color)'
export const BLACK_PIECE_COLOR = 'var(--black-piece-color)'
export const WHITE_PIECE_BORDER_COLOR = 'var(--white-piece-border-color)'
export const BLACK_PIECE_BORDER_COLOR = 'var(--black-piece-border-color)'
export const PIECE_COLORS = {
  [WHITE_MAN]: { border: WHITE_PIECE_BORDER_COLOR, fill: WHITE_PIECE_COLOR },
  [BLACK_MAN]: { border: BLACK_PIECE_BORDER_COLOR, fill: BLACK_PIECE_COLOR },
  [WHITE_KING]: { border: WHITE_PIECE_BORDER_COLOR, fill: WHITE_PIECE_COLOR },
  [BLACK_KING]: { border: BLACK_PIECE_BORDER_COLOR, fill: BLACK_PIECE_COLOR }
}
