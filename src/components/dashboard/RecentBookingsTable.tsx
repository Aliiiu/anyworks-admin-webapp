import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants';
import { useNavigate } from 'react-router-dom';
import { formatDateDmy, formatTime } from 'src/utils';
import { BookingStatus } from '../bookings';
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

const RecentBookingsTableHeaders = [
	{
		title: 'Artisan',
		render: (row: BookingsTypes) => (
			<Flex gap='10px' align='center'>
				<img
					style={{ width: 40, height: 40, borderRadius: '50%' }}
					src={row.artisan_meta.display_picture}
					alt=''
				/>{' '}
				{row.artisan_meta.first_name} {row.artisan_meta.last_name}
			</Flex>
		),
	},
	{ title: 'Service', render: (row: BookingsTypes) => `${row.service}` },
	{
		title: 'User',
		render: (row: BookingsTypes) => (
			<Flex gap='10px' align='center'>
				<img
					style={{ width: 40, height: 40, borderRadius: '50%' }}
					src={row.user_meta.display_picture}
					alt=''
				/>{' '}
				{row.user_meta.first_name} {row.user_meta.last_name}
			</Flex>
		),
	},
	{
		title: 'Time',
		render: (row: BookingsTypes) => formatTime(new Date(row.createdAt)),
	},
	{
		title: 'Location',
		render: (row: BookingsTypes) => `${row.city}, ${row.state}`,
	},
	{
		title: 'Status',
		render: (row: BookingsTypes) => <BookingStatus status={row.status} />,
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
