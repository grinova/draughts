import React from 'react'
import styled from 'styled-components'

const Button = styled.input.attrs(() => ({ type: 'button' }))`
  cursor: pointer;
  padding: 0.7em 2em;
  outline: none;
  color: var(--text-color);
  background-color: var(--transparent-color);
  border: var(--border);
  font: var(--font);
  text-align: center;
  transition:
    color var(--transition-duration),
    background-color var(--transition-duration),
    border-color var(--transition-duration),
    transform var(--transition-duration);

  &:focus:not(:disabled) {
    background-color: var(--hover-background-color);
  }

  &:hover:not(:disabled) {
    color: var(--hover-background-color);
    background-color: var(--text-color);
  }

  &:active:not(:disabled) {
    color: var(--hover-background-color);
    background-color: var(--active-background-color);
    transform: scale(1.1);
  }

  &:disabled {
    color: var(--disabled-text-color);
    border-color: var(--disabled-background-color);
  }
`

export default Button
