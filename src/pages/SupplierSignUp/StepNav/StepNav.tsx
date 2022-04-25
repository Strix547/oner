import * as S from './StepNav.styled'

import SignRightIcon from 'public/icons/arrows/sign-right.svg'

interface StepNavProps {
  step: number
  loading: boolean
  isShopAdded: boolean
  onPrevStep: () => void
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
