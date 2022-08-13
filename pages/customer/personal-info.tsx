import Head from 'next/head'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { CustomerPersonalInfoForm } from 'components/forms'
import { AccountPageTitle, WeSentCode } from 'components'
import { Modal } from 'ui'

import { useUser } from 'hooks'
import { accountAPI } from 'api'

import * as S from 'styled/components'

interface UserFields {
  firstName: string
  middleName: string
  lastName: string
  phone: string
  email: string
}

const CustomerPersonalInfoPage = () => {
  const user = useUser()
  const queryClient = useQueryClient()

  const [userFields, setUserFields] = useState<UserFields>()
  const [isVerifyModalOpen, setVerifyModalOpen] = useState(false)

  const changeUser = useMutation(accountAPI.changeUser, {
    onError: () => {
      toast.error('Ошибка!')
    }
  })

  const verifyChangeUser = useMutation(accountAPI.verifyChangeUser, {
    onError: () => {
      toast.error('Ошибка изменения данных')
    },
    onSuccess: () => {
      setVerifyModalOpen(false)
      toast.success('Данные успешно изменены')
      queryClient.invalidateQueries('me')
    }
  })

  const onChangeInfoSubmit = async ({
    firstName,
    middleName,
    lastName,
    phone,
    email
  }: UserFields) => {
    changeUser.mutate({
      userId: user.id,
      firstName,
      middleName,
      lastName,
      phone,
      email
    })

    setUserFields({ firstName, middleName, lastName, phone, email })
    setVerifyModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Персональная информация</title>
      </Head>

      <AccountPageTitle>Персональная информация</AccountPageTitle>

      <S.Box haveSpacing>
        <CustomerPersonalInfoForm
          fields={user}
          isChanging={changeUser.isLoading}
          onSubmit={onChangeInfoSubmit}
        />

        {userFields?.phone ? (
          <Modal
            title="Подтвердите изменение данных"
            open={isVerifyModalOpen}
            onClose={() => {
              setVerifyModalOpen(false)
            }}
          >
            <WeSentCode
              phone={userFields.phone}
              loading={verifyChangeUser.isLoading}
              onCodeSubmit={(code) => {
                verifyChangeUser.mutate({ phone: userFields.phone, code: String(code) })
              }}
              onResend={() => {
                changeUser.mutate({ userId: user.id, ...userFields })
              }}
            />
          </Modal>
        ) : null}
      </S.Box>
    </>
  )
}

export default CustomerPersonalInfoPage
