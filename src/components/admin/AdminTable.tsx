import styled from 'styled-components';
import checkIcon from 'src/assets/images/common/mark.svg';
import { Flex, Table, ActionMenu } from 'src/components/ui';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';
import { AdminServices } from 'src/service/AdminServices';
import { toast, ToastContainer } from 'react-toastify';

const AdminTableContainer = styled.div`
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

const AdminTable: FC<{ rows: any; fetchAdmins: Function }> = ({
	rows,
	fetchAdmins,
}) => {
	const [allowRowClick, setAllowRowClick] = useState(true);
	let navigate = useNavigate();

	const handleNavigate = (id: string) => {
		navigate(`/admins/${id}`);
	};

	const suspendActivityHandler = (admin_id: string, action: string) => {
		AdminServices.suspendAdmin(admin_id, action)
			.then((res) => toast.success(res.data.message))
			.catch((err) => toast.error(err.response.data.error.message))
			.finally(() => fetchAdmins());
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
			title: 'Status',
			render: (row: any) => (
				<p
					style={{
						color: row.suspended ? '#FFAD4A' : '#55C4F1',
					}}
				>
					{row.suspended ? 'Blocked' : 'Active'}
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
									<p>Active</p>
									<div>
										{row.suspended === 'false' && (
											<img src={checkIcon} alt='✔️' />
										)}
									</div>
								</Flex>
							),
							onClick: () => {
								suspendActivityHandler(row._id, 'activate');
							},
						},
						{
							title: (
								<Flex justify='space-between'>
									<p>Block</p>
									<p>{row.suspended === 'true' && '❌'}</p>
								</Flex>
							),
							onClick: () => {
								suspendActivityHandler(row._id, 'suspend');
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
		<AdminTableContainer>
			<div className='heading'>
				<p className='count'>{rows.length} Admins</p>
			</div>
			<ToastContainer />
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
