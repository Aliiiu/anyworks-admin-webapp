import { useNavigate } from 'react-router-dom';
import { usePagination } from 'src/hooks/usePagination';
import { useEffect, useState } from 'react';
import { ActionMenu, Flex, Table } from 'src/components/ui';
import filterIcon from 'src/assets/images/common/filter.svg';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';
import { DashboardLayout } from 'src/components/dashboard';
import { FilterButton } from 'src/styles/commonStyle';
import { useBoolean } from 'src/hooks/useBoolean';
import { Popover } from 'react-tiny-popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import styled from 'styled-components';
import { Input } from 'src/components/inputs';
import { ARTISANData } from 'src/constants/ARTISANDATA';
import searchIcon from 'src/assets/images/input/searchIcon.svg';
import { ArtisansServices } from 'src/service/ArtisansServices';

const PopupContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
		0px 4px 6px -2px rgba(16, 24, 40, 0.03);
	border-radius: 8px;
`;

interface Props {
	handleChangeSearch: (e: any) => void;
}

export const RhsHeading: React.FC<Props> = ({ handleChangeSearch }) => (
	<Input
		icon={<img src={searchIcon} alt='searchIcon' />}
		type='search'
		placeholder='Search'
		handleChange={handleChangeSearch}
	/>
);

const ArtisanTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 2rem 0;
	border-radius: 16px;
	padding-bottom: 20px;
	.heading {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
		padding: 20px;

		.count {
			font-weight: 700;
			font-size: 17px;
			line-height: 27px;
			color: ${(props) => props.theme.colors.purple};
			background-color: ${(props) => props.theme.colors.gray_04};
			padding: 4px 12px;
			width: max-content;
			border-radius: 16px;
		}
	}
`;

const ArtisanTable = () => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	const [selectedFilterValue, setSelectedFilterValue] = useState('all');
	const [searchField, setSearchField] = useState('');
	const [allArtisans, setAllArtisans] = useState<any[]>([]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFilterValue(event.target.value);
	};

	const fetchAllArtisans = () => {
		ArtisansServices.getAllArtisans()
			.then((res) => setAllArtisans(res.data))
			.catch((err: any) => console.log(err.response));
	};

	useEffect(() => {
		fetchAllArtisans();
		console.log(allArtisans);
	}, []);
	const filteredData = ARTISANData.filter((data: any) => {
		return (
			data?.name?.toLowerCase().includes(searchField.toLowerCase()) ||
			data?.status?.toLowerCase().includes(searchField.toLowerCase())
		);
	});

	const sortedData = () => {
		if (selectedFilterValue === 'all') {
			return filteredData;
		} else if (selectedFilterValue === 'offline') {
			return filteredData.filter((item: any) =>
				item.status.toLowerCase().includes('offline')
			);
		} else if (selectedFilterValue === 'online') {
			return filteredData.filter((item: any) =>
				item.status.toLowerCase().includes('online')
			);
		} else {
			return filteredData;
		}
	};

	let navigate = useNavigate();
	const [allowRowClick, setAllowRowClick] = useState(true);

	const handleNavigate = (id: any) => {
		navigate(`/artisans/${id + 1}`);
	};

	const ArtisanTableHeaders = [
		{
			title: 'First Name',
			render: (row: any) => `${row.name}`,
		},
		{
			title: 'Last Name',
			render: (row: any) => `${row.name}`,
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
			title: 'DP',
			render: (row: any) => (
				<img style={{ width: '40px' }} src={row.img} alt='' />
			),
		},
		{
			title: 'Gender',
			render: (row: any) => `${row.registrationDate}`,
		},
		{
			title: 'Occupation',
			render: (row: any) => `${row.lastLogin}`,
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
		total: sortedData().length,
	});
	const paginatedRows = sortedData().slice((page - 1) * limit, page * limit);
	const { value: isOpen, setFalse: closeAction, toggle } = useBoolean(false);

	const handleChangeSearch = (e: any) => {
		setSearchField(e.target.value);
	};
	return (
		<DashboardLayout
			pageTitle='Artisans'
			rhsHeading={<RhsHeading handleChangeSearch={handleChangeSearch} />}
		>
			<ArtisanTableContainer>
				<div className='heading'>
					<Flex justify='space-between' align='center'>
						<p className='count'>{sortedData().length} Users</p>
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
					handleClose={handleCloseMailModal}
				/>
				<SendNotificationModal
					open={openSendNotificationModal}
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
		</DashboardLayout>
	);
};

export default ArtisanTable;
