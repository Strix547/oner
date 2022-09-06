import Head from 'next/head'
import Typography from '@mui/material/Typography'
import { dehydrate, QueryClient, useQuery } from 'react-query'

import { PageTitle } from 'components'
import { CarModelSearch, CarBrandsList } from 'components/cars'

import { catalogsAPI } from 'api'

import * as S from 'styled/pages/catalogs/OriginalSpareParts'

const CategoriesOriginalSparePartsPage = () => {
  const searchModelByVin = (vin: string) => {}
  const searchModelByBodyNumber = (bodyNumber: string) => {}

  const { data: brands } = useQuery('brands', catalogsAPI.getCarBrands)

  return (
    <>
      <Head>
        <title>Каталоги оригинальных запчастей</title>
      </Head>

      <S.CategoriesOriginalSparePartsPage>
        <PageTitle>Каталоги оригинальных запчастей</PageTitle>

        <CarModelSearch
          onSearchByVin={searchModelByVin}
          onSearchByBodyNumber={searchModelByBodyNumber}
        />

        <Typography variant="h2">Поиск модели по каталогу производителя:</Typography>

        <CarBrandsList brands={brands} />
      </S.CategoriesOriginalSparePartsPage>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('brands', catalogsAPI.getCarBrands)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default CategoriesOriginalSparePartsPage
