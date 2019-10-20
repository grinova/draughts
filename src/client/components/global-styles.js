import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --font-weight: bold;
    --font-size: 16px;
    --font-family: monospace;
    --font: var(--font-weight) var(--font-size) var(--font-family);
    --border-style: solid;
    --border-width: 2px;
    --border-color: var(--prime-color);
    --border: var(--border-style) var(--border-width) var(--border-color);
    --transition-duration: 0.2s;

    --transparent: hsl(0, 0%, 0%, 0);

    --background-color: hsl(224, 16%, 25%);
    --prime-color: hsl(176, 50%, 35%);
    --second-color: hsl(180, 73%, 7%);

    --text-color: hsl(176, 78%, 42%);
    --active-text-color: hsl(176, 78%, 19%);
    --active-background-color: hsl(194, 83%, 71%);
    --hover-background-color: hsl(194, 40%, 27%);
    --disabled-text-color: hsl(176, 25%, 42%);
    --disabled-background-color: hsl(176, 20%, 35%);

    --panel-frame-color: var(--text-color);
    --panel-background-color: hsl(180, 73%, 7%, 0.19); /* --prime-color(a=0.19) */
    --panel-angles-size: 15px;
    --panel-angles-width: 4px;

    --progress-border-color: hsl(302, 93%, 41%);
    --progress-border-width: 2px;

    --board-border-color: var(--white-cell-color);
    --white-cell-color: var(--prime-color);
    --black-cell-color: var(--second-color);
    --available-cell-color: hsl(300, 93%, 24%);
    --available-cell-border-color: hsl(302, 93%, 41%);

    --white-piece-color: hsl(176, 53%, 77%);
    --white-piece-border-color: hsl(175, 52%, 40%);
    --black-piece-color: #F26169;
    --black-piece-border-color: #EFE699;
  }

  body {
    color: var(--text-color);
    font: var(--font);
    background-color: var(--background-color);
  }
`

export default GlobalStyles
