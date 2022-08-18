import { useMemo } from 'react'
import Link from 'next/link'
import { Column } from 'react-table'
import Typography from '@mui/material/Typography'

import { TableCardsList } from 'components'
import { Table } from 'ui'
import { DownloadButton } from 'common/buttons'

import * as S from './Accounting.styled'

import DocumentIcon from 'public/icons/document.svg'

interface AccountingItem {
  id: number
  name: string
  size: string
  file: string
}

interface AccountingTableProps {
  accounting?: AccountingItem[]
}

export const AccountingTable = ({ accounting = [] }: AccountingTableProps) => {
  const columns: Column<AccountingItem>[] = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'name',
        Cell: ({ row }) => {
          const { id, name } = row.original

          return (
            <Link href={`${id}`} passHref>
              <S.Link>
                <DocumentIcon /> <span>{name}</span>
              </S.Link>
            </Link>
          )
        }
      },
      {
        Header: 'Размер файла',
        accessor: 'size'
      },
      {
        Header: 'Скачать',
        accessor: 'id',
        Cell: ({ value: id, row }) => {
          const { file } = row.original

          return <DownloadButton onClick={() => {}} />
        }
      }
    ],
    []
  )

  const tableCards = accounting.map((item) => {
    const { id, name, file, size } = item

    return (
      <S.TableCard key={id}>
        <S.TableCardTop>
          <Link href={`${id}`} passHref>
            <S.Link>
              <DocumentIcon /> <span>{name}</span>
            </S.Link>
          </Link>
        </S.TableCardTop>

        <S.TableCardContent>
          <S.TableCardRows>
            <Typography>Размер файла</Typography>
            <Typography>{size}</Typography>
          </S.TableCardRows>

          <S.TableCardActions>
            <DownloadButton onClick={() => {}} />
          </S.TableCardActions>
        </S.TableCardContent>
      </S.TableCard>
    )
  })

  return (
    <S.AccountingTable>
      <Table columns={columns} data={accounting} noDataText="Документы отсутствуют" />

      <TableCardsList cards={tableCards} noDataText="Документы отсутствуют" />
    </S.AccountingTable>
  )
}
