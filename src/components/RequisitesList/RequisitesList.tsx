import { PropsWithChildren, useEffect } from 'react'
import MuiRadioGroup from '@mui/material/RadioGroup'
import { Controller, useForm } from 'react-hook-form'
import Typography from '@mui/material/Typography'

import { RequisitesCard } from 'components'
import { Skeleton } from 'ui'

import { RequisitesItem } from 'types/account'

import * as S from './RequisitesList.styled'

interface ControllerRadioGroup {
  selectedRequisites?: number
  onChange: (id: number) => void
}

interface OnEdit {
  id: number
  name: string
  accountNumber: number
  bik: number
}

interface RequisitesListProps {
  requisites?: RequisitesItem[]
  isLoading?: boolean
  asRadios?: boolean
  mainRequisitesId?: number
  onEdit?: (props: OnEdit) => void
  onDelete?: (id: number) => void
  onChangeMainRequisites?: (id: number) => void
}

const ControllerRadioGroup = ({
  children,
  selectedRequisites,
  onChange
}: PropsWithChildren<ControllerRadioGroup>) => {
  const { control, watch, reset, getValues } = useForm<{ requisites: string }>()

  const { requisites } = watch()

  useEffect(() => {
    if (requisites && requisites !== String(selectedRequisites)) {
      onChange(Number(requisites))
    }
  }, [selectedRequisites, requisites])

  useEffect(() => {
    const requisites = getValues('requisites')

    if (selectedRequisites && !requisites) {
      reset({ requisites: String(selectedRequisites) })
    }
  }, [selectedRequisites, reset])

  return (
    <Controller
      name="requisites"
      control={control}
      render={({ field }) => {
        return (
          <MuiRadioGroup {...field} defaultValue={selectedRequisites}>
            {children}
          </MuiRadioGroup>
        )
      }}
    />
  )
}

export const RequisitesList = ({
  requisites = [],
  isLoading = false,
  asRadios = false,
  mainRequisitesId,
  onEdit,
  onDelete,
  onChangeMainRequisites
}: RequisitesListProps) => {
  if (isLoading) {
    return (
      <S.SkeletonList column={asRadios}>
        <Skeleton count={2} height={94} />
      </S.SkeletonList>
    )
  }

  if (!requisites.length) {
    return (
      <S.NoRequisites>
        <Typography variant="body2" component="p">
          У вас нет добавленных реквизитов
        </Typography>
      </S.NoRequisites>
    )
  }

  const requisitesCards = requisites?.map(({ id, name, bik, accountNumber }) => (
    <RequisitesCard
      key={id}
      id={id}
      name={name}
      accountNumber={accountNumber}
      asRadio={asRadios}
      onEdit={() => {
        if (onEdit) {
          onEdit({ id, name, bik, accountNumber })
        }
      }}
      onDelete={() => {
        if (onDelete) {
          onDelete(id)
        }
      }}
    />
  ))

  return (
    <S.RequisitesList column={asRadios}>
      {asRadios ? (
        <ControllerRadioGroup
          selectedRequisites={mainRequisitesId}
          onChange={(id) => {
            if (onChangeMainRequisites) {
              onChangeMainRequisites(id)
            }
          }}
        >
          {requisitesCards}
        </ControllerRadioGroup>
      ) : (
        requisitesCards
      )}
    </S.RequisitesList>
  )
}
