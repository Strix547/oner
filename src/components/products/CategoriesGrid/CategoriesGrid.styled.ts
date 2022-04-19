import styled from 'styled-components'

import { createMedia } from 'styled'

const media1200 = createMedia(1200)
const media750 = createMedia(750)

export const ProductsCategoriesGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 100px);
  background: #ffffff;
  border: 1px solid #f4f5f6;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  ${media1200} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 100px);
  }

  ${media750} {
    grid-template-rows: repeat(6, auto);
    grid-gap: 10px;
    box-shadow: none;
    border-radius: 0;
    border: none;
    background: transparent;
  }
`

export const SectionItem = styled.li`
  position: relative;
  display: flex;
  border-right: 1px solid #e8e3e3;
  border-bottom: 1px solid #e8e3e3;

  &:not(:last-child)::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 1;
    transition: 0.4s;
  }

  &:not(:last-child):hover {
    z-index: 15;

    &::before {
      box-shadow: 0px 4px 10px rgb(0 0 0 / 10%);
      transform: scale(1.05);
    }

    h4 {
      color: var(--color-primary);
    }
  }

  &:nth-child(1) {
    border-radius: 10px 0 0 0;

    &::before {
      border-radius: 10px 0 0 0;
    }
  }

  &:nth-child(3) {
    border-radius: 0 10px 0 0;

    &::before {
      border-radius: 0 10px 0 0;
    }
  }

  &:nth-child(10) {
    border-radius: 0 0 0 10px;

    &::before {
      border-radius: 0 0 0 10px;
    }
  }

  &:nth-child(10),
  &:nth-child(11) {
    border-bottom: none;
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 30px;
    z-index: 15;
    box-sizing: border-box;
  }

  ${media750} {
    background: #fff;
    box-shadow: 0px 4px 10px rgba(46, 16, 102, 0.05);
    border-radius: 10px;
    border: none;

    &:not(:last-child)::before {
      display: none;
    }

    a {
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
    }
  }
`

export const Icon = styled.div`
  width: 48px;
  height: 48px;

  ${media750} {
    width: 40px;
    height: 40px;
  }
`

export const Right = styled.div`
  margin-left: 22px;

  h4 {
    transition: 0.3s;
  }

  ${media750} {
    margin-left: 0;
    margin-top: 15px;

    h4 {
      font-size: 18px;
      line-height: 22px;
      white-space: normal;
    }
  }
`

export const Amount = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: #505255;

  ${media750} {
    margin-top: 5px;
  }
`

export const ForSuppliersItem = styled(SectionItem)`
  position: relative;
  border: none;
  border-bottom-right-radius: 10px;
  overflow: hidden;

  a,
  ${Icon}, ${Right} {
    z-index: 10;
  }

  ${Right} {
    display: flex;
    align-items: center;
    color: #fff;

    h4 {
      font-size: 24px;
      font-weight: 500;
    }
  }

  ${media750} {
    ${Right} {
      h4 {
        font-size: 18px;
        line-height: 22px;
        white-space: normal;
      }
    }
  }
`

export const ForSuppliersItemArrow = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  right: 20px;
  bottom: 20px;

  ${media750} {
    right: 10px;
    bottom: 10px;
  }
`
