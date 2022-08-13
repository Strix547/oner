import Typography from '@mui/material/Typography'
import { PropsWithChildren } from 'react'

import * as S from './AccountPageTitle.styled'

interface AccountPageTitle {
  endAdornment?: React.ReactNode
}

export const AccountPageTitle = ({
  children,
  endAdornment
}: PropsWithChildren<AccountPageTitle>) => {
  return (
    <S.AccountPageTitle>
      <Typography variant="h2">{children}</Typography>

      {endAdornment && <div>{endAdornment}</div>}
    </S.AccountPageTitle>
  )
}
