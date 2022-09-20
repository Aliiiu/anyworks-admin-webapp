import { DashboardLayout } from 'src/components/dashboard';
import React, { useState, useEffect } from 'react';
import { KycTable } from 'src/components/kyc/KycTable';
import { Input } from 'src/components/inputs';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { useLoading } from 'src/hooks';
import KycData from 'src/service/KycData';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from 'src/components/common';

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

const KYCDataGrid = () => {
	const [searchField, setSearchField] = useState('');
	const [pendingkycData, setPendingKycData] = useState<KycData[]>([]);

	const filteredData = pendingkycData.filter((data) => {
		return (
			(data?.first_name &&
				data?.first_name?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.last_name &&
				data?.last_name?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.occupation &&
				data?.occupation?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.gender &&
				data?.gender?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.email &&
				data?.email?.toLowerCase().includes(searchField.toLowerCase()))
		);
	});

	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	const {
		loading: fetchingPendingKycData,
		startLoading: startFetchingPendingKycData,
		stopLoading: stopFetchingPendingKycData,
	} = useLoading(false);

	useEffect(() => {
		startFetchingPendingKycData();
		KycData.getAllPendingKyc()
			.then((res) => {
				setPendingKycData(res?.data?.payload?.data || []);
			})
			.catch((err) => {
				toast.error(err.response.data.error.message);
			})
			.finally(() => stopFetchingPendingKycData());
	}, []);

	return (
		<DashboardLayout
			pageTitle='KYC'
			rhsHeading={<RhsHeading handleChange={handleChange} />}
		>
			<>
				<ToastContainer />
				{fetchingPendingKycData ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '100px',
						}}
					>
						<Loader>loading...</Loader>{' '}
					</div>
				) : (
					<KycTable rows={filteredData} />
				)}
			</>
		</DashboardLayout>
	);
};

export default KYCDataGrid;
