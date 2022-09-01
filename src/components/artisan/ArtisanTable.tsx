import { useNavigate } from 'react-router-dom';
import { usePagination } from 'src/hooks/usePagination';
import { FC, useEffect, useState } from 'react';
import { ActionMenu, Flex, Table } from 'src/components/ui';
import filterIcon from 'src/assets/images/common/filter.svg';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';
import { FilterButton, StyledTableContainer } from 'src/styles/commonStyle';
import { useBoolean } from 'src/hooks/useBoolean';
import { Popover } from 'react-tiny-popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components';

const PopupContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
		0px 4px 6px -2px rgba(16, 24, 40, 0.03);
	border-radius: 8px;
`;

const ArtisanTable: FC<{ filteredData: any }> = ({ filteredData }) => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	const [sortedData, setSortedData] = useState(filteredData);
	const [checkedOnline, setCheckedOnline] = useState(false);
	const [checkedOffline, setCheckedOffline] = useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedOnline(event.target.checked);
	};
	const handleOfflineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckedOffline(event.target.checked);
	};
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

	const sortData = () => {
		if (checkedOnline) {
			const sorted = filteredData.filter((item: any) =>
				item.status.toLowerCase().includes('online')
			);
			console.log(filteredData);
			setSortedData(sorted);
			return '';
		}
		if (checkedOffline) {
			const sorted = filteredData.filter((item: any) =>
				item.status.toLowerCase().includes('offline')
			);
			setSortedData(sorted);
			return '';
		} else {
			setSortedData(filteredData);
			return '';
		}
	};

	useEffect(() => {
		sortData();
	}, [checkedOnline, checkedOffline]);

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 5,
		total: filteredData.length,
	});
	const paginatedRows = sortedData.slice((page - 1) * limit, page * limit);
	const { value: isOpen, setFalse: closeAction, toggle } = useBoolean(false);
	return (
		<StyledTableContainer>
			<div className='wrapper'>
				<div style={{ width: 120 }} className='table_summary'>
					{sortedData.length} Artisans
				</div>
				<Popover
					isOpen={isOpen}
					padding={1}
					positions={['right', 'left', 'bottom', 'top']} // preferred positions by priority
					content={
						<PopupContainer tabIndex={-1}>
							<FormGroup>
								<FormControlLabel
									style={{ padding: '0px 0 0 18px' }}
									control={
										<Checkbox
											checked={checkedOnline}
											onChange={handleChange}
											size='small'
										/>
									}
									label='Online'
								/>
								<div style={{ borderBottom: '1px solid #F2F4F7' }}></div>
								<FormControlLabel
									style={{ padding: '0px 0 0 18px' }}
									control={
										<Checkbox
											checked={checkedOffline}
											onChange={handleOfflineChange}
											size='small'
										/>
									}
									label='Offline'
								/>
							</FormGroup>
						</PopupContainer>
					}
					onClickOutside={closeAction}
				>
					<FilterButton onClick={toggle}>
						<img src={filterIcon} alt='' width={24} height='24px' />
						Filter
					</FilterButton>
				</Popover>
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
