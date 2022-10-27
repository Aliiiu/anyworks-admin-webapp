import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import styled from 'styled-components';
import { Flex, Button, ButtonClass, Loading } from 'src/components/ui';
import closeIcon from 'src/assets/images/common/closeIcon.svg';
import { theme } from 'src/styles/Theme';
import { AdminServices } from 'src/service/AdminServices';
import { toast, ToastContainer } from 'react-toastify';

const Wrapper = styled.div`
	.heading {
		background-color: ${(props) => props.theme.colors.gray_04};
		padding: 10px 20px;
		height: 56px;
		align-items: center;
		display: flex;
		border-radius: 8px 8px 0 0;

		img {
			padding: 8px;
			&:hover {
				cursor: pointer;
				background-color: ${(props) => props.theme.colors.lilac};
				transition: 0.3s;
				border-radius: 50%;
			}
		}

		p {
			font-weight: 700;
			font-size: 16px;
			line-height: 20px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}

	.content {
		border-radius: 0 0 8px 8px;
		padding: 20px;
		.label {
			font-size: 14px;
			line-height: 20px;
			color: ${(props) => props.theme.colors.text_01};
			margin-bottom: 5px;
		}
		input,
		textarea {
			padding: 10px 14px;
			border: 1px solid ${(props) => props.theme.colors.text_02};
			background-color: ${(props) => props.theme.colors.gray_04};
			color: ${(props) => props.theme.colors.text_01};
			font-size: 16px;
			line-height: 24px;
			box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
			border-radius: 8px;
			width: 100%;
			height: 44px;
			outline: none;
			&:focus {
				border: 1px solid ${(props) => props.theme.colors.purple};
			}
		}

		textarea {
			resize: none;
			height: 235px;
			background-color: ${(props) => props.theme.colors.white};
		}
		.button {
			padding: 8px 15px;
			background-color: ${(props) => props.theme.colors.gray_04};
			border-radius: 8px;
		}
		.error {
			font-weight: 200;
			color: red;
			margin-top: 3px;
		}
	}
`;
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 532,
	maxWidth: '90%',
	bgcolor: theme.colors.white,
	borderRadius: '8px',
	boxShadow: 24,
	outline: 'none',
};

export const SendNotificationModal: React.FC<{
	open: boolean;
	userId?: string[];
	handleClose: () => void;
}> = ({ open, handleClose, userId }) => {
	const [isDisabled, setIsDisabled] = React.useState<boolean>(false);
	const [notificationPayload, setNotificationPayload] = React.useState({
		title: '',
		body: '',
		bodyError: '',
		titleError: '',
	});

	const handleTitleChange = (e: any) => {
		setNotificationPayload({
			...notificationPayload,
			title: e.target.value,
			titleError: '',
		});
	};

	const handleBodyChange = (e: any) => {
		setNotificationPayload({
			...notificationPayload,
			body: e.target.value,
			bodyError: '',
		});
	};
	const submitHandler = (e: any) => {
		e.preventDefault();
		let bodyError = '';
		let titleError = '';
		if (!notificationPayload.title) {
			titleError = 'Please Enter a Title';
		}
		if (!notificationPayload.body) {
			bodyError = 'Please enter a the message';
		}
		if (bodyError || titleError) {
			setNotificationPayload({ ...notificationPayload, bodyError, titleError });
		} else {
			setIsDisabled(true);
			AdminServices.pushNotification({
				id: userId,
				body: notificationPayload.body,
				title: notificationPayload.title,
				target: 'artisan',
			})
				.then((res) => {
					console.log(res?.data);
					toast.success(res?.data.message);
				})
				.catch((err: any) => {
					console.log(err.response);
				})
				.finally(() => {
					setIsDisabled(false);
					setNotificationPayload({
						...notificationPayload,
						title: '',
						body: '',
					});
				});
		}
	};
	return (
		<>
			<ToastContainer />
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
							<div className='heading'>
								<Flex
									justify='space-between'
									align='center'
									style={{ width: '100%' }}
								>
									<p>New notification</p>
									<img src={closeIcon} alt='x' onClick={handleClose} />
								</Flex>
							</div>
							<div className='content'>
								<Flex direction='column'>
									<div className='to'>
										<p className='label'>Title</p>
										<input
											type='text'
											value={notificationPayload.title || ''}
											onChange={handleTitleChange}
										/>

										{notificationPayload.titleError && (
											<h6 className='error'>
												{notificationPayload.titleError}
											</h6>
										)}
									</div>
									<div className='to'>
										<p className='label'>Notification</p>
										<textarea
											value={notificationPayload.body || ''}
											onChange={handleBodyChange}
										/>

										{notificationPayload.bodyError && (
											<h6 className='error'>{notificationPayload.bodyError}</h6>
										)}
									</div>
									<Flex justify='flex-end'>
										<div className='button'>
											<Button
												classes={[ButtonClass.SOLID]}
												onClick={submitHandler}
												disabled={isDisabled}
												style={{
													backgroundColor: theme.colors.purple,
													minWidth: '100px',
													display: 'flex',
													justifyContent: 'center',
												}}
											>
												{isDisabled ? (
													<Loading color='white' />
												) : (
													<span>Send notification</span>
												)}
											</Button>
										</div>
									</Flex>
								</Flex>
							</div>
						</Wrapper>
					</Box>
				</Fade>
			</Modal>
		</>
	);
};

export default SendNotificationModal;
