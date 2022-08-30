import styled from 'styled-components';
import { DashboardLayout } from 'src/components/dashboard';
import { Bookings } from 'src/components/users';
import { ProfileInfo } from 'src/components/common';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import arrowRight from 'src/assets/images/common/arrowRight.svg';
import { theme } from 'src/styles/Theme';
import { Link } from 'react-router-dom';

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

const UserProfile = () => (
	<DashboardLayout
		pageTitle='Olajide Olajide’s Profile'
		rhsHeading={<RhsHeading />}
	>
		<UserProfileContainer>
			<ProfileInfo />
			<Bookings />
		</UserProfileContainer>
	</DashboardLayout>
);

export default UserProfile;
