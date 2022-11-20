import { useNavigate } from 'react-router-dom';
import { usePagination } from 'src/hooks/usePagination';
import { FC, useState } from 'react';
import { ActionMenu, Flex, Table } from 'src/components/ui';
import filterIcon from 'src/assets/images/common/filter.svg';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';
import { FilterButton } from 'src/styles/commonStyle';
import { useBoolean } from 'src/hooks/useBoolean';
import { Popover } from 'react-tiny-popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { ArtisanTableContainer, PopupContainer } from './artisan-style';

const ArtisanTable: FC<{ filteredRow: any }> = ({ filteredRow }) => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const [userId, setUserId] = useState<string[]>([]);
	const handleOpenNotificationModal = (id: string) => {
		setOpenSendNotificationModal(true);
		setUserId((prevState: string[]) => [...prevState, id]);
	};
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [userName, setUserName] = useState('');
	const handleOpenMailModal = (email: string, name: string) => {
		setUserEmail(email);
		setUserName(name);
		setOpenSendMailModal(true);
	};
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	const [selectedFilterValue, setSelectedFilterValue] = useState('all');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFilterValue(event.target.value);
	};

	let navigate = useNavigate();
	const [allowRowClick, setAllowRowClick] = useState(true);

	const handleNavigate = (id: string) => {
		navigate(`/artisans/${id}?tabStatus=all`);
	};

	const ArtisanTableHeaders = [
		{
			title: 'PhotoIcon',
			render: (row: any) => (
				<img
					style={{
						width: '40px',
						height: 40,
						borderRadius: '50%',
						objectFit: 'contain',
					}}
					src={row.display_picture}
					alt=''
				/>
			),
		},
		{
			title: 'First Name',
			render: (row: any) => `${row.first_name}`,
		},
		{
			title: 'Last Name',
			render: (row: any) => `${row.last_name}`,
		},
		{
			title: 'Email',
			render: (row: any) => `${row.email}`,
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
			title: 'Suspended',
			render: (row: any) => (
				<div
					style={{
						color: row.suspended ? '#EB5656' : '#55c4f1',
					}}
				>
					{row.suspended ? 'true' : 'false'}
				</div>
			),
		},
		{
			title: 'Gender',
			render: (row: any) => `${row.gender}`,
		},
		{
			title: 'Occupation',
			render: (row: any) => `${row.occupation}`,
		},

		{
			title: '',
			render: (row: any, index: any) => (
				<ActionMenu
					setAllowRowClick={(bool: boolean) => {
						setAllowRowClick(bool);
					}}
					actions={[
						{
							title: 'View profile',
							onClick: () => handleNavigate(row._id),
						},
						{
							title: 'Send email',
							onClick: () => handleOpenMailModal(row.email, row.first_name),
						},
						{
							title: 'Send notification',
							onClick: () => handleOpenNotificationModal(row._id),
						},
					]}
				/>
			),
		},
	];

	const sortedData = () => {
		if (selectedFilterValue === 'all') {
			return filteredRow;
		} else if (selectedFilterValue === 'offline') {
			return filteredRow.filter((item: any) =>
				item.status.toLowerCase().includes('offline')
			);
		} else if (selectedFilterValue === 'online') {
			return filteredRow.filter((item: any) =>
				item.status.toLowerCase().includes('online')
			);
		} else {
			return filteredRow;
		}
	};

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 10,
		total: sortedData().length,
	});
	const paginatedRows = sortedData().slice((page - 1) * limit, page * limit);
	const { value: isOpen, setFalse: closeAction, toggle } = useBoolean(false);

	return (
		<ArtisanTableContainer>
			<div className='heading'>
				<Flex justify='space-between' align='center'>
					<p className='count'>{sortedData().length} Artisans</p>
					<Popover
						isOpen={isOpen}
						padding={1}
						positions={['right', 'left', 'bottom', 'top']}
						content={
							<PopupContainer tabIndex={-1}>
								<FormGroup>
									<FormControlLabel
										style={{ padding: '0px 0 0 18px' }}
										control={
											<Radio
												checked={selectedFilterValue === 'online'}
												onChange={handleChange}
												value='online'
												name='radio-buttons'
											/>
										}
										label='Online'
									/>
									<div style={{ borderBottom: '1px solid #F2F4F7' }}></div>
									<FormControlLabel
										style={{ padding: '0px 0 0 18px' }}
										control={
											<Radio
												checked={selectedFilterValue === 'offline'}
												onChange={handleChange}
												value='offline'
												name='radio-buttons'
											/>
										}
										label='Offline'
									/>
									<div style={{ borderBottom: '1px solid #F2F4F7' }}></div>
									<FormControlLabel
										style={{ padding: '0px 0 0 18px' }}
										control={
											<Radio
												checked={selectedFilterValue === 'all'}
												onChange={handleChange}
												value='all'
												name='radio-buttons'
											/>
										}
										label='All'
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
				</Flex>
			</div>

			<SendMailModal
				open={openSendMailModal}
				userEmail={userEmail}
				user={userName}
				handleClose={handleCloseMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				userId={userId}
				handleClose={handleCloseNotificationModal}
			/>
			<Table
				rows={paginatedRows}
				headers={ArtisanTableHeaders}
				showHead
				allowRowClick={allowRowClick}
				onRowClick={handleNavigate}
			/>

			<Pagination />
		</ArtisanTableContainer>
	);
};

export default ArtisanTable;
