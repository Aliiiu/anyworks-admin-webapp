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
import { disputeService } from 'src/service/disputeService';
import { useLoading } from 'src/hooks';

interface Props {
	handleChange: (e: any) => void;
}

interface DisputeTypes {
	id: number;
	description: string;
	createdAt: string;
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
	const [disputeData, setDisputeData] = useState<DisputeTypes[]>([
		{} as DisputeTypes,
	]);
	const { loading, startLoading, stopLoading } = useLoading();
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Dispute Page';
	}, []);

	useEffect(() => {
		startLoading();
		disputeService
			.getAllDisputes()
			.then((res) => setDisputeData(res.data.payload.data))
			.catch((err) => {
				console.log(err.response);
			})
			.finally(() => stopLoading());
	}, []);
	const handleChange = (e: any) => {
		setSearchField(e.target.value);
	};
	let [searchParams, setSearchParams] = useSearchParams();

	const filteredData = disputeData.filter((data) => {
		// console.log(data.description);
		if (data.description) {
			return data.description.toLowerCase().includes(searchField.toLowerCase());
		}
	});

	const handleNavigate = (row: { [x: string]: any }) => {
		navigate(`/dispute/${row?.booking_id}?tabStatus=${row?.status}`);
	};

	const DisputeTableHeaders = [
		{
			title: 'Description',
			render: (row: DisputeTypes) => `${row.description}`,
		},
		{
			title: 'Date',
			render: (row: DisputeTypes) => formatDateDmy(row.createdAt),
		},
		{
			title: 'Status',
			render: (row: DisputeTypes) => (
				<p
					className={`capitalize ${
						row.status === 'pending' ? 'text-[#55C4F1]' : 'text-[#7607BD]'
					}`}
				>
					{row.status === 'pending' ? 'active' : row.status}
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
