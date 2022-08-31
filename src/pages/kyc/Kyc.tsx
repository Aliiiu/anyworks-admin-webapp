import { DashboardLayout } from 'src/components/dashboard';
import { Flex, Table } from 'src/components/ui';
import { kycData } from 'src/constants/KYCDATA';
import { usePagination } from 'src/hooks/usePagination';
import { StyledTableContainer } from 'src/styles/commonStyle';

const KycTableHeaders = [
	{
		title: 'Admin',
		render: (row: any) => (
			<Flex gap='10px' align='center'>
				<img style={{ width: '40px' }} src={row.img} alt='' /> {row.name}
			</Flex>
		),
	},
	{
		title: 'Means of Identification',
		render: (row: any) => `${row.meansOfId}`,
	},
	{
		title: 'Date',
		render: (row: any) => `${row.date}`,
	},
];
const KYCDataGrid = () => {
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 4,
		total: kycData.length,
	});
	const paginatedRows = kycData.slice((page - 1) * limit, page * limit);
	return (
		<DashboardLayout pageTitle='KYC'>
			<StyledTableContainer>
				<div className='wrapper'>
					<div className='table_summary'>{kycData.length} Pending KYC</div>
				</div>
				<div className='table_divider'></div>
				<Table rows={paginatedRows} headers={KycTableHeaders} showHead={true} />
				<Pagination />
			</StyledTableContainer>
		</DashboardLayout>
	);
};

export default KYCDataGrid;
