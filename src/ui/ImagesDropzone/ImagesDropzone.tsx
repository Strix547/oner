import { useState, ReactNode } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import Image from 'next/image'

import * as S from './ImagesDropzone.styled'

import CrossIcon from 'public/icons/cross.svg'
import PlusIcon from 'public/icons/plus.svg'

interface ImageFile extends FileWithPath {
  preview: string | ArrayBuffer | null
}

interface ImagesDropzoneProps {
  onChange: (files: ImageFile[]) => void
}

export const ImagesDropzone = ({ onChange }: ImagesDropzoneProps) => {
  const [images, setImages] = useState<ImageFile[]>([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (files) => {
      files.forEach((file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.addEventListener('load', () => {
          const withNewImage = [
            ...images,
            Object.assign(file, {
              preview: reader.result
            })
          ]

          setImages(withNewImage)
          onChange(withNewImage)
        })
      })
    }
  })

  const removeImageFromList = (images: ImageFile[], name: string) => {
    const withRemoved = images.filter((image) => image.name !== name)
    setImages(withRemoved)
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
            <Image src={CrossIcon} />
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

        <Image src={PlusIcon} />
      </S.UploadZone>
    </S.ImagesDropzone>
  )
}
