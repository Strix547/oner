import { useRouter } from 'next/router'
import Head from 'next/head'
import Typography from '@mui/material/Typography'

import { StoreForm } from 'components/forms'
import { Skeleton } from 'ui'

import { Store } from 'types/supplier'
import { useStores } from 'hooks'

import * as S from 'styled/pages/supplier/Store'

const ManagerStorePage = () => {
  const router = useRouter()
  const storeId = Number(router.query.id)

  const { store } = useStores({ storeId })

  const storeName = store?.data?.name
  const isStoreLoading = store.isLoading
  const storeTitle = storeName ? `Магазин ${storeName}` : 'Магазин'
  const pageTitle = !isStoreLoading && store ? storeName : 'Загрузка...'

  const selectStoreFields = (store?: Store | null) => {
    if (!store) return

    const { name, city, address, phone, email, lat, lng, desc } = store

    return { name, city, address, phone, email, lat, lng, desc }
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <S.StoreTop>
        <Typography variant="h2">{storeTitle}</Typography>
      </S.StoreTop>

      <S.StoreBox haveSpacing>
        {!isStoreLoading ? (
          <StoreForm fields={selectStoreFields(store?.data)} readOnly />
        ) : (
          <Skeleton width={390} height={319.5} />
        )}
      </S.StoreBox>
    </>
  )
}

export default ManagerStorePage
