import React from 'react';
import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';

const InfoContainer = styled.div`
	display: grid;
	grid: auto / auto auto;
	gap: 50px;
	margin-top: 40px;
	.personal_info_container,
	.moi_info_container {
		border-radius: 16px;
		background: #ffffff;
		padding: 30px;
	}
	.input_container {
		display: flex;
		flex-direction: column;
		margin-top: 20px;
		gap: 6px;
	}
`;

const KycPersonalInfo = () => {
	return (
		<InfoContainer>
			<div className='personal_info_container'>
				<h3>Personal Information</h3>
				<div className='input_container'>
					<label htmlFor='nin'>NIN Number</label>
					<Input
						placeholder='12334545435345'
						type={'number'}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
				<div className='input_container'>
					<label htmlFor='name'>Full name</label>
					<Input
						placeholder='Olajide Olajide Olajide'
						style={{ background: '#F2F4F7' }}
					/>
				</div>
				<div className='input_container'>
					<label htmlFor='phone_no'>Phone number</label>
					<Input
						placeholder='08100033300'
						type={'number'}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
				<div className='input_container'>
					<label htmlFor='dob'>Date of birth</label>
					<Input
						placeholder='18/05/1990'
						type={'date'}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
			</div>
			<div className='moi_info_container'>
				<h3 style={{ marginBottom: 30 }}>Means of Identification</h3>
				<img
					src='/images/driversLicense.png'
					alt="Driver's License"
					width={568}
					height='315px'
				/>
			</div>
		</InfoContainer>
	);
};

export default KycPersonalInfo;
