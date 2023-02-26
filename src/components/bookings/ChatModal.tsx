import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styled from 'styled-components';
import closeModal from 'src/assets/images/common/closeModal.svg';
import { theme } from 'src/styles/Theme';
import dp from 'src/assets/images/profile/dp.svg';
import check from 'src/assets/images/bookings/check.svg';
import { Flex } from 'src/components/ui';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import bookingAdminService from 'src/service/BookingAdmin';
import { useLoading } from 'src/hooks';
import { ScaleLoader } from 'react-spinners';
import { IoWarning } from 'react-icons/io5';

const Wrapper = styled.div`
	width: 100%;

	.modal-content {
		max-height: 70vh;
		overflow-y: auto;
		padding-right: 1rem;

		&::-webkit-scrollbar {
			width: 4px;
		}
		&::-webkit-scrollbar-track {
			background-color: ${(props) => props.theme.colors.gray_01};
			border-radius: 10px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: ${(props) => props.theme.colors.purple};
		}
	}

	.text-box {
		font-size: 14px;
		line-height: 24px;
		padding: 10px;
		width: auto;
		max-width: 221px;
	}
	.gray-box {
		color: ${(props) => props.theme.colors.text_01};
		background-color: ${(props) => props.theme.colors.gray_04};
		border-radius: 0px 8px 8px 8px;
		margin-bottom: 8px;
	}
	.purple-box {
		color: ${(props) => props.theme.colors.white};
		background-color: ${(props) => props.theme.colors.purple};
		border-radius: 8px 8px 0px 8px;
	}
	img.person {
		width: 32px;
		height: 32px;
	}
	.time {
		color: ${(props) => props.theme.colors.text_02};
		font-size: 12px;
		line-height: 24px;
	}
`;

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	maxWidth: '90%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	bgcolor: theme.colors.white,
	borderRadius: '8px',
	boxShadow: 24,
	outline: 'none',
	p: '20px',
};

export const ChatModal: React.FC<{
	open: boolean;
	handleClose: () => void;
	customerImg: string;
	vendorImg: string;
}> = ({ open, handleClose, customerImg, vendorImg }) => {
	const { loading, startLoading, stopLoading } = useLoading(false);
	const { id } = useParams();
	const [messages, setMessages] = useState([]);
	const fetchMessages = (booking_id: string) => {
		startLoading();
		bookingAdminService
			.getMessages(booking_id)
			.then((res) => {
				console.log(res?.data?.payload?.data);
				setMessages(res.data?.payload?.data);
			})
			.catch((err) => {
				console.log(err?.response?.data?.error?.message);
				// toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => stopLoading());
	};

	useEffect(() => {
		id && fetchMessages(id);
	}, []);
	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Wrapper>
							<button
								onClick={handleClose}
								style={{ position: 'absolute', top: -15, right: -17 }}
							>
								<img src={closeModal} alt='' width={32} height='32px' />
							</button>
							{loading ? (
								<div className='flex justify-center'>
									<ScaleLoader color='#7E00C4' height={40} width={8} />
								</div>
							) : messages.length > 0 ? (
								<div className='modal-content'>
									<Flex direction='column'>
										{messages.map((message: { [x: string]: any }) =>
											message?.sender === 'artisan' ? (
												<div key={message?._id} className='lhs'>
													{message?.message_type === 'text' ? (
														<div className='gray-box text-box'>
															{message?.message}
														</div>
													) : (
														<img src={message?.message} alt='' />
													)}
													<Flex align='center' gap='8px'>
														<img
															src={vendorImg}
															alt='person'
															className='person rounded-full'
														/>
														<p className='time'>
															{new Date(message?.createdAt).toLocaleTimeString(
																'en-US',
																{ hour: '2-digit', minute: '2-digit' }
															)}
														</p>
													</Flex>
												</div>
											) : (
												<Flex
													key={message?._id}
													align='flex-end'
													direction='column'
													gap='8px'
												>
													<div className='purple-box text-box'>
														{message?.message}
													</div>
													<Flex align='center' gap='8px'>
														<p className='time'>
															{new Date(message?.createdAt).toLocaleTimeString(
																'en-US',
																{ hour: '2-digit', minute: '2-digit' }
															)}
														</p>
														<img
															src={customerImg}
															alt='person'
															className='person rounded-full'
														/>
														<img src={check} alt='check' />
													</Flex>
												</Flex>
											)
										)}
									</Flex>
								</div>
							) : (
								<div className='flex justify-center items-center py-10 px-5'>
									<span className='md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
										<IoWarning size={20} /> There are currently no available
										chat
									</span>
								</div>
							)}
						</Wrapper>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default ChatModal;
