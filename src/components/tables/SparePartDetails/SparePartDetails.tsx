import { useRouter } from 'next/router'

import { Button } from 'ui'

import { UnitDetailUnit } from 'types/catalogs'

import * as S from './SparePartDetails.styled'

import InfoIcon from 'public/icons/info.svg'
import { ROUTE_NAMES } from 'core'

interface SparePartDetailsTableProps {
  units: UnitDetailUnit[]
}

export const SparePartDetailsTable = ({ units }: SparePartDetailsTableProps) => {
  const router = useRouter()

  const catalog = router.query.catalog as string
  const vehicleId = router.query.vehicleId as string

  const toQuickDetailsPage = (ssd: string, catalog: string, oem: string, vehicleId: string) => {
    router.push({
      pathname: ROUTE_NAMES.ORIGINAL_SPARE_PARTS_QUICK_DETAILS,
      query: {
        catalog,
        vehicleId,
        oem,
        ssd
      }
    })
  }

  const tableCards = units.map(({ codeOnImage, name, oem, ssd }) => {
    return (
      <S.TableCard key={oem}>
        <S.TableCardRow>
          <S.TableCardCell>№</S.TableCardCell>
          <S.TableCardCell>{codeOnImage}</S.TableCardCell>
        </S.TableCardRow>

        <S.TableCardRow>
          <S.TableCardCell>Номер</S.TableCardCell>
          <S.TableCardCell>
            <S.DetailNumber>{oem}</S.DetailNumber>
          </S.TableCardCell>
        </S.TableCardRow>

        <S.TableCardRow>
          <S.TableCardCell>Наименование</S.TableCardCell>
          <S.TableCardCell>
            <S.DetailName>
              {name[0]}
              {name.slice(1).toLowerCase()}
            </S.DetailName>
          </S.TableCardCell>
        </S.TableCardRow>

        <S.TableCardRow>
          <S.TableCardCell>Купить</S.TableCardCell>
          <S.TableCardCell>
            <S.ActionsRow>
              <Button
                onClick={() => {
                  toQuickDetailsPage(ssd, catalog, oem, vehicleId)
                }}
              >
                Купить
              </Button>
              <InfoIcon />
            </S.ActionsRow>
          </S.TableCardCell>
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
          {units.map(({ codeOnImage, name, oem, ssd }) => {
            return (
              <S.TableRow key={oem}>
                <S.TableCell>{codeOnImage}</S.TableCell>

                <S.TableCell>
                  <S.DetailNumber>{oem}</S.DetailNumber>
                </S.TableCell>

                <S.TableCell>
                  <S.DetailName>
                    {name[0]}
                    {name.slice(1).toLowerCase()}
                  </S.DetailName>
                </S.TableCell>

                <S.TableCell>
                  <S.ActionsRow>
                    <Button
                      onClick={() => {
                        toQuickDetailsPage(ssd, catalog, oem, vehicleId)
                      }}
                    >
                      Купить
                    </Button>
                    <InfoIcon />
                  </S.ActionsRow>
                </S.TableCell>
              </S.TableRow>
            )
          })}
        </S.TableBody>
      </S.Table>

      <S.TableCards>{tableCards}</S.TableCards>
    </S.SparePartDetailsTable>
  )
}
