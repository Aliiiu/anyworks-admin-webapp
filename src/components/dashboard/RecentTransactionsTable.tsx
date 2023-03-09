import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import { formatDateDmy, numberWithCommas } from 'src/utils';

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
		title: 'Type',
		render: (row: CustomerWalletTrnxTypes) => (
			<Flex gap='10px' align='center'>
				{' '}
				{row?.type || ''}{' '}
			</Flex>
		),
	},
	{
		title: 'Amount',
		render: (row: CustomerWalletTrnxTypes) =>
			`₦${numberWithCommas(row?.amount) || ''}`,
	},
	{
		title: 'Date',
		render: (row: CustomerWalletTrnxTypes) =>
			`${formatDateDmy(row?.created_at) || ''}`,
	},
	{
		title: 'Status',
		render: (row: CustomerWalletTrnxTypes) => (
			<p
				style={{
					color:
						row?.transaction_details.status === 'success'
							? '#00CCCD'
							: '#FFAD4A',
				}}
			>
				{row?.transaction_details?.status || ''}
			</p>
		),
	},
];

export const RecentTransactionsTable: FC<{
	rows: CustomerWalletTrnxTypes[];
}> = ({ rows }) => {
	return (
		<RecentTransactionsTableContainer>
			<div className='heading'>
				<p className='title'>Recent Transactions</p>
				<p className='info'>Top 10 Most Recent Wallet Transactions</p>
			</div>
			{rows.length > 0 ? (
				<Table
					rows={rows}
					headers={RecentTransactionsTableHeaders}
					showHead={true}
				/>
			) : (
				<h5 className='table-empty-status'> No recent Transaction</h5>
			)}
		</RecentTransactionsTableContainer>
	);
};

export default RecentTransactionsTable;
