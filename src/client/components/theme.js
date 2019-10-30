import React from 'react'
import { ThemeProvider } from 'styled-components'
import media from '../media'

const theme = {
  media
}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

export default Theme
