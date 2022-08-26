import styled from 'styled-components'
import { DashboardLayout, MetricsCard } from 'src/components/dashboard'
import user from 'src/assets/images/metrics/user.svg'
import artisan from 'src/assets/images/metrics/artisan.svg'
import wallet from 'src/assets/images/metrics/wallet.svg'
import kyc from 'src/assets/images/metrics/kyc.svg'
import booking from 'src/assets/images/metrics/booking.svg'
import { Flex } from 'src/components/ui'

const DashboardContainer = styled.div`
.metrics__cards{
    margin: 2rem 0;
}`

const metrics = [
  {
    count: '243',
    key: 'Total Users',
    img: user 
  },
  {
    count: '243',
    key: 'Total Artisans',
    img: artisan 
  },
  {
    count: '100000',
    key: 'Total Wallet ',
    img: wallet 
  },
  {
    count: '243',
    key: 'Pending KYC ',
    img: kyc 
  },
  {
    count: '43',
    key: 'Active Booking ',
    img: booking 
  },
]
const Dashboard = () => (
  <DashboardLayout pageTitle="Dashboard">
    <DashboardContainer>
     <div className="metrics__cards">
     <Flex wrap='wrap' gap='1.5rem'>
     {metrics.map((metric) => {
        return(<MetricsCard metric={metric} />)
      })}
     </Flex>
     </div>
    </DashboardContainer>
  </DashboardLayout>
)

export default Dashboard
