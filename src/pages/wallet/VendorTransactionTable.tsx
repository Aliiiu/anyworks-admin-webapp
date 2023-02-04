import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex, Table } from 'src/components/ui';
import { formatDateDmy, numberWithCommas } from 'src/utils';
import avatar from 'src/assets/images/header/avatar.svg';

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
		title: 'Vendor',
		render: (row: VendorWalletTrnxTypes) => (
			<Flex gap='10px' align='center'>
				<img
					style={{ width: 40, height: 40, borderRadius: '50%' }}
					src={row.img || avatar}
					alt=''
				/>{' '}
				{row?.vendor || 'Olajide Musiliu'}
			</Flex>
		),
	},
	{
		title: 'Amount',
		render: (row: VendorWalletTrnxTypes) =>
			`₦${numberWithCommas(row?.amount) || ''}`,
	},
	{
		title: 'Date',
		render: (row: VendorWalletTrnxTypes) =>
			`${formatDateDmy(row?.created_at) || ''}`,
	},
	{
		title: 'Transaction',
		render: (row: VendorWalletTrnxTypes) => `${row?.type || ''}`,
	},
	{
		title: 'Status',
		render: (row: VendorWalletTrnxTypes) => (
			<p
				style={{
					color:
						row?.transaction_details.status === 'success'
							? '#00CCCD'
							: '#FFAD4A',
				}}
			>
				{row?.transaction_details?.status || 'Failed'}
			</p>
		),
	},
];

export const VendorTransactionsTable: FC<{
	rows: VendorWalletTrnxTypes[];
}> = ({ rows }) => {
	return (
		<RecentTransactionsTableContainer>
			<div className='heading'>
				<p className='title'>Recent Transactions for Vendors</p>
				<p className='info'>Top 10 most recent vendor wallet transactions</p>
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

export default VendorTransactionsTable;
