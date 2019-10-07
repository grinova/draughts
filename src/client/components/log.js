import React from 'react'
import styled from 'styled-components'

const Log = ({ className, children }) => {
  return (
    <div className={className}>
      {children.map((child, i) => <div key={i}>{child}</div>)}
    </div>
  )
}

const StyledLog = styled(Log)`
  border: solid 1px;
`

export default StyledLog
