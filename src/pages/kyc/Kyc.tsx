import { DashboardLayout } from 'src/components/dashboard';
import KycTable from 'src/components/kyc/KycTable';
import { StyledTableContainer } from 'src/styles/commonStyle';

const KYCDataGrid = () => (
	<DashboardLayout pageTitle='KYC'>
		<StyledTableContainer>
			<div className='wrapper'>
				<div className='table_summary'>46 Pending KYC</div>
			</div>
			<div className='table_divider'></div>
			<KycTable />
		</StyledTableContainer>
	</DashboardLayout>
);

export default KYCDataGrid;
