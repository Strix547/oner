import * as S from './Rating.styled'

import StarIcon from 'public/icons/star.svg'

interface RatingProps {
  rating?: number
}

export const Rating = ({ rating = 0 }: RatingProps) => {
  return (
    <S.Rating>
      <StarIcon />

      <span>{rating}/5</span>
    </S.Rating>
  )
}
