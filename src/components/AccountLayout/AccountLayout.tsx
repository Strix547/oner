import { FC } from 'react'
import Typography from '@mui/material/Typography'

import { AccountSidebar } from 'components'

import * as S from './AccountLayout.styled'

interface AccountLayoutProps {
  title: string
  endAdornment?: React.ReactNode
}

export const AccountLayout: FC<AccountLayoutProps> = ({ title, endAdornment, children }) => {
  return (
    <S.AccountLayout>
      <AccountSidebar />

      <S.Content>
        <S.Top>
          <Typography variant="h2">{title}</Typography>

          {endAdornment && <S.TopRight>{endAdornment}</S.TopRight>}
        </S.Top>

        {children}
      </S.Content>
    </S.AccountLayout>
  )
}
