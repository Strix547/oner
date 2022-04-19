import styled from 'styled-components'
import MuiSelect from '@mui/material/Select'
import MuiMenuItem from '@mui/material/MenuItem'
import MuiFormControl from '@mui/material/FormControl'
import MuiInputLabel from '@mui/material/InputLabel'

export const Select = styled(MuiSelect)`
  width: 100%;
  border-radius: 6px;

  .select {
    min-height: auto;
    border: 1px solid #dedee2;
    padding: 11px 32px 12px 20px;
    font-size: 18px;
    color: var(--color-black);
    line-height: auto;
    box-sizing: border-box;

    &[aria-expanded='true'] {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      transition: 0.3s;
    }

    &-menu-paper {
      max-height: 200px;
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
      border: 1px solid #dedee2;
      border-radius: 6px;
      border-top: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &-menu-list {
    }

    &-icon {
      top: 13px;
      right: 12px;
      transform: rotate(90deg);
      transition: 0.3s;

      &-open {
        transform: rotate(-90deg);
      }

      path {
        stroke: #7a7680;
      }
    }
  }

  fieldset {
    display: none;
  }
`

export const SelectMenuItem = styled(MuiMenuItem)`
  &.menu-item-selected {
    background: #f0effa;

    &:hover {
      background: #f4f5f7;
    }
  }

  &:hover {
    background: #f4f5f7;
  }
`

export const SelectFormControl = styled(MuiFormControl)`
  width: 100%;
`

export const SelectInputLabel = styled(MuiInputLabel)`
  font-size: 18px;
  line-height: 18px;
  color: #55556d;
  transform: translate(20px, 16px) scale(1);

  &.input-label-shrink {
    font-size: 14px;
    line-height: 18px;
    transform: translate(15px, -7px) scale(1);
    padding: 0 5px;
    background: #fff;
  }

  &.input-label-filled {
    display: none;
  }

  &.input-label-focused {
    color: #55556d;
  }
`
