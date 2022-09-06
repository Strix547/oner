import InputAdornment from '@mui/material/InputAdornment'

import { TextField } from 'ui'

import * as S from './SparePartSearch.styled'

import LoupeIcon from 'public/icons/loupe.svg'

export const SparePartSearch = () => {
  return (
    <S.SparePartSearch>
      <TextField
        name="sparePartNumber"
        placeholder="Введите номер запчасти или VIN"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <LoupeIcon />
            </InputAdornment>
          )
        }}
      />
    </S.SparePartSearch>
  )
}
