import { useNavigate } from 'react-router-dom';
import { usePagination } from 'src/hooks/usePagination';
import { FC, useState } from 'react';
import { ActionMenu, Flex, Table } from 'src/components/ui';
import filterIcon from 'src/assets/images/common/filter.svg';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';
import { FilterButton, StyledTableContainer } from 'src/styles/commonStyle';

const ArtisanTable: FC<{ filteredData: any }> = ({ filteredData }) => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	let navigate = useNavigate();
	const ArtisanTableHeaders = [
		{
			title: 'Admin',
			render: (row: any) => (
				<Flex gap='10px' align='center'>
					<img style={{ width: '40px' }} src={row.img} alt='' /> {row.name}
				</Flex>
			),
		},
		{
			title: 'Email',
			render: (row: any) => `${row.email}`,
		},
		{
			title: 'Registration Date',
			render: (row: any) => `${row.registrationDate}`,
		},
		{
			title: 'Last Login',
			render: (row: any) => `${row.lastLogin}`,
		},
		{
			title: 'Status',
			render: (row: any) => (
				<div
					style={{
						color: row.status === 'Online' ? '#55C4F1' : '#FFAD4A',
					}}
				>
					{row.status}
				</div>
			),
		},
		{
			title: '',
			render: (row: any, index: any) => (
				<ActionMenu
					actions={[
						{
							title: 'View profile',
							onClick: () => navigate(`/artisans/${index + 1}`),
						},
						{
							title: 'Send email',
							onClick: () => handleOpenMailModal(),
						},
						{
							title: 'Send notification',
							onClick: () => handleOpenNotificationModal(),
						},
					]}
				/>
			),
		},
	];

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 5,
		total: filteredData.length,
	});
	const paginatedRows = filteredData.slice((page - 1) * limit, page * limit);
	return (
		<StyledTableContainer>
			<div className='wrapper'>
				<div style={{ width: 120 }} className='table_summary'>
					{filteredData.length} Artisans
				</div>
				<FilterButton>
					<img src={filterIcon} alt='' width={24} height='24px' />
					Filter
				</FilterButton>
			</div>
			<div className='table_divider'></div>
			<SendMailModal
				open={openSendMailModal}
				handleClose={handleCloseMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				handleClose={handleCloseNotificationModal}
			/>
			<Table rows={paginatedRows} headers={ArtisanTableHeaders} showHead />
			<Pagination />
		</StyledTableContainer>
	);
};

export default ArtisanTable;
