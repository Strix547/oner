import { FormEventHandler } from 'react'
import { WeSentCode } from 'components'
import { Tabs, TabPanel, Link, TextField, PhoneField, EmailField, Checkbox, Button } from 'ui'

import { ROUTE_NAMES } from 'core'

import * as S from './SignIn.styled'

type TabValue = 'email' | 'phone'

interface Tab {
  label: string
  value: TabValue
}

interface SignInFormProps {
  phone: string
  tab: TabValue
  step: string
  onTabChange: (value: TabValue) => void
  isCodeProcessing: boolean
  onCodeResend: () => void
  onCodeSubmit: (code: number) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

export const SignInForm = ({
  phone,
  tab,
  step,
  isCodeProcessing,
  onTabChange,
  onCodeResend,
  onCodeSubmit,
  onSubmit
}: SignInFormProps) => {
  const tabs: Tab[] = [
    { label: 'Электронная почта', value: 'email' },
    { label: 'Номер телефона', value: 'phone' }
  ]

  return (
    <S.SignInForm onSubmit={onSubmit}>
      <Tabs activeTab={tab} tabs={tabs} onTabChange={onTabChange}>
        <TabPanel value="email">
          <EmailField name="email" />
          <TextField type="password" name="password" label="Пароль" />

          <S.FormRow>
            <Checkbox name="remember" label="Запомнить меня" />
            <Link href={ROUTE_NAMES.FORGOT_PASSWORD}>Я забыл свой пароль</Link>
          </S.FormRow>
        </TabPanel>

        <TabPanel value="phone">
          {step === 'phone' ? (
            <PhoneField name="phone" />
          ) : (
            <WeSentCode
              loading={isCodeProcessing}
              phone={phone}
              onResend={onCodeResend}
              onCodeSubmit={onCodeSubmit}
            />
          )}
        </TabPanel>
      </Tabs>

      {(step !== 'code' || tab !== 'phone') && (
        <Button type="submit" fullWidth>
          Войти
        </Button>
      )}
    </S.SignInForm>
  )
}
