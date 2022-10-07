import { DashboardLayout } from 'src/components/dashboard';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import styled from 'styled-components';
import ArtisansProfileCard from 'src/components/artisan/ArtisansProfileCard';
import bookingsIcon from 'src/assets/images/metrics/bookingSummary.svg';
import BookingsTabs from 'src/components/bookings/BookingsTabs';
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import BookingStatus from 'src/components/bookings/BookingStatus';
import WalletContainer from 'src/components/artisan/WalletContainer';
import { formatDateDmy } from 'src/utils/helpers';
import { ArtisansServices } from 'src/service/ArtisansServices';
import { useEffect, useState } from 'react';
import { StyledProfileHeader } from 'src/components/admin/admin-style';
import { ScaleLoader } from 'react-spinners';
import { useLoading } from 'src/hooks';
import artisanBookingService from 'src/service/ArtisanBookings';
import { initialBookingState } from '../bookings/BookingDetails';

const StyledLoader = styled.div`
	border-radius: 16px;
	background: #ffffff;
	height: 300px;
	margin-top: 36px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

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
	const [artisanBookings, setArtisanBookings] = useState<BookingsTypes[]>([
		initialBookingState,
	]);
	const { id } = useParams();

	useEffect(() => {
		id &&
			artisanBookingService
				.bookingHistory(id)
				.then((res) => setArtisanBookings(res.data.payload.data))
				.catch((err: any) => console.error(err.response));
	}, [id]);

	const rows = RECENT_BOOKINGS_TABLE_DATA();
	const [walletBal, setWalletBal] = useState<WalletDataTypes>({
		balance: 0,
		transactions: [],
	});
	const [artisanDetails, setArtisanDetails] = useState<ArtisanProfileDetails>({
		_id: '',
		first_name: '',
		last_name: '',
		email: '',
		occupation: '',
		profile_stage: '',
		phone: '',
		status: '',
		display_picture: '',
		address: {
			house_address: '',
			city: '',
			state: '',
		},
	});
	const { loading, startLoading, stopLoading } = useLoading();
	const fetchMe = (id: string) => {
		startLoading();
		ArtisansServices.getArtisan(id)
			.then((res) => {
				// console.log(res.data.payload.data);
				setWalletBal(res?.data?.payload?.data?.wallet);
				setArtisanDetails(res?.data?.payload?.data?.artisan);
			})
			.catch((err) => console.log(err?.response?.data))
			.finally(() => stopLoading());
	};

	useEffect(() => {
		id && fetchMe(id);
	}, []);
	const BookingsTableHeaders = [
		{
			title: 'Artisan',
			render: (row: BookingsTypes) => (
				<Flex gap='10px' align='center'>
					<img
						style={{ width: '40px', height: 40, borderRadius: '50%' }}
						src={row.artisan_meta.display_picture}
						alt=''
					/>{' '}
					{row.artisan_meta.first_name} {row.artisan_meta.last_name}
				</Flex>
			),
		},
		{ title: 'Service', render: (row: BookingsTypes) => `${row.service}` },
		{
			title: 'Location',
			render: (row: BookingsTypes) =>
				`${row.artisan_meta.address.house_address}, ${row.artisan_meta.address.city}, ${row.artisan_meta.address.state}`,
		},
		{
			title: 'Date',
			render: (row: BookingsTypes) => formatDateDmy(row.updatedAt),
		},
		{
			title: 'Status',
			render: (row: BookingsTypes) => <BookingStatus status={row['status']} />,
		},
	];

	return (
		<DashboardLayout>
			<StyledProfileHeader>
				<h2>
					{artisanDetails.first_name} {artisanDetails.last_name}'s profile
				</h2>
				<Link to='/artisans'>
					<Button
						classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
						style={{ backgroundColor: theme.colors.purple }}
					>
						{' '}
						<img src={arrowLeft} alt='back' />
						<span>Back to Artisans</span>
					</Button>
				</Link>
			</StyledProfileHeader>
			{loading ? (
				<StyledLoader>
					<ScaleLoader color='#7E00C4' height={50} width={8} />
				</StyledLoader>
			) : (
				<ArtisansProfileCard artisanDetails={artisanDetails} />
			)}
			<StyledBookingSummary>
				<div className='booking_summary'>
					<div className='summary_details'>
						<h5>Total Bookings</h5> <h3>24</h3>
					</div>
					<img src={bookingsIcon} alt='' width={55} height='55px' />
				</div>
				<div className='wallet_summary'>
					<div className='summary_details'>
						<h5>Wallet Balance</h5> <h3> ₦{walletBal.balance}</h3>
					</div>
					<img src={bookingsIcon} alt='' width={55} height='55px' />
				</div>
			</StyledBookingSummary>
			<BookingsTabs
				rows={artisanBookings}
				BookingsTableHeaders={BookingsTableHeaders}
				title={<h1 className='title'>Bookings</h1>}
				onRowClick={() => navigate('/bookings/booking-details')}
			/>
			<WalletContainer />
		</DashboardLayout>
	);
};

export default ArtisansProfile;
