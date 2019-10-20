import React from 'react'
import styled from 'styled-components'

const TextInput = styled.input.attrs(() => ({
  type: 'text',
  placeholderTextColor: 'var(--placeholder-color)'
}))`
  :root {
    --placeholder-color: hsl(176, 16%, 50%);
  }

  padding: 0.4em 1em;
  outline: none;
  box-sizing: border-box;
  color: var(--text-color);
  background-color: var(--transparent-color);
  border: var(--border);
  font: var(--font);
  transition:
    color var(--transition-duration),
    background-color var(--transition-duration),
    border-color var(--transition-duration);

  &:focus {
    background-color: var(--hover-background-color);
  }

  &:hover:not(:disabled) {
    background-color: var(--hover-background-color);
  }

  &:active:not(:disabled) {
    color: var(--active-text-color);
    background-color: var(--active-background-color);
  }

  &:disabled {
    color: var(--disabled-text-color);
    border-color: var(--disabled-background-color);
  }

  &::selection {
    color: var(--active-background-color);
    background-color: var(--text-color);
  }
`

export default TextInput
