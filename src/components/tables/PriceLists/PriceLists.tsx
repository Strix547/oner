import { Column } from 'react-table'
import { useMemo } from 'react'
import Typography from '@mui/material/Typography'

import { Table, Skeleton } from 'ui'
import { CancelButton, DownloadButton } from 'common/buttons'

import { PriceList, PriceListStatus } from 'types/supplier'

import * as S from './PriceLists.styled'

type TableType = 'active' | 'messages-errors'

interface ActivePriceList {
  id: number
  uploadDate?: string
  publicationDate: string
  status: PriceListStatus
  moderatorComment: string
  actions: null
}

interface MessagesErrorsPriceList {
  id: number
  uploadDate?: string
  fileName: string
  status: null
  statusDescription?: string
  errorMessage?: string
  file: File | null
}

interface PriceListsTableProps {
  type: TableType
  priceLists?: PriceList[]
  isLoading?: boolean
  onPriceListCancel?: (id: number) => void
}

export const PriceListsTable = ({
  type,
  priceLists = [],
  isLoading,
  onPriceListCancel
}: PriceListsTableProps) => {
  const renderStatusBadge = (status: PriceListStatus) => {
    switch (status) {
      case 'published':
        return <S.Badge color="green">Опубликован</S.Badge>
      case 'outdated':
        return <S.Badge color="gray">Устарел</S.Badge>
      case 'canceled':
        return <S.Badge color="red">Отменён</S.Badge>
      case 'uploading':
        return <S.Badge color="orange">Загружается</S.Badge>
    }
  }

  const selectActivePriceListsProps = (priceLists: PriceList[]): ActivePriceList[] => {
    const activePriceLists = priceLists.filter(({ active }) => active)

    return activePriceLists.map((priceList) => {
      const { id, createdDateTime = '', uploadDateTime, status, moderatorComment = '' } = priceList

      return {
        id,
        publicationDate: createdDateTime,
        uploadDate: uploadDateTime,
        status,
        moderatorComment,
        actions: null
      }
    })
  }

  const selectMessagesErrorsPriceListsProps = (
    priceLists: PriceList[]
  ): MessagesErrorsPriceList[] => {
    return priceLists.map((priceList) => {
      const { id, uploadDateTime, errorMessage } = priceList

      // исправить, отсутствует file и fileName в запросе

      return {
        id,
        uploadDate: uploadDateTime,
        fileName: '',
        status: null,
        errorMessage,
        statusDescription: errorMessage,
        file: null
      }
    })
  }

  const activePriceListColumns: Column<ActivePriceList>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        Cell: ({ value: id }) => `№ ${id}`
      },
      {
        Header: 'Дата загрузки',
        accessor: 'uploadDate',
        Cell: ({ value: uploadDate }) => {
          return uploadDate ? new Date(uploadDate).toLocaleDateString() : '-'
        }
      },
      {
        Header: 'Дата публикации',
        accessor: 'publicationDate',
        Cell: ({ value: publicationDate }) => {
          return new Date(publicationDate).toLocaleDateString()
        }
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ value: status }) => renderStatusBadge(status)
      },
      {
        Header: 'Комментарии модератора',
        accessor: 'moderatorComment',
        Cell: ({ value: moderatorComment }) => {
          return moderatorComment ?? '-'
        }
      },
      {
        accessor: 'actions',
        Cell: ({ row }) => {
          const priceListId = row.original.id

          return (
            <CancelButton
              onClick={() => {
                if (onPriceListCancel) {
                  onPriceListCancel(priceListId)
                }
              }}
            >
              Отменить
            </CancelButton>
          )
        }
      }
    ],
    [onPriceListCancel]
  )

  const messagesErrorsPriceListColumns: Column<MessagesErrorsPriceList>[] = useMemo(
    () => [
      {
        Header: 'Дата загрузки',
        accessor: 'uploadDate',
        Cell: ({ value: uploadDate }) => {
          return uploadDate ? new Date(uploadDate).toLocaleDateString() : '-'
        }
      },
      {
        Header: 'Имя файла',
        accessor: 'fileName'
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ row }) => {
          const isError = row.original.errorMessage

          return isError ? (
            <S.Badge color="red">Ошибка</S.Badge>
          ) : (
            <S.Badge color="green">ОК</S.Badge>
          )
        }
      },
      {
        Header: 'Описание статуса',
        accessor: 'statusDescription',
        Cell: ({ value: statusDescription }) => {
          return statusDescription ?? '-'
        }
      },
      {
        Header: 'Скачать отчёт',
        accessor: 'file',
        Cell: ({ value: file }) => {
          // добавить
          return <DownloadButton onClick={() => {}} />
        }
      }
    ],
    []
  )

  const activePriceListCards = priceLists.length ? (
    selectActivePriceListsProps(priceLists).map((priceList) => {
      const { id, publicationDate, uploadDate, status, moderatorComment } = priceList

      return (
        <S.TableCard key={id}>
          <S.TableCardContent>
            <CancelButton
              onClick={() => {
                if (onPriceListCancel) {
                  onPriceListCancel(id)
                }
              }}
            />

            <S.TableCardRows>
              <Typography>ID</Typography>
              <Typography>№ {id}</Typography>

              <Typography>Дата загрузки</Typography>
              <Typography>
                {uploadDate ? new Date(uploadDate).toLocaleDateString() : '-'}
              </Typography>

              <Typography>Дата публикации</Typography>
              <Typography>{new Date(publicationDate).toLocaleDateString()}</Typography>

              <Typography>Статус</Typography>
              {renderStatusBadge(status)}

              <Typography>Комментарии модератора</Typography>
              <Typography>{moderatorComment ?? '-'}</Typography>
            </S.TableCardRows>
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  const messagesErrorsPriceListCards = priceLists.length ? (
    selectMessagesErrorsPriceListsProps(priceLists).map((priceList) => {
      const { id, uploadDate, fileName, statusDescription, errorMessage } = priceList
      return (
        <S.TableCard key={id}>
          <S.TableCardContent>
            <S.TableCardRows>
              <Typography>Дата загрузки</Typography>
              <Typography>
                {uploadDate ? new Date(uploadDate).toLocaleDateString() : '-'}
              </Typography>

              <Typography>Имя файла</Typography>
              <Typography>{fileName}</Typography>

              <Typography>Статус</Typography>
              {Boolean(errorMessage) ? (
                <S.Badge color="red">Ошибка</S.Badge>
              ) : (
                <S.Badge color="green">ОК</S.Badge>
              )}

              <Typography>Описание статуса</Typography>
              <Typography>{statusDescription ?? '-'}</Typography>
            </S.TableCardRows>

            <S.TableCardActions>
              <DownloadButton onClick={() => {}} />
            </S.TableCardActions>
          </S.TableCardContent>
        </S.TableCard>
      )
    })
  ) : (
    <S.NoDataText>Данные отсутствуют</S.NoDataText>
  )

  return type === 'active' ? (
    <S.ActivePriceListsTable>
      <Table
        headGray
        isLoading={isLoading}
        data={selectActivePriceListsProps(priceLists)}
        columns={activePriceListColumns}
      />

      <S.TableCardsList>
        {!isLoading ? activePriceListCards : <Skeleton count={3} height={220} />}
      </S.TableCardsList>
    </S.ActivePriceListsTable>
  ) : (
    <S.MessagesErrorsPriceListTable>
      <Table
        isLoading={isLoading}
        data={selectMessagesErrorsPriceListsProps(priceLists)}
        columns={messagesErrorsPriceListColumns}
      />

      <S.TableCardsList>
        {!isLoading ? messagesErrorsPriceListCards : <Skeleton count={3} height={220} />}
      </S.TableCardsList>
    </S.MessagesErrorsPriceListTable>
  )
}
