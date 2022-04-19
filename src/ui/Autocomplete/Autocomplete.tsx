import { useState } from 'react'
import { Controller, useFormContext, UseControllerProps } from 'react-hook-form'
import MuiAutocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'

import * as S from './Autocomplete.styled'

export const Autocomplete = <
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>({
  name,
  rules,
  defaultValue,
  loadingText = 'Загрузка...',
  noOptionsText = 'Не найдено',
  ...props
}: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & UseControllerProps) => {
  const [open, setOpen] = useState(false)

  const useForm = useFormContext()

  return (
    <Controller
      control={useForm?.control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <S.Autocomplete open={open}>
            <MuiAutocomplete<T, Multiple, DisableClearable, FreeSolo>
              open={open}
              onOpen={() => {
                setOpen(true)
              }}
              onClose={() => {
                setOpen(false)
              }}
              loadingText={loadingText}
              noOptionsText={noOptionsText}
              {...props}
              {...field}
              onChange={(_, value) => {
                return field.onChange(value)
              }}
            />
          </S.Autocomplete>
        )
      }}
    />
  )
}
