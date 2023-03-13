import checkIcon from 'src/assets/images/common/mark.svg';
import { Flex, Table, ActionMenu } from 'src/components/ui';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';
import { AdminServices } from 'src/service/AdminServices';
import { toast, ToastContainer } from 'react-toastify';
import { AdminTableContainer } from './admin-style';
import avatar from 'src/assets/images/header/avatar.svg';

const AdminTable: FC<{ rows: any; fetchAdmins: Function }> = ({
	rows,
	fetchAdmins,
}) => {
	const [allowRowClick, setAllowRowClick] = useState(true);
	let navigate = useNavigate();

	const handleNavigate = (row: any) => {
		navigate(`/admins/${row?._id || ''}`);
	};
	const suspendActivityHandler = (admin_id: string, action: string) => {
		AdminServices.suspendAdmin(admin_id, action)
			.then((res) => toast.success(res.data.message))
			.catch((err) => toast.error(err.response.data.error.message))
			.finally(() => fetchAdmins());
	};
	const AdminTableHeaders = [
		{
			title: 'Picture',
			render: (row: any) => (
				<div
					style={{
						backgroundImage: `url(${row?.display_picture || avatar})`,
						width: '40px',
						height: '40px',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						backgroundSize: 'contain',
						boxShadow:
							'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
						borderRadius: '50%',
					}}
				></div>
			),
		},
		{ title: 'First Name', render: (row: any) => `${row.first_name}` },
		{ title: 'Last Name', render: (row: any) => `${row.last_name}` },
		{ title: 'Email', render: (row: any) => `${row.email}` },
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
				<p className='count'>
					{rows.length > 1 ? rows.length + ' Admins' : rows.length + ' Admin'}
				</p>
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
