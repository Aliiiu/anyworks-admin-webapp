import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
	DashboardLayout,
	MetricsCard,
	RecentBookingsTable,
} from 'src/components/dashboard';
import user from 'src/assets/images/metrics/user.svg';
import artisan from 'src/assets/images/metrics/artisan.svg';
import kyc from 'src/assets/images/metrics/kyc.svg';
import booking from 'src/assets/images/metrics/booking.svg';
import { Flex } from 'src/components/ui';
import { theme } from 'src/styles/Theme';
import { DashboardService } from 'src/service/Dashboard';
import { toast, ToastContainer } from 'react-toastify';
import bookingAdminService from 'src/service/BookingAdmin';
import { ScaleLoader } from 'react-spinners';
import { useLoading } from 'src/hooks';

export const DashboardContainer = styled.div`
	.metrics__cards {
		margin: 2rem 0;
	}
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

const initialBookingState: BookingMetricTypes = {
	active_bookings: 0,
	canceled_bookings: 0,
	pending_bookings: 0,
	total_bookings: 0,
	completed_bookings: 0,
	bookings: [],
};
const initialWalletTrnxState: WalletTrnxTypes = {
	created_at: '',
	amount: 0,
	type: '',
	transaction_details: {
		status: '',
	},
};

const Dashboard = () => {
	const [metricData, setMetricData] = useState<MetricTypes>({
		bookingData: initialBookingState,
		userData: {
			pending_verification: 0,
			users: 0,
		},
		artisanData: {
			pending_verification: 0,
			artisans: 0,
		},
	});
	const [adminBookings, setAdminBookings] =
		useState<BookingMetricTypes>(initialBookingState);
	const [recentBookings, setRecentBookings] = useState<BookingsTypes[]>([]);
	const [recentWalletTrnx, setRecentWalletTrnx] = useState<WalletTrnxTypes[]>(
		[]
	);

	useEffect(() => {
		document.title = 'Dashboard';
	}, []);

	useEffect(() => {
		DashboardService.ArtisansData()
			.then((res) => {
				setMetricData((prevState) => ({
					...prevState,
					artisanData: res.data.payload.data,
				}));
				// console.log(res.data.payload.data);
			})
			.catch((err) => toast.error(err.response.data.error.message));
		DashboardService.CustomerData()
			.then((res) => {
				// console.log(res.data.payload.data);
				setMetricData((prevState) => ({
					...prevState,
					userData: res.data.payload.data,
				}));
			})
			.catch((err) => toast.error(err.response.data.error.message));
		DashboardService.BookingData()
			.then((res) => {
				setMetricData((prevState) => ({
					...prevState,
					bookingData: res.data.payload.data,
				}));
				// console.log(res.data.payload.data);
			})
			.catch((err) => toast.error(err.response.data.error.message));
	}, []);

	useEffect(() => {
		bookingAdminService
			.dashboardData()
			.then((res) => {
				setAdminBookings(res?.data?.payload?.data || initialBookingState);
			})
			.catch((err: any) =>
				toast.error(
					err?.response?.data?.error?.message || 'Something went wrong'
				)
			);
	}, []);

	const { loading, startLoading, stopLoading } = useLoading();
	const {
		loading: fetchRecentBookings,
		startLoading: startFetchingBookings,
		stopLoading: stopFetchingBookings,
	} = useLoading();

	useEffect(() => {
		startFetchingBookings();
		DashboardService.RecentBookingHistory()
			.then((res) => {
				setRecentBookings(res?.data?.payload?.data?.bookings);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopFetchingBookings());
	}, []);

	// useEffect(() => {
	// 	startFetchingTnx();
	// 	DashboardService.RecentBookingHistory()
	// 		.then((res) => {
	// 			setRecentBookings(res?.data?.payload?.data?.bookings);
	// 		})
	// 		.catch((err) => console.log(err?.response?.data?.error?.message))
	// 		.finally(() => stopFetchingTnx());
	// }, []);

	const metrics = [
		{
			count: metricData?.userData?.users || 0,
			key: 'Total Customers',
			img: user,
			color: theme.colors.purple,
			href: '/customers',
		},
		{
			count: metricData?.artisanData?.artisans || 0,
			key: 'Total Vendor',
			img: artisan,
			color: theme.colors.blue,
			href: '/vendors',
		},
		// {
		// 	count: `₦${numberWithCommas(metricData.total_balance)}`,
		// 	key: 'Total Wallet ',
		// 	img: wallet,
		// 	color: theme.colors.cyan,
		// },
		{
			count: metricData?.artisanData?.pending_verification || 0,
			key: 'Total Pending verification Vendor',
			img: kyc,
			color: theme.colors.mustard,
			href: '/verification/vendor',
		},
		{
			count: metricData?.userData?.pending_verification || 0,
			key: 'Total Pending verification Customer',
			img: kyc,
			color: theme.colors.mustard,
			href: '/verification/customer',
		},
		{
			count: metricData?.bookingData?.total_bookings || 0,
			key: 'Total Booking ',
			img: booking,
			color: theme.colors.darkPurple,
			href: '/bookings?tabStatus=all',
		},
		{
			count: metricData?.bookingData?.active_bookings || 0,
			key: 'Active Booking ',
			img: booking,
			color: theme.colors.purple,
			href: '/bookings?tabStatus=active',
		},
		{
			count: metricData?.bookingData?.pending_bookings || 0,
			key: 'Pending Booking ',
			img: booking,
			color: theme.colors.cyan,
			href: '/bookings?tabStatus=completed',
		},
		{
			count: metricData?.bookingData?.canceled_bookings || 0,
			key: 'Canceled Booking ',
			img: booking,
			color: theme.colors.red,
			href: '/bookings?tabStatus=canceled',
		},
		{
			count: metricData?.bookingData?.completed_bookings || 0,
			key: 'Completed Booking ',
			img: booking,
			color: theme.colors.purple,
			href: '/bookings?tabStatus=completed',
		},
	];
	return (
		<DashboardLayout pageTitle='Dashboard'>
			<DashboardContainer>
				<ToastContainer />
				<div className='metrics__cards'>
					<Flex wrap='wrap' gap='1.5rem'>
						{metrics.map((metric) => {
							return (
								<MetricsCard
									key={metric.key}
									metric={metric}
									href={metric.href}
								/>
							);
						})}
					</Flex>
				</div>
				{fetchRecentBookings ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<RecentBookingsTable rows={recentBookings} />
				)}
			</DashboardContainer>
		</DashboardLayout>
	);
};
export default Dashboard;
