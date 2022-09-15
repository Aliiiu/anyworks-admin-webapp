import styled from 'styled-components';
import checkIcon from 'src/assets/images/common/mark.svg';
import { Flex, Table, ActionMenu } from 'src/components/ui';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';

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

	const handleNavigate = (id: string) => {
		navigate(`/admins/${id}`);
	};
	const AdminTableHeaders = [
		{ title: 'First Name', render: (row: any) => `${row.first_name}` },
		{ title: 'Last Name', render: (row: any) => `${row.last_name}` },
		{ title: 'Email', render: (row: any) => `${row.email}` },
		{
			title: 'Roles',
			render: (row: any) => (
				<div>
					{row.role.map((item: any) => (
						<span style={{ textTransform: 'capitalize', marginRight: 5 }}>
							{item},
						</span>
					))}
				</div>
			),
		},
		{
			title: 'Suspended',
			render: (row: any) => (
				<p
					style={{
						color: row.suspended === 'false' ? '#55C4F1' : '#FFAD4A',
					}}
				>
					{String(row.suspended)}
				</p>
			),
		},
		{
			title: '',
			render: (row: any) => (
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
							title: 'Activity Log',
							onClick: () => {
								handleNavigate(row._id);
							},
						},
						{
							title: (
								<Flex justify='space-between'>
									<p onClick={(e: any) => console.log('activate')}>Active</p>
									<div>
										{row.suspended === 'false' && (
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
									<p>{row.suspended === 'true' && '❌'}</p>
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
