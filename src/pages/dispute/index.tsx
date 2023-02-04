import React, { useEffect, useState } from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { Input } from 'src/components/inputs';
import { Loader } from 'src/components/common';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flex } from 'src/components/ui';
import { formatDateDmy } from 'src/utils';
import DisputeTabs from 'src/components/dispute/DisputeTab';
import { BookingsData } from 'src/constants/BookingsData';

interface Props {
	handleChange: (e: any) => void;
}

interface DisputeTypes {
	id: number;
	first_name: string;
	last_name: string;
	date: string;
	display_picture: string;
	status: string;
}

export const RhsHeading: React.FC<Props> = ({ handleChange }) => (
	<Input
		icon={<img src={searchIcon} alt='searchIcon' />}
		type='search'
		placeholder='Search'
		handleChange={handleChange}
	/>
);

const DisputePage = () => {
	const [searchField, setSearchField] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Dispute Page';
	}, []);

	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};
	let [searchParams, setSearchParams] = useSearchParams();

	const filteredData = BookingsData.filter((data) => {
		return (
			data.first_name.toLowerCase().includes(searchField.toLowerCase()) ||
			data.last_name.toLowerCase().includes(searchField.toLowerCase())
		);
	});

	const handleNavigate = (id: string) => {
		navigate(`/dispute/${id}?tabStatus=${searchParams.get('tabStatus')}`);
	};

	const DisputeTableHeaders = [
		{ title: 'OrderID', render: (row: DisputeTypes) => `${row.id}` },
		{
			title: 'Customer',
			render: (row: DisputeTypes) => (
				<Flex gap='10px' align='center'>
					<img
						style={{ width: 40, height: 40, borderRadius: '50%' }}
						src={row.display_picture}
						alt=''
					/>{' '}
					{row.first_name} {row.last_name}
				</Flex>
			),
		},
		{
			title: 'Vendor',
			render: (row: DisputeTypes) => (
				<Flex gap='10px' align='center'>
					<img
						style={{ width: 40, height: 40, borderRadius: '50%' }}
						src={row.display_picture}
						alt=''
					/>{' '}
					{row.first_name} {row.last_name}
				</Flex>
			),
		},
		{
			title: 'Date',
			render: (row: DisputeTypes) => `${row.date}`,
		},
		// {
		// 	title: 'Date',
		// 	render: (row: DisputeTypes) => formatDateDmy(row.createdAt),
		// },
		{
			title: 'Status',
			render: (row: DisputeTypes) => (
				<p
					className={`${
						row.status === 'Active' ? 'text-[#55C4F1]' : 'text-[#7607BD]'
					}`}
				>
					{row.status}
				</p>
			),
		},
	];

	return (
		<DashboardLayout
			pageTitle='Dispute Management'
			rhsHeading={<RhsHeading handleChange={handleChange} />}
		>
			{/* <ToastContainer /> */}
			<div>
				{false ? (
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
					<DisputeTabs
						rows={filteredData}
						BookingsTableHeaders={DisputeTableHeaders}
						title={
							<p className='count'>
								{filteredData.length > 1 ? filteredData.length : 0} Dispute
							</p>
						}
						onRowClick={handleNavigate}
						searchParams={searchParams}
						setSearchParams={setSearchParams}
					/>
				) : (
					<p className='table-entry-status'>No Data Found</p>
				)}
			</div>
		</DashboardLayout>
	);
};

export default DisputePage;
