import SignRightIcon from 'public/icons/arrows/sign-right.svg'

import * as S from './Pagination.styled'

interface PaginationProps {
  page: number
  itemsCount?: number
  onChange: (page: number) => void
}

export const Pagination = ({ page = 0, itemsCount = 0, onChange }: PaginationProps) => {
  const lastPage = Math.floor(itemsCount / 10)

  if (lastPage <= 1) return null

  const calculatePagination = (current: number, last: number): (string | number)[] => {
    const delta = 1,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = []

    let l: number | undefined = undefined

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i)
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1)
        } else if (i - l !== 1) {
          rangeWithDots.push('...')
        }
      }
      rangeWithDots.push(i)
      l = i
    }

    return rangeWithDots
  }

  return (
    <S.Pagination>
      <S.ButtonPrev>
        <SignRightIcon />
      </S.ButtonPrev>

      <S.PageNumbers>
        {calculatePagination(page, lastPage).map((value, idx) => {
          if (typeof value === 'string') {
            return <S.ButtonEllipsis key={`${page}${value}${idx}`}>...</S.ButtonEllipsis>
          }

          return (
            <S.ButtonBase
              key={value}
              active={value === page}
              onClick={() => {
                onChange(value)
              }}
            >
              {value}
            </S.ButtonBase>
          )
        })}
      </S.PageNumbers>

      <S.ButtonNext>
        <SignRightIcon />
      </S.ButtonNext>
    </S.Pagination>
  )
}
