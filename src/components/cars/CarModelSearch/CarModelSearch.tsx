import React from 'react'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import { useForm, FormProvider } from 'react-hook-form'

import { TextField } from 'ui'

import * as S from './CarModelSearch.styled'

import LoupeIcon from 'public/icons/loupe.svg'

interface SearchField {
  modelVinSearch: string
  modelBodyNumberSearch: string
}

interface CarModelSearchProps {
  onSearchByVin: (vin: string) => void
  onSearchByBodyNumber: (bodyNumber: string) => void
}

export const CarModelSearch = ({ onSearchByVin, onSearchByBodyNumber }: CarModelSearchProps) => {
  const useFormProps = useForm<SearchField>()
  const { getValues } = useFormProps

  return (
    <S.CarModelSearch>
      <FormProvider {...useFormProps}>
        <S.VinSearch>
          <Typography variant="h4">Поиск модели по VIN-номеру:</Typography>

          <TextField
            name="modelVinSearch"
            rules={{ required: false }}
            placeholder="Введите VIN"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    const vin = getValues('modelVinSearch')
                    onSearchByVin(vin)
                  }}
                >
                  <LoupeIcon />
                </InputAdornment>
              )
            }}
          />

          <S.ExampleRow>
            <Typography component="span">Например:</Typography>

            <S.Link
              as="span"
              onClick={() => {
                onSearchByVin('WAUBH54B11N111054')
              }}
            >
              WAUBH54B11N111054
            </S.Link>
          </S.ExampleRow>
        </S.VinSearch>

        <S.Divider />

        <S.BodyNumberSearch>
          <Typography variant="h4">Поиск модели по коду/номеру кузова:</Typography>

          <TextField
            name="modelBodyNumberSearch"
            rules={{ required: false }}
            placeholder="Введите код/номер кузова"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => {
                    const bodyNumber = getValues('modelBodyNumberSearch')
                    onSearchByBodyNumber(bodyNumber)
                  }}
                >
                  <LoupeIcon />
                </InputAdornment>
              )
            }}
          />

          <S.ExampleRow>
            <Typography component="span">Например:</Typography>

            <S.Link
              as="span"
              onClick={() => {
                onSearchByBodyNumber('AGH30-0115914')
              }}
            >
              AGH30-0115914
            </S.Link>
          </S.ExampleRow>
        </S.BodyNumberSearch>
      </FormProvider>
    </S.CarModelSearch>
  )
}
