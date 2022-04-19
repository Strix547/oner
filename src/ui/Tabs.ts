import styled from 'styled-components'
import MuiTabs from '@mui/material/Tabs'
import MuiTab from '@mui/material/Tab'
import MuiTabPanel from '@mui/lab/TabPanel'

export const Tabs = styled(MuiTabs)`
  min-height: 39px;
  box-sizing: border-box;

  .tabs-indicator {
    height: 3px;
    bottom: -1px;
    background: var(--color-primary);
  }

  .tabs-scroller {
    border-bottom: 1px solid #dedee2;
    overflow: visible !important;
  }
`

export const Tab = styled(MuiTab)`
  justify-content: flex-start;
  min-height: 40px;
  padding: 0;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: var(--color-black);
  text-transform: none;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &.tab-selected {
    color: var(--color-primary);
  }
`

export const TabPanel = styled(MuiTabPanel)`
  padding: 0;
`
