import React from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import KycTable from 'src/components/ui/KycTable';
import styled from 'styled-components';

const KycContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 20px 0;
	.table_summary {
		background: #f2f4f7;
		border-radius: 16px;
		color: #7e00c4;
		font-weight: 700;
		font-size: 18px;
		margin-left: 20px;
		width: 150px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.table_divider {
		background: #f2f4f7;
		margin-top: 20px;
		width: 100%;
		height: 1px;
	}
`;

const KYCDataGrid = () => (
	<DashboardLayout pageTitle='KYC'>
		<KycContainer>
			<div className='table_summary'>46 Pending KYC</div>
			<div className='table_divider'></div>
			<KycTable />
		</KycContainer>
	</DashboardLayout>
);

export default KYCDataGrid;
