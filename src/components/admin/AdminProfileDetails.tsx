import React, { FC, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import dropdownIcon from 'src/assets/images/common/dropDown.svg';
import { AdminTypes } from 'src/pages/admin/adminTypes';
import { AdminServices } from 'src/service/AdminServices';
import styled from 'styled-components';

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
							padding-right: 120px;
						}
						td:last-child {
							font-weight: 600;
						}
						td {
							padding-bottom: 5px;
							span {
								margin-right: 5px;
								text-transform: capitalize;
							}
						}
						.status-action {
							font-size: 14px;
							border-radius: 32px;
							display: flex;
							justify-content: center;
							width: max-content;
							padding: 6px 12px;
						}
					}
				}
			}
		}
	}
`;

const AdminProfileDetails: FC<{
	adminEntry: AdminTypes;
	getAdmin: (id: string) => void;
}> = ({ adminEntry, getAdmin }) => {
	const [openRole, setOpenRole] = useState(false);
	const [openStatus, setOpenStatus] = useState(false);

	const suspendActivityHandler = (admin_id: string, action: string) => {
		AdminServices.suspendAdmin(admin_id, action)
			.then((res) => {
				console.log(res.data);
				toast.success(res.data.message);
			})
			.catch((err) => {
				console.log(err.message);
				toast.error(err.response.data.error.message);
			})
			.finally(() => getAdmin(admin_id));
	};
	return (
		<StyledAdminProfileComponent>
			<ToastContainer />
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
									<button
										onClick={() =>
											adminEntry._id &&
											suspendActivityHandler(adminEntry._id, 'activate')
										}
										className='modal_item'
									>
										Active
									</button>
									<button
										onClick={() =>
											adminEntry._id &&
											suspendActivityHandler(adminEntry._id, 'suspend')
										}
										className='modal_item'
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
													background: adminEntry.suspended
														? 'rgba(255, 173, 74, 0.2)'
														: 'rgba(85, 196, 241, 0.2)',
													color: adminEntry.suspended ? '#FFAD4A' : '#55C4F1',
												}}
												className='status-action'
											>
												{adminEntry.suspended ? 'Blocked' : 'Active'}
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</StyledAdminProfileComponent>
	);
};

export default AdminProfileDetails;
