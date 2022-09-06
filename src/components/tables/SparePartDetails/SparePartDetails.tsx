import Link from 'next/link'

import { Button } from 'ui'

import * as S from './SparePartDetails.styled'

import InfoIcon from 'public/icons/info.svg'

export const SparePartDetailsTable = () => {
  const details = [
    {
      id: 1,
      code: '4M0133837',
      name: 'Воздушный фильтр'
    },
    {
      id: 2,
      code: '4M0133837',
      name: 'Шланг забора воздуха'
    },
    {
      id: 3,
      code: '4M0133837',
      name: 'Хомут'
    }
  ]

  const actions = (
    <S.ActionsRow>
      <Button>Купить</Button>
      <InfoIcon />
    </S.ActionsRow>
  )

  const tableCards = details.map(({ id, code, name }) => {
    return (
      <S.TableCard key={id}>
        <S.TableCardRow>
          <S.TableCardCell>№</S.TableCardCell>
          <S.TableCardCell>{id}</S.TableCardCell>
        </S.TableCardRow>

        <S.TableCardRow>
          <S.TableCardCell>Номер</S.TableCardCell>
          <S.TableCardCell>
            <Link href="/" passHref>
              <S.DetailLink>{code}</S.DetailLink>
            </Link>
          </S.TableCardCell>
        </S.TableCardRow>

        <S.TableCardRow>
          <S.TableCardCell>Наименование</S.TableCardCell>
          <S.TableCardCell>
            <S.DetailName>{name}</S.DetailName>
          </S.TableCardCell>
        </S.TableCardRow>

        <S.TableCardRow>
          <S.TableCardCell>Купить</S.TableCardCell>
          <S.TableCardCell>{actions}</S.TableCardCell>
        </S.TableCardRow>
      </S.TableCard>
    )
  })

  return (
    <S.SparePartDetailsTable>
      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableCell>№</S.TableCell>
            <S.TableCell>Номер</S.TableCell>
            <S.TableCell>Наименование</S.TableCell>
            <S.TableCell>Купить</S.TableCell>
          </S.TableRow>
        </S.TableHead>

        <S.TableBody>
          {details.map(({ id, code, name }) => {
            return (
              <S.TableRow key={id}>
                <S.TableCell>{id}</S.TableCell>

                <S.TableCell>
                  <Link href="/" passHref>
                    <S.DetailLink>{code}</S.DetailLink>
                  </Link>
                </S.TableCell>

                <S.TableCell>
                  <S.DetailName>{name}</S.DetailName>
                </S.TableCell>

                <S.TableCell>{actions}</S.TableCell>
              </S.TableRow>
            )
          })}
        </S.TableBody>
      </S.Table>

      <S.TableCards>{tableCards}</S.TableCards>
    </S.SparePartDetailsTable>
  )
}
