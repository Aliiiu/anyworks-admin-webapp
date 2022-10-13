import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import closeModal from 'src/assets/images/common/closeModal.svg';
import { PhotoCamera } from '@mui/icons-material';
import { AdminServices } from 'src/service/AdminServices';
import { Loading } from 'src/components/ui';
import clsx from 'clsx';
import ModalResponse from './ModalResponse';
import miscService from 'src/service/miscServices';
// import { toast, ToastContainer } from 'react-toastify';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 432,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	bgcolor: 'background.paper',
	borderRadius: '16px',
	boxShadow: 24,
	p: '30px',
};

const StyledForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 10px;
	.btn_action {
		width: 100%;
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		background: #7e00c4;
		padding: 10px 18px;
		border-radius: 8px;
		color: #ffffff;
		font-size: 16px;
		margin-top: 14px;
		border: 1px solid #7e00c4;
		box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
		&:disabled {
			color: black;
		}
	}
	// @media (min-width: ${(props) => props.theme.breakpoint.xl}) {
	// 	background: green;
	// }
`;

export const InputContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	gap: 6px;
	.validation_error {
		color: #f04438;
	}
	.file_wrapper {
		position: relative;
		cursor: pointer;
		width: 100%;
		padding: 8px 12px;
		border-radius: 8px;
		border: 1px solid grey;
		.upload_item {
			display: flex;
			align-items: center;
			justify-content: center;
			max-width: 300px;
			margin: 0 auto;
			.upload_item_container {
				display: flex;
				justify-content: space-between;
				width: 100%;
				align-items: center;
				.delete_icon {
					width: 20px;
					height: 20px;
				}
			}
		}
		.file_item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			input {
				position: absolute;
				cursor: pointer;
				top: 0;
				left: 0;
				widht: 100%;
				height: 100%;
				opacity: 0;
			}
		}
	}
`;

interface occupationTypes {
	name: string;
	nameError: string;
}

const AddOccupationModal: React.FC<{
	open: boolean;
	fetchAdmins: Function;
	handleClose: () => void;
}> = ({ open, handleClose, fetchAdmins }) => {
	const [openResponseModal, setOpenResponseModal] = useState(false);
	const handleOpenModal = () => setOpenResponseModal(true);
	const handleCloseModal = () => setOpenResponseModal(false);
	const [disabled, setDisabled] = useState<boolean>(false);
	// const [showResponse, setShowResponse] = useState<boolean>(false);
	const [showSuccessResponse, setShowSuccessResponse] =
		useState<boolean>(false);
	const [occupationDetails, setOccupationDetails] = useState<occupationTypes>({
		name: '',
		nameError: '',
	});

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (disabled) {
			return;
		}
		let nameError = '';
		if (!occupationDetails.name) {
			nameError = "Email can't be empty";
		}
		if (nameError) {
			setOccupationDetails({
				...occupationDetails,
				nameError,
			});
		} else {
			setDisabled(true);
			miscService
				.addOccupations({ occupations: occupationDetails.name })
				.then((res) => {
					console.log(res.data);
					// setShowSuccessResponse(true);
					// fetchAdmins();
				})
				.catch((err: any) => {
					// setShowSuccessResponse(false);
					console.log(err.response.data.error.message);
				})
				.finally(() => {
					setOccupationDetails((prevState) => ({
						...prevState,
						name: '',
						nameError: '',
					}));
					setDisabled(false);
					// handleOpenModal();
					// handleClose();
				});
		}
	};

	useEffect(() => {
		setShowSuccessResponse(false);
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
						{/* <ToastContainer /> */}
						<button
							onClick={handleClose}
							style={{ position: 'absolute', top: -10, right: -10 }}
						>
							<img src={closeModal} alt='' width={32} height='32px' />
						</button>

						<div style={{ width: '100%' }}>
							<Typography id='transition-modal-title' variant='h3' gutterBottom>
								Add New Occupation
							</Typography>
							<StyledForm onSubmit={submitHandler}>
								<InputContainer>
									<label htmlFor='First Name'>Occupation</label>
									<Input
										value={occupationDetails.name}
										onChange={(e: any) =>
											setOccupationDetails((prevState) => ({
												...prevState,
												name: e.target.value,
												nameError: '',
											}))
										}
										placeholder='name'
										style={{
											width: '100%',
											borderColor: occupationDetails.nameError && '#F04438',
											background: occupationDetails.nameError && '#F9FAFB',
										}}
										className={clsx()}
										required
									/>
									{occupationDetails.nameError && (
										<h6 className='validation_error'>
											{occupationDetails.nameError}
										</h6>
									)}
								</InputContainer>
								<button
									disabled={disabled}
									onClick={submitHandler}
									className='btn_action'
								>
									{disabled ? <Loading color='white' /> : 'Create'}
								</button>
							</StyledForm>
						</div>
					</Box>
				</Fade>
			</Modal>
			<ModalResponse
				openModal={openResponseModal}
				handleClose={handleCloseModal}
				success={showSuccessResponse}
			/>
		</div>
	);
};

export default AddOccupationModal;
