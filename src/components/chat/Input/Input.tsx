import { useState, ChangeEvent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { TextField } from 'ui'

import { NewMessage } from '../types'

import * as S from './Input.styled'

import CameraIcon from 'public/icons/camera.svg'
import ClipIcon from 'public/icons/clip.svg'
import TelegramIcon from 'public/icons/telegram.svg'

interface Fields {
  message: string
  file: File | null
  img: File | null
}

interface ChatInputProps {
  onMessageSubmit: ({ message, file }: NewMessage) => void
}

export const ChatInput = ({ onMessageSubmit }: ChatInputProps) => {
  const useFormProps = useForm<Fields>()
  const { handleSubmit, reset, getValues } = useFormProps
  const [fileCliped, setFileCliped] = useState<File | null>(null)

  const onSendMessage = ({ message }: NewMessage) => {
    if (!message?.length) return

    onMessageSubmit({ message, file: fileCliped })

    reset({
      message: '',
      file: undefined
    })
    setFileCliped(null)
  }

  const onFormSubmit = ({ message }: Fields) => {
    onSendMessage({ message, file: fileCliped })
  }

  const onFileUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target

    if (files?.length) {
      setFileCliped(files[0])
    }
  }

  return (
    <FormProvider {...useFormProps}>
      <S.ChatInput onSubmit={handleSubmit(onFormSubmit)}>
        <S.Attachments>
          <label htmlFor="file">
            <ClipIcon />
          </label>

          <label htmlFor="img">
            <CameraIcon />
          </label>

          <TextField
            id="file"
            name="file"
            type="file"
            style={{ display: 'none' }}
            onChange={onFileUpload}
          />

          <TextField
            id="img"
            name="img"
            type="file"
            inputProps={{
              accept: 'image/*'
            }}
            style={{ display: 'none' }}
            onChange={onFileUpload}
          />
        </S.Attachments>

        <TextField name="message" placeholder="Введите сообщение" />

        <S.SendButton
          onClick={() => {
            onSendMessage(getValues())
          }}
        >
          <TelegramIcon />
        </S.SendButton>
      </S.ChatInput>
    </FormProvider>
  )
}
