import * as S from './StepNav.styled'

import SignRightIcon from 'public/icons/arrows/sign-right.svg'

interface StepNavProps {
  step: number
  loading: boolean
  isShopAdded: boolean
  onPrevStep: () => void
  onNextStep: () => void
}

export const StepNav = ({ step, loading, isShopAdded, onPrevStep, onNextStep }: StepNavProps) => {
  const isShopStep = step === 4

  return (
    <S.StepNav>
      {/* {step !== 0 && step !== 1 && (
        <S.StepPrevButton onClick={onPrevStep}>
          <span>Назад</span> <SignRightIcon />
        </S.StepPrevButton>
      )} */}

      {step !== 6 ? (
        <S.StepNextButton
          type={isShopStep ? undefined : 'submit'}
          loading={loading}
          disabled={isShopStep && !isShopAdded}
          onClick={() => {
            if (isShopStep && isShopAdded) {
              onNextStep()
            }
          }}
        >
          <span>Далее</span> <SignRightIcon />
        </S.StepNextButton>
      ) : (
        <S.CompleteButton type="submit">Завершить заполнение</S.CompleteButton>
      )}
    </S.StepNav>
  )
}
