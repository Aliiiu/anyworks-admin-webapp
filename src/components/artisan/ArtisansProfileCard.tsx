import { ProfileInfoContainer } from '../common/ProfileInfo';
import Flex from '../ui/Flex';
import dp from 'src/assets/images/profile/dp.svg';
import phone from 'src/assets/images/profile/phone.svg';
import mail from 'src/assets/images/profile/mail.svg';
import chat from 'src/assets/images/profile/chat.svg';
import close from 'src/assets/images/common/close.svg';
import { Button, ButtonClass } from '../ui';

const ArtisansProfileCard = () => {
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
			<Flex gap='2rem' wrap='wrap'>
				<div className='profile-info--lhs'>
					<Flex direction='column' align='center' gap='1.5rem'>
						<img src={dp} alt='dp' className='dp' />
						<Flex gap='1.5rem'>
							<img src={phone} alt='phone' />
							<img src={mail} alt='mail' />
							<img src={chat} alt='chat' />
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
						<h3 className='name'>Olajide Olajide</h3>
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
										<td className='text value'>Barber</td>
									</tr>
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
										<td className='text key'>City</td>
										<td className='text value'>Abeokuta</td>
									</tr>
									<tr>
										<td className='text key'>State</td>
										<td className='text value'>Ogun</td>
									</tr>
									<tr>
										<td className='text key'>Rating</td>
										<td className='text value'>4.5</td>
									</tr>
									<tr>
										<td className='text key'>Status</td>
										<td className='text value'>Active</td>
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
