import Head from 'next/head'
import { useState } from 'react'

import { RequisitesModal } from 'components/modals'
import { RequisitesList, AccountPageTitle } from 'components'
import { AddButton } from 'common/buttons'

import { useUser, useRequisites } from 'hooks'

import * as S from 'styled/layouts/RequisitesPage'

interface OnRequisitesSubmitProps {
  purpose: 'edit' | 'add'
  requisites: {
    name: string
    accountNumber: string
    bik: string
  }
}

interface RequisitesModalProps {
  purpose: 'edit' | 'add'
  requisites?: {
    id?: number
    name: string
    accountNumber: string
    bik: string
  }
}

const SupplierRequisitesPage = () => {
  const [requisitesModal, setRequisitesModal] = useState<RequisitesModalProps | null>(null)

  const { id: userId } = useUser()
  const { requisites, addRequisites, editRequisites, deleteRequisites } = useRequisites({
    onEditSuccess() {
      setRequisitesModal(null)
    },
    onAddSuccess() {
      setRequisitesModal(null)
    }
  })

  const onRequisitesSubmit = async ({ purpose, requisites }: OnRequisitesSubmitProps) => {
    if (purpose === 'edit' && requisitesModal?.requisites?.id) {
      editRequisites.mutate({ userId, id: requisitesModal.requisites.id, ...requisites })
    }

    if (purpose === 'add') {
      addRequisites.mutate({ userId, ...requisites })
    }
  }

  return (
    <>
      <Head>
        <title>Мои реквизиты</title>
      </Head>

      <S.RequisitesPageLayouts>
        <AccountPageTitle
          endAdornment={
            <AddButton
              onClick={() => {
                setRequisitesModal({ purpose: 'add' })
              }}
            >
              Добавить реквизиты
            </AddButton>
          }
        >
          Мои реквизиты
        </AccountPageTitle>

        <S.Box haveSpacing>
          <RequisitesList
            requisites={requisites?.data}
            isLoading={requisites.isLoading}
            onEdit={(requisites) => setRequisitesModal({ purpose: 'edit', requisites: requisites })}
            onDelete={deleteRequisites.mutate}
          />
        </S.Box>

        <RequisitesModal
          purpose={requisitesModal?.purpose === 'edit' ? 'edit' : 'add'}
          requisites={requisitesModal?.requisites}
          open={Boolean(requisitesModal)}
          isChanging={addRequisites.isLoading || editRequisites.isLoading}
          onClose={() => {
            setRequisitesModal(null)
          }}
          onSubmit={onRequisitesSubmit}
        />
      </S.RequisitesPageLayouts>
    </>
  )
}

export default SupplierRequisitesPage
