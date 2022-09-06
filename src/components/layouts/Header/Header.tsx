import { FormProvider, useForm } from 'react-hook-form'

import { HeaderTop, HeaderBottom } from './components'

import { ROUTE_NAMES } from 'core'
import { NavItem } from './Header.types'

import * as S from './Header.styled'

export const Header = () => {
  const useFormProps = useForm()

  const nav: NavItem[] = [
    { label: 'Запчасти для ТО', link: ROUTE_NAMES.MAINTENANCE_SPARE_PARTS },
    { label: 'Автомасла', link: ROUTE_NAMES.CAR_OILS },
    { label: 'Оригинальные запчасти', link: ROUTE_NAMES.ORIGINAL_SPARE_PARTS },
    { label: 'Неоригинальные запчасти', link: ROUTE_NAMES.NON_ORIGINAL_SPARE_PARTS },
    { label: 'Лампочки', link: ROUTE_NAMES.CAR_LAMPS },
    { label: 'Аккумуляторы', link: ROUTE_NAMES.ACCUMULATORS }
  ]

  return (
    <FormProvider {...useFormProps}>
      <S.Header>
        <HeaderTop nav={nav} />
        <HeaderBottom nav={nav} />
      </S.Header>
    </FormProvider>
  )
}
