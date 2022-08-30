import { useParams } from 'react-router-dom';
import { DashboardLayout } from 'src/components/dashboard';
import returnIcon from 'src/assets/images/common/returnIcon.svg';
import styled from 'styled-components';
import dropdownIcon from 'src/assets/images/common/dropDown.svg';
import filterIcon from 'src/assets/images/common/filter.svg';
import { useState } from 'react';
import AddAdminModal from 'src/components/admin/addAdminModal/AddAdminModal';

const StyledAdminProfileComponent = styled.div`
	.pageHeader {
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
			font-szie: 16px;
			display: flex;
			gap: 10px;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			padding: 12px 20px;
		}
	}
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
				.details_item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 400px;
					p,
					h5 {
						font-size: 14px;
					}
					.details_item_tag,
					.details_item_data {
						display: flex;
						flex-direction: column;
						gap: 10px;
					}
				}
			}
		}
	}
	.admin_activity {
		background: #ffffff;
		margin-top: 36px;
		border-radius: 16px;
		padding: 16px 0px;
		.activity_header {
			display: flex;
			padding: 0px 24px;
			align-items: center;
			justify-content: space-between;
			.admin_activity_filter {
				background: #f2f4f7;
				display: flex;
				align-items: center;
				gap: 8px;
				border-radius: 16px;
				padding: 4px 12px;
			}
		}
		.admin_divider {
			margin-top: 16px;
			background: #d0d5dd;
			width: 100%;
			height: 1px;
		}
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
						padding: 12px 24px;
						white-space: nowrap;
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
					padding: 24px 24px;
				}
			}
		}
	}
`;
const AdminProfile = () => {
	const { id } = useParams();
	const [openRole, setOpenRole] = useState(false);
	const [openStatus, setOpenStatus] = useState(false);
	const [adminSelector, setAdminSelector] = useState(false);

	const handleAdminSelector = () => {
		setAdminSelector(true);
	};
	return (
		<DashboardLayout>
			<StyledAdminProfileComponent>
				<div className='pageHeader'>
					<h2>Olajide Olajide's profile</h2>
					<button className='add_admin_btn'>
						<img src={returnIcon} alt='' width={24} height='24px' /> Add new
						admin
					</button>
				</div>
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
										<button
											className='modal_item'
											onClick={handleAdminSelector}
										>
											Admin Manager
										</button>
										<button
											className='modal_item'
											onClick={handleAdminSelector}
										>
											Artisian Manager
										</button>
										<button
											className='modal_item'
											onClick={handleAdminSelector}
										>
											Booking Manager
										</button>
										<button
											className='modal_item'
											onClick={handleAdminSelector}
										>
											User Manager
										</button>
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
										<button
											className='modal_item'
											onClick={handleAdminSelector}
										>
											Active
										</button>
										<button
											className='modal_item'
											onClick={handleAdminSelector}
										>
											Block
										</button>
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
							<h4>Olajide Olajide</h4>
							<div className='details_item'>
								<div className='details_item_tag'>
									<p>Email</p>
									<p>Phone number</p>
									<p>Role</p>
									<p>Status</p>
								</div>
								<div className='details_item_data'>
									<h5>olajideolajide@gmail.com</h5>
									<h5>08189898989</h5>
									<h5>User Admin</h5>
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
										Active
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='admin_activity'>
					<div className='activity_header'>
						<h4>Activity Log</h4>
						<button className='admin_activity_filter'>
							<img src={filterIcon} alt='' width={24} height='24px' />
							Filter
						</button>
					</div>
					<div className='admin_divider'></div>
					<table>
						<thead>
							<tr>
								<th style={{ width: 200 }}>Date</th>
								<th>Action Type</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>06/05/2022</td>
								<td>Login</td>
							</tr>
							<tr>
								<td>06/05/2022</td>
								<td>Login</td>
							</tr>
							<tr>
								<td>06/05/2022</td>
								<td>Login</td>
							</tr>
						</tbody>
					</table>
				</div>
			</StyledAdminProfileComponent>
		</DashboardLayout>
	);
};

export default AdminProfile;
