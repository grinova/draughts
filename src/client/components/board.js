import React from 'react'
import styled from 'styled-components'
import Piece from './piece'
import { isPiece } from '../../common/game/common'
import Vec2 from '../../common/vec2'

const BoardBorder = styled.div`
  display: inline-block;
  border-style: solid;
  border-width: 0.5vmin;
  border-color: var(--board-border-color);
`

const BoardContent = styled.div`
  position: relative;
  display: inline-block;
  margin: 2vmin;
`

const Board = styled.div`
  display: inline-flex;
  flex-direction: column;

  & > :nth-child(odd) > :nth-child(odd) {
    background-color: var(--white-cell-color);
  }
  & > :nth-child(odd) > :nth-child(even) {
    background-color: var(--black-cell-color);
  }
  & > :nth-child(even) > :nth-child(odd) {
    background-color: var(--black-cell-color);
  }
  & > :nth-child(even) > :nth-child(even) {
    background-color: var(--white-cell-color);
  }
`

const Row = styled.div`
  display: flex;
`

const Cell = styled.div`
  @keyframes pop-up {
    0% {
      transform: scale(0, 0);
    }
    60% {
      transform: scale(1.2, 1.2);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes disappear {
    0% {
      opacity: 1;
      transform: scale(1, 1);
    }
    100% {
      transform: scale(2, 2);
    }
  }

  display: inline-block;
  width: 10vmin;
  height: 10vmin;

  &::before {
    content: '';
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: var(--available-cell-color);
    box-sizing: border-box;
    border-style: solid;
    border-width: 2vmin;
    border-color: var(--available-cell-border-color);
    opacity: 0;
  }
  ${({ available }) => available ?
    `&::before {
      cursor: pointer;
      opacity: 1;
      animation: pop-up 0.5s;
    }` :
    `&::before {
      animation: disappear 0.5s;
    }`
  }
`

const PieceOnBoard = styled(Piece)`
  position: absolute;
`

const BoardComponent = ({ className, reverse, data, onClick }) => (
  <BoardBorder className={className}>
    <BoardContent>
      <Board>
        {(reverse ? data.slice().reverse() : data).map((row, y) => (
          <Row key={y}>
            {(reverse ? row.slice().reverse() : row).map((cell, x) => (
              <Cell key={x}
                available={cell.available}
                onClick={() => {
                  onClick(reverse ? new Vec2(7 - x, 7 - y) : new Vec2(x, y))
                }}
              />
            ))}
          </Row>
        ))}
      </Board>
      {[].concat(...
        (reverse ? data.slice().reverse() : data).map((row, y) =>
          (reverse ? row.slice().reverse() : row).map((cell, x) =>
            ({ x, y, cell })
          )
        ))
        .filter(({ cell: { piece } }) => isPiece(piece))
        .map(({ x, y, cell }, i) => (
          <PieceOnBoard
            key={y * 8 + x}
            piece={cell.piece}
            selected={cell.selected}
            movable={cell.movable}
            style={{ top: (y * 10 + 1) + 'vmin', left: (x * 10 + 1) + 'vmin' }}
            onClick={() => {
              onClick(reverse ? new Vec2(7 - x, 7 - y) : new Vec2(x, y))
            }}
          />
        ))
      }
    </BoardContent>
  </BoardBorder>
)

export default BoardComponent
