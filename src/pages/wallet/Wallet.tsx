import React, { useEffect, useState } from 'react';
import { DashboardLayout, MetricsCard } from 'src/components/dashboard';
import { Input } from 'src/components/inputs';
import { Flex } from 'src/components/ui';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { theme } from 'src/styles/Theme';
import { DashboardContainer } from '../dashboard/Dashboard';
import { ScaleLoader } from 'react-spinners';
import user from 'src/assets/images/metrics/user.svg';
import artisan from 'src/assets/images/metrics/artisan.svg';
import wallet from 'src/assets/images/metrics/wallet.svg';
import RecentBookingsTable from './RecentBookingsTable';
import CustomerTransactionsTable from './CustomerTransactionTable';
import VendorTransactionsTable from './VendorTransactionTable';
import WalletService from 'src/service/walletService';
import { toast } from 'react-toastify';
import { numberWithCommas } from 'src/utils';
import { useLoading } from 'src/hooks';

interface Props {
	handleChange: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({ handleChange }) => (
	<Flex wrap='wrap'>
		<Input
			icon={<img src={searchIcon} alt='searchIcon' />}
			type='search'
			placeholder='Search'
			handleChange={handleChange}
		/>
	</Flex>
);

type WalletSummaryTypes = {
	customerBalance: number;
	vendorBalance: number;
	escrowBalance: number;
	commitmentFee: number;
	serviceFee: number;
	verificationBalance: number;
};
type BookingsTypes = {
	_id: string;
	amount: number;
	status: string;
	narration: string;
	createdAt: string;
};

const Wallet = () => {
	const [searchField, setSearchField] = useState('');
	const [metricData, setMetricData] = useState<WalletSummaryTypes>({
		customerBalance: 0,
		vendorBalance: 0,
		escrowBalance: 0,
		commitmentFee: 0,
		serviceFee: 0,
		verificationBalance: 0,
	});
	const [customerRecentWalletTrnx, setCustomerRecentWalletTrnx] = useState<
		CustomerWalletTrnxTypes[]
	>([]);
	const [vendorRecentWalletTrnx, setVendorRecentWalletTrnx] = useState<
		VendorWalletTrnxTypes[]
	>([]);
	const [recentBookings, setRecentBookings] = useState<[]>([]);
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	const {
		loading: fetchRecentCustomerTrnx,
		startLoading: startFetchingCustomerTrnx,
		stopLoading: stopFetchingCustomerTrnx,
	} = useLoading();
	const {
		loading: fetchRecentVendorTrnx,
		startLoading: startFetchingVendorTrnx,
		stopLoading: stopFetchingVendorTrnx,
	} = useLoading();

	useEffect(() => {
		WalletService.artisanWalletData()
			.then((res) => {
				setMetricData((prevState) => ({
					...prevState,
					vendorBalance: res.data.payload.data.balance,
				}));
			})
			.catch((err) => toast.error(err.response.data.error.message));
	}, []);

	useEffect(() => {
		startFetchingCustomerTrnx();
		WalletService.artisanTrans()
			.then((res) => {
				// console.log(res.data.payload.data);
				setVendorRecentWalletTrnx(res?.data?.payload?.data);
			})
			.catch((err) => toast.error(err.response.data.error.message))
			.finally(() => {
				stopFetchingCustomerTrnx();
			});
	}, []);

	useEffect(() => {
		WalletService.customerWalletData()
			.then((res) => {
				// console.log(res.data.payload.data?.transactions);
				setMetricData((prevState) => ({
					...prevState,
					customerBalance: res?.data?.payload?.data?.balance,
				}));
			})
			.catch((err) => toast.error(err.response.data.error.message));
	}, []);

	useEffect(() => {
		startFetchingVendorTrnx();
		WalletService.customerTrans()
			.then((res) => {
				setCustomerRecentWalletTrnx(res?.data?.payload?.data);
			})
			.catch((err) => toast.error(err.response.data.error.message))
			.finally(() => {
				stopFetchingVendorTrnx();
			});
	}, []);

	useEffect(() => {
		WalletService.bookingWalletData()
			.then((res) => {
				setMetricData((prevState) => ({
					...prevState,
					escrowBalance: res?.data?.payload?.data?.escrow_balance_amount,
					commitmentFee: res?.data?.payload?.data?.commitment_fee_commission,
					serviceFee: res?.data?.payload?.data?.service_fee_commission,
					verificationBalance:
						res?.data?.payload?.data?.verification_fee_amount,
				}));
				// console.log(res.data.payload.data);
			})
			.catch((err) => toast.error(err.response.data.error.message));
	}, []);

	const metrics = [
		{
			count: numberWithCommas(metricData?.customerBalance),
			key: 'Total Customer Wallet balance',
			img: user,
			color: theme.colors.purple,
			href: '/customers',
		},
		{
			count: numberWithCommas(metricData?.vendorBalance),
			key: 'Total Vendor wallet balance',
			img: artisan,
			color: theme.colors.blue,
			href: '/vendors',
		},
		{
			count:
				metricData?.escrowBalance === 0
					? metricData?.escrowBalance
					: numberWithCommas(metricData?.escrowBalance),
			key: 'Escrow Wallet Balance ',
			img: wallet,
			color: theme.colors.cyan,
			href: '/bookings?tabStatus=active',
		},
		{
			count:
				metricData?.serviceFee === 0
					? metricData?.serviceFee
					: numberWithCommas(metricData?.serviceFee),
			key: 'Total Service Fee commission',
			img: wallet,
			color: theme.colors.purple,
			href: '/kyc',
		},
		{
			count:
				metricData?.commitmentFee === 0
					? metricData?.commitmentFee
					: numberWithCommas(metricData?.commitmentFee),
			key: 'Total Commitment Fee',
			img: wallet,
			color: theme.colors.blue,
			href: '/bookings?tabStatus=all',
		},
		{
			count: numberWithCommas(metricData?.verificationBalance),
			key: 'Total Verification Fee',
			img: wallet,
			color: theme.colors.blue,
			href: '/bookings?tabStatus=all',
		},
	];

	// console.log(!!metricData?.commitmentFee);
	const {
		loading: fetchRecentBookings,
		startLoading: startFetchingBookings,
		stopLoading: stopFetchingBookings,
	} = useLoading();

	useEffect(() => {
		startFetchingBookings();
		WalletService.bookingTrnx()
			.then((res) => {
				setRecentBookings(res?.data?.payload?.data?.transactions);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopFetchingBookings());
	}, []);
	// console.log(metricData.escrowBalance);
	return (
		<DashboardLayout
			pageTitle='Wallet'
			// rhsHeading={<RhsHeading handleChange={handleChange} />}
		>
			<DashboardContainer>
				{/* <ToastContainer /> */}
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
				{fetchRecentCustomerTrnx ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<CustomerTransactionsTable rows={customerRecentWalletTrnx} />
				)}
				{fetchRecentVendorTrnx ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<VendorTransactionsTable rows={vendorRecentWalletTrnx} />
				)}
			</DashboardContainer>
		</DashboardLayout>
	);
};

export default Wallet;
