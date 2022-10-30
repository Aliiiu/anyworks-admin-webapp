import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
	DashboardLayout,
	MetricsCard,
	RecentBookingsTable,
	RecentTransactionsTable,
} from 'src/components/dashboard';
import user from 'src/assets/images/metrics/user.svg';
import artisan from 'src/assets/images/metrics/artisan.svg';
import wallet from 'src/assets/images/metrics/wallet.svg';
import kyc from 'src/assets/images/metrics/kyc.svg';
import booking from 'src/assets/images/metrics/booking.svg';
import { Flex } from 'src/components/ui';
import { theme } from 'src/styles/Theme';
import { DashboardService } from 'src/service/Dashboard';
import { toast, ToastContainer } from 'react-toastify';
import bookingAdminService from 'src/service/BookingAdmin';
import userServices from 'src/service/userServices';
import { formatTime, numberWithCommas } from 'src/utils';
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
	const [metricData, setMetricData] = useState<ArtisanMetricTypes>({
		artisans: 0,
		pending_kyc: 0,
		total_balance: 0,
	});
	const [adminBookings, setAdminBookings] =
		useState<BookingMetricTypes>(initialBookingState);
	const [totalUsers, setTotalUsers] = useState<number>(0);
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
				toast.success(res.data.payload.data);
				setMetricData(res.data.payload.data);
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
		loading: fetchRecentTrx,
		startLoading: startFetchingTnx,
		stopLoading: stopFetchingTnx,
	} = useLoading();

	useEffect(() => {
		userServices
			.getUsers()
			.then((res) => setTotalUsers(res?.data?.payload?.data.length))
			.catch((err) => console.log(err?.response?.data?.error?.message));
	}, []);

	useEffect(() => {
		startLoading();
		DashboardService.RecentBookingHistory()
			.then((res) => {
				setRecentBookings(res?.data?.payload?.data);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopLoading());
	}, []);
	useEffect(() => {
		startFetchingTnx();
		DashboardService.RecentWalletHistory()
			.then((res) => {
				setRecentWalletTrnx(res?.data?.payload?.data);
			})
			.catch((err) => console.log(err?.response?.data?.error?.message))
			.finally(() => stopFetchingTnx());
	}, []);

	const metrics = [
		{
			count: totalUsers,
			key: 'Total Users',
			img: user,
			color: theme.colors.purple,
			href: '/users',
		},
		{
			count: metricData.artisans,
			key: 'Total Artisans',
			img: artisan,
			color: theme.colors.blue,
			href: '/artisans',
		},
		{
			count: `₦${numberWithCommas(metricData.total_balance)}`,
			key: 'Total Wallet ',
			img: wallet,
			color: theme.colors.cyan,
		},
		{
			count: metricData.pending_kyc,
			key: 'Pending KYC ',
			img: kyc,
			color: theme.colors.mustard,
			href: '/kyc',
		},
		{
			count: adminBookings.total_bookings,
			key: 'Total Booking ',
			img: booking,
			color: theme.colors.darkPurple,
			href: '/bookings?tabStatus=all',
		},
		{
			count: adminBookings.active_bookings,
			key: 'Active Booking ',
			img: booking,
			color: theme.colors.mustard,
			href: '/bookings?tabStatus=active',
		},
		{
			count: adminBookings.pending_bookings,
			key: 'Pending Booking ',
			img: booking,
			color: theme.colors.cyan,
			href: '/bookings?tabStatus=completed',
		},
		{
			count: adminBookings.canceled_bookings,
			key: 'Canceled Booking ',
			img: booking,
			color: theme.colors.red,
			href: '/bookings?tabStatus=canceled',
		},
		{
			count: adminBookings.completed_bookings,
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
				{loading ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<RecentBookingsTable rows={recentBookings} />
				)}
				{fetchRecentTrx ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<RecentTransactionsTable rows={recentWalletTrnx} />
				)}
			</DashboardContainer>
		</DashboardLayout>
	);
};
export default Dashboard;
