import React from 'react'
import styled from 'styled-components'
import { Flex, Table } from 'src/components/ui'
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants'

const RecentTransactionsTableContainer = styled.header`
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

const RecentTransactionsTableHeaders = [
  {
    title: 'Sender',
    render: (row: any) => (
      <Flex gap="10px" align="center">
        <img style={{ width: '40px' }} src={row.img} alt="" /> {row.artisan}
      </Flex>
    ),
  },
  { title: 'Amount', render: (row: any) => `${row.services}` },
  {
    title: 'Recipient',
    render: (row: any) => (
      <Flex gap="10px" align="center">
        <img style={{ width: '40px' }} src={row.img} alt="" /> {row.user}
      </Flex>
    ),
  },
  { title: 'Date', render: (row: any) => `${row.time}` },
  { title: 'Transaction', render: (row: any) => `${row.location}` },
  { title: 'Status', render: (row: any) => `${row.status}` },
]

export const RecentTransactionsTable = () => {
  return (
    <RecentTransactionsTableContainer>
      <div className="heading">
        <p className="title">Recent Transactions</p>
        <p className="info">Transactions in the last 24 hours</p>
      </div>
      <Table
        rows={RECENT_BOOKINGS_TABLE_DATA()}
        headers={RecentTransactionsTableHeaders}
        showHead={true}
      />
    </RecentTransactionsTableContainer>
  )
}

export default RecentTransactionsTable
