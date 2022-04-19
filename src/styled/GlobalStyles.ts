import { createGlobalStyle } from 'styled-components'

import { resetStyles } from './resetStyles'
import { variablesStyles } from './variables'

export const GlobalStyles = createGlobalStyle`
  ${resetStyles}
  ${variablesStyles}

  body {
    font-family: 'TTCommons';
    font-size: 16px;
    color: var(--color-black);
    background: #F9F9FB;
    text-rendering: optimizeLegibility;
    text-decoration-skip: objects;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
  }

  html, #__next, body {
    min-height: 100vh;
  }
  
  #__next {
    scroll-behavior: smooth;
  }

  a {
    display: flex;
    color: var(--color-black);
    text-decoration: none;
  }
`
