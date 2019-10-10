import React from 'react'
import styled from 'styled-components'

const Svg = styled.svg`
  width: 4vmin;
  height: 4vmin;
`

const Crown = ({ color }) => (
  <Svg viewBox='0 0 100 100'>
    <polygon
      fill='rgba(0, 0, 0, 0)'
      stroke={color}
      strokeWidth='7'
      points='20,80 80,80 98,30 70,55 50,10 30,55 2,30 20,80'/>
    <path
      stroke={color}
      strokeWidth='7'
      d='M20,90 L80,90Z'/>
  </Svg>
)

export default Crown
