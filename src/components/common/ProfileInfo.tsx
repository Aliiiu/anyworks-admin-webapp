import styled from 'styled-components';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import close from 'src/assets/images/common/close.svg';
import dp from 'src/assets/images/profile/dp.svg';
import phone from 'src/assets/images/profile/phone.svg';
import mail from 'src/assets/images/profile/mail.svg';
import chat from 'src/assets/images/profile/chat.svg';
import { useState } from 'react';
import SendMailModal from '../users/SendMailModal';
import { SendNotificationModal } from '../users/SendNotificationModal';

export const ProfileInfoContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 20px;
	.heading {
		margin-bottom: 3rem;
		.title {
			font-weight: 700;
			font-size: 18px;
			line-height: 28px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}

	.profile-info--lhs {
		.dp {
			width: 150px;
			height: 150px;
			border-radius: 50%;
			object-fit: cover;
		}
	}
	.profile-info--rhs {
		.details {
			.text {
				font-size: 16px;
				color: ${(props) => props.theme.colors.text_01};
				padding-bottom: 7px;
				font-weight: 600;
			}
			.key {
				font-weight: 400;
				padding-right: 0px;
			}
		}
	}
`;

export const ProfileInfo = () => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	return (
		<ProfileInfoContainer>
			<div className='heading'>
				<Flex justify='space-between' align='center' wrap='wrap'>
					<h1 className='title'>Profile Information</h1>
					<div>
						<Button classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}>
							{' '}
							<img src={close} alt='x' />
							<span>Deactivate Account</span>
						</Button>
					</div>
				</Flex>
			</div>
			<SendMailModal
				open={openSendMailModal}
				handleClose={handleCloseMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				handleClose={handleCloseNotificationModal}
			/>
			<Flex gap='2rem' wrap='wrap'>
				<div className='profile-info--lhs'>
					<Flex direction='column' align='center' gap='1.5rem'>
						<img src={dp} alt='dp' className='dp' />
						<Flex gap='1.5rem'>
							<a href='tel:+2348110658901'>
								<img src={phone} alt='phone' />
							</a>
							<button onClick={() => handleOpenMailModal()}>
								<img src={mail} alt='mail' />
							</button>
							<button onClick={handleOpenNotificationModal}>
								<img src={chat} alt='chat' />
							</button>
						</Flex>
					</Flex>
				</div>
				<div className='profile-info--rhs'>
					<Flex direction='column' gap='1.5rem'>
						<h3 className='name'>Olajide Olajide</h3>
						<div className='details'>
							<table>
								<tbody>
									<tr>
										<td className='text key'>Email</td>
										<td className='text value'>olajideolajide@gmail.com</td>
									</tr>
									<tr>
										<td className='text key'>Phone number</td>
										<td className='text value'>08189898989</td>
									</tr>
									<tr>
										<td className='text key'>Address</td>
										<td className='text value'>
											No 4, ikorudu street, Ikeja bus stop, Lagos
										</td>
									</tr>
									<tr>
										<td className='text key'>State</td>
										<td className='text value'>Abeokuta</td>
									</tr>
									<tr>
										<td className='text key'>City</td>
										<td className='text value'>Ogun</td>
									</tr>
									<tr>
										<td className='text key'>Rating</td>
										<td className='text value'>4.5</td>
									</tr>
								</tbody>
							</table>
						</div>
					</Flex>
				</div>
			</Flex>
		</ProfileInfoContainer>
	);
};

export default ProfileInfo;
