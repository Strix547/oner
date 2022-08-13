import * as S from './Phone.styled'

import PhoneIcon from 'public/icons/phone.svg'

export const Phone = () => {
  return (
    <S.Phone href="tel:73472294645">
      <PhoneIcon />

      <span>+ 7 (347) 229-46-45</span>
    </S.Phone>
  )
}
