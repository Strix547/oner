import { useState, useMemo } from 'react'
import { FileWithPath } from 'react-dropzone'
import { YMaps, Map, YMapsApi, Placemark } from 'react-yandex-maps'
import { useFormContext } from 'react-hook-form'

import {
  TextField,
  PhoneField,
  EmailField,
  ImagesDropzone,
  Button,
  Skeleton,
  AddressSugest
} from 'ui'

import { FormFields } from 'pages/SupplierSignUp/SupplierSignUp.types'

import * as S from './Shopes.styled'

import markerImg from 'public/img/marker.png'

interface ImageFile extends FileWithPath {
  preview: string | ArrayBuffer | null
}

interface ShopesStepProps {
  onShopImagesChange: (files: ImageFile[]) => void
}

export const ShopesStep = ({ onShopImagesChange }: ShopesStepProps) => {
  const { setValue, reset, getValues } = useFormContext<FormFields>()
  const defaultCoords: [number, number] = [55.751574, 37.573856]

  const [isMapLoading, setMapLoading] = useState(true)
  const [map, setMap] = useState({
    defaultOptions: { suppressMapOpenBlock: true },
    center: defaultCoords,
    zoom: 9
  })
  const [ymaps, setYmaps] = useState<YMapsApi | null>(null)
  const [markCoords, setMarkCoord] = useState<[number, number]>(defaultCoords)

  const loadSuggest = (ymaps: YMapsApi) => {
    setMapLoading(false)
    setYmaps(ymaps)

    const suggestView = new ymaps.SuggestView('suggest')
    suggestView.events.add('select', (e: any) => {
      const selectedAddress = e.get('item').value
      setValue('shopes.address', selectedAddress)

      new ymaps.geocode(selectedAddress).then((res: any) => {
        const coords = res.geoObjects.get(0).geometry.getCoordinates()

        setMap({ ...map, center: coords })
        setMarkCoord(coords)
        setValue('shopes.addressCoords', coords)
      })
    })
  }

  const onMapClick = (e: any) => {
    const coords = e.get('coords')

    setMap({ ...map, center: coords })
    setMarkCoord(coords)
    setValue('shopes.addressCoords', coords)

    if (ymaps) {
      new ymaps.geocode(coords).then(({ geoObjects }: any) => {
        const { properties } = geoObjects.get(0)
        const foundAddress = properties.get('text')
        setValue('shopes.address', foundAddress)
      })
    }
  }

  const resetFields = () => {
    reset({
      ...getValues(),
      shopes: {
        name: '',
        address: 'Россия, Москва',
        addressCoords: defaultCoords,
        phone: '',
        email: '',
        howToFindUs: ''
      }
    })
    setMarkCoord(defaultCoords)
    setMap({ ...map, center: defaultCoords })
  }

  return (
    <S.ShopesStep>
      <TextField name="shopes.name" label="Название" />

      <YMaps query={{ apikey: '2e897e10-0e8f-4974-841d-93edb806dc0d' }}>
        <TextField
          name="shopes.address"
          id="suggest"
          label="Адрес"
          defaultValue="Россия, Москва"
          InputLabelProps={
            getValues('shopes.address')
              ? {
                  shrink: Boolean(getValues('shopes.address'))
                }
              : undefined
          }
        />
        <TextField
          name="shopes.addressCoords"
          type="hidden"
          style={{ display: 'none' }}
          defaultValue={defaultCoords}
        />

        <S.Map>
          <Map
            state={map}
            width="100%"
            modules={['geocode', 'SuggestView']}
            onLoad={loadSuggest}
            defaultState={{ center: defaultCoords, zoom: 9 }}
            onClick={onMapClick}
          >
            {useMemo(
              () => (
                <Placemark
                  geometry={markCoords}
                  options={{
                    cursor: 'default',
                    iconLayout: 'default#image',
                    iconImageHref: markerImg.src,
                    iconImageSize: [48, 48]
                  }}
                />
              ),
              [markCoords]
            )}
          </Map>

          {isMapLoading && <Skeleton />}
        </S.Map>
      </YMaps>

      <PhoneField name="shopes.phone" />
      <EmailField name="shopes.email" />
      <TextField name="shopes.howToFindUs" label='Описание для покупателя "Как нас найти"' />

      <ImagesDropzone onChange={onShopImagesChange} />

      <S.ButtonsRow>
        <Button type="submit">Сохранить</Button>

        <Button variant="outlined" onClick={resetFields}>
          Добавить ещё магазин
        </Button>
      </S.ButtonsRow>
    </S.ShopesStep>
  )
}
