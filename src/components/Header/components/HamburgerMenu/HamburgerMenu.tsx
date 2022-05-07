import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Link from 'next/link'

import { LocationChoose } from 'components'
import { UserEntry, Phone, ShoppingCartLink } from '../../components'

import { NavItem } from '../../Header.types'

import * as S from './HamburgerMenu.styled'

interface HamburgerMenuProps {
  nav: NavItem[]
}

export const HamburgerMenu = ({ nav }: HamburgerMenuProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenuOpen = () => {
    setMenuOpen(isMenuOpen ? false : true)
  }

  const navItems = nav.map(({ label, link }) => {
    return (
      <li key={link}>
        <Link href={link} passHref>
          <S.MenuNavLink>{label}</S.MenuNavLink>
        </Link>
      </li>
    )
  })

  return (
    <S.HamburgerMenu>
      <S.HamburgerButton active={isMenuOpen} onClick={toggleMenuOpen}>
        <span />
        <span />
        <span />
      </S.HamburgerButton>

      <Drawer anchor="left" disablePortal open={isMenuOpen} onClose={toggleMenuOpen}>
        <S.Menu>
          <S.MenuTop>
            <UserEntry />
          </S.MenuTop>

          <S.MenuMiddle>
            <LocationChoose />
            <Phone />
            <ShoppingCartLink />
          </S.MenuMiddle>

          <S.MenuBottom>
            <S.MenuNavList>{navItems}</S.MenuNavList>
          </S.MenuBottom>
        </S.Menu>
      </Drawer>
    </S.HamburgerMenu>
  )
}
