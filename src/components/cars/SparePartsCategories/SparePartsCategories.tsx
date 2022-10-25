import { FormProvider, useForm } from 'react-hook-form'
import { useState, useMemo } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

import { TextField, Skeleton } from 'ui'

import { CategoryGroup } from 'types/catalogs'

import * as S from './SparePartsCategories.styled'

import LoupeIcon from 'public/icons/loupe.svg'
import PlusIcon from 'public/icons/plus-4.svg'
import MinusIcon from 'public/icons/minus-2.svg'

interface SearchFields {
  categoryGroupSearch: string
}

interface SparePartsCategoriesProps {
  categoryGroups?: CategoryGroup[]
  isLoading: boolean
}

export const SparePartsCategories = ({
  categoryGroups = [],
  isLoading = true
}: SparePartsCategoriesProps) => {
  const useFormProps = useForm<SearchFields>()
  const { watch } = useFormProps
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const categoryGroupSearch = watch('categoryGroupSearch')

  const addToExapndedItems = (item: string) => {
    setExpandedItems([...expandedItems, item])
  }

  const removeFromExpandedItems = (item: string) => {
    setExpandedItems(expandedItems.filter((expandedItem) => expandedItem !== item))
  }

  const getAllSubCategoryNames = (sub: any[]) => {
    return sub.reduce((prev, { id, name, subCategories }) => {
      if (subCategories?.length) {
        return [...prev, ...getAllSubCategoryNames(subCategories)]
      }

      return [...prev, { id, name: name.toLowerCase() }]
    }, [])
  }

  const renderAccordion = (id: string, name: string, sub: any[]) => {
    const search = categoryGroupSearch?.toLowerCase()

    if (
      categoryGroupSearch &&
      !getAllSubCategoryNames(sub).some(({ name }) => name.toLowerCase().includes(search))
    ) {
      return null
    }

    const withSubCategoriesFirst = sub.sort(
      (a, b) => b?.subCategories?.length - a?.subCategories?.length
    )

    return (
      <S.Accordion
        key={id}
        square
        expanded={expandedItems.includes(name) || Boolean(search)}
        onChange={(_, expanded) => {
          if (expanded) {
            addToExapndedItems(name)
          } else {
            removeFromExpandedItems(name)
          }
        }}
      >
        <S.AccordionSummary
          key={name}
          expandIcon={
            <S.ExpandIcon>
              {expandedItems.includes(name) || Boolean(search) ? <MinusIcon /> : <PlusIcon />}
            </S.ExpandIcon>
          }
        >
          <Typography>{name}</Typography>
        </S.AccordionSummary>

        <S.AccordionDetails>
          {withSubCategoriesFirst.map(({ id, name, subCategories }) => {
            if (subCategories?.length) {
              return renderAccordion(id, name, subCategories)
            }

            if (name.toLowerCase().includes(search)) {
              return (
                <S.CategoryLink key={id} href="/">
                  {name}
                </S.CategoryLink>
              )
            }
          })}
        </S.AccordionDetails>
      </S.Accordion>
    )
  }

  const accordions = useMemo(() => {
    return categoryGroups
      .map(({ id, name, categories }) => renderAccordion(id, name, categories))
      .filter((item) => item)
  }, [categoryGroups, expandedItems, categoryGroupSearch])

  return (
    <S.SparePartsCategories>
      {!isLoading && categoryGroups.length ? (
        <>
          <FormProvider {...useFormProps}>
            <S.SearchRow>
              <TextField
                name="categoryGroupSearch"
                placeholder="Поиск по имени группы"
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

          {categoryGroupSearch && !accordions.length ? (
            <S.NoDataText>Ничего не найдено</S.NoDataText>
          ) : (
            <S.CategoriesGroups>{accordions}</S.CategoriesGroups>
          )}
        </>
      ) : (
        <Skeleton width={350} height={553} />
      )}
    </S.SparePartsCategories>
  )
}
