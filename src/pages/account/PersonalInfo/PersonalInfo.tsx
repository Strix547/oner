import { NextPage } from 'next'
import Head from 'next/head'

import { PageLayout, AccountLayout } from 'components'

import * as S from './PersonalInfo.styled'

export const AccountPersonalInfoPage: NextPage = () => {
  return (
    <S.AccountPersonalInfoPage>
      <Head>Персональная информация</Head>

      <PageLayout>
        <AccountLayout title="Персональная информация"></AccountLayout>
      </PageLayout>
    </S.AccountPersonalInfoPage>
  )
}
