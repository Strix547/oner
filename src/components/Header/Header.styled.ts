import styled from 'styled-components'

import { createMedia } from 'styled'
import { Wrapper } from 'styled/components'

import { Button } from 'ui'

import { Autocomplete } from 'ui/Autocomplete/Autocomplete.styled'

const media1200 = createMedia(1200)
const media666 = createMedia(666)

export { TextField } from 'ui/TextField/TextField.styled'

export const Header = styled.header`
  background: #fff;
  box-shadow: 0px 5px 20px rgba(44, 41, 51, 0.1);
`

export const Top = styled.div`
  padding: 13px 0;
  border-bottom: 1px solid #e3e3e8;

  ${media666} {
    padding: 0;
    height: 60px;
  }
`

export const VinAutocomplete = styled.div`
  max-width: 430px;
  width: 100%;
  margin-left: 17.63px;

  ${Autocomplete} {
    width: 100%;

    .autocomplete-input-root {
      background: #f4f5f7;

      .autocomplete-input {
        padding-top: 8.5px;
        padding-bottom: 4.5px;
        font-size: 16px;
        color: #505255;

        &::placeholder {
          color: #505255;
        }
      }
    }

    .autocomplete-end-adornment {
      /* margin-top: -4px; */
    }

    svg {
      fill: var(--color-primary);
    }
  }
`

export const TopWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${media1200} {
    ${VinAutocomplete} {
      max-width: 100%;
      margin-left: 15px;
    }
  }

  ${media666} {
    height: 100%;

    ${VinAutocomplete} {
      display: none;
    }
  }
`

export const MenuButtonMobile = styled.button`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 15px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  span {
    width: 18px;
    height: 2px;
    border-radius: 10px;
    background: var(--color-black);

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  ${media666} {
    display: flex;
  }
`

export const Logo = styled.div`
  position: relative;
`

export const LogoImg = styled.img`
  ${media1200} {
    width: 158px;
  }

  ${media666} {
    display: none;
  }
`

export const LogoImgMobile = styled.img`
  display: none;

  ${media666} {
    display: block;
  }
`

export const LogoGear = styled.span`
  position: absolute;
  top: 0;
  left: -1px;
  width: 40px;
  height: 40px;
  animation: rotating 8s linear infinite;

  @keyframes rotating {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  ${media1200} {
    width: 32px;
    height: 32px;
    top: -1px;
  }

  ${media666} {
    width: 24px;
    height: 24px;
    top: 1px;
  }
`

export const LogoGearImg = styled.img`
  max-width: 100%;

  ${media666} {
    display: none;
  }
`

export const LogoGearImgMobile = styled.img`
  display: none;
  max-width: 100%;

  ${media666} {
    display: block;
  }
`

export const TopRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  flex-shrink: 0;
  margin-left: 20px;

  & > *:not(:last-child) {
    margin-right: 10px;
  }

  ${media1200} {
    margin-left: 30px;

    & > div,
    a {
      &:not(:last-child) {
        margin-right: 30px;
      }

      & > span {
        display: none;
      }
    }
  }

  ${media666} {
    align-items: flex-end;
    justify-content: flex-start;
    flex-grow: 0;
    margin-left: auto;
  }
`

export const UserLink = styled.a`
  display: none;

  ${media1200} {
    display: block;
  }

  ${media666} {
    height: 24px;
  }
`

export const City = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-left: 5px;
  }

  ${media666} {
    margin-right: 20px;
  }
`

export const PhoneLink = styled.a`
  display: flex;
  align-items: center;

  span {
    margin-left: 10px;
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
  }

  ${media666} {
    display: none;
  }
`

export const Entry = styled.div`
  display: flex;
  align-items: center;

  a:first-of-type {
    margin-left: 10px;
  }

  span {
    margin: 0 6px;
  }

  ${media1200} {
    display: none;
  }

  ${media666} {
    align-items: flex-end;
  }
`

// BOTTOM

export const Bottom = styled.div`
  display: flex;
  padding: 13px 0;
`

export const BottomWrapper = styled(Wrapper)`
  flex-direction: row;
  align-items: center;
  height: 44px;

  ${VinAutocomplete} {
    display: none;
    max-width: 100%;
    margin-left: 10px;

    ${Autocomplete} {
      .autocomplete-input-root {
        padding: 3.5px 12px 4.5px 10px !important;
      }
    }
  }

  ${media666} {
    ${VinAutocomplete} {
      display: block;
    }
  }
`

export const CategoriesButton = styled(Button)`
  width: 168px;
  height: 44px;

  span {
    margin-left: 10px;
  }

  ${media666} {
    width: 44px;
    flex-shrink: 0;

    span {
      display: none;
    }
  }
`

export const Nav = styled.nav`
  height: 100%;
  margin-left: 20px;

  ul {
    display: flex;
    height: 100%;
  }

  ${media666} {
    display: none;
  }
`

export const NavItem = styled.li`
  a {
    height: 100%;
    padding: 14px 15px 10px;
    border-radius: 8px;
    transition: 0.3s;
    box-sizing: border-box;

    &:hover {
      background: #f4f5f7;
    }
  }

  ${createMedia(1240)} {
    &:nth-child(6) {
      display: none;
    }
  }

  ${createMedia(1115)} {
    &:nth-child(5) {
      display: none;
    }
  }

  ${createMedia(1020)} {
    &:nth-child(4) {
      display: none;
    }
  }

  ${createMedia(815)} {
    &:nth-child(3) {
      display: none;
    }
  }
`

export const ShoppingCart = styled.a`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;
  padding-left: 25px;
  padding-right: 15px;
  background: #f4f5f7;
  border-radius: 8px;

  span {
    margin-left: 10px;
  }

  ${media666} {
    display: none;
  }
`

export const ShoppingCartItemsCount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px 2px 7px;
  background: #fb6019;
  border-radius: 25px;
  font-size: 14px;
  color: #fff;
`

export const ShoppingCartLinkMobile = styled.a`
  position: relative;
  display: none;
  align-items: flex-end;
  margin-right: 14px;

  ${ShoppingCartItemsCount} {
    position: absolute;
    top: -6px;
    right: -7px;
    display: flex;
    align-items: flex-end;
    min-width: 16px;
    min-height: 16px;
    padding: 0 4px;
    font-size: 12px;
    box-sizing: border-box;
  }

  ${media666} {
    display: flex;
  }
`

export const EntryMobile = styled.div`
  display: none;

  ${media1200} {
    display: block;
  }
`
