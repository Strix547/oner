import { FC, PropsWithChildren } from 'react'
import Typography from '@mui/material/Typography'

import * as S from './PageTitle.styled'

export const PageTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <S.PageTitle>
      <Typography variant="h2" component="h1">
        {children}
      </Typography>
    </S.PageTitle>
  )
}
