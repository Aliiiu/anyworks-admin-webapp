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

const DashboardContainer = styled.div`
	.metrics__cards {
		margin: 2rem 0;
	}
`;

const initialBookingState: BookingMetricTypes = {
	active_bookings: 0,
	canceled_bookings: 0,
	pending_bookings: 0,
	total_bookings: 0,
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

	useEffect(() => {
		userServices
			.getUsers()
			.then((res) => setTotalUsers(res?.data?.payload?.data.length))
			.catch((err) => console.log(err?.response?.data?.error?.message));
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
			count: `₦${metricData.total_balance}`,
			key: 'Total Wallet ',
			img: wallet,
			color: theme.colors.cyan,
			href: '#',
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
			href: '/bookings',
		},
		{
			count: adminBookings.active_bookings,
			key: 'Active Booking ',
			img: booking,
			color: theme.colors.mustard,
			href: '/bookings',
		},
		{
			count: adminBookings.pending_bookings,
			key: 'Pending Booking ',
			img: booking,
			color: theme.colors.cyan,
			href: '/bookings',
		},
		{
			count: adminBookings.canceled_bookings,
			key: 'Canceled Booking ',
			img: booking,
			color: theme.colors.red,
			href: '/bookings',
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
				<RecentBookingsTable />
				<RecentTransactionsTable />
			</DashboardContainer>
		</DashboardLayout>
	);
};
export default Dashboard;
