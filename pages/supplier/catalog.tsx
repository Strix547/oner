import Head from 'next/head'
import { useQuery } from 'react-query'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'

import { AccountPageTitle } from 'components'
import { Pagination } from 'components/common'
import { ShopProductsCatalogTable } from 'components/tables'
import { TextField } from 'ui'

import { shopAPI } from 'api'

import * as S from 'styled/pages/supplier/Catalog'

import LoupeIcon from 'public/icons/loupe.svg'

interface SearchField {
  search: string
}

const SupplierCatalogPage = () => {
  const [catalogPage, setCatalogPage] = useState(1)

  const useFormProps = useForm<SearchField>()
  const { watch } = useFormProps
  const search = watch('search')

  const { data: catalog, isLoading: isCatalogLoading } = useQuery(
    ['catalog', catalogPage, search],
    () => shopAPI.getProducts({ page: catalogPage, search })
  )

  return (
    <>
      <Head>
        <title>Мой каталог</title>
      </Head>

      <AccountPageTitle>Мой каталог</AccountPageTitle>

      <S.SearchRow>
        <FormProvider {...useFormProps}>
          <TextField
            name="search"
            placeholder="Поиск по запчастям"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <LoupeIcon />
                </InputAdornment>
              )
            }}
          />
        </FormProvider>
      </S.SearchRow>

      <ShopProductsCatalogTable products={catalog?.results} isLoading={isCatalogLoading} />

      <Pagination page={catalogPage} itemsCount={catalog?.count} onChange={setCatalogPage} />
    </>
  )
}

export default SupplierCatalogPage
