import { FormProvider, useForm } from 'react-hook-form'
import InputAdornment from '@mui/material/InputAdornment'
import { useRouter } from 'next/router'

import { TextField, Link, Skeleton } from 'ui'

import { ROUTE_NAMES } from 'core'
import { SparePartUnit } from 'types/catalogs'

import * as S from './SparePartsUnits.styled'

import LoupeIcon from 'public/icons/loupe.svg'

interface FormFields {
  unitSearch: string
}

interface SparePartsUnitsProps {
  units?: SparePartUnit[]
  isLoading: boolean
}

export const SparePartsUnits = ({ units = [], isLoading }: SparePartsUnitsProps) => {
  const router = useRouter()

  const catalog = router.query.catalog as string
  const vehicleId = router.query.vehicleId as string

  const useFormProps = useForm<FormFields>()
  const { watch } = useFormProps

  const filterUnitsBySearch = (units: SparePartUnit[], search: string) => {
    if (!search) return units

    return units.filter(({ name }) => {
      return name.toLowerCase().includes(search.toLowerCase())
    })
  }

  const unitLinks = filterUnitsBySearch(units, watch('unitSearch')).map(({ name, ssd, unitId }) => {
    return (
      <li key={unitId}>
        <Link
          href={`${ROUTE_NAMES.ORIGINAL_SPARE_PARTS_DETAILS}?catalog=${catalog}&unitId=${unitId}&vehicleId=${vehicleId}&ssd=${ssd}`}
        >
          {name}
        </Link>
      </li>
    )
  })

  return (
    <S.SparePartsUnits>
      {!isLoading && units.length ? (
        <>
          <FormProvider {...useFormProps}>
            <S.SearchRow>
              <TextField
                name="unitSearch"
                placeholder="Поиск по названию узла"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LoupeIcon />
                    </InputAdornment>
                  )
                }}
              />
            </S.SearchRow>
          </FormProvider>

          <S.UnitLinks>{unitLinks}</S.UnitLinks>
        </>
      ) : (
        <Skeleton width={350} height={553} />
      )}
    </S.SparePartsUnits>
  )
}
