import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { PageTitle } from 'components'
import { CarModels } from 'components/cars'
import { Header, Footer } from 'components/layouts'

import { catalogsAPI } from 'api'

import * as S from 'styled/pages/catalogs/SparePartsCarModels'

const SparePartsCarModels = () => {
  const router = useRouter()
  const brandCode = router.query.brandCode as string

  const { data: models, isLoading: isModelsLoading } = useQuery(
    ['models', brandCode],
    () => catalogsAPI.getCarSearchOptions({ brandCode }),
    {
      enabled: Boolean(brandCode)
    }
  )

  return (
    <>
      <Head>
        <title>Оригинальные и неоригинальные кузовные запчасти и оптика для AUDI</title>
      </Head>

      <S.SparePartsCarModelsPage>
        <Header />

        <S.Content>
          <S.Wrapper>
            <PageTitle>Оригинальные и неоригинальные кузовные запчасти и оптика для AUDI</PageTitle>

            <S.PageSubtitle>
              Большой выбор фар, бамперов, крыльев и капотов от лучших производителей кузовных
              запчастей. Фары, капот, передний и задний бампер AUDI, переднее и заднее крыло, задние
              фонари – эти детали и многие другие Вы найдете в нашем каталоге кузовных деталей и
              оптики
            </S.PageSubtitle>
          </S.Wrapper>

          <CarModels />
        </S.Content>

        <Footer />
      </S.SparePartsCarModelsPage>
    </>
  )
}

export default SparePartsCarModels
