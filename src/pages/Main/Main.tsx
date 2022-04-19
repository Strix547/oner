import { NextPage } from 'next'
import Head from 'next/head'

import { Header, Footer, MainSlider } from 'components'
import {
  ProductsCategoriesGrid,
  ProductsOilsSection,
  ProductsBanners,
  ProductsCarousel
} from 'components/products'

import * as S from './Main.styled'

export const MainPage: NextPage = () => {
  const products = [
    {
      id: 1,
      name: 'Mobil SUPER 3000 X1 5W-40, 1 л. Масло моторное.',
      price: { new: 2334, old: 2864 },
      rating: 4,
      commentsNumber: 51,
      productCode: 153789,
      img: '/'
    },
    {
      id: 2,
      name: 'Mobil SUPER 3000 X1 5W-40, 1 л. Масло моторное.',
      price: { new: 2334, old: 2864 },
      rating: 4,
      commentsNumber: 51,
      productCode: 153789,
      img: '/'
    },
    {
      id: 3,
      name: 'Mobil SUPER 3000 X1 5W-40, 1 л. Масло моторное.',
      price: { new: 2334, old: 2864 },
      rating: 4,
      commentsNumber: 51,
      productCode: 153789,
      img: '/'
    },
    {
      id: 4,
      name: 'Mobil SUPER 3000 X1 5W-40, 1 л. Масло моторное.',
      price: { new: 2334, old: 2864 },
      rating: 4,
      commentsNumber: 51,
      productCode: 153789,
      img: '/'
    },
    {
      id: 5,
      name: 'Mobil SUPER 3000 X1 5W-40, 1 л. Масло моторное.',
      price: { new: 2334, old: 2864 },
      rating: 4,
      commentsNumber: 51,
      productCode: 153789,
      img: '/'
    }
  ]

  return (
    <S.MainPage>
      <Head>
        <title>Главная</title>
      </Head>

      <Header />

      <S.Main>
        <S.Top>
          <S.Wrapper>
            <MainSlider />
            <ProductsCategoriesGrid />
          </S.Wrapper>
        </S.Top>

        <S.Sections>
          <S.Wrapper>
            <ProductsOilsSection />

            <ProductsBanners />

            <ProductsCarousel title="Рекомендуем" products={products} />

            <ProductsCarousel title="Часто продаваемые" products={products} />
          </S.Wrapper>
        </S.Sections>
      </S.Main>

      <Footer />
    </S.MainPage>
  )
}
