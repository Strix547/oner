import Link from 'next/link'

import { Skeleton } from 'ui'

import { ROUTE_NAMES } from 'core'
import { CarBrands } from 'types/catalogs'

import * as S from './CarBrandsList.styled'

interface CarBrandsListProps {
  brands?: CarBrands
  isLoading: boolean
}

export const CarBrandsList = ({ brands = {}, isLoading }: CarBrandsListProps) => {
  const brandsByLetterList = Object.entries(brands)
    .filter(([letter, brands]) => Boolean(brands.length))
    .map(([letter, brands]) => {
      const brandsList = brands.map((brand) => {
        const { name, code } = brand
        return (
          <li key={name}>
            <Link href={`${ROUTE_NAMES.MODELS}/?brandCode=${code}`} passHref>
              <S.BrandLink>{name}</S.BrandLink>
            </Link>
          </li>
        )
      })

      return (
        <S.BrandsLetterCard key={letter}>
          <S.Letter>{letter}</S.Letter>

          <S.BrandsList>{brandsList}</S.BrandsList>
        </S.BrandsLetterCard>
      )
    })

  return (
    <S.CarBrandsList>
      {!isLoading ? (
        <S.Masonry spacing={2.5}>{brandsByLetterList}</S.Masonry>
      ) : (
        <S.MasonrySkeleton>
          <Skeleton count={8} height={148} />
        </S.MasonrySkeleton>
      )}
    </S.CarBrandsList>
  )
}
