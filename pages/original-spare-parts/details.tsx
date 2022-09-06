import Head from 'next/head'

import { PageTitle } from 'components'
import { SparePartView } from 'components/cars'
import { SparePartDetailsTable } from 'components/tables'

import * as S from 'styled/pages/catalogs/SparePartWithDetails'

const SparePartWithDetailsPage = () => {
  return (
    <>
      <Head>
        <title>Возд. фильтр с сопутств. деталями</title>
      </Head>

      <S.SparePartWithDetailsPage>
        <PageTitle>Возд. фильтр с сопутств. деталями</PageTitle>

        <S.Content>
          <SparePartView />
          <SparePartDetailsTable />
        </S.Content>
      </S.SparePartWithDetailsPage>
    </>
  )
}

export default SparePartWithDetailsPage
