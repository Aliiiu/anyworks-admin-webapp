import { usePagination } from 'src/hooks/usePagination'
import { useState } from 'react'
import { Flex, Table } from 'src/components/ui'
import filterIcon from 'src/assets/images/common/filter.svg'
import { FilterButton } from 'src/styles/commonStyle'
import styled from 'styled-components'
import { WALLETData } from 'src/constants/WALLETDATA'
import { formatDate } from 'src/utils/helpers'
import { DateRangeFilter } from 'src/components/common'
import { addDays } from 'date-fns'
import { theme } from 'src/styles/Theme'

const WalletTableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 3rem 0;
  border-radius: 16px;
  padding-bottom: 20px;
  .heading {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
    padding: 20px;

    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
      color: ${(props) => props.theme.colors.text_01};
    }
  }
`

const WalletTable = () => {
  const WalletTableHeaders = [
    {
      title: 'Date',
      render: (row: any) => formatDate(row.date),
    },
    {
      title: 'Type',
      render: (row: any) => `${row.type}`,
    },
    {
      title: 'Amount',
      render: (row: any) => `${row.amount}`,
    },
    {
      title: 'Remarks/narration',
      render: (row: any) => `${row.remarks}`,
    },
  ]

  //Date filter
  const [openDateFilter, setOpenDateFilter] = useState(false)
  const handleOpenDateFilter = () => setOpenDateFilter(true)
  const handleCloseDateFilter = () => setOpenDateFilter(false)

  const [state, setState] = useState([
    {
      startDate: new Date('2020-01-01'),
      endDate: addDays(new Date(), 0),
      key: 'selection',
      color: theme.colors.darkPurple,
    },
  ])

  const startDate = state[0]?.startDate
  const endDate = state[0]?.endDate

  const dateFilteredData = WALLETData.filter((a: any) => {
    const date = new Date(a.date)
    return date >= startDate && date <= endDate
  })

  const { page, limit, Pagination } = usePagination({
    page: 1,
    limit: 4,
    total: dateFilteredData.length,
  })
  const paginatedRows = dateFilteredData.slice((page - 1) * limit, page * limit)

  return (
    <WalletTableContainer>
      <DateRangeFilter
        open={openDateFilter}
        handleClose={handleCloseDateFilter}
        state={state}
        setState={setState}
      />
      <div className="heading">
        <Flex justify="space-between" align="center">
          <p className="title"> Wallet Transactions</p>
          <FilterButton onClick={handleOpenDateFilter}>
            <img src={filterIcon} alt="" width={24} height="24px" />
            Filter
          </FilterButton>
        </Flex>
      </div>

      <Table rows={paginatedRows} headers={WalletTableHeaders} showHead allowRowClick={false} />
      <Pagination />
    </WalletTableContainer>
  )
}

export default WalletTable
