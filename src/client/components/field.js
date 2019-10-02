import React from 'react'
import styled from 'styled-components'

const Cell = styled.td`
  width: 2em;
  height: 2em;
  text-align: center;
`

const Field = ({ data, onClick }) => {
  return (
    <table border='1'>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <Cell key={j} onClick={() => onClick(i, j)}>{cell}</Cell>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Field
