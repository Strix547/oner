import { ReactNode } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

import * as S from './ImagesDropzone.styled'

import CrossIcon from 'public/icons/cross.svg'
import PlusIcon from 'public/icons/plus.svg'

interface ImageFile extends FileWithPath {
  preview: string | ArrayBuffer | null
  webkitRelativePath: string
}

interface ImagesDropzoneProps {
  images: ImageFile[]
  onChange: (images: ImageFile[]) => void
}

export const ImagesDropzone = ({ images = [], onChange }: ImagesDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: '.jpg,.png',
    multiple: false,
    onDrop: (files: File[]) => {
      files.forEach((file) => {
        const isDuplicate = images.some((img) => img.name === file.name)

        if (isDuplicate) return

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.addEventListener('load', () => {
          const imageWithPreview = Object.assign(file, {
            preview: reader.result
          })

          onChange([...images, imageWithPreview])
        })
      })
    }
  })

  const removeImageFromList = (images: ImageFile[], name: string) => {
    const withRemoved = images.filter((image) => image.name !== name)
    onChange(withRemoved)
  }

  const renderImagePreviewItems = (files: ImageFile[]): ReactNode => {
    return files.map(({ preview, name }) => {
      if (!preview) return null

      return (
        <li key={preview as string}>
          <S.ImagePreview>
            <img src={preview as string} alt={name} />
          </S.ImagePreview>

          <S.RemoveImageButton
            onClick={() => {
              removeImageFromList(images, name)
            }}
          >
            <CrossIcon />
          </S.RemoveImageButton>
        </li>
      )
    })
  }

  return (
    <S.ImagesDropzone>
      {images.length ? (
        <S.ImagePreviewList>{renderImagePreviewItems(images)}</S.ImagePreviewList>
      ) : null}

      <S.UploadZone {...getRootProps()}>
        <input {...getInputProps()} />

        <PlusIcon />
      </S.UploadZone>
    </S.ImagesDropzone>
  )
}
