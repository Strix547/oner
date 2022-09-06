import Typography from '@mui/material/Typography'
import { useForm, FormProvider } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import Link from 'next/link'

import { TextField } from 'ui'

import * as S from './CarModels.styled'

import LoupeIcon from 'public/icons/loupe.svg'

interface SearchFields {
  modelSearch: string
}

export const CarModels = () => {
  const useFormProps = useForm<SearchFields>()
  const { watch } = useFormProps

  const modelSearch = watch('modelSearch')

  const modelsByLetter = [
    {
      letter: '1',
      models: [
        {
          name: '100 (44, 44Q, C3)',
          year: '(2011 - НАСТ.)'
        },
        {
          name: '100 (4A, C4)',
          year: '(2011 - НАСТ.)'
        },
        {
          name: '100 Avant (44, 44Q, C3)',
          year: '(2011 - НАСТ.)'
        },
        {
          name: '100 Avant (4A, C4)',
          year: '(2011 - НАСТ.)'
        }
      ]
    },
    {
      letter: 'A',
      models: [
        {
          name: 'A1 (8X1, 8XF)',
          year: '(2010 - НАСТ.)'
        },
        {
          name: 'A1 Sportback (8XA, 8XK)',
          year: '(2011 - НАСТ.)'
        },
        {
          name: 'A2 (8Z0)',
          year: '(2000 - 2005)'
        },
        {
          name: 'A3 (8L1)',
          year: '(1996 - 2003)'
        }
      ]
    }
  ]

  return (
    <S.CarModels>
      <S.Wrapper>
        <S.TopRow>
          <Typography variant="h4" fontWeight={600}>
            Модели
          </Typography>

          <FormProvider {...useFormProps}>
            <TextField
              name="modelSearch"
              placeholder="Начните вводить название модели"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <LoupeIcon />
                  </InputAdornment>
                )
              }}
            />
          </FormProvider>
        </S.TopRow>

        <S.ModelsByLetter>
          {modelsByLetter.map(({ letter, models }) => {
            return (
              <S.ModelsRow key={letter}>
                <S.Letter>{letter}</S.Letter>

                <S.ModelsList>
                  {models.map(({ name, year }) => {
                    return (
                      <li key={name}>
                        <Link href="/" passHref>
                          <S.ModelLink>
                            <S.ModelLinkName>{name}</S.ModelLinkName>
                            <S.ModelLinkYear>{year}</S.ModelLinkYear>
                          </S.ModelLink>
                        </Link>
                      </li>
                    )
                  })}
                </S.ModelsList>
              </S.ModelsRow>
            )
          })}
        </S.ModelsByLetter>
      </S.Wrapper>
    </S.CarModels>
  )
}
