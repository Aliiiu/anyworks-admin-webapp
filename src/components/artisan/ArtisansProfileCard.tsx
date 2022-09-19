import { ProfileInfoContainer } from '../common/ProfileInfo';
import Flex from '../ui/Flex';
import dp from 'src/assets/images/profile/dp.svg';
import phone from 'src/assets/images/profile/phone.svg';
import mail from 'src/assets/images/profile/mail.svg';
import chat from 'src/assets/images/profile/chat.svg';
import close from 'src/assets/images/common/close.svg';
import { Button, ButtonClass } from '../ui';
import { useEffect, useState } from 'react';
import SendMailModal from '../users/SendMailModal';
import SendNotificationModal from '../users/SendNotificationModal';
import { ArtisansServices } from 'src/service/ArtisansServices';
import { useParams } from 'react-router';

const ArtisansProfileCard = ({
	artisanDetails,
}: {
	artisanDetails: ArtisanProfileDetails;
}) => {
	const [openSendNotificationModal, setOpenSendNotificationModal] =
		useState(false);
	const handleOpenNotificationModal = () => setOpenSendNotificationModal(true);
	const handleCloseNotificationModal = () =>
		setOpenSendNotificationModal(false);

	const [openSendMailModal, setOpenSendMailModal] = useState(false);
	const handleOpenMailModal = () => setOpenSendMailModal(true);
	const handleCloseMailModal = () => setOpenSendMailModal(false);
	// const [artisanDetails, setArtisanDetails] = useState<ArtisanProfileDetails>({
	// 	_id: '',
	// 	first_name: '',
	// 	last_name: '',
	// 	email: '',
	// 	occupation: '',
	// 	profile_stage: '',
	// 	phone: '',
	// 	status: '',
	// 	display_picture: '',
	// 	address: {
	// 		house_address: '',
	// 		city: '',
	// 		state: '',
	// 	},
	// });
	// const { id } = useParams();
	// const fetchMe = (id: string) => {
	// 	ArtisansServices.getArtisan(id)
	// 		.then((res) => {
	// 			console.log(res.data.payload.data.artisan);
	// 			setArtisanDetails(res.data.payload.data.artisan);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	// useEffect(() => {
	// 	id && fetchMe(id);
	// }, []);

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
						<img src={artisanDetails.display_picture} alt='dp' className='dp' />
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
								style={{
									width: '100%',
									borderSpacing: 8,
								}}
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
									<tr>
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
									</tr>
									<tr>
										<td className='text key'>Rating</td>
										<td className='text value'>
											{artisanDetails.profile_stage}
										</td>
									</tr>
									<tr>
										<td className='text key'>Status</td>
										<td className='text value'>{artisanDetails.status}</td>
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
