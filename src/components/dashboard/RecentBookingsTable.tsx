import styled from 'styled-components'
import { Flex, Table } from 'src/components/ui'
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants'
import { useNavigate } from 'react-router-dom'

const RecentBookingsTableContainer = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  margin: 3rem 0;
  border-radius: 16px;
  padding: 20px 0;
  .heading {
    color: ${(props) => props.theme.colors.text_01};
    padding: 0 20px;

    .title {
      font-weight: 600;
      font-size: 22px;
      line-height: 32px;
    }
    .info {
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
    }
  }
`

const RecentBookingsTableHeaders = [
  {
    title: 'Artisan',
    render: (row: any) => (
      <Flex gap="10px" align="center">
        <img style={{ width: '40px' }} src={row.img} alt="" /> {row.artisan}
      </Flex>
    ),
  },
  { title: 'Services', render: (row: any) => `${row.services}` },
  {
    title: 'User',
    render: (row: any) => (
      <Flex gap="10px" align="center">
        <img style={{ width: '40px' }} src={row.img} alt="" /> {row.user}
      </Flex>
    ),
  },
  { title: 'Time', render: (row: any) => `${row.time}` },
  { title: 'Location', render: (row: any) => `${row.location}` },
  { title: 'Status', render: (row: any) => `${row.status}` },
]

export const RecentBookingsTable = () => {
  const navigate = useNavigate()

  return (
    <RecentBookingsTableContainer>
      <div className="heading">
        <p className="title">Recent Bookings</p>
        <p className="info">Bookings in the last 24 hours</p>
      </div>
      <Table
        rows={RECENT_BOOKINGS_TABLE_DATA()}
        headers={RecentBookingsTableHeaders}
        showHead={true}
        onRowClick={() => navigate('/bookings/booking-details')}
      />
    </RecentBookingsTableContainer>
  )
}

export default RecentBookingsTable
