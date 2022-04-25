import { ChangeEvent } from 'react'
import { useFormContext, Controller, UseControllerProps } from 'react-hook-form'
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

import * as S from './TextField.styled'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name'> & UseControllerProps

export const TextField = ({
  type,
  name,
  rules = { required: true },
  defaultValue,
  onChange,
  ...props
}: TextFieldProps) => {
  const { control } = useFormContext()

  if (type === 'number') {
    const transform = {
      input: (value: number): string => (isNaN(value) || value === 0 ? '' : value.toString()),
      output: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): number => {
        const output = parseInt(e.target.value, 10)
        return isNaN(output) ? 0 : output
      }
    }

    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <S.TextField
              {...props}
              {...field}
              error={Boolean(error?.type)}
              onChange={(e) => field.onChange(transform.output(e))}
              value={transform.input(field.value)}
            />
          )
        }}
      />
    )
  }

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        const { error } = fieldState

        return (
          <S.TextField
            {...props}
            {...field}
            type={type}
            error={Boolean(error?.type)}
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }

              return field.onChange(e)
            }}
          />
        )
      }}
    />
  )
}
