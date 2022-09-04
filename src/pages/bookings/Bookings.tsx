import styled from 'styled-components'
import { DashboardLayout } from 'src/components/dashboard'
import { BookingsTabs } from 'src/components/bookings'
import { Input } from 'src/components/inputs'
import searchIcon from 'src/assets/images/input/searchIcon.svg'
import React, { useState } from 'react'
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants'
import { Flex } from 'src/components/ui'
import { BookingStatus } from 'src/components/bookings'
import { useNavigate } from 'react-router-dom'

const BookingsPageContainer = styled.div``

interface Props {
  handleChange: (e: any) => void
}

export const RhsHeading: React.FC<Props> = ({ handleChange }) => (
  <Input
    icon={<img src={searchIcon} alt="searchIcon" />}
    type="search"
    placeholder="Search"
    handleChange={handleChange}
  />
)

const BookingsPage = () => {
  const navigate = useNavigate()

  const [searchField, setSearchField] = useState('')

  const filteredData = RECENT_BOOKINGS_TABLE_DATA().filter((data) => {
    return (
      data.user.toLowerCase().includes(searchField.toLowerCase()) ||
      data.services.toLowerCase().includes(searchField.toLowerCase()) ||
      data.location.toLowerCase().includes(searchField.toLowerCase()) ||
      data.artisan.toLowerCase().includes(searchField.toLowerCase())
    )
  })

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }

  const BookingsTableHeaders = [
    {
      title: 'Artisan',
      render: (row: any) => (
        <Flex gap="10px" align="center">
          <img style={{ width: '40px' }} src={row.img} alt="" /> {row.artisan}
        </Flex>
      ),
    },
    {
      title: 'User',
      render: (row: any) => (
        <Flex gap="10px" align="center">
          <img style={{ width: '40px' }} src={row.img} alt="" /> {row.user}
        </Flex>
      ),
    },
    { title: 'Service', render: (row: any) => `${row.services}` },
    { title: 'Location', render: (row: any) => `${row.location}` },
    { title: 'Date', render: (row: any) => `${row.time}` },
    {
      title: 'Status',
      render: (row: any) => <BookingStatus status={row['status']} />,
    },
  ]

  return (
    <DashboardLayout pageTitle="Bookings" rhsHeading={<RhsHeading handleChange={handleChange} />}>
      <BookingsPageContainer>
        <BookingsTabs
          rows={filteredData}
          BookingsTableHeaders={BookingsTableHeaders}
          title={<p className="count">{RECENT_BOOKINGS_TABLE_DATA().length} Bookings</p>}
          onRowClick={() => navigate('/bookings/booking-details')}
        />
      </BookingsPageContainer>
    </DashboardLayout>
  )
}

export default BookingsPage
