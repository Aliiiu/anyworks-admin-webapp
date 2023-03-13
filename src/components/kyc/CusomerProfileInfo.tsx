import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import { formatDateYmd } from 'src/utils/helpers';
import { Flex } from 'src/components/ui';
import useLoading from 'src/hooks/useLoading';
import { Controller, useForm } from 'react-hook-form';
import { NumberInput } from '../inputs/NumberInput';

const ProfileContainer = styled.div`
	padding: 40px;
	background: #ffffff;
	width: 100%;
	margin-top: 36px;
	border-radius: 16px;
	h3 {
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 32px;
	}
	.input_wrapper {
		display: grid;
		grid: auto / auto auto;
		gap: 20px;
	}
`;

interface Props {
	verifyData: any;
}

const CustomerProfileInfo = ({ verifyData }: Props) => {
	return (
		<ProfileContainer>
			<h3 className='text-neutral text-3xl'>Profile Information</h3>
			<div
				style={{
					backgroundImage: `url(${
						verifyData?.user?.display_picture || '/images/profilePics.png'
					})`,
					width: '153px',
					height: '153px',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					objectFit: 'cover',
					backgroundSize: 'cover',
					boxShadow:
						'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
					borderRadius: '50%',
				}}
			></div>
			<br />
			<br />
			<Flex direction='column' gap='2.5rem'>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>First Name</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={verifyData?.user?.first_name || ''}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Last Name</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={verifyData?.user?.last_name || ''}
						/>
					</Flex>
				</Flex>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Interests</label>
						<Input
							disabled
							type='text'
							style={{ background: '#F2F4F7' }}
							value={verifyData?.user?.interests}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Date of birth</label>
						<Input
							disabled
							type='date'
							style={{ background: '#F2F4F7' }}
							value={formatDateYmd(verifyData?.user?.dob)}
						/>
					</Flex>
				</Flex>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Residential Address</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={
								verifyData?.address
									? `${verifyData?.address?.house_address},${verifyData?.address?.city}, ${verifyData?.address?.state}`
									: ''
							}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Gender</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={verifyData?.user?.gender}
						/>
					</Flex>
				</Flex>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Email</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={verifyData?.user?.email}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Phone Number</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={verifyData?.user?.phone}
						/>
					</Flex>
				</Flex>
			</Flex>
		</ProfileContainer>
	);
};

export default CustomerProfileInfo;
