import React from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import KycTable from 'src/components/ui/KycTable';
import styled from 'styled-components';

const KycContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 20px 0;
`;

const KYCDataGrid = () => (
	<DashboardLayout pageTitle='KYC'>
		<KycContainer>
			<div
				style={{
					background: '#F2F4F7',
					borderRadius: 16,
					color: '#7E00C4',
					fontWeight: 700,
					fontSize: 18,
					width: 150,
					height: 30,
					marginLeft: 20,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				46 Pending KYC
			</div>
			<div
				style={{
					background: '#F2F4F7',
					marginTop: 20,
					width: '100%',
					height: 1,
				}}
			></div>
			<KycTable />
		</KycContainer>
	</DashboardLayout>
);

export default KYCDataGrid;
