import InputAdornment from '@mui/material/InputAdornment'

import { Autocomplete } from 'ui'

import * as S from './SparePartSearch.styled'

import LoupeIcon from 'public/icons/loupe.svg'

export const SparePartSearch = () => {
  return (
    <S.SparePartSearch>
      <Autocomplete
        name="sparePartNumber"
        options={[]}
        rules={{ required: false }}
        renderInput={(props) => (
          <S.TextField
            {...props}
            placeholder="Введите номер запчасти или VIN"
            InputProps={{
              ...props.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <LoupeIcon />
                </InputAdornment>
              )
            }}
          />
        )}
      />
    </S.SparePartSearch>
  )
}
