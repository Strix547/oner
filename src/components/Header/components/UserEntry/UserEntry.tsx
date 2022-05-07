import Link from 'next/link'

import { useAuth } from 'hooks'
import { ROUTE_NAMES } from 'core'

import * as S from './UserEntry.styled'

import UserIcon from 'public/icons/user.svg'

export const UserEntry = () => {
  const { isAuth } = useAuth()

  return (
    <S.UserEntry>
      <UserIcon />

      {isAuth ? (
        <Link href={ROUTE_NAMES.ACCOUNT_PERSONAL_INFO} passHref>
          <a>
            <span>Личный кабинет</span>
          </a>
        </Link>
      ) : (
        <>
          <Link href={ROUTE_NAMES.SIGN_IN} passHref>
            <a>
              <span>Вход</span>
            </a>
          </Link>

          <span>/</span>

          <Link href={ROUTE_NAMES.SIGN_UP} passHref>
            <a>
              <span>Регистрация</span>
            </a>
          </Link>
        </>
      )}
    </S.UserEntry>
  )
}
