import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import { RECENT_BOOKINGS_TABLE_DATA } from 'src/constants';
import { useNavigate } from 'react-router-dom';
import { formatDateDmy, formatTime, numberWithCommas } from 'src/utils';
import { FC } from 'react';
import { usePagination } from 'src/hooks';

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
	_id: string;
	amount: number;
	status: string;
	narration: string;
	createdAt: string;
}

const RecentBookingsTableHeaders = [
	{
		title: 'Narration',
		render: (row: BookingsTypes) => <p>{row?.narration}</p>,
	},
	{
		title: 'Amount',
		render: (row: BookingsTypes) => numberWithCommas(row?.amount || 0),
	},
	{
		title: 'Date',
		render: (row: BookingsTypes) => formatDateDmy(row?.createdAt),
	},
	{
		title: 'Status',
		render: (row: BookingsTypes) => (
			<p
				className={`${
					row?.status === 'paid' ? 'text-[#00cccd] ' : 'text-[#ffad4a]'
				}`}
			>
				{row.status}
			</p>
		),
	},
];

export const RecentBookingsTable: FC<{ rows: BookingsTypes[] }> = ({
	rows,
}) => {
	const navigate = useNavigate();
	const handleNavigate = (id: string) => {
		navigate(`/bookings/${id}`);
	};

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 5,
		total: rows.length,
	});
	const paginatedRows = rows.slice((page - 1) * limit, page * limit);
	return (
		<RecentBookingsTableContainer>
			<div className='heading'>
				<p className='title'>Recent Bookings</p>
				<p className='info'>Top 10 Most Recent Bookings</p>
			</div>
			{rows.length > 0 ? (
				<Table
					rows={paginatedRows}
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
			<Pagination />
		</RecentBookingsTableContainer>
	);
};

export default RecentBookingsTable;
