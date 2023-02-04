import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants';
import { useNavigate } from 'react-router-dom';
import { formatDateDmy, formatTime } from 'src/utils';
import { FC } from 'react';

const RecentBookingsTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 20px 0;
	.heading {
		color: ${(props) => props.theme.colors.text_01};
		padding: 0 20px;

		.title {
			font-weight: 600;
			font-size: 22px;
			line-height: 32px;
		}
		.info {
			font-weight: 500;
			font-size: 14px;
			line-height: 24px;
		}
	}
`;

interface BookingsTypes {
	id: number;
	customer?: string;
	img: string;
	vendor: string;
	calloutFee: string;
	serviceFee: string;
}

const RecentBookingsTableHeaders = [
	{
		title: 'Vendor',
		render: (row: BookingsTypes) => (
			<Flex gap='10px' align='center'>
				<img
					style={{ width: 40, height: 40, borderRadius: '50%' }}
					src={row.img}
					alt=''
				/>{' '}
				{row.vendor}
			</Flex>
		),
	},
	{
		title: 'Customer',
		render: (row: BookingsTypes) => (
			<Flex gap='10px' align='center'>
				<img
					style={{ width: 40, height: 40, borderRadius: '50%' }}
					src={row.img}
					alt=''
				/>{' '}
				{row.customer}
			</Flex>
		),
	},
	{
		title: '10%  Call-Out Fee',
		render: (row: BookingsTypes) => `${row.calloutFee}`,
	},
	{
		title: '10%  Service Fee',
		render: (row: BookingsTypes) => `${row.serviceFee}`,
	},
];

export const RecentBookingsTable: FC<{ rows: BookingsTypes[] }> = ({
	rows,
}) => {
	const navigate = useNavigate();
	const handleNavigate = (id: string) => {
		navigate(`/bookings/${id}`);
	};
	return (
		<RecentBookingsTableContainer>
			<div className='heading'>
				<p className='title'>Recent Bookings</p>
				<p className='info'>Top 10 Most Recent Bookings</p>
			</div>
			{rows.length > 0 ? (
				<Table
					rows={rows}
					headers={RecentBookingsTableHeaders}
					showHead={true}
					onRowClick={handleNavigate}
				/>
			) : (
				<h5 className='font-bold text-center py-8 italic text-2xl'>
					{' '}
					No recent Bookings
				</h5>
			)}
		</RecentBookingsTableContainer>
	);
};

export default RecentBookingsTable;
