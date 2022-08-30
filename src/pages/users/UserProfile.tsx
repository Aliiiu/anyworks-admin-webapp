import styled from 'styled-components'
import { DashboardLayout } from 'src/components/dashboard'
import { ProfileInfo } from 'src/components/common'
import { BookingsTabs } from 'src/components/bookings'
import arrowRight from 'src/assets/images/common/arrowRight.svg'
import { theme } from 'src/styles/Theme'
import { Link } from 'react-router-dom'
import { Flex, Button, ButtonClass } from 'src/components/ui'
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants'
import { BookingStatus } from 'src/components/bookings'

const UserProfileContainer = styled.div``;

export const RhsHeading = () => (
	<Flex wrap='wrap'>
		<Link to='/users'>
			<Button
				classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
				style={{ backgroundColor: theme.colors.purple }}
			>
				{' '}
				<img src={arrowRight} alt='back' />
				<span>Back to Users</span>
			</Button>
		</Link>
	</Flex>
);

const UserProfile = () => {
  const rows = RECENT_BOOKINGS_TABLE_DATA()
  const BookingsTableHeaders = [
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

  return (
    <DashboardLayout pageTitle="Olajide Olajide’s Profile" rhsHeading={<RhsHeading />}>
      <UserProfileContainer>
        <ProfileInfo />
        <BookingsTabs rows={rows} BookingsTableHeaders={BookingsTableHeaders} title={ <h1 className="title">Bookings</h1>}/>
      </UserProfileContainer>
    </DashboardLayout>
  )
}

export default UserProfile;
