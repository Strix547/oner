import { useEffect, useMemo } from 'react'
import { withYMaps } from 'react-yandex-maps'

import { TextField } from 'ui'

import { TextFieldProps } from 'ui/TextField/TextField'

import * as S from './AddressSugest.styled'

export const AddressSugest = () => {
  function MapSuggestComponent(props: any) {
    console.log(props)
    const { ymaps } = props

    useEffect(() => {
      new ymaps.SuggestView('suggest')
    }, [ymaps.SuggestView])

    return <input id="suggest" name="address" />
  }

  return useMemo(
    () => withYMaps(MapSuggestComponent, true, ['SuggestView', 'geocode', 'coordSystem.geo']),
    []
  )
}
