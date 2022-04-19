import {
  PersonalDataStep,
  CompanyDataStep,
  SupplierDataStep,
  DeliveryTypesStep,
  ShopesStep,
  PriceListInformationStep,
  FinalPostionStep
} from '../steps'

import { ImageFile } from '../SupplierSignUp.types'

import * as S from './StepFields.styled'

interface StepFieldsProps {
  step: number
  onShopImagesChange: (images: ImageFile[]) => void
}

export const StepFields = ({ step, onShopImagesChange }: StepFieldsProps) => {
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalDataStep />
      case 1:
        return <CompanyDataStep />
      case 2:
        return <SupplierDataStep />
      case 3:
        return <DeliveryTypesStep />
      case 4:
        return <ShopesStep onShopImagesChange={onShopImagesChange} />
      case 5:
        return <PriceListInformationStep />
      case 6:
        return <FinalPostionStep />
      default:
        return null
    }
  }

  return <S.StepFields>{getStepContent(step)}</S.StepFields>
}
