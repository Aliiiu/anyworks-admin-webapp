// import { ADMINData } from 'src/constants/ADMINDATA';
import styled from 'styled-components';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePagination from 'src/hooks/usePagination';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';
import { StyledVerticalMenu } from 'src/styles/commonStyle';

interface ColumnProps {
	field: string;
}
const tableColumn: ColumnProps[] = [
	{
		field: 'Admin',
	},
	{
		field: 'last login',
	},
	{
		field: 'Roles',
	},
	{
		field: 'Status',
	},
	{
		field: '',
	},
];

export const TableContainer = styled.div`
	table {
		width: 100%;
		border-colapse: collapse;
		font-size: 15px;
		text-align: left;
		border-spacing: 0px;
		thead {
			tr {
				background-color: ${(props) => props.theme.colors.ui_07};
				th {
					font-weight: 600;
					color: ${(props) => props.theme.colors.text_01};
					font-size: 18px;
					padding: 20px 20px;
					white-space: nowrap;
				}
			}
		}

		tbody {
			color: ${(props) => props.theme.colors.text_01};
			tr {
				cursor: pointer;
				height: 72px;
				&:hover {
					background-color: ${(props) => props.theme.colors.gray_01};
				}
			}
			tr:nth-child(odd) {
				background-color: ${(props) => props.theme.colors.gray_02};
			}
			td {
				padding: 10px;
				padding-left: 20px;
				white-space: nowrap;
				.admin_profile {
					display: flex;
					gap: 10px;
					align-items: center;
				}
				.status_wrapper {
					width: 182px;
					height: 52px;
					background: #55c4f1;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #ffffff;
				}
				.blocked_status {
					background: #ffad4a;
				}
				.popup_root {
					position: relative;
					.popup_wrapper {
						position: absolute;
						width: 179px;
						z-index: 2;
						right: 45px;
						top: -10px;
						border-radius: 8px;
						background: #ffffff;
						display: flex;
						flex-direction: column;
						.popup_item {
							padding: 15px 20px;
							text-align: left;
							border: none;
							font-size: 14px;
							width: 100%;
							&:first-child {
								&:hover {
									background: #f2f4f7;
									border-radius: 8px 8px 0px 0px;
								}
							}
							&:last-child {
								&:hover {
									background: #f2f4f7;
									border-radius: 0px 0px 8px 8px;
								}
							}
							&:hover {
								background: #f2f4f7;
							}
						}
					}
				}
			}
		}
	}
`;

const AdminTable: FC<{ filteredData: any }> = ({ filteredData }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	let navigate = useNavigate();
	const { page, limit, Pagination } = usePagination({
		page: 1,
		limit: 2,
		total: filteredData.length,
	});
	const paginatedRows = filteredData.slice((page - 1) * limit, page * limit);
	return (
		<TableContainer>
			<table>
				<thead>
					<tr>
						{tableColumn.map((item, id) => (
							<th
								key={id}
								style={{ width: item.field === 'Admin' ? 400 : 'auto' }}
							>
								{item.field}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{paginatedRows.map((item: any, id: any) => (
						<tr key={id + 1}>
							<td>
								<div className='admin_profile'>
									<img src={item.img} alt='' width={40} />
									{item.admin}
								</div>
							</td>
							<td>{item.lastlogin}</td>
							<td>{item.role}</td>
							<td style={{ padding: 0 }}>
								<div
									style={{
										padding: 10,
										width: 203,
										background: '#FFFFFF',
									}}
								>
									<div
										className={clsx('status_wrapper', {
											blocked_status: item.status !== 'Active',
										})}
									>
										{item.status}
									</div>
								</div>
							</td>
							<td>
								<div>
									<IconButton
										aria-label='more'
										id='long-button'
										aria-controls={open ? 'long-menu' : undefined}
										aria-expanded={open ? 'true' : undefined}
										aria-haspopup='true'
										onClick={handleClick}
									>
										<MoreVertIcon />
									</IconButton>
									<StyledVerticalMenu
										id='demo-positioned-menu'
										aria-labelledby='demo-positioned-button'
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										anchorOrigin={{
											vertical: 'center',
											horizontal: 'left',
										}}
										transformOrigin={{
											vertical: 'top',
											horizontal: 'right',
										}}
									>
										<MenuItem
											onClick={() => {
												navigate(`/admins/${id}`);
												handleClose();
											}}
										>
											View Profile
										</MenuItem>
										<Divider />
										<MenuItem onClick={handleClose}>Activity log</MenuItem>
										<Divider />
										<MenuItem onClick={handleClose}>Active</MenuItem>
										<Divider />

										<MenuItem onClick={handleClose}>Block</MenuItem>
									</StyledVerticalMenu>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination />
		</TableContainer>
	);
};

export default AdminTable;
