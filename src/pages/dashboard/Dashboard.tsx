import styled from 'styled-components'
import {
  DashboardLayout,
  MetricsCard,
  RecentBookingsTable,
  RecentTransactionsTable,
} from 'src/components/dashboard'
import user from 'src/assets/images/metrics/user.svg'
import artisan from 'src/assets/images/metrics/artisan.svg'
import wallet from 'src/assets/images/metrics/wallet.svg'
import kyc from 'src/assets/images/metrics/kyc.svg'
import booking from 'src/assets/images/metrics/booking.svg'
import { Flex } from 'src/components/ui'
import { theme } from 'src/styles/Theme'

const DashboardContainer = styled.div`
  .metrics__cards {
    margin: 2rem 0;
  }
`

const metrics = [
  {
    count: '243',
    key: 'Total Users',
    img: user,
    color: theme.colors.purple,
    href: '/users',
  },
  {
    count: '345',
    key: 'Total Artisans',
    img: artisan,
    color: theme.colors.blue,
    href: '/artisans',
  },
  {
    count: '100,000',
    key: 'Total Wallet ',
    img: wallet,
    color: theme.colors.cyan,
    href: '#',
  },
  {
    count: '78',
    key: 'Pending KYC ',
    img: kyc,
    color: theme.colors.mustard,
    href: '/kyc',
  },
  {
    count: '43',
    key: 'Active Booking ',
    img: booking,
    color: theme.colors.darkPurple,
    href: '/bookings',
  },
]

const Dashboard = () => (
  <DashboardLayout pageTitle="Dashboard">
    <DashboardContainer>
      <div className="metrics__cards">
        <Flex wrap="wrap" gap="1.5rem">
          {metrics.map((metric) => {
            return <MetricsCard key={metric.key} metric={metric} href={metric.href} />
          })}
        </Flex>
      </div>
      <RecentBookingsTable />
      <RecentTransactionsTable />
    </DashboardContainer>
  </DashboardLayout>
)

export default Dashboard
