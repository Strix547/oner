import React, { useState, useCallback } from 'react'
import { useQuery } from 'react-query'
import InputAdornment from '@mui/material/InputAdornment'

import { Select, Autocomplete } from 'ui'

import { brandsAPI, categoriesAPI } from 'api'

import SignRightIcon from 'public/icons/arrows/sign-right.svg'
import CrossIcon from 'public/icons/cross.svg'

import * as S from './SupplierData.styled'

interface Brand {
  id: number
  name: string
  code: string
  icon: string
  slug: string
}

interface Category {
  id: number
  title: string
}

export const SupplierDataStep = () => {
  const [brandsPage, setBrandsPage] = useState(1)
  const [brandsAll, setBrandsAll] = useState<Brand[]>([])

  const [categoriesPage, setCategoriesPage] = useState(1)
  const [categoriesAll, setCategoriesAll] = useState<Category[]>([])

  const { data: brands, isLoading: areBrandsLoading } = useQuery(
    ['brands', brandsPage],
    () => brandsAPI.fetchBrands(brandsPage),
    {
      onSuccess: ({ results }) => {
        setBrandsAll([...brandsAll, ...results])
      }
    }
  )

  const { data: categories, isLoading: areCategoriesLoading } = useQuery(
    ['categories', categoriesPage],
    () => categoriesAPI.fetchCategories(categoriesPage),
    {
      onSuccess: ({ results }) => {
        setCategoriesAll([...categoriesAll, ...results])
      }
    }
  )

  const warehousesAvailable = [
    { label: 'В наличие', value: 'available' },
    { label: 'Отсутствует', value: 'not-available' }
  ]

  const ChipProps = {
    deleteIcon: <CrossIcon />
  }

  const incrementPageOnScrollEnd = (
    { currentTarget }: React.SyntheticEvent,
    hasMore: boolean,
    onScrollEnd: () => void
  ) => {
    const { scrollTop, clientHeight, scrollHeight } = currentTarget

    if (scrollTop + clientHeight === scrollHeight && hasMore) {
      onScrollEnd()
    }
  }

  return (
    <>
      <S.MultipleAutocomplete>
        <Autocomplete
          multiple
          filterSelectedOptions
          name="supplier.categories"
          loading={areCategoriesLoading}
          options={categoriesAll}
          ChipProps={ChipProps}
          getOptionLabel={({ title }) => title}
          renderInput={(props) => (
            <S.TextField
              {...props}
              label="Продукция"
              placeholder="Выберите продукцию"
              InputProps={{
                ...props.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SignRightIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
          PaperComponent={(props) => (
            <div
              {...props}
              onScroll={(e) =>
                incrementPageOnScrollEnd(e, Boolean(categories?.next), () => {
                  setCategoriesPage(categoriesPage + 1)
                })
              }
            />
          )}
        />
      </S.MultipleAutocomplete>

      <S.MultipleAutocomplete>
        <Autocomplete
          multiple
          filterSelectedOptions
          name="supplier.brands"
          loading={areBrandsLoading}
          options={brandsAll}
          getOptionLabel={({ name }) => name}
          ChipProps={ChipProps}
          renderInput={(props) => (
            <S.TextField
              {...props}
              label="Бренд"
              placeholder="Бренд"
              InputProps={{
                ...props.InputProps,
                endAdornment: (
                  <InputAdornment position="end">
                    <SignRightIcon />
                  </InputAdornment>
                )
              }}
            />
          )}
          PaperComponent={(props) => (
            <div
              {...props}
              onScroll={(e) =>
                incrementPageOnScrollEnd(e, Boolean(brands?.next), () => {
                  setBrandsPage(brandsPage + 1)
                })
              }
            />
          )}
        />
      </S.MultipleAutocomplete>

      <Select
        name="supplier.warehouseAvailable"
        label="Наличие на складах"
        options={warehousesAvailable}
      />
    </>
  )
}
