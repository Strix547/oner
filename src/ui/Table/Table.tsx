import { useTable, Column, useSortBy } from 'react-table'

import { Skeleton } from 'ui'

import * as S from './Table.styled'

import SortIcon from 'public/icons/sort.svg'

interface TableProps {
  headGray?: boolean
  columns: Column<any>[]
  data: any[]
  isLoading?: boolean
  noDataText?: string
}

export const Table = ({
  headGray = false,
  columns,
  data,
  isLoading,
  noDataText = 'Данные отсутствуют'
}: TableProps) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data
    },
    useSortBy
  )

  return (
    <S.Table {...getTableProps()} shrink={headGray}>
      <S.TableHead gray={headGray}>
        {headerGroups.map((headerGroup) => (
          <S.TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return (
                <S.TableHeadCell
                  // @ts-ignore
                  {...column.getHeaderProps(column.sortable ? column.getSortByToggleProps() : {})}
                >
                  <S.HeadCellText>
                    {column.render('Header')}

                    <S.SortIcon>
                      {/* @ts-ignore */}
                      {column.isSorted ? (
                        // @ts-ignore
                        column.isSortedDesc ? (
                          <S.SortDesc>
                            <SortIcon />
                          </S.SortDesc>
                        ) : (
                          <S.SortAsc>
                            <SortIcon />
                          </S.SortAsc>
                        )
                      ) : (
                        ''
                      )}
                    </S.SortIcon>
                  </S.HeadCellText>
                </S.TableHeadCell>
              )
            })}
          </S.TableRow>
        ))}
      </S.TableHead>

      {!isLoading ? (
        <S.TableBody {...getTableBodyProps()}>
          {data && data?.length ? (
            rows.map((row) => {
              prepareRow(row)

              return (
                <S.TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <S.TableCell {...cell.getCellProps()}>{cell.render('Cell')}</S.TableCell>
                  })}
                </S.TableRow>
              )
            })
          ) : (
            <S.NoDataText>{noDataText}</S.NoDataText>
          )}{' '}
        </S.TableBody>
      ) : (
        <Skeleton height={200} />
      )}
    </S.Table>
  )
}
