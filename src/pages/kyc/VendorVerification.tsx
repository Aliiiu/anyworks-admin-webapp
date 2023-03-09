import React, { useEffect, useState } from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from 'src/components/common';
import { Input } from 'src/components/inputs';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import avatar from 'src/assets/images/header/avatar.svg';
import KycTable from 'src/components/kyc/KycTable';
import { CustomerData } from 'src/constants/KYCDATA';
import { ArtisansServices } from 'src/service/ArtisansServices';
import { IoWarning } from 'react-icons/io5';
import { useLoading } from 'src/hooks';

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

const VendorVerification = () => {
	const [searchField, setSearchField] = useState('');
	const [vendorData, setVendorData] = useState([]);
	const { loading, startLoading, stopLoading } = useLoading(false);

	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};

	useEffect(() => {
		startLoading();
		ArtisansServices.getAllArtisansVerification()
			.then((res) => {
				console.log(res?.data?.payload?.data);
				setVendorData(res?.data?.payload?.data);
			})
			.catch((err) => console.log(err.response.data.error.message))
			.finally(() => stopLoading());
	}, []);

	const filteredData = vendorData.filter((data: VendorDataType) => {
		return (
			(data?.first_name &&
				data?.first_name?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.last_name &&
				data?.last_name?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.email &&
				data?.email?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.gender &&
				data?.gender?.toLowerCase().includes(searchField.toLowerCase())) ||
			(data?.email &&
				data?.email?.toLowerCase().includes(searchField.toLowerCase()))
		);
	});

	const vendorTableHeaders = [
		{
			title: 'Picture',
			render: (row: VendorDataType) => (
				<div
					style={{
						backgroundImage: `url(${row?.display_picture || avatar})`,
						width: '40px',
						height: '40px',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundSize: 'contain',
						boxShadow:
							'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
						borderRadius: '50%',
					}}
				></div>
			),
		},
		{
			title: 'First Name',
			render: (row: VendorDataType) => `${row.first_name}`,
		},
		{
			title: 'Last Name',
			render: (row: VendorDataType) => `${row.last_name}`,
		},

		{
			title: 'Gender',
			render: (row: VendorDataType) => `${row.gender}`,
		},
		{
			title: 'Email',
			render: (row: any) => `${row.email}`,
		},
		{
			title: 'Status',
			render: (row: VendorDataType) => (
				<p className={`${row?.tier < 1 ? 'text-[#B3B3B3]' : 'text-[#7E00C4]'}`}>
					{row?.tier < 1 ? 'Pending' : 'Upgrade'}
				</p>
			),
		},
	];

	return (
		<DashboardLayout
			pageTitle='Vendor'
			rhsHeading={<RhsHeading handleChange={handleChange} />}
		>
			<>
				<ToastContainer />
				{loading ? (
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
					<KycTable
						rows={filteredData}
						header={vendorTableHeaders}
						title={'Vendors'}
					/>
				) : (
					<div className='flex justify-center items-center py-10 px-5'>
						<span className='md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
							<IoWarning size={20} /> There are currently no available data for
							this service
						</span>
					</div>
				)}
			</>
		</DashboardLayout>
	);
};

export default VendorVerification;
