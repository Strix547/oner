import Link from 'next/link'
import { useRouter } from 'next/router'

import { ROUTE_NAMES } from 'core'
import { useAuth } from 'hooks'
import { UserRoleType } from 'types/account'

import * as S from './AccountSidebar.styled'

import ProfileIcon from 'public/icons/profile.svg'
import CartIcon from 'public/icons/cart.svg'
import AddressIcon from 'public/icons/address.svg'
import CreditCardIcon from 'public/icons/credit-card.svg'
import ChatIcon from 'public/icons/chat-2.svg'
import LogoutIcon from 'public/icons/logout.svg'
import RecipeIcon from 'public/icons/recipe.svg'
import PaperIcon from 'public/icons/paper.svg'
import RecipeIncomingIcon from 'public/icons/recipe-incoming.svg'
import CatalogIcon from 'public/icons/catalog.svg'

export const AccountSidebar = () => {
  const { pathname } = useRouter()
  const { user, logout } = useAuth()

  const role = user?.role.title

  const getNavByUserRole = (role?: UserRoleType) => {
    const managerNav = [
      {
        label: 'Cписок поставщиков',
        href: ROUTE_NAMES.MANAGER_SUPPLIERS,
        icon: <ProfileIcon />
      },
      {
        label: 'Cписок покупателей',
        href: ROUTE_NAMES.MANAGER_CUSTOMERS,
        icon: <RecipeIcon />
      },
      {
        label: 'Cписок заказов',
        href: ROUTE_NAMES.MANAGER_ORDERS,
        icon: <CartIcon />
      }
    ]

    const supplierNav = [
      {
        label: 'Мой каталог',
        href: ROUTE_NAMES.SUPPLIER_CATALOG,
        icon: <CatalogIcon />
      },
      {
        label: 'Мои прайс-листы',
        href: ROUTE_NAMES.SUPPLIER_PRICE_LISTS,
        icon: <RecipeIcon />
      },
      {
        label: 'Мои заказы',
        href: ROUTE_NAMES.SUPPLIER_ORDERS,
        icon: <CartIcon />
      },
      {
        label: 'Мои магазины',
        href: ROUTE_NAMES.SUPPLIER_STORES,
        icon: <AddressIcon />
      },
      {
        label: 'Мои реквизиты',
        href: ROUTE_NAMES.SUPPLIER_REQUISITES,
        icon: <CreditCardIcon />
      },
      {
        label: 'Мои поступления',
        href: ROUTE_NAMES.SUPPLIER_RECEIPTS,
        icon: <RecipeIncomingIcon />
      },
      {
        label: 'Мои чаты',
        href: ROUTE_NAMES.SUPPLIER_CHATS,
        icon: <ChatIcon />
      },
      {
        label: 'Бухгалтерия',
        href: ROUTE_NAMES.SUPPLIER_ACCOUNTING,
        icon: <PaperIcon />
      }
    ]

    const customerNav = [
      {
        label: 'Персональная информация',
        href: ROUTE_NAMES.CUSTOMER_PERSONAL_INFO,
        icon: <ProfileIcon />
      },
      {
        label: 'История заказов',
        href: ROUTE_NAMES.CUSTOMER_ORDERS,
        icon: <CartIcon />
      },
      { label: 'Мои адреса', href: ROUTE_NAMES.CUSTOMER_ADDRESSES, icon: <AddressIcon /> },
      {
        label: 'Мои реквизиты',
        href: ROUTE_NAMES.CUSSTOMER_REQUISITES,
        icon: <CreditCardIcon />
      },
      { label: 'Мои чаты', href: ROUTE_NAMES.CUSTOMER_CHATS, icon: <ChatIcon /> }
    ]

    switch (role) {
      case 'Manager':
        return managerNav
      case 'Supplier':
        return supplierNav
      default:
        return customerNav
    }
  }

  const navLinkItems = getNavByUserRole(role).map(({ label, href, icon }) => {
    return (
      <S.LinkItem key={href} active={href === pathname}>
        <Link href={href} passHref>
          <a>
            {icon}
            <span>{label}</span>
          </a>
        </Link>
      </S.LinkItem>
    )
  })

  return (
    <S.AccountSidebar>
      <ul>
        {navLinkItems}

        <S.Divider />

        <S.LinkItem
          onClick={() => {
            logout()
          }}
        >
          <S.LogoutButton variant="text" startIcon={<LogoutIcon />} fullWidth>
            <span>Выйти</span>
          </S.LogoutButton>
        </S.LinkItem>
      </ul>
    </S.AccountSidebar>
  )
}
