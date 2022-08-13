import { FC } from 'react'
import Typography from '@mui/material/Typography'

import * as S from './PageTitle.styled'

export const PageTitle: FC = ({ children }) => {
  return (
    <S.PageTitle>
      <Typography variant="h2" component="h1">
        {children}
      </Typography>
    </S.PageTitle>
  )
}
