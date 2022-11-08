import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import { formatDateYmd } from 'src/utils/helpers';
import ImageMagnifier from './ImageMagnifier';

const InfoContainer = styled.div`
	display: flex;
	gap: 50px;
	margin-top: 40px;
	.personal_info_container {
		width: 40%;
	}
	.moi_info_container {
		width: 60%;
		/* display: flex;
    justify-content: center; */
	}
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

interface Props {
	artisanKyc: any;
}
const KycPersonalInfo = ({ artisanKyc }: Props) => {
	return (
		<InfoContainer>
			<div className='personal_info_container'>
				<h3>Personal Information</h3>
				<div className='input_container'>
					<label htmlFor='nin'>{artisanKyc?.kyc?.identity_type} Number</label>
					<Input
						disabled
						placeholder='12334545435345'
						value={artisanKyc?.kyc?.identity_no}
						type={'number'}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
				<div className='input_container'>
					<label htmlFor='name'>Full name</label>
					<Input
						disabled
						placeholder='Admin Fullname'
						value={
							artisanKyc?.kyc?.identity_type === 'NIN'
								? artisanKyc?.kyc?.identity_resolved_value?.firstname +
								  ' ' +
								  artisanKyc?.kyc?.identity_resolved_value?.surname
								: artisanKyc?.kyc?.identity_resolved_value?.firstName +
								  artisanKyc?.kyc?.identity_resolved_value?.lastName
						}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
				<div className='input_container'>
					<label htmlFor='phone_no'>Phone number</label>
					<Input
						disabled
						placeholder='08100033300'
						value={
							artisanKyc?.kyc?.identity_type === 'NIN'
								? artisanKyc?.kyc?.identity_resolved_value?.telephoneno
								: artisanKyc?.kyc?.identity_resolved_value?.phoneNumber1
						}
						type={'number'}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
				<div className='input_container'>
					<label htmlFor='dob'>Date of birth</label>
					<Input
						disabled
						placeholder='18/05/1990'
						value={
							artisanKyc?.kyc?.identity_type === 'NIN'
								? artisanKyc?.kyc?.identity_resolved_value?.birthdate
								: artisanKyc?.kyc?.identity_resolved_value?.dateOfBirth
						}
						type={'text'}
						style={{ background: '#F2F4F7' }}
					/>
				</div>
			</div>
			<div className='moi_info_container'>
				<div>
					<h3 style={{ marginBottom: 30 }}>Means of Identification</h3>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center',
						}}
					>
						<ImageMagnifier
							height='300px'
							src={
								artisanKyc?.kyc?.document_url || '/images/driversLicense.png'
							}
						/>
					</div>
				</div>
			</div>
		</InfoContainer>
	);
};

export default KycPersonalInfo;
