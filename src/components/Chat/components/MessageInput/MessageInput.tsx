import { useState, ChangeEvent, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import CircularProgress from '@mui/material/CircularProgress'

import { TextField } from 'ui'

import * as S from './MessageInput.styled'

import CameraIcon from 'public/icons/camera.svg'
import ClipIcon from 'public/icons/clip.svg'
import TelegramIcon from 'public/icons/telegram.svg'

interface FormFields {
  message: string
  file: File | null
  img: File | null
}

interface MessageInputProps {
  isMessageSending: boolean
  onMessageSubmit: (message: string, file: File | null) => void
}

export const MessageInput = ({ isMessageSending, onMessageSubmit }: MessageInputProps) => {
  const useFormProps = useForm<FormFields>()
  const { handleSubmit, reset, getValues } = useFormProps
  const [fileCliped, setFileCliped] = useState<File | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const imgInputRef = useRef<HTMLInputElement>(null)

  const onFileUpload = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target

    if (files?.length) {
      setFileCliped(files[0])
    }
  }

  const onSendMessage = ({ message }: Omit<FormFields, 'img'>) => {
    if (!message?.length) return

    onMessageSubmit(message, fileCliped)

    reset({
      message: '',
      img: undefined,
      file: undefined
    })

    setFileCliped(null)

    if (imgInputRef?.current) {
      imgInputRef.current.files = new DataTransfer().files
    }

    if (fileInputRef?.current) {
      fileInputRef.current.files = new DataTransfer().files
    }
  }

  const onFormSubmit = ({ message }: FormFields) => {
    onSendMessage({ message, file: fileCliped })
  }

  return (
    <FormProvider {...useFormProps}>
      <S.MessageInput onSubmit={handleSubmit(onFormSubmit)}>
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
            inputProps={{
              accept: '.pdf',
              ref: fileInputRef
            }}
            style={{ display: 'none' }}
            onChange={onFileUpload}
          />

          <TextField
            id="img"
            name="img"
            type="file"
            inputProps={{
              accept: '.png,.jpg',
              ref: imgInputRef
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
          {!isMessageSending ? <TelegramIcon /> : <CircularProgress size={20} thickness={4.5} />}
        </S.SendButton>
      </S.MessageInput>
    </FormProvider>
  )
}
