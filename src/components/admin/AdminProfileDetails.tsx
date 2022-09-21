import React, { FC } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { AdminTypes } from 'src/pages/admin/adminTypes';
import { AdminServices } from 'src/service/AdminServices';
import MenuItem from '@mui/material/MenuItem';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
	MUIStyledButton,
	StyledAdminProfileComponent,
	StyledMenu,
	StyledMenuStatus,
} from './admin-style';

const AdminProfileDetails: FC<{
	adminEntry: AdminTypes;
	getAdmin: (id: string) => void;
}> = ({ adminEntry, getAdmin }) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [anchorRoleEl, setAnchorRoleEl] = React.useState<null | HTMLElement>(
		null
	);
	const open = Boolean(anchorEl);
	const openRole = Boolean(anchorRoleEl);

	const handleRoleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorRoleEl(event.currentTarget);
	};
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleRoleClose = () => {
		setAnchorRoleEl(null);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
			.finally(() => {
				getAdmin(admin_id);
				setAnchorEl(null);
			});
	};
	return (
		<StyledAdminProfileComponent>
			<ToastContainer />
			<div className='admin_profile_details'>
				<div className='profile_header'>
					<h3>Profile Information</h3>
					<div className='profile_status_wrapper'>
						<div>
							<MUIStyledButton
								id='demo-customized-button'
								aria-controls={openRole ? 'demo-customized-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={openRole ? 'true' : undefined}
								variant='outlined'
								color='inherit'
								disableElevation
								onClick={handleRoleClick}
								endIcon={<KeyboardArrowDownIcon />}
							>
								Roles
							</MUIStyledButton>
							<StyledMenu
								id='demo-customized-menu'
								MenuListProps={{
									'aria-labelledby': 'demo-customized-button',
								}}
								anchorEl={anchorRoleEl}
								open={openRole}
								onClose={handleRoleClose}
							>
								<MenuItem disableRipple>
									Admin Manager
									{adminEntry.role.includes('adminManager') ? (
										<Check sx={{ color: '#7E00C4' }} />
									) : (
										''
									)}
								</MenuItem>
								<MenuItem disableRipple>
									Artisan Manager{' '}
									{adminEntry.role.includes('artisanManager') ? (
										<Check sx={{ color: '#7E00C4' }} />
									) : (
										''
									)}
								</MenuItem>
								<MenuItem disableRipple>
									Booking Manager{' '}
									{adminEntry.role.includes('bookingManager') ? (
										<Check sx={{ color: '#7E00C4' }} />
									) : (
										''
									)}
								</MenuItem>
								<MenuItem disableRipple>
									User Manager{' '}
									{adminEntry.role.includes('userManager') ? (
										<Check sx={{ color: '#7E00C4' }} />
									) : (
										''
									)}
								</MenuItem>
							</StyledMenu>
						</div>
						<div>
							<MUIStyledButton
								id='demo-customized-button'
								aria-controls={open ? 'demo-customized-menu' : undefined}
								aria-haspopup='true'
								aria-expanded={open ? 'true' : undefined}
								variant='outlined'
								color='inherit'
								disableElevation
								onClick={handleClick}
								endIcon={<KeyboardArrowDownIcon />}
							>
								Status
							</MUIStyledButton>
							<StyledMenuStatus
								id='demo-customized-menu'
								MenuListProps={{
									'aria-labelledby': 'demo-customized-button',
								}}
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
							>
								<MenuItem
									onClick={() =>
										adminEntry._id &&
										suspendActivityHandler(adminEntry._id, 'activate')
									}
									disableRipple
								>
									Active
									{adminEntry.suspended ? (
										''
									) : (
										<Check sx={{ color: '#7E00C4' }} />
									)}
								</MenuItem>
								<MenuItem
									onClick={() =>
										adminEntry._id &&
										suspendActivityHandler(adminEntry._id, 'suspend')
									}
									disableRipple
								>
									Block
									{adminEntry.suspended ? (
										<CloseIcon sx={{ color: 'red' }} />
									) : (
										''
									)}
								</MenuItem>
							</StyledMenuStatus>
						</div>
					</div>
				</div>
				<div className='profile_details_wrapper'>
					<img
						src={adminEntry.display_picture}
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
											{adminEntry.role.includes('adminManager')
												? 'Admin Manager,'
												: ''}
											{adminEntry.role.includes('artisanManager')
												? 'Artisan Manager,'
												: ''}
											{adminEntry.role.includes('bookingManager')
												? 'Booking Manager,'
												: ''}
											{adminEntry.role.includes('userManager')
												? 'User Manager'
												: ''}
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
