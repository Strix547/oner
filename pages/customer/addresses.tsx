import Head from 'next/head'
import { useState } from 'react'

import { AddressModal } from 'components/modals'
import { AddButton } from 'common/buttons'
import { AddressList, AccountPageTitle } from 'components'

import { useAddresses, useUser } from 'hooks'
import { Address } from 'types/account'

import * as S from 'styled/pages/customer/Addresses'

interface OnAddressSubmitProps {
  purpose: 'edit' | 'add'
  address: {
    name: string
    postalCode: number
    city: string
    street: string
    house: string
    building?: number
    apartment: number
  }
}

interface AddressModalProps {
  purpose: 'edit' | 'add'
  address?: Address
}

const CustomerAddressesPage = () => {
  const [addressModal, setAddressModal] = useState<AddressModalProps | null>(null)

  const { id: userId } = useUser()
  const { addresses, addAddress, editAddress, deleteAddress } = useAddresses({
    onEditSuccess: () => {
      setAddressModal(null)
    },
    onAddSuccess: () => {
      setAddressModal(null)
    }
  })

  const onAddressSubmit = ({ purpose, address }: OnAddressSubmitProps) => {
    if (purpose === 'edit' && addressModal?.address?.id) {
      editAddress.mutate({ userId, id: addressModal.address.id, ...address })
    }

    if (purpose === 'add') {
      addAddress.mutateAsync({ userId, ...address })
    }
  }

  return (
    <>
      <Head>
        <title>Мои адреса</title>
      </Head>

      <S.CustomerAddressesPage>
        <AccountPageTitle
          endAdornment={
            <AddButton
              onClick={() => {
                setAddressModal({ purpose: 'add' })
              }}
            >
              Добавить адрес
            </AddButton>
          }
        >
          Мои адреса
        </AccountPageTitle>

        <S.Box haveSpacing>
          <AddressList
            addresses={addresses?.data}
            isLoading={addresses.isLoading}
            onEdit={(address) => setAddressModal({ purpose: 'edit', address })}
            onDelete={deleteAddress.mutate}
          />

          <AddressModal
            purpose={addressModal?.purpose === 'edit' ? 'edit' : 'add'}
            open={Boolean(addressModal)}
            address={addressModal?.address}
            isChanging={addAddress.isLoading || editAddress.isLoading}
            onSubmit={onAddressSubmit}
            onClose={() => {
              setAddressModal(null)
            }}
          />
        </S.Box>
      </S.CustomerAddressesPage>
    </>
  )
}

export default CustomerAddressesPage
