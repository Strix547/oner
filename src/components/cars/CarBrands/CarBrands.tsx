import { useForm, FormProvider } from 'react-hook-form'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import Masonry from '@mui/lab/Masonry'
import Link from 'next/link'

import { TextField } from 'ui'

import * as S from './CarBrands.styled'

import LoupeIcon from 'public/icons/loupe.svg'

interface SearchFields {
  brandSearch: string
}

export const CarBrands = () => {
  const useFormProps = useForm<SearchFields>()
  const { watch } = useFormProps

  const brandSearch = watch('brandSearch')

  const brands = {
    A: [{ brand: 'AC' }, { brand: 'ACURA' }, { brand: 'AEBI' }],
    B: [{ brand: 'BAIC' }, { brand: 'BAIC HUANSU' }, { brand: 'BAIC WEIWANG' }],
    C: [{ brand: 'C.A.M' }, { brand: 'ACURA' }, { brand: 'CADILLAC (SGM)' }],
    D: [{ brand: 'DACIA' }, { brand: 'DADI' }, { brand: 'DAELIM MOTORCYCLES' }],
    E: [{ brand: 'EAGLE' }, { brand: 'EBRO' }, { brand: 'ECM MOTORCYCLES' }]
  }

  const brandsColumns = Object.entries(brands).map(([letter, brands]) => {
    const brandsList = brands.map(({ brand }) => {
      return (
        <li key={brand}>
          <Link href="/" passHref>
            <S.BrandLink>{brand}</S.BrandLink>
          </Link>
        </li>
      )
    })

    return (
      <S.BrandColumn key={letter}>
        <S.Letter>{letter}</S.Letter>

        <S.BrandsList>{brandsList}</S.BrandsList>
      </S.BrandColumn>
    )
  })

  return (
    <S.CarBrands>
      <S.Wrapper>
        <S.TopRow>
          <Typography variant="h4" fontWeight={600}>
            Все марки
          </Typography>

          <FormProvider {...useFormProps}>
            <TextField
              name="brandSearch"
              placeholder="Начните вводить название"
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

        <S.BrandsGrid>
          <Masonry columns={4} spacing={10}>
            {brandsColumns}
          </Masonry>
        </S.BrandsGrid>
      </S.Wrapper>
    </S.CarBrands>
  )
}
