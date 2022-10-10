import styled from 'styled-components';
import { DashboardLayout } from 'src/components/dashboard';
import { ProfileInfo } from 'src/components/common';
import { BookingsTabs } from 'src/components/bookings';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import { Link, useParams } from 'react-router-dom';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import { BookingStatus } from 'src/components/bookings';
import { useNavigate } from 'react-router-dom';
import { formatDateDmy } from 'src/utils/helpers';
import { useLoading } from 'src/hooks';
import userServices from 'src/service/userServices';
import { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import bookingAdminService from 'src/service/BookingAdmin';
import { initialBookingState } from '../bookings/BookingDetails';
import { toast, ToastContainer } from 'react-toastify';

const UserProfileContainer = styled.div`
	.loader-container {
		border-radius: 16px;
		background: #ffffff;
		height: 300px;
		margin-top: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const RhsHeading = () => (
	<Flex wrap='wrap'>
		<Link to='/users'>
			<Button
				classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
				style={{ backgroundColor: theme.colors.purple }}
			>
				{' '}
				<img src={arrowLeft} alt='back' />
				<span>Back to Users</span>
			</Button>
		</Link>
	</Flex>
);

const initialUserDetails: UsersDetailsType = {
	address: {
		city: '',
		house_address: '',
		state: '',
	},
	createdAt: '',
	display_picture: '',
	dob: '',
	email: '',
	first_name: '',
	gender: '',
	last_name: '',
	phone: '',
	rating: 0,
	suspended: false,
	updatedAt: '',
	uuid: '',
	verified: false,
	_id: '',
};

const UserProfile = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [userDetails, setUserDetails] =
		useState<UsersDetailsType>(initialUserDetails);
	const { loading, startLoading, stopLoading } = useLoading();
	const [userBookings, setUserBookings] = useState<BookingsTypes[]>([
		initialBookingState,
	]);
	const getUser = (id: string) => {
		startLoading();
		userServices
			.getUser(id)
			.then((res: any) => {
				setUserDetails(res.data.payload.data);
				// res.data.payload.data && setAdminEntry(res.data.payload.data);
			})
			.catch((err: any) => {
				console.log(err?.response?.data?.error?.message);
				toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => stopLoading());
	};
	useEffect(() => {
		id && getUser(id);
	}, []);

	useEffect(() => {
		id &&
			bookingAdminService
				.userBookingHistory(id)
				.then((res) => setUserBookings(res?.data?.payload?.data))
				.catch((err) => console.error(err.response));
	}, [id]);

	const handleNavigate = (booking_id: string) => {
		navigate(`/bookings/${booking_id}`);
	};
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
				`${row.artisan_meta.address.house_address} ${row.artisan_meta.address.city} ${row.artisan_meta.address.state}`,
		},
		{
			title: 'Date',
			render: (row: BookingsTypes) => formatDateDmy(row.createdAt),
		},
		{
			title: 'Status',
			render: (row: BookingsTypes) => <BookingStatus status={row['status']} />,
		},
	];

	return (
		<DashboardLayout
			pageTitle={
				userDetails.first_name &&
				`${userDetails.first_name} ${userDetails.last_name}’s Profile`
			}
			rhsHeading={<RhsHeading />}
		>
			<ToastContainer />
			<UserProfileContainer>
				{loading ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<ProfileInfo userDetails={userDetails} />
				)}
				<BookingsTabs
					rows={userBookings}
					BookingsTableHeaders={BookingsTableHeaders}
					title={<h1 className='title'>Bookings</h1>}
					onRowClick={handleNavigate}
				/>
			</UserProfileContainer>
		</DashboardLayout>
	);
};

export default UserProfile;
