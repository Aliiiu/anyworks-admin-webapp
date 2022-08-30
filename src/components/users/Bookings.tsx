import { useState } from 'react'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import styled from 'styled-components'
import { usePagination } from 'src/hooks'
import { Flex, Table } from 'src/components/ui'
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants'
import { BookingStatus } from 'src/components/users'

const BookingsContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 3rem 0;
  border-radius: 16px;
  padding: 20px 0;

  .title {
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;
    color: ${(props) => props.theme.colors.text_01};
    margin-bottom: 1rem;
    padding: 0 20px;
  }

  .MuiTabs-root {
    min-height: auto;
    padding: 0 20px;
  }

  .MuiTabs-scroller {
    border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
  }
  .MuiButtonBase-root {
    border: none;
    cursor: pointer;
    font-size: 15px;
    background-color: transparent;
    text-transform: capitalize;
    color: ${(props) => props.theme.colors.text_01};
    height: fit-content;
    min-height: auto;
    padding: 10px;
    width: 110px;

    &:hover {
      color: ${(props) => props.theme.colors.text_02};
    }
  }
  .MuiTabs-root .Mui-selected {
    color: ${(props) => props.theme.colors.text_01};
  }
  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.colors.text_01};
    height: 3px;
  }
  .MuiTabPanel-root {
    padding: 0;
  }
  .pd-20 {
    padding: 20px 0 0 20px;
  }
`
export const Bookings = () => {
  const UsersTableHeaders = [
    {
      title: 'Artisan',
      render: (row: any) => (
        <Flex gap="10px" align="center">
          <img style={{ width: '40px' }} src={row.img} alt="" /> {row.artisan}
        </Flex>
      ),
    },
    { title: 'Service', render: (row: any) => `${row.services}` },
    { title: 'Location', render: (row: any) => `${row.location}` },
    { title: 'Date', render: (row: any) => `${row.time}` },
    { title: 'Status', render: (row: any) => <BookingStatus status={row['status']} /> },
  ]

  const rows = RECENT_BOOKINGS_TABLE_DATA()
  const [value, setValue] = useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const { page, limit, Pagination } = usePagination({
    page: 1,
    limit: 2,
    total: rows.length,
  })
  const paginatedRows = rows.slice((page - 1) * limit, page * limit)

  return (
    <BookingsContainer>
      <h1 className="title">Bookings</h1>
      <>
        <TabContext value={value}>
          <div>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="All" value="1" />
              <Tab label="Active" value="2" />
              <Tab label="Completed" value="3" />
              <Tab label="Canceled" value="4" />
            </TabList>
          </div>
          <div>
            <TabPanel value="1">
              {' '}
              <Table rows={paginatedRows} headers={UsersTableHeaders} showHead={true} />
              <Pagination />
            </TabPanel>
            <TabPanel value="2">
              {' '}
              <p className="pd-20">Active Bookings</p>
            </TabPanel>
            <TabPanel value="3">
              {' '}
              <p className="pd-20">Completed Bookings</p>
            </TabPanel>
            <TabPanel value="4">
              {' '}
              <p className="pd-20">Canceled Bookings</p>
            </TabPanel>
          </div>
        </TabContext>
      </>
    </BookingsContainer>
  )
}

export default Bookings
