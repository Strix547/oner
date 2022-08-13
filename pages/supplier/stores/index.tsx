import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { AccountPageTitle } from 'components'
import { Box } from 'common'
import { StoresTable } from 'components/tables'
import { AddStoreModal } from 'components/modals'
import { AddButton } from 'common/buttons'
import { Pagination } from 'components/common'

import { useUser, useStores } from 'hooks'
import { ROUTE_NAMES } from 'core'

import * as S from 'styled/pages/supplier/Stores'

const SupplierStoresPage = () => {
  const router = useRouter()
  const { id: userId } = useUser()

  const [storesPage, setStoresPage] = useState(1)
  const [isAddStoreModalOpen, setAddStoreModalOpen] = useState(false)

  const { stores, addStore, toggleStoreStatus } = useStores({
    storesPage,
    onAddSuccess: () => {
      setAddStoreModalOpen(false)
    }
  })

  const toStoreEditPage = (storeId: number) => {
    router.push(`${ROUTE_NAMES.SUPPLIER_STORES}/${storeId}`)
  }

  return (
    <>
      <Head>
        <title>Мои магазины</title>
      </Head>

      <S.SupplierStoresPage>
        <AccountPageTitle
          endAdornment={
            <AddButton
              onClick={() => {
                setAddStoreModalOpen(true)
              }}
            >
              Добавить магазин
            </AddButton>
          }
        >
          Мои магазины
        </AccountPageTitle>

        <Box noPaddings>
          <StoresTable
            stores={stores.data ? stores.data.results : []}
            storePath={ROUTE_NAMES.SUPPLIER_STORES}
            isLoading={stores.isLoading}
            onStoreEdit={toStoreEditPage}
            onStoreStatusToggle={toggleStoreStatus}
          />
        </Box>

        <Pagination page={storesPage} itemsCount={stores.data?.count} onChange={setStoresPage} />

        <AddStoreModal
          open={isAddStoreModalOpen}
          isChanging={addStore.isLoading}
          onClose={() => {
            setAddStoreModalOpen(false)
          }}
          onSubmit={(fields) => {
            addStore.mutate({ userId, ...fields })
          }}
        />
      </S.SupplierStoresPage>
    </>
  )
}

export default SupplierStoresPage
