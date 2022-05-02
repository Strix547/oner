import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Skeleton from 'react-loading-skeleton'

import { AccountSidebar } from 'components'

import { useAuth } from 'hooks'

import * as S from './AccountLayout.styled'

import ArrowRightIcon from 'public/icons/arrows/sign-right.svg'

interface AccountLayoutProps {
  title: string
  endAdornment?: React.ReactNode
  children: React.ReactNode
}

export const AccountLayout = ({ title, endAdornment, children }: AccountLayoutProps) => {
  const { isAccountLoading } = useAuth()
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <S.AccountLayout>
      <S.BackToMenuButton
        variant="text"
        onClick={() => {
          setMenuOpen(true)
        }}
      >
        <ArrowRightIcon />
        Назад в меню
      </S.BackToMenuButton>

      <S.Content isMenuOpen={isMenuOpen}>
        <AccountSidebar
          onNavSelect={() => {
            setMenuOpen(false)
          }}
        />

        <S.Right>
          <S.Top>
            <Typography variant="h2">{title}</Typography>

            {endAdornment && <S.TopRight>{endAdornment}</S.TopRight>}
          </S.Top>

          {!isAccountLoading ? children : <Skeleton height={336} />}
        </S.Right>
      </S.Content>
    </S.AccountLayout>
  )
}
