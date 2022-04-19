// import Image from 'next/image'

import * as S from './StepNav.styled'

// import SignRightIcon from 'public/icons/arrows/sign-right.svg'

interface StepNavProps {
  step: number
  loading: boolean
  isShopAdded: boolean
  onPrevStep: () => void
}

const SignRightIcon = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 16L14 12L10 8"
        stroke="#7a7680"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export const StepNav = ({ step, loading, isShopAdded, onPrevStep }: StepNavProps) => {
  return (
    <S.StepNav>
      {/* {step !== 0 && step !== 1 && (
        <S.StepPrevButton onClick={onPrevStep}>
          <span>Назад</span> <SignRightIcon />
        </S.StepPrevButton>
      )} */}

      {step !== 6 ? (
        <S.StepNextButton type="submit" loading={loading} disabled={!isShopAdded && step === 4}>
          <span>Далее</span> <SignRightIcon />
        </S.StepNextButton>
      ) : (
        <S.CompleteButton type="submit">Завершить заполнение</S.CompleteButton>
      )}
    </S.StepNav>
  )
}
