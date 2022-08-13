import { ChangeEvent } from 'react'
import { useFormContext, Controller, UseControllerProps } from 'react-hook-form'
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

import * as S from './TextField.styled'

export type TextFieldProps = Omit<MuiTextFieldProps, 'name'> & UseControllerProps

export const TextField = ({
  type,
  name,
  rules = { required: true },
  onChange,
  ...props
}: TextFieldProps) => {
  const { control } = useFormContext()

  if (type === 'number') {
    const transform = {
      input: (value: number): string => (isNaN(value) || value === 0 ? '' : value.toString()),
      output: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): number | '' => {
        const output = parseInt(e.target.value, 10)
        return isNaN(output) ? '' : output
      }
    }

    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue=""
        render={({ field, fieldState }) => {
          const { error } = fieldState

          return (
            <S.TextField
              {...props}
              {...field}
              InputProps={{
                ...props.InputProps,
                classes: {
                  root: 'text-field-input-root',
                  input: 'text-field-input',
                  error: 'text-field-input-error'
                }
              }}
              InputLabelProps={{
                ...props.InputLabelProps,
                shrink: Boolean(field.value)
              }}
              error={Boolean(error?.type)}
              value={field.value ? transform.input(field.value) : ''}
              onChange={(e) => field.onChange(transform.output(e))}
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
      defaultValue=""
      render={({ field, fieldState }) => {
        const { error } = fieldState

        return (
          <S.TextField
            {...props}
            value={field.value ?? ''}
            type={type}
            error={Boolean(error?.type)}
            InputProps={{
              ...props.InputProps,
              classes: {
                root: 'text-field-input-root',
                input: 'text-field-input',
                error: 'text-field-input-error'
              }
            }}
            InputLabelProps={{
              ...props.InputLabelProps,
              shrink: Boolean(field.value)
            }}
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
