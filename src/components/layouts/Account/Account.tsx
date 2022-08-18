import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { PageLayout, AccountSidebar } from 'components/layouts'
import { Skeleton } from 'ui'

import { useAuth } from 'hooks'
import { UserProvider } from 'providers'
import { UserRoleType } from 'types/account'
import { ROUTE_NAMES } from 'core'

import * as S from './Account.styled'

import ArrowRightIcon from 'public/icons/arrows/sign-right.svg'

interface Accesses {
  manager: UserRoleType[]
  supplier: UserRoleType[]
  customer: UserRoleType[]
}

interface AccountLayoutProps {
  children: React.ReactNode
}

export const AccountLayout = ({ children }: AccountLayoutProps) => {
  const { user, isAccountLoading } = useAuth()
  const router = useRouter()

  const isSidebarVisible =
    router.pathname === '/customer' ||
    router.pathname === '/manager' ||
    router.pathname === '/supplier'

  const accesses: Accesses = {
    manager: ['Manager'],
    supplier: ['Supplier'],
    customer: ['Person', 'PersonEntity', 'Entity']
  }

  const managePathnameAccess = (pathname: string, accesses: Accesses, userRole: UserRoleType) => {
    const isUserRoleInAccess = (
      role: 'manager' | 'customer' | 'supplier',
      userRole: UserRoleType
    ) => {
      return accesses[role].some((role) => role === userRole)
    }

    if (
      (pathname.startsWith('/manager') && !isUserRoleInAccess('manager', userRole)) ||
      (pathname.startsWith('/supplier') && !isUserRoleInAccess('supplier', userRole)) ||
      (pathname.startsWith('/customer') && !isUserRoleInAccess('customer', userRole))
    ) {
      router.push(ROUTE_NAMES.SIGN_IN)
      return false
    } else {
      return true
    }
  }

  const getMenuPathByRole = (role: UserRoleType) => {
    switch (role) {
      case 'Person':
      case 'PersonEntity':
      case 'Entity':
        return ROUTE_NAMES.CUSTOMER
      case 'Supplier':
        return ROUTE_NAMES.SUPPLIER
      case 'Manager':
        return ROUTE_NAMES.MANAGER
      default:
        return '/'
    }
  }

  useEffect(() => {
    if (!user && !isAccountLoading) {
      router.push(ROUTE_NAMES.SIGN_IN)
      return
    }

    if (user && !isAccountLoading) {
      managePathnameAccess(router.pathname, accesses, user.role.title)
    }
  }, [user, isAccountLoading, router])

  if (
    user &&
    !isAccountLoading &&
    !managePathnameAccess(router.pathname, accesses, user.role.title)
  ) {
    return <PageLayout></PageLayout>
  }

  return (
    <PageLayout>
      <S.BackToMenu>
        {!isAccountLoading && user ? (
          <Link href={getMenuPathByRole(user.role.title)} passHref>
            <S.BackToMenuButton variant="text" startIcon={<ArrowRightIcon />} LinkComponent="a">
              Назад в меню
            </S.BackToMenuButton>
          </Link>
        ) : (
          <Skeleton width={117} height={24} />
        )}
      </S.BackToMenu>

      <S.Content isSidebarVisible={isSidebarVisible}>
        {!isAccountLoading && user ? <AccountSidebar /> : <Skeleton height={381} />}

        <S.Right>
          {!isAccountLoading && user ? (
            <UserProvider user={user}>{children}</UserProvider>
          ) : (
            <Skeleton height={381} />
          )}
        </S.Right>
      </S.Content>
    </PageLayout>
  )
}
