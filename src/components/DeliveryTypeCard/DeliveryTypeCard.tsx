import { FormProvider, useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { Box } from 'common'
import { DeliveryTypeSelect } from 'components/common'

import * as S from './DeliveryTypeCard.styled'

interface DeliveryType {
  id: number
  title: string
}

interface DeliveryTypeCardProps {
  type?: DeliveryType
  editable?: boolean
  onDeliveryTypeChange?: (id: number) => void
}

export const DeliveryTypeCard = ({
  type,
  editable = false,
  onDeliveryTypeChange
}: DeliveryTypeCardProps) => {
  const useFormProps = useForm()
  const { watch, reset, getValues } = useFormProps

  const deliveryType = watch('deliveryType')

  useEffect(() => {
    const deliveryType = getValues('deliveryType')

    if (editable && type && !deliveryType) {
      reset({
        deliveryType: type.id
      })
    }
  }, [reset, getValues, type, editable])

  useEffect(() => {
    if (editable && onDeliveryTypeChange && deliveryType !== type?.id) {
      onDeliveryTypeChange(deliveryType)
    }
  }, [deliveryType])

  if (!editable) {
    return (
      <S.DeliveryTypeCard>
        <Box title="Тип доставки">
          <S.List>
            <S.ListItem>
              <S.Label>Тип доставки</S.Label>
              <S.Value>{type?.title ?? ''}</S.Value>
            </S.ListItem>
          </S.List>
        </Box>
      </S.DeliveryTypeCard>
    )
  }

  return (
    <S.DeliveryTypeCard>
      <Box title="Тип доставки">
        <FormProvider {...useFormProps}>
          <DeliveryTypeSelect name="deliveryType" />
        </FormProvider>
      </Box>
    </S.DeliveryTypeCard>
  )
}
