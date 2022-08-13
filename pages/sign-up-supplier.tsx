import { useState } from 'react'
import Head from 'next/head'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { PageTitle, WeSentCode } from 'components'
import { SupplierSignUpForm } from 'components/forms'
import { Stepper, Step, StepLabel, Modal } from 'ui'

import { useSupplierSignUp, useAuth } from 'hooks'
import { ROUTE_NAMES } from 'core'
import { FormFields } from 'types/SupplierSignUp'
import { ImageFile } from 'types/common'

import * as S from 'styled/pages/SupplierSignUp'

import CheckmarkIcon from 'public/icons/checkmark.svg'

const SupplierSignUpPage = () => {
  const router = useRouter()
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, getValues } = useFormProps

  const [shopImages, setShopImages] = useState<ImageFile[]>([])
  const [isShopAdded, setShopAdded] = useState(false)
  const [step, setStep] = useState(0)
  const [isVerifySMSModalOpen, setVerifySMSModalOpen] = useState(false)

  const signUpMethods = useSupplierSignUp()
  const { user, confirmSupplierSignUp, confirmSignUpProcessing } = useAuth()

  const userId = user?.id
  const personalFields = getValues('personal')
  const isStepLoading = Object.values(signUpMethods).some((method) => method.isLoading)

  const stepLabels = [
    'Персональная информация',
    'Данные компании',
    'Данные о поставщике',
    'Тип доставки',
    'Магазины',
    'Информация о прайс-листах',
    'Заключительное положение'
  ]

  const steps = stepLabels.map((label, idx) => {
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
    await confirmSupplierSignUp({ phone: personalFields?.phone, code: String(code) })
    setVerifySMSModalOpen(false)
    setStep(1)
  }

  const onCodeResend = () => {
    signUpMethods.addPersonalData.mutate(personalFields)
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
      await signUpMethods.addPersonalData.mutateAsync(personal)
      setVerifySMSModalOpen(true)
    }

    if (!userId) return

    switch (step) {
      case 1:
        await signUpMethods.addCompanyData.mutateAsync({ userId, ...company })
        setStep(2)
        break
      case 2:
        const { brands, categories, warehouseAvailable } = supplier
        const brandsIds = brands.map(({ id }) => id)
        const categoriesIds = categories.map(({ id }) => id)

        await signUpMethods.addSupplierData.mutateAsync({
          userId,
          brands: brandsIds,
          categories: categoriesIds,
          inStore: warehouseAvailable === 'available'
        })

        setStep(3)
        break
      case 3:
        const { type, pickup } = delivery

        await signUpMethods.addDeliveryData.mutateAsync({
          userId,
          delivery: type,
          pickup: pickup === 'available'
        })

        if (pickup === 'available') {
          setStep(4)
        } else {
          setStep(5)
        }

        break
      case 4:
        const { name, address, city, lat, lng, phone, email, howToFindUs } = shopes

        await signUpMethods.addStore.mutateAsync({
          userId,
          name,
          address,
          city,
          desc: howToFindUs,
          phone,
          email,
          lat,
          lng,
          images: shopImages
        })
        setShopAdded(true)

        break

      case 5:
        await signUpMethods.addPriceListType.mutateAsync({
          userId,
          type: priceList.informationExchange
        })
        setStep(6)
        break
      case 6:
        await signUpMethods.addConclusion.mutateAsync({ userId, text: finalPostion.desc })
        router.push(ROUTE_NAMES.SUPPLIER_CATALOG)
        break
    }
  }

  return (
    <>
      <Head>
        <title>Регистрация поставщика</title>
      </Head>

      <PageTitle>Регистрация поставщика</PageTitle>

      <S.Content>
        <S.StepperBox>
          <Stepper activeStep={step} orientation="vertical">
            {steps}
          </Stepper>
        </S.StepperBox>

        <FormProvider {...useFormProps}>
          <SupplierSignUpForm
            step={step}
            stepLabels={stepLabels}
            shopImages={shopImages}
            isShopAdded={isShopAdded}
            isStepLoading={isStepLoading}
            onNextStep={() => {
              setStep(5)
            }}
            onShopImagesChange={setShopImages}
            onStepSubmit={handleSubmit(onStepSubmit)}
          />
        </FormProvider>
      </S.Content>

      <Modal title="Верификация" open={isVerifySMSModalOpen} hideClose>
        <WeSentCode
          phone={personalFields?.phone}
          loading={confirmSignUpProcessing}
          onCodeSubmit={onSMSCodeSubmit}
          onResend={onCodeResend}
        />
      </Modal>
    </>
  )
}

export default SupplierSignUpPage
