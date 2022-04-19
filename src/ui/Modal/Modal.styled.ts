import styled from 'styled-components'
import MuiModal from '@mui/material/Modal'

import { Box } from 'styled/components'

export const Modal = styled(MuiModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalContent = styled(Box)`
  width: 450px;
  padding: 24px 30px 30px;
  box-sizing: border-box;
`

export const ModalTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-family: 'Stolzl';
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
  }
`

export const ModalBody = styled.div`
  margin-top: 20px;
`

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #e3e3e8;
  cursor: pointer;
`
