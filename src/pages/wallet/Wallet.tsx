import React, { useEffect, useState } from 'react';
import {
	DashboardLayout,
	MetricsCard,
	RecentTransactionsTable,
} from 'src/components/dashboard';
import { Input } from 'src/components/inputs';
import { Button, ButtonClass, Flex } from 'src/components/ui';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { theme } from 'src/styles/Theme';
import addIcon from 'src/assets/images/common/add.svg';
import { DashboardContainer } from '../dashboard/Dashboard';
import { ScaleLoader } from 'react-spinners';
import user from 'src/assets/images/metrics/user.svg';
import artisan from 'src/assets/images/metrics/artisan.svg';
import wallet from 'src/assets/images/metrics/wallet.svg';
import kyc from 'src/assets/images/metrics/kyc.svg';
import booking from 'src/assets/images/metrics/booking.svg';
import {
	RECENT_BOOKINGS_TABLE_DATA,
	RECENT_CUSTOMER_TRANSACTION_DATA,
	RECENT_VENDOR_TRANSACTION_DATA,
} from 'src/constants';
import RecentBookingsTable from './RecentBookingsTable';
import CustomerTransactionsTable from './CustomerTransactionTable';
import VendorTransactionsTable from './VendorTransactionTable';
import WalletService from 'src/service/walletService';
import { toast } from 'react-toastify';
import { numberWithCommas } from 'src/utils';

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
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	useEffect(() => {
		WalletService.artisanWalletData()
			.then((res) => {
				setMetricData((prevState) => ({
					...prevState,
					vendorBalance: res.data.payload.data.balance,
				}));
				// console.log(res.data.payload.data);
				setVendorRecentWalletTrnx(res?.data?.payload?.data?.transactions);
			})
			.catch((err) => toast.error(err.response.data.error.message));
		WalletService.customerWalletData()
			.then((res) => {
				// console.log(res.data.payload.data?.transactions);
				setMetricData((prevState) => ({
					...prevState,
					customerBalance: res?.data?.payload?.data?.balance,
				}));
				setCustomerRecentWalletTrnx(res?.data?.payload?.data?.transactions);
			})
			.catch((err) => toast.error(err.response.data.error.message));
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
			count: numberWithCommas(metricData?.customerBalance || 0),
			key: 'Total Customer Wallet balance',
			img: user,
			color: theme.colors.purple,
			href: '/customers',
		},
		{
			count: numberWithCommas(metricData?.vendorBalance || 0),
			key: 'Total Vendor wallet balance',
			img: artisan,
			color: theme.colors.blue,
			href: '/vendors',
		},
		{
			count: numberWithCommas(metricData?.escrowBalance || 0),
			key: 'Escrow Wallet Balance ',
			img: wallet,
			color: theme.colors.cyan,
			href: '/bookings?tabStatus=active',
		},
		{
			count: numberWithCommas(metricData?.serviceFee || 0),
			key: 'Total Service Fee commission',
			img: wallet,
			color: theme.colors.purple,
			href: '/kyc',
		},
		{
			count: numberWithCommas(metricData?.commitmentFee || 0),
			key: 'Total Commitment Fee',
			img: wallet,
			color: theme.colors.blue,
			href: '/bookings?tabStatus=all',
		},
		{
			count: numberWithCommas(metricData?.verificationBalance || 0),
			key: 'Total Verification Fee',
			img: wallet,
			color: theme.colors.blue,
			href: '/bookings?tabStatus=all',
		},
	];
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
				{false ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<RecentBookingsTable rows={RECENT_BOOKINGS_TABLE_DATA()} />
				)}
				{false ? (
					<div className='loader-container'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<CustomerTransactionsTable
						rows={customerRecentWalletTrnx.slice(0, 10)}
					/>
				)}
				{false ? (
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
