import { FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

import { TextField } from 'ui'

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
}

export const SparePartsCategories = ({ categoryGroups = [] }: SparePartsCategoriesProps) => {
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

  const renderAccordion = (id: string, name: string, sub: any[]) => {
    const sortedWithSubFirst = sub.sort((a, b) => b.subCategories?.length - a.subCategories?.length)

    return (
      <S.Accordion
        square
        expanded={expandedItems.includes(name)}
        onChange={(_, expanded) => {
          if (expanded) {
            addToExapndedItems(name)
          } else {
            removeFromExpandedItems(name)
          }
        }}
      >
        <S.AccordionSummary
          expandIcon={
            <S.ExpandIcon>
              {expandedItems.includes(name) ? <MinusIcon /> : <PlusIcon />}
            </S.ExpandIcon>
          }
        >
          <Typography>{name}</Typography>
        </S.AccordionSummary>

        <S.AccordionDetails>
          {sortedWithSubFirst.map(({ id, name, subCategories }) => {
            if (subCategories?.length) {
              return renderAccordion(id, name, subCategories)
            }

            return (
              <S.CategoryLink key={id} href="/">
                {name}
              </S.CategoryLink>
            )
          })}
        </S.AccordionDetails>
      </S.Accordion>
    )
  }

  return (
    <S.SparePartsCategories>
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

      <S.CategoriesGroups>
        {categoryGroups.map(({ id, name, categories }) => renderAccordion(id, name, categories))}
      </S.CategoriesGroups>
    </S.SparePartsCategories>
  )
}
