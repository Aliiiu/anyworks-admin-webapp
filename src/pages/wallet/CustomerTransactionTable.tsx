import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import avatar from 'src/assets/images/header/avatar.svg';
import { formatDateDmy, numberWithCommas } from 'src/utils';
import { usePagination } from 'src/hooks';

const RecentTransactionsTableContainer = styled.div`
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
	.table-empty-status {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		font-weight: 700;
		font-size: 24px;
		font-style: italic;
	}
`;

const RecentTransactionsTableHeaders = [
	{
		title: 'Purpose',
		render: (row: CustomerWalletTrnxTypes) => (
			<p>
				{row?.transaction_details?.debited_for ||
					row?.transaction_details?.credited_for ||
					(row?.transaction_details?.customer?.first_name
						? row?.transaction_details?.customer?.first_name +
						  ' ' +
						  row?.transaction_details?.customer?.last_name
						: '')}
			</p>
		),
	},
	{
		title: 'Amount',
		render: (row: CustomerWalletTrnxTypes) =>
			`₦${numberWithCommas(row?.amount || 0) || ''}`,
	},
	{
		title: 'Type',
		render: (row: CustomerWalletTrnxTypes) => (
			<p
				style={{
					color: row?.type === 'credit' ? '#00CCCD' : '#FFAD4A',
				}}
			>
				{row?.type}
			</p>
		),
	},
	{
		title: 'Date',
		render: (row: CustomerWalletTrnxTypes) =>
			`${formatDateDmy(row?.created_at) || ''}`,
	},
];

export const CustomerTransactionsTable: FC<{
	rows: CustomerWalletTrnxTypes[];
}> = ({ rows }) => {
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 5,
		total: rows.length,
	});
	const paginatedRows = rows.slice((page - 1) * limit, page * limit);
	return (
		<RecentTransactionsTableContainer>
			<div className='heading'>
				<p className='title'>Recent Transactions for Customers</p>
				<p className='info'>Top 10 most recent customer wallet transactions</p>
			</div>
			{rows.length > 0 ? (
				<Table
					rows={paginatedRows}
					headers={RecentTransactionsTableHeaders}
					showHead={true}
				/>
			) : (
				<h5 className='table-empty-status'> No recent Transaction</h5>
			)}
			<Pagination />
		</RecentTransactionsTableContainer>
	);
};

export default CustomerTransactionsTable;
