import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useState } from 'react'

import { PageTitle } from 'components'
import { SparePartsCategories, SparePartsUnits } from 'components/cars'
import { Tabs, TabPanel } from 'ui'

import { catalogsAPI } from 'api'

import * as S from 'styled/pages/catalogs/OriginalSparePartsCategories'

const OriginalSparePartsCategoriesPage = () => {
  const router = useRouter()

  const catalog = router.query.catalog as string
  const vehicleId = router.query.vehicleId as string
  const ssd = router.query.ssd as string
  const modelName = router.query.modelName as string

  const [activeTab, setActiveTab] = useState('categories')

  const tabs = [
    { label: 'По группам', value: 'categories' },
    { label: 'По списку узлов', value: 'units' }
  ]

  const { data: categoryGroups, isLoading: isCategoriesLoading } = useQuery(
    ['categories', catalog, vehicleId, ssd],
    () => catalogsAPI.getSparePartsCategories({ catalog, vehicleId, ssd }),
    {
      enabled: Boolean(catalog) && Boolean(vehicleId) && Boolean(ssd)
    }
  )

  const { data: sparePartsUnits, isLoading: isSparePartsUnitsLoading } = useQuery(
    ['units', catalog, vehicleId, ssd],
    () => catalogsAPI.getSparePartsUnits({ catalog, vehicleId, ssd }),
    {
      enabled: Boolean(catalog) && Boolean(vehicleId) && Boolean(ssd)
    }
  )

  return (
    <>
      <Head>
        <title>{modelName}</title>
      </Head>

      <S.OriginalSparePartsCategoriesPage>
        <PageTitle>{modelName}</PageTitle>

        <Tabs activeTab={activeTab as string} tabs={tabs} onTabChange={setActiveTab}>
          <TabPanel value="categories">
            <SparePartsCategories categoryGroups={categoryGroups} isLoading={isCategoriesLoading} />
          </TabPanel>

          <TabPanel value="units">
            <SparePartsUnits units={sparePartsUnits} isLoading={isSparePartsUnitsLoading} />
          </TabPanel>
        </Tabs>
      </S.OriginalSparePartsCategoriesPage>
    </>
  )
}

export default OriginalSparePartsCategoriesPage
