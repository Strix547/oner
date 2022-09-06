import { useState } from 'react'
import Link from 'next/link'
import Masonry from '@mui/lab/Masonry'

import { CarSelectParamsModal } from 'components/modals'

import { CarBrand, CarBrands } from 'types/catalogs'

import * as S from './CarBrandsList.styled'

interface CarBrandsListProps {
  brands?: CarBrands
}

export const CarBrandsList = ({ brands = {} }: CarBrandsListProps) => {
  const [selectedBrand, setSelectedBrand] = useState<CarBrand | null>(null)

  const brandsByLetterList = Object.entries(brands)
    .filter(([letter, brands]) => Boolean(brands.length))
    .map(([letter, brands]) => {
      const brandsList = brands.map((brand) => {
        const { name } = brand
        return (
          <li
            key={name}
            onClick={() => {
              setSelectedBrand(brand)
            }}
          >
            <S.Brand>{name}</S.Brand>
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

  const allBrands = Object.entries(brands).reduce<CarBrand[]>((prev, [letter, brands]) => {
    return [...prev, ...brands]
  }, [])

  return (
    <S.CarBrandsList>
      <Masonry spacing={2.5}>{brandsByLetterList}</Masonry>

      {selectedBrand && (
        <CarSelectParamsModal
          open={Boolean(selectedBrand)}
          defaultBrand={selectedBrand}
          brands={allBrands}
          onClose={() => {
            setSelectedBrand(null)
          }}
        />
      )}
    </S.CarBrandsList>
  )
}
