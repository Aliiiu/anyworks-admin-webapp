import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Flex, Table } from 'src/components/ui'
import { usePagination } from 'src/hooks/usePagination'
// import { formatDate } from 'src/utils/helpers'
// import { DateRangeFilter } from 'src/components/common'
// import { FilterButton } from 'src/styles/commonStyle'
// import filterIcon from 'src/assets/images/common/filter.svg'
// import { addDays } from 'date-fns'
// import { theme } from 'src/styles/Theme'
// import { useState } from 'react'
import avatar from 'src/assets/images/header/avatar.svg'

const KycTableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  padding-bottom: 20px;
  margin: 3rem 0;

  .heading {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
    padding: 20px;

    .count {
      font-weight: 700;
      font-size: 17px;
      line-height: 27px;
      color: ${(props) => props.theme.colors.purple};
      background-color: ${(props) => props.theme.colors.gray_04};
      padding: 4px 12px;
      width: max-content;
      border-radius: 16px;
    }
  }
`
interface Props {
  rows: any
}

export const KycTable = ({ rows }: Props) => {
  const navigate = useNavigate()

  const KycTableHeaders = [
    {
      title: 'Picture',
      render: (row: any) => (
          <div
            style={{
              backgroundImage: `url(${row?.display_picture || avatar})`,
              width: '40px',
              height: '40px',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'contain',
              boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
              borderRadius: '50%',
            }}
          ></div>
      
      ),
    },
    {
      title: 'First Name',
      render: (row: any) => `${row.first_name}`,
    },
    {
      title: 'Last Name',
      render: (row: any) => `${row.last_name}`,
    },

    {
      title: 'Gender',
      render: (row: any) => `${row.gender}`,
    },

    {
      title: 'Occupation',
      render: (row: any) => `${row.occupation}`,
    },
    {
      title: 'Email',
      render: (row: any) => `${row.email}`,
    },
  ]

  //Date filter
  // const [openDateFilter, setOpenDateFilter] = useState(false)
  // const handleOpenDateFilter = () => setOpenDateFilter(true)
  // const handleCloseDateFilter = () => setOpenDateFilter(false)

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date('2020-01-01'),
  //     endDate: addDays(new Date(), 8),
  //     key: 'selection',
  //     color: theme.colors.darkPurple,
  //   },
  // ])

  // const startDate = state[0]?.startDate
  // const endDate = state[0]?.endDate

  // const dateFilteredData = rows.filter((a: any) => {
  //   const date = new Date(a.date)
  //   return date >= new Date(startDate) && date <= new Date(endDate)
  // })

  const { page, limit, Pagination } = usePagination({
    page: 1,
    limit: 4,
    total: rows.length,
  })
  const paginatedRows = rows.slice((page - 1) * limit, page * limit)

  return (
    <KycTableContainer>
      {/* <DateRangeFilter
        open={openDateFilter}
        handleClose={handleCloseDateFilter}
        state={state}
        setState={setState}
      /> */}
      <div className="heading">
        <Flex justify="space-between" align="center">
          <p className="count">{rows.length} Pending Kyc</p>
          {/* <FilterButton onClick={handleOpenDateFilter} disabled={paginatedRows.length === 0}>
            <img src={filterIcon} alt="" width={24} height="24px" />
            Filter
          </FilterButton> */}
        </Flex>
      </div>
      <Table
        rows={paginatedRows}
        headers={KycTableHeaders}
        showHead={true}
        onRowClick={(index) => {
          navigate(`/kyc/${index}`)
        }}
      />
      <Pagination />
    </KycTableContainer>
  )
}

export default KycTable
