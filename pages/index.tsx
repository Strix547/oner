import Head from 'next/head'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { MainSlider } from 'components'
import {
  ProductsCategoriesGrid,
  ProductsOilsSection,
  ProductsBanners,
  ProductsCarousel
} from 'components/products'
import { Header, Footer } from 'components/layouts'

import { accountAPI } from 'api'

import * as S from 'styled/pages/Main'

const MainPage = () => {
  const router = useRouter()
  const { auth_uid: authUid, auth_token: authToken } = router.query

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

  const activateAccount = useMutation(accountAPI.activateAccount, {
    onError: () => {
      toast.error('Ошибка при активации аккаунта')
    },
    onSuccess: () => {
      toast.success('Аккаунт успешно актвирован')
    }
  })

  useEffect(() => {
    if (typeof authUid === 'string' && typeof authToken === 'string') {
      activateAccount.mutate({ uid: authUid, token: authToken })
    }
  }, [authUid, authToken])

  return (
    <>
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
    </>
  )
}

export default MainPage
