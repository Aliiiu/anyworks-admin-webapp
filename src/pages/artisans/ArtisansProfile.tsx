import returnIcon from 'src/assets/images/common/returnIcon.svg';
import { DashboardLayout } from 'src/components/dashboard';
import { StyledProfileHeader } from '../admin/AdminProfile';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import ArtisansProfileCard from 'src/components/artisan/ArtisansProfileCard';
import bookingsIcon from 'src/assets/images/metrics/bookingSummary.svg';
import BookingsTabs from 'src/components/bookings/BookingsTabs';
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants';
import Flex from 'src/components/ui/Flex';
import BookingStatus from 'src/components/bookings/BookingStatus';
import WalletContainer from 'src/components/artisan/WalletContainer';

const StyledBookingSummary = styled.div`
	margin: 32px 0px;
	display: flex;
	gap: 36px;
	.booking_summary,
	.wallet_summary {
		background: #ffffff;
		border-radius: 16px;
		padding: 24px 24px 33px 41px;
		display: flex;
		gap: 28px;
		.summary_details {
			display: flex;
			flex-direction: column;
			gap: 12px;
			h5 {
				font-size: 16px;
				font-weight: 500;
			}
			h3 {
				font-size: 36px;
			}
		}
	}
`;

const ArtisansProfile = () => {
	let navigate = useNavigate();

	const rows = RECENT_BOOKINGS_TABLE_DATA();
	const BookingsTableHeaders = [
		{
			title: 'Artisan',
			render: (row: any) => (
				<Flex gap='10px' align='center'>
					<img style={{ width: '40px' }} src={row.img} alt='' /> {row.artisan}
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
	];

	return (
		<DashboardLayout>
			<StyledProfileHeader>
				<h2>Olajide Olajide's profile</h2>
				<button onClick={() => navigate('/artisans')} className='add_admin_btn'>
					<img src={returnIcon} alt='' width={24} height='24px' /> Add new admin
				</button>
			</StyledProfileHeader>
			<ArtisansProfileCard />
			<StyledBookingSummary>
				<div className='booking_summary'>
					<div className='summary_details'>
						<h5>Total Bookings</h5> <h3>24</h3>
					</div>
					<img src={bookingsIcon} alt='' width={55} height='55px' />
				</div>
				<div className='wallet_summary'>
					<div className='summary_details'>
						<h5>Wallet Balance</h5> <h3>N34,0000</h3>
					</div>
					<img src={bookingsIcon} alt='' width={55} height='55px' />
				</div>
			</StyledBookingSummary>
			<BookingsTabs
				rows={rows}
				BookingsTableHeaders={BookingsTableHeaders}
				title={<h1 className='title'>Bookings</h1>}
			/>
			<WalletContainer />
		</DashboardLayout>
	);
};

export default ArtisansProfile;