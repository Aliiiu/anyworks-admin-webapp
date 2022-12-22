import { ProfileInfoContainer } from '../common/ProfileInfo';
import Flex from '../ui/Flex';
import phone from 'src/assets/images/profile/phone.svg';
import mail from 'src/assets/images/profile/mail.svg';
import chat from 'src/assets/images/profile/chat.svg';
import close from 'src/assets/images/common/close.svg';
import { Button, ButtonClass, Loading } from '../ui';
import { useState } from 'react';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';
import { ArtisansServices } from 'src/service/ArtisansServices';
import { toast } from 'react-toastify';
import { useLoading } from 'src/hooks';
import { ClipLoader } from 'react-spinners';

const ArtisansProfileCard = ({
	artisanDetails,
	getArtisan,
}: {
	artisanDetails: ArtisanProfileDetails;
	getArtisan: (id: string) => void;
}) => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const [userEmail, setUserEmail] = useState('');
	const [userName, setUserName] = useState('');
	const { loading, startLoading, stopLoading } = useLoading();
	const [suspendArtisan, setSuspendArtisan] = useState(true);
	const handleOpenMailModal = (email: string, name: string) => {
		setUserEmail(email);
		setUserName(name);
		setOpenSendMailModal(true);
	};
	const handleCloseMailModal = () => setOpenSendMailModal(false);

	const suspendArtisans = () => {
		startLoading();
		if (!artisanDetails.suspended) {
			ArtisansServices.suspendArtisan(artisanDetails._id || '', {
				reason: 'Low rating and complaint raised by a customer',
			})
				.then((res) => {
					console.log(res?.data);
					toast.success(res?.data?.message);
					getArtisan(artisanDetails._id || '');
				})
				.catch((err) => {
					console.log(err.response);
				})
				.finally(() => stopLoading());
		} else {
			ArtisansServices.unSuspendArtisan(artisanDetails._id || '', {
				reason: 'Low rating and complaint raised by a customer',
			})
				.then((res) => {
					console.log(res?.data);
					toast.success(res?.data?.message);
					getArtisan(artisanDetails._id || '');
				})
				.catch((err) => {
					console.log(err.response);
				})
				.finally(() => stopLoading());
		}
	};
	// console.log();

	return (
		<ProfileInfoContainer>
			<div className='heading'>
				<Flex justify='space-between' align='center' wrap='wrap'>
					<h1 className='title'>Profile Information</h1>
					<div>
						<Button
							onClick={() => {
								// setSuspendArtisan((prevState) => !prevState);
								suspendArtisans();
							}}
							classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
							style={{
								backgroundColor: artisanDetails.suspended
									? '#00CCCD'
									: '#EB5656',
							}}
							disabled={loading}
						>
							{loading ? (
								<ClipLoader size={20} />
							) : (
								<>
									{!artisanDetails.suspended && <img src={close} alt='x' />}
									<span>
										{artisanDetails.suspended
											? 'Activate Account'
											: 'Deactivate Account'}
									</span>
								</>
							)}
						</Button>
					</div>
				</Flex>
			</div>
			<SendMailModal
				open={openSendMailModal}
				userEmail={userEmail}
				user={userName}
				handleClose={handleCloseMailModal}
			/>
			<SendNotificationModal
				open={openSendNotificationModal}
				userId={[artisanDetails._id || '']}
				handleClose={handleCloseNotificationModal}
			/>
			<Flex gap='2rem' wrap='wrap'>
				<div className='profile-info--lhs'>
					<Flex direction='column' align='center' gap='1.5rem'>
						<img src={artisanDetails.display_picture} alt='dp' className='dp' />
						<Flex gap='1.5rem'>
							<a href='tel:+2348110658901'>
								<img src={phone} alt='phone' />
							</a>
							<button
								onClick={() =>
									handleOpenMailModal(
										artisanDetails.email,
										artisanDetails.first_name
									)
								}
							>
								<img style={{ cursor: 'pointer' }} src={mail} alt='mail' />
							</button>
							<button onClick={handleOpenNotificationModal}>
								<img style={{ cursor: 'pointer' }} src={chat} alt='chat' />
							</button>
						</Flex>
					</Flex>
				</div>
				<div
					style={{
						width: '70%',
					}}
					className='profile-info--rhs'
				>
					<Flex direction='column' gap='1.5rem'>
						<h3 className='name'>
							{artisanDetails.first_name} {artisanDetails.last_name}
						</h3>
						<div className='details'>
							<table
							// style={{
							// 	width: '100%',
							// 	borderSpacing: 8,
							// }}
							>
								<tbody>
									<tr>
										<td className='text key'>Occupation</td>
										<td className='text value'>{artisanDetails.occupation}</td>
									</tr>
									<tr>
										<td className='text key'>Email</td>
										<td className='text value'>{artisanDetails.email}</td>
									</tr>
									<tr>
										<td className='text key'>Phone number</td>
										<td className='text value'>{artisanDetails.phone}</td>
									</tr>
									<tr>
										<td className='text key'>Address</td>
										<td className='text value'>
											{artisanDetails.address.house_address},{' '}
											{artisanDetails.address.city},{' '}
											{artisanDetails.address.state} State
										</td>
									</tr>
									{/* <tr>
										<td className='text key'>City</td>
										<td className='text value'>
											{artisanDetails.address.city}
										</td>
									</tr>
									<tr>
										<td className='text key'>State</td>
										<td className='text value'>
											{artisanDetails.address.state}
										</td>
									</tr> */}
									<tr>
										<td className='text key'>Rating</td>
										<td className='text value'>{artisanDetails.rating}</td>
									</tr>
									<tr>
										<td className='text key'>Profile Stage</td>
										<td className='text value'>
											{artisanDetails.profile_stage}
										</td>
									</tr>
									<tr>
										<td className='text key'>Status</td>
										<td className='text value'>{artisanDetails.status}</td>
									</tr>
									<tr>
										<td className='text key'>Suspended</td>
										<td className='text value'>
											<div
												style={{
													background: artisanDetails.suspended
														? 'rgba(235, 86, 86, 0.2)'
														: 'rgba(85, 196, 241, 0.2)',
													color: artisanDetails.suspended
														? '#EB5656'
														: '#55C4F1',
												}}
												className='status-action'
											>
												{artisanDetails.suspended ? 'Yes' : 'No'}
											</div>
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

export default ArtisansProfileCard;
