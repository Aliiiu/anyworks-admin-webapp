import { TableContainer } from '../admin/AdminTable';
import { WALLETData } from 'src/constants/WALLETDATA';
import usePagination from 'src/hooks/usePagination';

interface ColumnProps {
	field: string;
}
const tableColumn: ColumnProps[] = [
	{
		field: 'Date',
	},
	{
		field: 'Type',
	},
	{
		field: 'Amount',
	},
	{
		field: 'Remarks/narration',
	},
];

const WalletTable = () => {
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 3,
		total: WALLETData.length,
	});

	const paginatedRows = WALLETData.slice((page - 1) * limit, page * limit);

	return (
		<TableContainer>
			<table>
				<thead>
					<tr>
						{tableColumn.map((item, id) => (
							<th
								key={id}
								style={{ width: item.field === 'Admin' ? 350 : 'auto' }}
							>
								{item.field}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedRows.map((item, id) => (
						<tr key={id + 1}>
							<td>{item.date}</td>
							<td>{item.type}</td>
							<td>{item.amount}</td>
							<td>{item.remarks}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination />
		</TableContainer>
	);
};

export default WalletTable;
