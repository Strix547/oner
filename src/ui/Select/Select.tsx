import { useFormContext, Controller, UseControllerProps } from 'react-hook-form'
import { SelectProps as MuiSelectProps } from '@mui/material/Select'

import * as S from './Select.styled'

type BaseProps = MuiSelectProps & UseControllerProps

interface Option {
  label: string
  value: string | number | readonly string[] | undefined
}

interface SelectProps extends BaseProps {
  options: Option[]
}

export const Select = ({ name, rules, options, label, ...props }: SelectProps) => {
  const { control } = useFormContext()

  const menuItems = options.map(({ label, value }) => {
    return (
      <S.SelectMenuItem key={label} value={value}>
        {label}
      </S.SelectMenuItem>
    )
  })

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <S.SelectFormControl>
            {label && <S.SelectInputLabel>{label}</S.SelectInputLabel>}

            <S.Select {...props} {...field}>
              {menuItems}
            </S.Select>
          </S.SelectFormControl>
        )
      }}
    />
  )
}
