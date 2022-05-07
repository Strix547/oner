import { ButtonProps as MuiButtonProps } from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'

import * as S from './Button.styled'

export interface ButtonProps extends MuiButtonProps {
  loading?: boolean
}

export const Button = ({ loading, children, ...props }: ButtonProps) => {
  return (
    <S.Button {...props}>
      {!loading ? children : <CircularProgress size={30} thickness={4.5} />}
    </S.Button>
  )
}
