import { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Typography from '@mui/material/Typography'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { PageLayout, WeSentCode } from 'components'
import { Stepper, Step, StepLabel, Modal } from 'ui'
import { StepFields } from './StepFields'
import { StepNav } from './StepNav'

import { useSupplierSignUp, useAuth } from 'hooks'
import { ROUTE_NAMES } from 'core'
import { FormFields, ImageFile } from './SupplierSignUp.types'

import * as S from './SupplierSignUp.styled'

import CheckmarkIcon from 'public/icons/checkmark.svg'

export const SupplierSignUpPage: NextPage = () => {
  const router = useRouter()
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, getValues } = useFormProps

  const [shopImages, setShopImages] = useState<ImageFile[]>([])
  const [isShopAdded, setShopAdded] = useState(false)
  const [step, setStep] = useState(6)
  const [isVerifySMSModalOpen, setVerifySMSModalOpen] = useState(false)

  const signUpMethods = useSupplierSignUp()
  const { user, phoneLogin, verifyCode, confirmCode, isTokenCreating } = useAuth()

  const {
    addPersonalData,
    addCompanyData,
    addSupplierData,
    addDeliveryData,
    addStore,
    addPriceListType,
    addConclusion
  } = signUpMethods

  const userId = user?.id
  const personalFields = getValues('personal')
  const isStepLoading = Object.values(signUpMethods).some((method) => method.isLoading)

  const stepsLabels = [
    'Персональная информация',
    'Данные компании',
    'Данные о поставщике',
    'Тип доставки',
    'Магазины',
    'Информация о прайс-листах',
    'Заключительное положение'
  ]

  const steps = stepsLabels.map((label, idx) => {
    return (
      <Step key={label}>
        {step <= idx ? (
          <StepLabel>{label}</StepLabel>
        ) : (
          <StepLabel icon={<CheckmarkIcon />}>{label}</StepLabel>
        )}
      </Step>
    )
  })

  const onSMSCodeSubmit = async (code: number) => {
    await confirmCode({ phone: personalFields?.phone, code: String(code) })
    setVerifySMSModalOpen(false)
    setStep(1)
  }

  const onPrevStep = () => {
    if (step !== 0) {
      setStep(step - 1)
    }
  }

  const onStepSubmit = async ({
    personal,
    company,
    supplier,
    delivery,
    shopes,
    priceList,
    finalPostion
  }: FormFields) => {
    if (step === 0) {
      await addPersonalData.mutateAsync(personal)
      phoneLogin.mutate(personal.phone)
      setVerifySMSModalOpen(true)
    }

    if (!userId) return

    switch (step) {
      case 1:
        await addCompanyData.mutateAsync({ userId, ...company })
        setStep(2)
        break
      case 2:
        const { brands, categories, warehouseAvailable } = supplier
        const brandsIds = brands.map(({ id }) => id)
        const categoriesIds = categories.map(({ id }) => id)

        await addSupplierData.mutateAsync({
          userId,
          brands: brandsIds,
          categories: categoriesIds,
          inStore: warehouseAvailable === 'available' ? true : false
        })

        setStep(3)
        break
      case 3:
        const { type, pickup } = delivery

        await addDeliveryData.mutateAsync({
          userId,
          delivery: type,
          pickup: pickup === 'available' ? true : false
        })
        setStep(4)
        break
      case 4:
        const { name, address, addressCoords, phone, email, howToFindUs } = shopes
        await addStore.mutateAsync({
          userId,
          name,
          address,
          desc: howToFindUs,
          phone,
          email,
          lat: addressCoords[0],
          lng: addressCoords[1]
        })
        setShopAdded(true)

        if (isShopAdded) {
          setStep(5)
        }
        break

      case 5:
        await addPriceListType.mutateAsync({ userId, type: priceList.informationExchange })
        setStep(6)
        break
      case 6:
        await addConclusion.mutateAsync({ userId, text: finalPostion.desc })
        router.push(ROUTE_NAMES.ACCOUNT_PERSONAL_INFO)
        break
    }
  }

  return (
    <S.SupplierSignUpPage>
      <Head>
        <title>Регистрация поставщика</title>
      </Head>

      <PageLayout title="Регистрация поставщика">
        <S.StepperBox>
          <Stepper activeStep={step} orientation="vertical">
            {steps}
          </Stepper>
        </S.StepperBox>

        <FormProvider {...useFormProps}>
          <S.StepBoxForm onSubmit={handleSubmit(onStepSubmit)} as="form">
            <S.StepTop>
              <Typography variant="h2">{stepsLabels[step]}</Typography>
              <Typography component="span">Шаг {step + 1} из 7</Typography>
            </S.StepTop>

            <StepFields step={step} onShopImagesChange={setShopImages} />

            <StepNav
              step={step}
              loading={isStepLoading}
              isShopAdded={isShopAdded}
              onPrevStep={onPrevStep}
            />
          </S.StepBoxForm>
        </FormProvider>
      </PageLayout>

      <Modal title="Верификация" open={isVerifySMSModalOpen} onClose={() => {}} hideClose>
        <WeSentCode
          phone={personalFields?.phone}
          loading={verifyCode.isLoading || isTokenCreating}
          onCodeSubmit={onSMSCodeSubmit}
          onResend={() => {
            addPersonalData.mutate(personalFields)
          }}
        />
      </Modal>
    </S.SupplierSignUpPage>
  )
}
