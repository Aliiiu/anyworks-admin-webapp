import React from 'react';
import { useNavigate } from 'react-router-dom';
import { kycData } from 'src/constants/KYCDATA';
import styled from 'styled-components';

interface KColumnProps {
	field: string;
}
const kycColumn: KColumnProps[] = [
	{
		field: 'Name',
	},
	{
		field: 'Means of Identification',
	},
	{
		field: 'Date',
	},
];

const KycTableContainer = styled.div`
	table {
		width: 100%;
		border-colapse: collapse;
		font-size: 15px;
		text-align: left;

		thead {
			tr {
				background-color: ${(props) => props.theme.colors.ui_07};
				th {
					font-weight: 600;
					color: ${(props) => props.theme.colors.text_01};
					font-size: 18px;
					padding: 15px 10px;
					white-space: nowrap;
					&:first-child {
						padding-left: 45px;
					}
					&:last-child {
						padding-right: 20px;
					}
				}
			}
		}

		tbody {
			color: ${(props) => props.theme.colors.text_01};
			tr {
				cursor: pointer;
				&:hover {
					background-color: ${(props) => props.theme.colors.gray_01};
				}
			}
			tr:nth-child(odd) {
				background-color: ${(props) => props.theme.colors.gray_02};
			}
			td {
				padding: 10px;
				white-space: nowrap;
				&:first-child {
					padding-left: 45px;
				}
			}
		}
	}
`;
const KycTable = () => {
	let navigate = useNavigate();
	return (
		<KycTableContainer>
			<table>
				<thead>
					<tr>
						{kycColumn.map((item, id) => (
							<th key={id}>{item.field}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{kycData.map((item, id) => (
						<tr key={id} onClick={() => navigate('/artisan-kyc')}>
							<td style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
								<img src={item.img} alt='' width={40} />
								{item.name}
							</td>
							<td>{item.meansOfId}</td>
							<td>{item.date}</td>
						</tr>
					))}
				</tbody>
			</table>
		</KycTableContainer>
	);
};

export default KycTable;
