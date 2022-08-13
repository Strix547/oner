import styled, { css } from 'styled-components'

interface ButtonBaseProps {
  active?: boolean
}

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
`

export const ButtonBase = styled.button<ButtonBaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid #dedee2;
  border-radius: 8px;
  background: #fff;
  font-family: 'TTCommons';
  font-size: 16px;
  font-weight: 500;
  color: #3d3d4b;
  line-height: 22px;
  cursor: pointer;
  transition: 0.3s;

  svg path {
    transition: 0.3s;
  }

  &:hover {
    color: #fff;
    background: var(--color-primary);
    border-color: var(--color-primary);

    svg path {
      stroke: #fff;
    }
  }

  ${({ active }) =>
    active &&
    css`
      color: #fff;
      background: var(--color-primary);
      border-color: var(--color-primary);
    `}
`

export const ButtonPrev = styled(ButtonBase)`
  svg {
    transform: rotate(180deg);
  }
`

export const ButtonNext = styled(ButtonBase)``

export const PageNumbers = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 20px;
`

export const ButtonEllipsis = styled(ButtonBase)`
  cursor: default;

  &:hover {
    &:hover {
      color: #3d3d4b;
      background: #fff;
      border-color: #dedee2;
    }
  }
`
