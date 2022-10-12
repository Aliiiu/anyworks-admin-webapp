import React from 'react';
import { usePagination } from 'src/hooks';
import { AdminTableContainer } from '../admin/admin-style';
import { Table } from '../ui';

type Props = { rows: any };

const OccupationTable = ({ rows }: Props) => {
	const AdminTableHeaders = [
		// { title: 'ID', render: (row: any) => `${row.id}` },
		{ title: 'Bank Name', render: (row: any) => `${row.name}` },
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
export default OccupationTable;
