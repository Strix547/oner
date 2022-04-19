import styled from 'styled-components'
import MuiButton from '@mui/material/Button'

export const Button = styled(MuiButton)`
  padding: 0;
  width: 100%;
  min-width: auto;
  height: 48px;
  background: var(--color-primary);
  border-radius: 6px;
  box-shadow: none;
  font-family: 'TTCommons';
  font-size: 18px;
  line-height: 22px;
  text-transform: unset;

  &:hover {
    background: var(--color-primary);
    box-shadow: none;
  }

  &:active {
    box-shadow: none;
  }

  &.button-outlined {
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    background: #fff;
  }

  .button-end-icon {
    margin-right: 0;
    margin-left: 10px;
  }

  &.button-text {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    height: auto;
    background: transparent;
    color: var(--color-black);
  }

  .circular-progress {
    color: #fff;
  }
`
