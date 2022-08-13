import { useDropzone } from 'react-dropzone'
import Typography from '@mui/material/Typography'

import * as S from './PriceListDropzone.styled'

import UploadCloudIcon from 'public/icons/upload-cloud.svg'

interface PriceListDropzoneProps {
  priceListFile: File | null
  onChange: (file: File) => void
}

export const PriceListDropzone = ({ priceListFile, onChange }: PriceListDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.xls,.csv',
    multiple: false,
    onDrop: (files: File[]) => {
      if (files.length) {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])

        reader.addEventListener('load', () => {
          onChange(files[0])
        })
      }
    }
  })

  return (
    <S.PriceListDropzone {...getRootProps()}>
      <input {...getInputProps()} />

      {!priceListFile ? (
        <>
          <S.UploadFakeButton>
            <UploadCloudIcon />
            <span>Загрузить прайс-лист</span>
          </S.UploadFakeButton>

          <Typography component="span">или перетащите сюда файл</Typography>
        </>
      ) : (
        <S.UploadedFile>
          <Typography variant="body2" component="span">
            Загруженный прайс-лист:
          </Typography>

          <span>{priceListFile?.name}</span>
        </S.UploadedFile>
      )}
    </S.PriceListDropzone>
  )
}
