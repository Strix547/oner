import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { PageTitle } from 'components'
import { SparePartsCategories } from 'components/cars'

import { catalogsAPI } from 'api'

import * as S from 'styled/pages/catalogs/OriginalSparePartsCategories'

const OriginalSparePartsCategoriesPage = () => {
  const router = useRouter()

  const catalog = router.query.catalog as string
  const vehicleId = router.query.vehicleId as string
  const ssd = router.query.ssd as string

  // ?catalog=AU1394&vehicleId=0&ssd=$*KwHe6vuKir-dr6G8pYn23IaSsrWr2N7f34SNldTUlJ2JhaqTl9mF1s-rvs7ByJvYmZ3Ov668zsHIi5eBn9nUxsmBz9DK9OqQzsHImI_P0MqB9uXcp9vJwM-Pi5eBha-7p6_Owcic1pmdzrywvM7ByJ7c1YXWz72qubewsoH2l6Sp2t_e3N7Rl5eFmM_QybqkpLfm7_Wlrr7JkQAAAABZKSuI$

  const { data: categoryGroups, isLoading: isCategoriesLoading } = useQuery(
    ['categories', catalog, vehicleId, ssd],
    () => catalogsAPI.getSparePartsCategories({ catalog, vehicleId, ssd }),
    {
      enabled: Boolean(catalog) && Boolean(vehicleId) && Boolean(ssd)
    }
  )
  console.log(categoryGroups)

  // const data = useQuery('abc', () => catalogsAPI.quickDetail())

  return (
    <>
      <Head>
        <title>Запчасти Audi Audi 80/90/Avant</title>
      </Head>

      <S.OriginalSparePartsCategoriesPage>
        <PageTitle>Запчасти Audi Audi 80/90/Avant</PageTitle>

        <SparePartsCategories categoryGroups={categoryGroups} />
      </S.OriginalSparePartsCategoriesPage>
    </>
  )
}

export default OriginalSparePartsCategoriesPage
