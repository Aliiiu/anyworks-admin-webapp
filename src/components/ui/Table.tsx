import React from 'react';
import styled from 'styled-components';
import clsx from 'clsx';
import { Loader } from '../common';
import LoadingOverlay from './LoadingOverlay';

const TableOverviewContainer = styled.div`
	overflow-x: auto;
	margin: 20px 0;

	.update_container {
		display: flex;
		justify-content: center;
		width: 100%;
		.data_update {
			font-size: 20px;
			font-weight: 500;
		}
	}

	table {
		width: 100%;
		text-align: left;
		font-size: 15px;
		border-collapse: collapse;

		.align--right {
			text-align: right;
		}

		thead {
			tr {
				background-color: ${(props) => props.theme.colors.ui_07};

				th {
					font-weight: 600;
					line-height: 19px;
					color: ${(props) => props.theme.colors.text_01};
					font-size: 18px;
					padding: 10px;
					white-space: nowrap;

					&:first-child {
						padding-left: 20px;
					}

					&:last-child {
						padding-right: 20px;
					}
				}
			}
		}

		tbody {
			color: ${(props) => props.theme.colors.text_01};

			tr.clickable {
				cursor: pointer;
				&:hover {
					background-color: ${(props) => props.theme.colors.gray_04};
					cursor: pointer;
				}
			}

			tr:nth-child(odd) {
				background-color: ${(props) => props.theme.colors.gray_02};
			}

			td {
				padding: 10px;
				white-space: nowrap;
				height: 60px;
				min-height: 60px;

				&:first-child {
					padding-left: 20px;
				}

				&:last-child {
					padding-right: 20px;
				}
			}

			td.status {
				display: flex;
				align-items: center;
			}
		}
	}

	.modal-heading {
		display: flex;
		justify-content: space-between;

		h2 {
			font-size: 24px;
			line-height: 24px;
			letter-spacing: 0.25px;
			color: ${(props) => props.theme.colors.primaryColor};
		}

		button {
			border: none;
			background-color: ${(props) => props.theme.colors.transparent};
			outline: none;
		}
	}

	/* media-queries */
	@media (max-width: ${(props) => props.theme.breakpoint.sm}) {
		table tbody td:last-child {
			padding-right: 15px;
		}

		table thead tr th:first-child,
		table tbody td:first-child {
			padding-left: 15px;
		}
	}
`;

interface headerType {
	title?: string;
	align?: string;
	render?: Function;
}

// type headerType = headerInt[];

interface Props {
	rows: any;
	headers?: headerType[];
	showHead?: boolean;
	onRowClick?: Function | ((x?: Object) => void);
	allowRowClick?: boolean;
}

export const Table: React.FC<Props> = ({
	headers,
	rows,
	showHead = true,
	onRowClick = () => null,
	allowRowClick = true,
	...rest
}) => {
	return (
		<TableOverviewContainer {...rest}>
			<table>
				{showHead && (
					<thead>
						<tr>
							{headers?.map((header) => {
								return (
									<th
										key={header.title}
										className={clsx({
											'align--right': header.align === 'right',
										})}
									>
										{header.title}
									</th>
								);
							})}
						</tr>
					</thead>
				)}
				<tbody>
					{rows.map((row: any) => (
						<tr
							key={row._id}
							onClick={allowRowClick ? () => onRowClick(row._id) : undefined}
							className={clsx({ clickable: allowRowClick })}
						>
							{headers?.map((header) => {
								return (
									<td
										key={header.title}
										className={clsx({
											'align--right': header.align === 'right',
										})}
									>
										{header && header?.render?.(row)}
									</td>
								);
							})}
						</tr>
					))}
				</tbody>
			</table>
		</TableOverviewContainer>
	);
};
export default Table;
