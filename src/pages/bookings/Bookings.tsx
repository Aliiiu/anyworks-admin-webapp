import styled from 'styled-components';
import { DashboardLayout } from 'src/components/dashboard';
import { BookingsTabs } from 'src/components/bookings';
import { Input } from 'src/components/inputs';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import React, { useEffect, useState } from 'react';
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants';
import { Flex } from 'src/components/ui';
import { BookingStatus } from 'src/components/bookings';
import { useNavigate } from 'react-router-dom';
import { formatDateDmy } from 'src/utils/helpers';
import bookingAdminService from 'src/service/BookingAdmin';
import { useLoading } from 'src/hooks';
import { Loader } from 'src/components/common';
import { toast, ToastContainer } from 'react-toastify';

const BookingsPageContainer = styled.div``;

interface Props {
	handleChange: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({ handleChange }) => (
	<Input
		icon={<img src={searchIcon} alt='searchIcon' />}
		type='search'
		placeholder='Search'
		handleChange={handleChange}
	/>
);

const initialAddressState = {
	city: '',
	state: '',
	house_address: '',
};

const initialMetaState = {
	call_out_fee: 0,
	display_picture: '',
	first_name: '',
	last_name: '',
	phone: '',
	rating: '',
	address: initialAddressState,
};

const initialBookingState = {
	artisan_id: '',
	city: '',
	service: '',
	state: '',
	status: '',
	createdAt: '',
	user_id: '',
	artisan_meta: initialMetaState,
	user_meta: initialMetaState,
};
const BookingsPage = () => {
	const navigate = useNavigate();
	const [bookingDetails, setBookingDetails] = useState<BookingsTypes[]>([
		initialBookingState,
	]);
	const {
		loading: fetchingBookings,
		startLoading: startFetchingBookings,
		stopLoading: stopFetchingBookings,
	} = useLoading(false);

	useEffect(() => {
		document.title = "Booking's Page";
	}, []);

	const [searchField, setSearchField] = useState('');

	useEffect(() => {
		startFetchingBookings();
		bookingAdminService
			.bookingHistory()
			.then((res) =>
				setBookingDetails(res?.data?.payload?.data || initialBookingState)
			)
			.catch((err) => {
				console.log(err?.response?.data?.error?.message);
				toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => stopFetchingBookings());
	}, []);

	const filteredData = bookingDetails.filter((data) => {
		return (
			data.user_meta.first_name
				.toLowerCase()
				.includes(searchField.toLowerCase()) ||
			data.user_meta.last_name
				.toLowerCase()
				.includes(searchField.toLowerCase()) ||
			data.service.toLowerCase().includes(searchField.toLowerCase()) ||
			data.city.toLowerCase().includes(searchField.toLowerCase()) ||
			data.state.toLowerCase().includes(searchField.toLowerCase()) ||
			data.artisan_meta.first_name
				.toLowerCase()
				.includes(searchField.toLowerCase()) ||
			data.artisan_meta.last_name
				.toLowerCase()
				.includes(searchField.toLowerCase())
		);
	});

	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	const handleNavigate = (id: string) => {
		navigate(`/bookings/${id}`);
	};

	const BookingsTableHeaders = [
		{
			title: 'Artisan',
			render: (row: BookingsTypes) => (
				<Flex gap='10px' align='center'>
					<img
						style={{ width: 40, height: 40, borderRadius: '50%' }}
						src={row.artisan_meta.display_picture}
						alt=''
					/>{' '}
					{row.artisan_meta.first_name} {row.artisan_meta.last_name}
				</Flex>
			),
		},
		{
			title: 'User',
			render: (row: BookingsTypes) => (
				<Flex gap='10px' align='center'>
					<img
						style={{ width: 40, height: 40, borderRadius: '50%' }}
						src={row.user_meta.display_picture}
						alt=''
					/>{' '}
					{row.user_meta.first_name} {row.user_meta.last_name}
				</Flex>
			),
		},
		{ title: 'Service', render: (row: BookingsTypes) => `${row.service}` },
		{
			title: 'Location',
			render: (row: BookingsTypes) => `${row.city}, ${row.state}`,
		},
		{
			title: 'Date',
			render: (row: BookingsTypes) => formatDateDmy(row.createdAt),
		},
		{
			title: 'Status',
			render: (row: BookingsTypes) => <BookingStatus status={row.status} />,
		},
	];

	return (
		<DashboardLayout
			pageTitle='Bookings'
			rhsHeading={<RhsHeading handleChange={handleChange} />}
		>
			<ToastContainer />
			<BookingsPageContainer>
				{fetchingBookings ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '100px',
						}}
					>
						<Loader>loading...</Loader>{' '}
					</div>
				) : filteredData.length > 0 ? (
					<BookingsTabs
						rows={filteredData}
						BookingsTableHeaders={BookingsTableHeaders}
						title={
							<p className='count'>
								{filteredData.length > 1 ? filteredData.length : 0} Bookings
							</p>
						}
						onRowClick={handleNavigate}
					/>
				) : (
					<p className='table-entry-status'>No Bookings Found</p>
				)}
			</BookingsPageContainer>
		</DashboardLayout>
	);
};

export default BookingsPage;
