import Head from 'next/head'
import Typography from '@mui/material/Typography'

import { PageTitle } from 'components'
import { CarBrands } from 'components/cars'
import { Header, Footer } from 'components/layouts'

import * as S from 'styled/pages/catalogs/NonOriginalSpareParts'

const NonOriginalSparePartsPage = () => {
  const models = [
    'AUDI',
    'BMW',
    'CHEVROLET',
    'CITROEN',
    'DAEWOO',
    'FORD',
    'HONDA',
    'HYUNDAI',
    'KIA',
    'LADA',
    'LAND ROVER',
    'LEXUS',
    'MAZDA',
    'MERCEDES BENZ',
    'MITSUBISHI',
    'NISSAN'
  ]

  const modelsList = models.map((model) => {
    return (
      <li key={model}>
        <S.Brand>{model}</S.Brand>
      </li>
    )
  })

  return (
    <>
      <Head>
        <title>Каталоги неоригинальных запчастей</title>
      </Head>

      <S.NonOriginalSparePartsPage>
        <Header />

        <S.Content>
          <S.Wrapper>
            <PageTitle>Каталоги неоригинальных запчастей</PageTitle>

            <S.PageSubtitle>
              В каталоге кузовных запчастей представлены детали для большинства европейских
              корейских и американских автомобилей, эксплуатируемых в России.
            </S.PageSubtitle>

            <S.PopularBrands>
              <Typography variant="h4" fontWeight={600}>
                Популярные марки
              </Typography>

              <S.PopularBrandsList>{modelsList}</S.PopularBrandsList>
            </S.PopularBrands>
          </S.Wrapper>

          <CarBrands />
        </S.Content>

        <Footer />
      </S.NonOriginalSparePartsPage>
    </>
  )
}

export default NonOriginalSparePartsPage
