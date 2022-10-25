import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import { useForm, FormProvider } from 'react-hook-form'
import { useQuery } from 'react-query'

import { Select, Button, Skeleton } from 'ui'

import { ROUTE_NAMES } from 'core'
import { catalogsAPI } from 'api'

import { CarBrand } from 'types/catalogs'

import * as S from './CarSearchByParams.styled'

export const CarSearchByParams = () => {
  const router = useRouter()
  const useFormProps = useForm()
  const { handleSubmit, reset, getValues } = useFormProps

  const [isParamsVisible, setParamsVisible] = useState(false)
  const [selectedSsd, setSelectedSsd] = useState('')
  const [selectedBrandCode, setSelectedBrandCode] = useState('')

  const { data: brands = [], isLoading: isBrandsLoading } = useQuery(
    'brands',
    catalogsAPI.getCarBrands
  )

  const { data: searchOptions, isLoading: isSearchOptionsLoading } = useQuery(
    ['search-options', selectedBrandCode, selectedSsd],
    () => catalogsAPI.getCarSearchOptions({ brandCode: selectedBrandCode, ssd: selectedSsd }),
    {
      enabled: !!selectedBrandCode
    }
  )
  useEffect(() => {
    if (!searchOptions) return

    const defaultValues = searchOptions
      .filter(({ value }) => value)
      .reduce((prev, { name, value }) => ({ ...prev, [name]: value }), {})

    reset({ ...getValues(), ...defaultValues })
  }, [searchOptions])

  const allBrands = Object.entries(brands).reduce<CarBrand[]>((prev, [_, brands]) => {
    return [...prev, ...brands]
  }, [])

  const brandOptions = allBrands.map(({ name, code }) => ({ label: name, value: code }))

  const dynamicSelects = searchOptions?.map(({ id, name, options }) => {
    return (
      <Select
        key={id}
        name={name}
        label={name}
        options={options}
        renderValue={(value) => {
          return <>{value}</>
        }}
        required={!Boolean(selectedSsd)}
        onChange={({ target }) => {
          setSelectedSsd(target.value as string)
        }}
      />
    )
  })

  const onSearchOptionsSubmit = () => {
    const selectedBrand = allBrands.find(({ code }) => code === selectedBrandCode)?.brand

    router.push({
      pathname: ROUTE_NAMES.ORIGINAL_SPARE_PARTS_VEHICLES,
      query: { brand: selectedBrand, brandCode: selectedBrandCode, ssd: selectedSsd }
    })
  }

  return (
    <S.CarSearchByParams>
      <Typography variant="h4">Подбор деталей по параметрам</Typography>

      {!isParamsVisible ? (
        <>
          <Typography>
            Не помните VIN и номер кузова? Мы можем подобрать детали по вашим параметрам.
          </Typography>

          <Button
            onClick={() => {
              setParamsVisible(true)
            }}
          >
            Подбор по параметрам
          </Button>
        </>
      ) : null}

      {isParamsVisible ? (
        <FormProvider {...useFormProps}>
          <S.Form onSubmit={handleSubmit(onSearchOptionsSubmit)}>
            {!isSearchOptionsLoading && !isBrandsLoading ? (
              <>
                <Select
                  name="brand"
                  label="Марка"
                  required
                  options={brandOptions}
                  onChange={({ target }) => {
                    setSelectedSsd('')
                    setSelectedBrandCode(target.value as string)
                    reset({
                      brand: target.value
                    })
                  }}
                />

                {dynamicSelects}
              </>
            ) : (
              <S.SkeletonGrid>
                <Skeleton height={48} count={3} />
              </S.SkeletonGrid>
            )}

            <Button type="submit" loading={isSearchOptionsLoading || isBrandsLoading}>
              Найти автомобиль
            </Button>
          </S.Form>
        </FormProvider>
      ) : null}
    </S.CarSearchByParams>
  )
}
