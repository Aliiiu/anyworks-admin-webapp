import styled from 'styled-components';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import close from 'src/assets/images/common/close.svg';
import phone from 'src/assets/images/profile/phone.svg';
import mail from 'src/assets/images/profile/mail.svg';
import chat from 'src/assets/images/profile/chat.svg';
import { FC, useState } from 'react';
import SendMailModal from '../users/SendMailModal';
import { SendNotificationModal } from '../users/SendNotificationModal';
import avatar from '../../assets/images/header/avatar.svg';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { FiChevronUp } from 'react-icons/fi';

export const tierHandler = (tier: number) => {
	console.log(typeof tier);
	switch (tier) {
		case 1:
			return (
				<div className='flex gap-1 items-center'>
					<p>{tier}</p>
					<img src='/svgs/tier1.svg' alt='tier 1' />
				</div>
			);
		case 2:
			return (
				<div className='flex gap-1 items-center'>
					<p>{tier}</p>
					<img src='/svgs/tier2.svg' alt='tier 2' />
				</div>
			);
		case 3:
			return (
				<div className='flex gap-1 items-center'>
					<p>{tier}</p>
					<img src='/svgs/tier3.svg' alt='tier 3' />
				</div>
			);
		case 4:
			return (
				<div className='flex gap-1 items-center'>
					<p>{tier}</p>
					<img src='/svgs/tier4.svg' alt='tier 4' />
				</div>
			);
		case 5:
			return (
				<div className='flex gap-1 items-center'>
					<p>{tier}</p>
					<img src='/svgs/tier5.svg' alt='tier 5' />
				</div>
			);
		case 6:
			return (
				<div className='flex gap-1 items-center'>
					<p>{tier}</p>
					<img src='/svgs/tier6.svg' alt='tier 6' />
				</div>
			);

		default:
			break;
	}
};

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
				padding-right: 100px;
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
`;

export const ProfileInfo: FC<{ userDetails: { [key: string]: any } }> = ({
	userDetails,
}) => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	// console.log(userDetails?.user?._id);

	return (
		<ProfileInfoContainer>
			<div className='heading'>
				<Flex justify='space-between' align='center' wrap='wrap'>
					<h1 className='font-semibold text-2xl'>Profile Information</h1>
					{/* <div>
						<Button classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}>
							{' '}
							<img src={close} alt='x' />
							<span>Deactivate Account</span>
						</Button>
					</div> */}
				</Flex>
			</div>
			<SendMailModal
				open={openSendMailModal}
				userEmail={userDetails?.user?.email || ''}
				handleClose={handleCloseMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				handleClose={handleCloseNotificationModal}
			/>
			<Flex gap='2rem'>
				<div className='profile-info--lhs'>
					<Flex direction='column' align='center' gap='1.5rem'>
						<img
							src={userDetails?.user?.display_picture || avatar}
							alt='dp'
							className='dp'
						/>
						<Flex gap='1.5rem'>
							<a href='tel:+2348110658901'>
								<img src={phone} alt='phone' />
							</a>
							<button
								style={{ cursor: 'pointer' }}
								onClick={() => handleOpenMailModal()}
							>
								<img src={mail} alt='mail' />
							</button>
							<button
								style={{ cursor: 'pointer' }}
								onClick={handleOpenNotificationModal}
							>
								<img src={chat} alt='chat' />
							</button>
						</Flex>
						<Link
							to={`/verification/customer/${userDetails?.user?._id}/nin-validation`}
							className=' bg-primary py-3 px-2 2xl:px-5 text-white rounded-lg'
						>
							View Verification
						</Link>
					</Flex>
				</div>
				<div className='profile-info--rhs'>
					<Flex direction='column' gap='1.5rem'>
						<h3 className='text-xl font-semibold'>
							{userDetails?.user?.first_name || ''}{' '}
							{userDetails?.user?.last_name || ''}
						</h3>
						<div className='details'>
							<table>
								<tbody>
									<tr>
										<td className='text key'>Email</td>
										<td className='text value'>
											{userDetails?.user?.email || ''}
										</td>
									</tr>
									<tr>
										<td className='text key'>Phone number</td>
										<td className='text value'>
											{userDetails?.user?.phone || ''}
										</td>
									</tr>
									<tr className=''>
										<td className='text key'>Address</td>
										<td>
											<div className='rounded-2xl bg-white'>
												{/* {userDetails?.address?.[0]?.house_address || ''} */}
												<Disclosure>
													{({ open }) => (
														<>
															<Disclosure.Button className='flex gap-4 w-full text-left text-sm font-semibold text-[#4D4D4D] '>
																<p className='flex gap-1 items-center'>
																	<span className=' text-[#7E00C4]'>
																		(Default)
																	</span>
																	<span className=''>
																		{userDetails?.address?.[0]?.house_address ||
																			''}
																	</span>
																</p>
																<FiChevronUp
																	className={`${
																		open ? 'rotate-180 transform' : ''
																	} h-5 w-5 text-[#999999]`}
																/>
															</Disclosure.Button>
															<Disclosure.Panel className='px-4 py-2 text-sm bg-[#F9FAFB] rounded-lg text-gray-500'>
																{userDetails?.address?.map((item: any) => (
																	<p className='text-[#4D4D4D]'>
																		{item?.house_address}
																	</p>
																))}
															</Disclosure.Panel>
														</>
													)}
												</Disclosure>
											</div>
										</td>
									</tr>
									<tr>
										<td className='text key'>City</td>
										<td className='text value'>
											{userDetails?.address?.[0].city || ''}
										</td>
									</tr>
									<tr>
										<td className='text key'>State</td>
										<td className='text value'>
											{userDetails?.address?.[0]?.state || ''}
										</td>
									</tr>
									<tr>
										<td className='text key'>Rating</td>
										<td className='text value flex items-center gap-1'>
											<p>{userDetails?.user?.rating || ''}</p>
											<img src='/svgs/star.svg' alt='' className='w-4 h-4' />
										</td>
									</tr>
									<tr>
										<td className='text key'>Tier</td>
										<td className='text value'>
											{tierHandler(userDetails?.user?.tier)}
										</td>
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
