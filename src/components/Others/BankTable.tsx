import { Table } from 'src/components/ui';
import { FC } from 'react';
import usePagination from 'src/hooks/usePagination';
import { AdminTableContainer } from '../admin/admin-style';

const BankTable: FC<{ rows: any }> = ({ rows }) => {
	const AdminTableHeaders = [
		{ title: 'ID', render: (row: any) => `${row.id}` },
		{ title: 'Slug Name', render: (row: any) => `${row.slug}` },
		{ title: 'Bank Name', render: (row: any) => `${row.name}` },
		{ title: 'Pay with Bank', render: (row: any) => `${row.pay_with_bank}` },
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
				<p className='count'>{rows.length} Banks</p>
			</div>
			<Table rows={paginatedRows} headers={AdminTableHeaders} showHead={true} />
			<Pagination />
		</AdminTableContainer>
	);
};

export default BankTable;
