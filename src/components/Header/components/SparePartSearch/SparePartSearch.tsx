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
              classes: {
                root: 'autocomplete-input-root'
              },
              endAdornment: (
                <InputAdornment position="end" classes={{ root: 'autocomplete-end-adornment' }}>
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
