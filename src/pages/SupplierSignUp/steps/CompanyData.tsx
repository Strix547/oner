import { TextField, RadioGroup } from 'ui'

interface CompanyType {
  label: string
  value: 'ooo' | 'entrepreneur'
}

export const CompanyDataStep = () => {
  const companyTypes: CompanyType[] = [
    { label: 'ООО', value: 'ooo' },
    { label: 'ИП', value: 'entrepreneur' }
  ]

  return (
    <>
      <RadioGroup name="company.type" options={companyTypes} defaultValue="ooo" />
      <TextField name="company.inn" type="number" label="ИНН" />
      <TextField name="company.ogrn" type="number" label="ОГРН" />
      <TextField name="company.bik" type="number" label="БИК" />
      <TextField name="company.checkingAccount" type="number" label="Р/сч" />
      <TextField name="company.address" label="Юридический адрес" />
    </>
  )
}
