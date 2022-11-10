import React from 'react';
import { usePagination } from 'src/hooks';
import { AdminTableContainer } from '../admin/admin-style';
import { Table } from '../ui';

type Props = { rows: any };

const CategoryTable = ({ rows }: Props) => {
	const TableHeaders = [
		// { title: 'ID', render: (row: any) => `${row.id}` },
		{ title: 'Name', render: (row: any) => `${row.name}` },
		{ title: 'Slug Name', render: (row: any) => `${row.slug}` },
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
				<p className='count'>{rows.length} Categories</p>
			</div>
			{paginatedRows.length > 0 ? (
				<Table rows={paginatedRows} headers={TableHeaders} showHead={true} />
			) : (
				<div className='flex justify-center py-4'>
					{' '}
					No Available Categories{' '}
				</div>
			)}
			<Pagination />
		</AdminTableContainer>
	);
};
export default CategoryTable;
