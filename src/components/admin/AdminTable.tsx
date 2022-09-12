import styled from 'styled-components';
import checkIcon from 'src/assets/images/common/mark.svg';
import { Flex, Table, ActionMenu } from 'src/components/ui';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';
import { AdminStatus } from './AdminStatus';

const AdminTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
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

const AdminTable: FC<{ rows: any }> = ({ rows }) => {
	const [allowRowClick, setAllowRowClick] = useState(true);
	let navigate = useNavigate();

	const handleNavigate = (id: any) => {
		navigate(`/admins/${id + 1}`);
	};
	const AdminTableHeaders = [
		{ title: 'Admin', render: (row: any) => `${row.admin}` },
		{ title: 'Last login', render: (row: any) => `${row.lastlogin}` },
		{ title: 'Roles', render: (row: any) => `${row.role}` },
		{
			title: 'Status',
			render: (row: any) => (
				<div
					style={{
						color: row.status === 'Active' ? '#55C4F1' : '#FFAD4A',
					}}
				>
					{row.status}
				</div>
			),
		},
		{
			title: '',
			render: (row: any, id: any) => (
				<ActionMenu
					setAllowRowClick={(bool: boolean) => {
						setAllowRowClick(bool);
					}}
					actions={[
						{
							title: 'View profile',
							onClick: () => {
								handleNavigate(id);
							},
						},
						{
							title: 'Activity Log',
							onClick: () => {
								handleNavigate(id);
							},
						},
						{
							title: (
								<Flex justify='space-between'>
									<p>Active</p>
									<div>
										{row.status === 'Active' && (
											<img src={checkIcon} alt='✔️' />
										)}
									</div>
								</Flex>
							),
						},
						{
							title: (
								<Flex justify='space-between'>
									<p>Block</p>
									<p>{row.status === 'Blocked' && '❌'}</p>
								</Flex>
							),
						},
					]}
				/>
			),
		},
	];
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 2,
		total: rows.length,
	});
	const paginatedRows = rows.slice((page - 1) * limit, page * limit);

	return (
		<AdminTableContainer>
			<div className='heading'>
				<p className='count'>{rows.length} Admins</p>
			</div>
			<Table
				rows={paginatedRows}
				headers={AdminTableHeaders}
				showHead={true}
				allowRowClick={allowRowClick}
				onRowClick={handleNavigate}
			/>
			<Pagination />
		</AdminTableContainer>
	);
};

export default AdminTable;
