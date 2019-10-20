import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const Common = styled.div`
  ::before, ::after {
    display: none;
    content: '';
    position: absolute;
    background-color: var(--progress-border-color);
  }
`

const Horizontal = styled(Common)`
  @keyframes progress-border-x-top {
    0% {
      transform: scaleX(1);
      transform-origin: left;
    }
    49% {
      transform: scaleX(0);
      transform-origin: left;
    }
    51% {
      transform: scaleX(0);
      transform-origin: right;
    }
    100% {
      transform: scaleX(1);
      transform-origin: right;
    }
  }

  @keyframes progress-border-x-bottom {
    0% {
      transform: scaleX(1);
      transform-origin: right;
    }
    49% {
      transform: scaleX(0);
      transform-origin: right;
    }
    51% {
      transform: scaleX(0);
      transform-origin: left;
    }
    100% {
      transform: scaleX(1);
      transform-origin: left;
    }
  }

  &::before, &::after {
    width: 100%;
    height: var(--progress-border-width);
  }

  &::before {
    top: 0;
    animation: progress-border-x-top 1s infinite linear;
  }
  &::after {
    bottom: 0;
    animation: progress-border-x-bottom 1s infinite linear;
  }

`

const Vertical = styled(Common)`
  @keyframes progress-border-y-left {
    0% {
      transform: scaleY(0);
      transform-origin: top;
    }
    49% {
      transform: scaleY(1);
      transform-origin: top;
    }
    51% {
      transform: scaleY(1);
      transform-origin: bottom;
    }
    100% {
      transform: scaleY(0);
      transform-origin: bottom;
    }
  }

  @keyframes progress-border-y-right {
    0% {
      transform: scaleY(0);
      transform-origin: bottom;
    }
    49% {
      transform: scaleY(1);
      transform-origin: bottom;
    }
    51% {
      transform: scaleY(1);
      transform-origin: top;
    }
    100% {
      transform: scaleY(0);
      transform-origin: top;
    }
  }

  &::before, &::after {
    width: var(--progress-border-width);
    height: 100%;
  }

  &::before {
    left: 0;
    animation: progress-border-y-left 1s infinite linear;
  }
  &::after {
    right: 0;
    animation: progress-border-y-right 1s infinite linear;
  }
`

const ProgressBorderContainer = styled.div`
  position: relative;

  & ${Vertical}::before, & ${Vertical}::after, & ${Horizontal}::before, & ${Horizontal}::after {
    display: ${({ active }) => active ? 'initial' : 'none'};
  }
`

const ProgressBorder = ({ children, active }) => (
  <ProgressBorderContainer active={active}>
    <Horizontal>
      <Vertical>
        {children}
      </Vertical>
    </Horizontal>
  </ProgressBorderContainer>
)

export default ProgressBorder
