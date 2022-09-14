import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import dropdownIcon from 'src/assets/images/common/dropDown.svg';
import filterIcon from 'src/assets/images/common/filter.svg';
import { useEffect, useState } from 'react';
import { FilterButton } from 'src/styles/commonStyle';
import { WALLETData } from 'src/constants/WALLETDATA';
import { Link, useParams } from 'react-router-dom';
import { Flex, Table, Button, ButtonClass } from 'src/components/ui';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import { formatDate } from 'src/utils/helpers';
import { DateRangeFilter } from 'src/components/common';
import { addDays } from 'date-fns';
import { AdminServices } from 'src/service/AdminServices';
import { AdminTypes } from './adminTypes';

export const StyledProfileHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-size: 36px;
		font-weight: 700;
		color: ${(props) => props.theme.colors.text_01};
	}
	.add_admin_btn {
		background: ${(props) => props.theme.colors.purple};
		color: #ffffff;
		font-weight: 500;
		font-size: 16px;
		display: flex;
		gap: 10px;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		padding: 12px 20px;
	}
`;

const AdminActivityTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding-bottom: 20px;

	.heading {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
		padding: 20px;

		.title {
			font-weight: 600;
			font-size: 18px;
			line-height: 28px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}
`;

const StyledAdminProfileComponent = styled.div`
	.admin_profile_details {
		margin-top: 36px;
		border-radius: 16px;
		background: #ffffff;
		padding: 24px;
		.profile_header {
			display: flex;
			align-items: start;
			justify-content: space-between;
			h3 {
				font-size: 24px;
				color: #1d2939;
				margin-top: 8px;
			}
			.profile_status_wrapper {
				display: flex;
				gap: 10px;
				.popup_root {
					position: relative;
					.status_btn {
						padding: 12px 16px;
						border-radius: 8px;
						font-size: 16px;
						border: 1px solid #7e00c4;
						display: flex;
						align-items: center;
						gap: 10px;
					}
					.role_modal {
						position: absolute;
						z-index: 2;
						width: 179px;
						right: 5px;
						top: 35px;
						display: flex;
						flex-direction: column;
						border-radius: 8px;
						padding: 3px 0px;
						background: #ffffff;
						border: 1px solid #f2f4f7;
						box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
							0px 4px 6px -2px rgba(16, 24, 40, 0.03);
						.modal_item {
							text-align: left;
							padding: 10px 14px;
							font-size: 14px;
							&:hover {
								background: #f2f4f7;
							}
						}
					}
				}
				.popup_root_status {
					position: relative;
					.status_btn {
						padding: 12px 16px;
						border-radius: 8px;
						font-size: 16px;
						border: 1px solid #7e00c4;
						display: flex;
						align-items: center;
						gap: 10px;
					}
					.role_modal {
						position: absolute;
						z-index: 2;
						width: 109px;
						right: -3px;
						top: 35px;
						display: flex;
						flex-direction: column;
						border-radius: 8px;
						background: #ffffff;
						border: 1px solid #f2f4f7;
						box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
							0px 4px 6px -2px rgba(16, 24, 40, 0.03);
						.modal_item {
							text-align: left;
							padding: 10px 14px;
							font-size: 14px;
							&:hover {
								background: #f2f4f7;
							}
						}
					}
				}
			}
		}
		.profile_details_wrapper {
			margin-top: 40px;
			display: flex;
			gap: 50px;
			.profile_details {
				h4 {
					margin-bottom: 20px;
				}
				.details {
					table {
						width: 100%;
						td:first-child {
							padding-right: 60px;
						}
						td {
							padding-bottom: 5px;
							span {
								margin-right: 5px;
								text-transform: capitalize;
							}
						}
					}
				}
			}
		}
	}
`;
const AdminProfile = () => {
	const [openRole, setOpenRole] = useState(false);
	const [openStatus, setOpenStatus] = useState(false);
	const [adminSelector, setAdminSelector] = useState(false);

	const handleAdminSelector = () => {
		setAdminSelector(true);
	};

	const AdminActivityTableHeaders = [
		{
			title: 'Date',
			render: (row: any) => formatDate(row.date),
		},
		{
			title: 'Action Type',
			render: (row: any) => `${row.type}`,
		},
	];

	//Date filter
	const [openDateFilter, setOpenDateFilter] = useState(false);
	const handleOpenDateFilter = () => setOpenDateFilter(true);
	const handleCloseDateFilter = () => setOpenDateFilter(false);

	const [state, setState] = useState([
		{
			startDate: new Date('2020-01-01'),
			endDate: addDays(new Date(), 0),
			key: 'selection',
			color: theme.colors.darkPurple,
		},
	]);

	const startDate = state[0]?.startDate;
	const endDate = state[0]?.endDate;

	const dateFilteredData = WALLETData.filter((a: any) => {
		const date = new Date(a.date);
		return date >= startDate && date <= endDate;
	});
	const { id } = useParams();
	const [adminEntry, setAdminEntry] = useState<AdminTypes>({
		first_name: '',
		last_name: '',
		email: '',
		role: [],
		suspended: '',
	});
	const getAdmin = (id: string) => {
		AdminServices.getAdmin(id)
			.then((res: any) => {
				res.data.payload.data && setAdminEntry(res.data.payload.data);
			})
			.catch((err: any) => console.log(err.response));
	};
	useEffect(() => {
		// console.log(adminEntry.role.map((item) => ));
		id && getAdmin(id);
	}, []);

	return (
		<DashboardLayout>
			<DateRangeFilter
				open={openDateFilter}
				handleClose={handleCloseDateFilter}
				state={state}
				setState={setState}
			/>
			<StyledAdminProfileComponent>
				<StyledProfileHeader>
					<h2>
						{adminEntry.first_name} {adminEntry.last_name}'s profile
					</h2>
					<Link to='/admins'>
						<Button
							classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
							style={{ backgroundColor: theme.colors.purple }}
						>
							{' '}
							<img src={arrowLeft} alt='back' />
							<span>Back to Admins</span>
						</Button>
					</Link>
				</StyledProfileHeader>
				<div className='admin_profile_details'>
					<div className='profile_header'>
						<h3>Profile Information</h3>
						<div className='profile_status_wrapper'>
							<div className='popup_root'>
								<button
									onClick={() => setOpenRole((prevState) => !prevState)}
									className='status_btn'
								>
									Role
									<img src={dropdownIcon} alt='' width={14} height='14px' />
								</button>
								{openRole && (
									<div className='role_modal'>
										{' '}
										{adminEntry.role &&
											adminEntry.role.map((item, idx) => (
												<button key={idx} className='modal_item'>
													{item}
												</button>
											))}
									</div>
								)}
							</div>
							<div className='popup_root_status'>
								<button
									onClick={() => setOpenStatus((prevState) => !prevState)}
									className='status_btn'
								>
									Status
									<img src={dropdownIcon} alt='' width={14} height='14px' />
								</button>
								{openStatus && (
									<div className='role_modal'>
										{' '}
										<button className='modal_item'>Active</button>
										<button className='modal_item'>Block</button>
									</div>
								)}
							</div>
						</div>
					</div>
					<div className='profile_details_wrapper'>
						<img
							src='/images/profilePics.png'
							alt=''
							width={150}
							height='151px'
						/>
						<div className='profile_details'>
							<h4>
								{adminEntry.first_name && adminEntry.first_name}{' '}
								{adminEntry.last_name && adminEntry.last_name}
							</h4>
							<div className='details'>
								<table>
									<tbody>
										<tr>
											<td className='text key'>First Name</td>
											<td className='text value'>{adminEntry.first_name}</td>
										</tr>
										<tr>
											<td className='text key'>Last Name</td>
											<td className='text value'>{adminEntry.last_name}</td>
										</tr>
										<tr>
											<td className='text key'>Email</td>
											<td className='text value'>{adminEntry.email}</td>
										</tr>

										<tr>
											<td className='text key'>Roles</td>
											<td className='text value'>
												{adminEntry.role.map((item) => (
													<span>{item},</span>
												))}
											</td>
										</tr>
										<tr>
											<td className='text key'>Status</td>
											<td className='text value'>
												<div
													style={{
														fontSize: 14,
														borderRadius: 31,
														background: 'rgba(85, 196, 241, 0.2)',
														padding: '6px 12px',
														width: 68,
														color: '#55C4F1',
													}}
												>
													{!adminEntry.suspended ? 'Active' : 'Blocked'}
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<AdminActivityTableContainer>
					<div className='heading'>
						<Flex justify='space-between' align='center'>
							<p className='title'> Activity Log</p>
							<FilterButton onClick={handleOpenDateFilter}>
								<img src={filterIcon} alt='' width={24} height='24px' />
								Filter
							</FilterButton>
						</Flex>
					</div>

					<Table
						rows={dateFilteredData}
						headers={AdminActivityTableHeaders}
						showHead
						allowRowClick={false}
					/>
				</AdminActivityTableContainer>
			</StyledAdminProfileComponent>
		</DashboardLayout>
	);
};

export default AdminProfile;
