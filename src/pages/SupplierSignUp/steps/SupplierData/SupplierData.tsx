import React, { useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import InputAdornment from '@mui/material/InputAdornment'
// import Image from 'next/image'

import { Select, Autocomplete } from 'ui'

import { brandsAPI, categoriesAPI } from 'api'

// import SignRightIcon from 'public/icons/arrows/sign-right.svg'
// import CrossIcon from 'public/icons/cross.svg'

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

const SignRightIcon = (props: any) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 16L14 12L10 8"
        stroke="#7a7680"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const CrossIcon = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      fill="none"
      viewBox="0 0 20 20"
      id="x"
      {...props}
    >
      <rect width="20" height="20" rx="4" fill="#fff"></rect>
      <path
        d="M7.334 7.333l5.333 5.334M12.667 7.333l-5.333 5.334"
        stroke="#7A7680"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  )
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
        {useMemo(
          () => (
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
          ),
          [brandsAll]
        )}
      </S.MultipleAutocomplete>

      <Select
        name="supplier.warehouseAvailable"
        label="Наличие на складах"
        options={warehousesAvailable}
      />
    </>
  )
}
