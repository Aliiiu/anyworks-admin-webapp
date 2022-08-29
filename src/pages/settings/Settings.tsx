import React from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import profileIcon from 'src/assets/images/common/profileIcon.svg';
import { Input } from 'src/styles/commonStyle';

const SettingsContainer = styled.div`
	background: #ffffff;
	border-radius: 16px;
	padding: 35px;
	.profile_wrapper {
		display: grid;
		grid: auto / auto auto;
		.input_container {
			display: flex;
			flex-direction: column;
			margin-top: 20px;
			gap: 6px;
		}
	}
	.action_btn {
		margin-top: 15px;
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		padding: 12px 20px;
		background: #7e00c4;
	}
	.change_password_container {
		margin-top: 36px;
		padding-bottom: 50px;
		.input_wrapper {
			margin-top: 24px;
			display: grid;
			grid: auto / auto auto;
			.input_container {
				display: flex;
				flex-direction: column;
				gap: 6px;
			}
		}
	}
`;
const Settings = () => {
	return (
		<DashboardLayout pageTitle='Settings'>
			<SettingsContainer>
				<h3>Personal Information</h3>
				<div style={{ position: 'relative', width: 150, marginTop: 20 }}>
					<img
						src='/images/profilePics.png'
						alt=''
						width={150}
						height='150px'
					/>
					<img
						src={profileIcon}
						alt=''
						width={45}
						height='45px'
						style={{ position: 'absolute', bottom: 5, right: -10 }}
					/>
				</div>
				<div className='profile_wrapper'>
					{personalData.map((item, id) => (
						<div key={id} className='input_container'>
							<label htmlFor={item.for}>{item.label}</label>
							<Input placeholder={item.placeholder} type={item.type} />
						</div>
					))}
				</div>
				<button className='action_btn'>Update Profile</button>

				<div className='change_password_container'>
					<h3>Change Password</h3>
					<div className='input_wrapper'>
						<div className='input_container'>
							<label htmlFor='password'>Old Password</label>
							<Input placeholder='***************' type={'password'} />
						</div>
						<div className='input_container'>
							<label htmlFor='password'>New Password</label>
							<Input placeholder='***************' type={'password'} />
						</div>
					</div>
					<button className='action_btn'>Update Password</button>
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
		placeholder: 'Olajide Olajide',
		type: 'text',
	},
	{
		label: 'Email',
		for: 'email',
		placeholder: 'Olajide@gmail.com',
		type: 'email',
	},
	{
		label: 'Phone Number',
		for: 'phone_no',
		placeholder: '08089898989',
		type: 'number',
	},
];
