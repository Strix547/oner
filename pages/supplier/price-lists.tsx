import { useMutation, useQuery, useQueryClient } from 'react-query'
import Head from 'next/head'
import { toast } from 'react-toastify'
import { useState } from 'react'
import Typography from '@mui/material/Typography'

import { AccountPageTitle, PriceListDropzone } from 'components'
import { PriceListsTable } from 'components/tables'
import { Tabs, TabPanel, Button } from 'ui'
import { Pagination } from 'components/common'

import { supplierAPI } from 'api'

import * as S from 'styled/pages/supplier/PriceLists'

type TabValue = 'active' | 'checking-uploading' | 'messages-errors' | 'api'

interface Tab {
  label: string
  value: TabValue
}

const SupplierPriceListsPage = () => {
  const queryClient = useQueryClient()

  const [priceListsPage, setPriceListsPage] = useState(1)
  const [tab, setTab] = useState<TabValue>('active')
  const [uploadedPriceList, setUploadedPriceList] = useState<File | null>(null)

  const { data: priceLists, isLoading: isPriceListsLoading } = useQuery(
    ['price-lists', priceListsPage],
    () => supplierAPI.getPriceLists(priceListsPage)
  )

  const cancelPriceList = useMutation(supplierAPI.cancelPriceList, {
    onError: () => {
      toast.error('Ошибка отмены прайс-листа')
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['price-lists', priceListsPage])
      toast.success('Прайс-лист успешно отменён')
    }
  })

  const uploadPriceList = () => {}

  const tabs: Tab[] = [
    { label: 'Активные прайс-листы', value: 'active' },
    { label: 'Проверка и загрузка', value: 'checking-uploading' },
    { label: 'Сообщения и ошибки', value: 'messages-errors' },
    { label: 'API', value: 'api' }
  ]

  const priceListsData = priceLists ? priceLists.results : []

  return (
    <>
      <Head>
        <title>Мои прайс-листы</title>
      </Head>

      <AccountPageTitle>Мои прайс-листы</AccountPageTitle>

      <S.SupplierPriceListsPage>
        <Tabs activeTab={tab} tabs={tabs} onTabChange={setTab}>
          <TabPanel value="active">
            <PriceListsTable
              type="active"
              priceLists={priceListsData}
              isLoading={isPriceListsLoading}
              onPriceListCancel={cancelPriceList.mutate}
            />

            <Pagination
              page={priceListsPage}
              itemsCount={priceLists?.count}
              onChange={setPriceListsPage}
            />
          </TabPanel>

          <TabPanel value="checking-uploading">
            <S.PriceListUploadBox>
              <S.PriceListUploadContent>
                <Typography variant="h4" component="p" fontWeight={600}>
                  Загрузка прайс-листа
                </Typography>

                <Typography>Загрузите прайс-лист поставщика в формате csv и xls</Typography>

                <PriceListDropzone
                  priceListFile={uploadedPriceList}
                  onChange={setUploadedPriceList}
                />

                <Button fullWidth onClick={uploadPriceList}>
                  Загрузить прайс-лист
                </Button>
              </S.PriceListUploadContent>
            </S.PriceListUploadBox>
          </TabPanel>

          <TabPanel value="messages-errors">
            <PriceListsTable
              type="messages-errors"
              priceLists={priceListsData}
              isLoading={isPriceListsLoading}
            />

            <Pagination
              page={priceListsPage}
              itemsCount={priceLists?.count}
              onChange={setPriceListsPage}
            />
          </TabPanel>

          <TabPanel value="api">
            <S.ApiBox>
              <Typography variant="body2">
                Раздел, описывающий архитектуру обмена данными по прайс-листам в формате WEBSOCKET
                для того, чтобы исключить возможность постоянной загрузки прайс-листов в формате
                csv/xls. В случае использования API Сайта изменения по продукции присылаются
                внутренними системами поставщиков “на лету”. Т.е. изменяется не целый список данных
                по продукции, а от одной до множества количества тысяч позиций по продукции.
              </Typography>

              <Typography variant="body2">
                При подключении к WEBSOCKET система отправляет 2 ключа - KEY и TOKEN для
                синхронизации. Далее поставщик производит интеграцию API в тестовой зоне. После
                этого ответственный менеджер проверяет интеграцию и если она совершена успешно -
                разрешает обмен данными по продукции в обход загрузки прайс листов.
              </Typography>
            </S.ApiBox>
          </TabPanel>
        </Tabs>
      </S.SupplierPriceListsPage>
    </>
  )
}

export default SupplierPriceListsPage
