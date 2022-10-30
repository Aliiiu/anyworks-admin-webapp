import { useState } from 'react';
import styled from 'styled-components';
import { Flex, Table, ActionMenu } from 'src/components/ui';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SendNotificationModal, SendMailModal } from 'src/components/users';
import { usePagination } from 'src/hooks/usePagination';

const UsersTableContainer = styled.div`
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

interface Props {
	rows: any;
}

export const UsersTable = ({ rows }: Props) => {
	const navigate = useNavigate();
	const [userEmail, setUserEmail] = useState('');
	const [userName, setUserName] = useState('');
	const handleNavigate = (id: string) => {
		navigate(`/users/${id}?tabStatus=all`);
	};

	const [allowRowClick, setAllowRowClick] = useState(true);

	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenSendNotificationModal = () =>
		setOpenSendNotificationModal(true);
	const handleCloseSendNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenSendMailModal = (email: string, name: string) => {
		setUserEmail(email);
		setUserName(name);
		setOpenSendMailModal(true);
	};
	const handleCloseSendMailModal = () => setOpenSendMailModal(false);

	const UsersTableHeaders = [
		{
			title: 'Name',
			render: (row: UsersListTypes) => (
				<Flex gap='10px' align='center'>
					<img
						style={{ width: 40, borderRadius: '50%' }}
						src={row.display_picture}
						alt=''
					/>{' '}
					{row.first_name} {row.last_name}
				</Flex>
			),
		},
		{ title: 'Email', render: (row: UsersListTypes) => `${row.email}` },
		{ title: 'Gender', render: (row: UsersListTypes) => `${row.gender}` },
		// { title: 'Last Login', render: (row: UsersListTypes) => `${row.registrationDate}` },
		{
			title: '',
			render: (row: UsersListTypes) => (
				<ActionMenu
					setAllowRowClick={(bool: boolean) => {
						setAllowRowClick(bool);
					}}
					actions={[
						{
							title: 'View profile',
							onClick: () => {
								handleNavigate(row._id);
							},
						},
						{
							title: 'Send email',
							onClick: () => {
								handleOpenSendMailModal(row.email, row.first_name);
							},
						},
						{
							title: 'Send notification',
							onClick: () => {
								handleOpenSendNotificationModal();
							},
						},
					]}
				/>
			),
		},
	];

	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 10,
		total: rows.length,
	});
	const paginatedRows = rows.slice((page - 1) * limit, page * limit);

	return (
		<UsersTableContainer>
			<div className='heading'>
				<p className='count'>{rows.length} Users</p>
			</div>
			<SendMailModal
				open={openSendMailModal}
				userEmail={userEmail}
				user={userName}
				handleClose={handleCloseSendMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				handleClose={handleCloseSendNotificationModal}
			/>
			<Table
				rows={paginatedRows}
				headers={UsersTableHeaders}
				showHead={true}
				allowRowClick={allowRowClick}
				onRowClick={handleNavigate}
			/>
			<Pagination />
		</UsersTableContainer>
	);
};

export default UsersTable;
