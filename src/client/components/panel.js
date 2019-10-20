import React from 'react'
import styled from 'styled-components'

const Common = styled.div`
  &::before, &::after {
    content: '';
    position: absolute;
    width: var(--panel-angles-size);
    height: var(--panel-angles-size);
    border-width: var(--panel-angles-width);
    border-color: var(--panel-frame-color);
  }
  &::before {
    left: 0;
    border-left-style: solid;
  }
  &::after {
    right: 0;
    border-right-style: solid;
  }
`

const Outside = styled(Common)`
  position: relative;

  &::before, &::after {
    top: 0;
    border-top-style: solid;
  }
`

const Inside = styled(Common)`
  display: inline-block;
  background-color: var(--panel-background-color);

  &::before, &::after {
    bottom: 0;
    border-bottom-style: solid;
  }
`

const Panel = ({ className, children }) => (
  <Outside className={className}>
    <Inside>
      {children}
    </Inside>
  </Outside>
)

export default Panel
