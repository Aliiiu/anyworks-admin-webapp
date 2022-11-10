import React from 'react';
import { usePagination } from 'src/hooks';
import { AdminTableContainer } from '../admin/admin-style';
import { Table } from '../ui';

type Props = { rows: any };

const OccupationTable = ({ rows }: Props) => {
	const TableHeaders = [
		{
			title: 'Icon',
			render: (row: any) => (
				<img
					style={{
						width: '40px',
						height: 40,
						borderRadius: '50%',
						objectFit: 'cover',
					}}
					src={row?.image || ''}
					alt=''
				/>
			),
		},
		{ title: 'Occupations', render: (row: any) => `${row?.name || ''}` },
		{
			title: 'Category',
			render: (row: any) => `${row?.category_slug || ''}`,
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
				<p className='count'>{rows.length} Occupations</p>
			</div>
			{paginatedRows.length > 0 ? (
				<Table rows={paginatedRows} headers={TableHeaders} showHead={true} />
			) : (
				<div className='flex justify-center py-4'>
					{' '}
					No Available Occupation{' '}
				</div>
			)}

			<Pagination />
		</AdminTableContainer>
	);
};
export default OccupationTable;
