import React from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import { Input } from 'src/styles/commonStyle';

const SettingsContainer = styled.div`
	background: #ffffff;
	border-radius: 16px;
	margin-top: 30px;
	padding: 35px;
	height: 70vh;
	.change_password_container {
		padding-bottom: 50px;
		.input_wrapper {
			margin-top: 24px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			max-width: 553px;
			gap: 20px;
			.input_container {
				display: flex;
				flex-direction: column;
				gap: 6px;
				width: 100%;
			}
			button {
				background: #7e00c4;
				padding: 12px 20px;
				color: white;
				border-radius: 8px;
			}
		}
	}
`;
const Settings = () => {
	return (
		<DashboardLayout pageTitle='Settings'>
			<SettingsContainer>
				<div className='change_password_container'>
					<h3>Change Password</h3>
					<form className='input_wrapper'>
						<div className='input_container'>
							<label htmlFor='password'>Old Password</label>
							<Input placeholder='***************' type={'password'} />
						</div>
						<div className='input_container'>
							<label htmlFor='password'>New Password</label>
							<Input placeholder='***************' type={'password'} />
						</div>
						<div className='input_container'>
							<label htmlFor='password'>Confirm Password</label>
							<Input placeholder='***************' type={'password'} />
						</div>
						<button className='action_btn'>Update Password</button>
					</form>
				</div>
			</SettingsContainer>
		</DashboardLayout>
	);
};

export default Settings;

const personalData = [
	{
		label: 'Name',
		for: 'name',
		placeholder: 'Admin Fullname',
		type: 'text',
	},
	{
		label: 'Email',
		for: 'email',
		placeholder: 'admin@gmail.com',
		type: 'email',
	},
	{
		label: 'Phone Number',
		for: 'phone_no',
		placeholder: '08089898989',
		type: 'number',
	},
];
