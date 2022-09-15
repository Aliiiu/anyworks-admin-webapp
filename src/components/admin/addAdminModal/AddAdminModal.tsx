import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import MultipleSelect from '../../ui/MultipleSelect';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRef, useState } from 'react';
import closeModal from 'src/assets/images/common/closeModal.svg';
import { PhotoCamera } from '@mui/icons-material';
import { AdminServices } from 'src/service/AdminServices';
import { Loading } from 'src/components/ui';
import clsx from 'clsx';
import { toast, ToastContainer } from 'react-toastify';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 532,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	bgcolor: 'background.paper',
	borderRadius: '16px',
	boxShadow: 24,
	p: '40px',
};

const StyledForm = styled.form`
	max-width: 532px;
	width: 100%;
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
		margin-top: 24px;
		border: 1px solid #7e00c4;
		box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
		&:disabled {
			color: black;
		}
	}
`;

export const InputContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-top: 20px;
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

interface AddAdminTypes {
	first_name: string;
	firstNameError: string;
	last_name: string;
	lastNameError: string;
	email: string;
	emailError: string;
	role: string[];
	roleError: string;
	display_picture: File[];
}

const AddAdminModal: React.FC<{
	open: boolean;
	fetchAdmins: Function;
	handleClose: () => void;
}> = ({ open, handleClose, fetchAdmins }) => {
	const [disabled, setDisabled] = useState<boolean>(false);
	const [adminDetails, setAdminDetails] = useState<AddAdminTypes>({
		first_name: '',
		firstNameError: '',
		last_name: '',
		lastNameError: '',
		email: '',
		emailError: '',
		role: [],
		roleError: '',
		display_picture: [],
	});

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (disabled) {
			return;
		}
		let emailError = '';
		let roleError = '';
		let firstNameError = '';
		let lastNameError = '';
		let emailFilter = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!adminDetails.email) {
			emailError = "Email can't be empty";
		} else if (!adminDetails.email.match(emailFilter)) {
			emailError = 'Please enter a valid email address';
		}
		if (!adminDetails.first_name) {
			firstNameError = "field can't be empty";
		}
		if (!adminDetails.last_name) {
			lastNameError = "field can't be empty";
		}
		if (adminDetails.role.length === 0) {
			roleError = 'select a role';
		}
		if (emailError || firstNameError || lastNameError || roleError) {
			setAdminDetails({
				...adminDetails,
				emailError,
				roleError,
				firstNameError,
				lastNameError,
			});
		} else {
			setDisabled(true);
			const newData = new FormData();
			newData.append('first_name', adminDetails.first_name);
			newData.append('last_name', adminDetails.last_name);
			newData.append('email', adminDetails.email);
			newData.append('role', adminDetails.role.toString());
			newData.append('display_picture', adminDetails.display_picture[0]);
			// console.log(adminDetails);

			AdminServices.addAdmin(newData)
				.then((res) => {
					console.log(res.data);
					fetchAdmins();
				})
				.catch((err: any) => toast.error(err.response.data.error.message))
				.finally(() => {
					setAdminDetails((prevState) => ({
						...prevState,
						first_name: '',
						firstNameError: '',
						last_name: '',
						lastNameError: '',
						email: '',
						emailError: '',
						role: [],
						roleError: '',
						display_picture: [],
					}));
					setDisabled(false);
					handleClose();
				});
		}
	};

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
						<ToastContainer />
						<button
							onClick={handleClose}
							style={{ position: 'absolute', top: -10, right: -10 }}
						>
							<img src={closeModal} alt='' width={32} height='32px' />
						</button>
						<Typography id='transition-modal-title' variant='h3' gutterBottom>
							Create New Admin
						</Typography>
						<StyledForm onSubmit={submitHandler}>
							<InputContainer>
								<label htmlFor='First Name'>First Name</label>
								<Input
									value={adminDetails.first_name}
									onChange={(e: any) =>
										setAdminDetails((prevState) => ({
											...prevState,
											first_name: e.target.value,
											firstNameError: '',
										}))
									}
									placeholder='First Name'
									style={{
										width: '100%',
										borderColor: adminDetails.firstNameError && '#F04438',
										background: adminDetails.firstNameError && '#F9FAFB',
									}}
									className={clsx()}
									required
								/>
								{adminDetails.firstNameError && (
									<h6 className='validation_error'>
										{adminDetails.firstNameError}
									</h6>
								)}
							</InputContainer>
							<InputContainer>
								<label htmlFor='First Name'>Last Name</label>
								<Input
									value={adminDetails.last_name}
									onChange={(e: any) =>
										setAdminDetails((prevState) => ({
											...prevState,
											last_name: e.target.value,
											lastNameError: '',
										}))
									}
									placeholder='Last Name'
									style={{
										width: '100%',
										borderColor: adminDetails.lastNameError && '#F04438',
										background: adminDetails.lastNameError && '#F9FAFB',
									}}
									required
								/>
								{adminDetails.lastNameError && (
									<h6 className='validation_error'>
										{adminDetails.lastNameError}
									</h6>
								)}
							</InputContainer>
							<InputContainer>
								<label htmlFor='email'>Email</label>
								<Input
									value={adminDetails.email}
									onChange={(e: any) =>
										setAdminDetails((prevState) => ({
											...prevState,
											email: e.target.value,
											emailError: '',
										}))
									}
									placeholder='admin@gmail.com'
									style={{
										width: '100%',
										borderColor: adminDetails.emailError && '#F04438',
										background: adminDetails.emailError && '#F9FAFB',
									}}
									required
								/>
								{adminDetails.emailError && (
									<h6 className='validation_error'>
										{adminDetails.emailError}
									</h6>
								)}
							</InputContainer>
							<MultipleSelect
								roleError={adminDetails.roleError}
								setRoles={setAdminDetails}
							/>
							<InputContainer>
								<label htmlFor='dropzone-file'>Display Picture</label>
								<div className='file_wrapper'>
									{adminDetails.display_picture[0] &&
									adminDetails.display_picture.length > 0 ? (
										<div className='upload_item'>
											{/* <img src={ImageConfig['png']} alt='' width={'40px'} /> */}
											<div className='upload_item_container'>
												<p>{adminDetails.display_picture[0].name}</p>
												<div>
													<DeleteIcon
														onClick={() => {
															setAdminDetails((prevState) => ({
																...prevState,
																display_picture: [],
															}));
														}}
														className='delete_icon'
													/>
												</div>
											</div>
										</div>
									) : (
										<div className='file_item'>
											<div className=' rounded-[28px] border-8 border-[#F9FAFB]'>
												<div className='w-[30px] h-[30px] flex justify-center items-center rounded-[100%] bg-[#F2F4F7]'>
													<PhotoCamera />
												</div>
											</div>
											<p>
												<span>Click to upload </span>
												or drag and drop
											</p>
											<p>SVG, PNG, JPG (max. 800x400px)</p>
											<input
												id='dropzone-file'
												type='file'
												onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
													const filesArr: File[] = Array.from(e.target.files!);
													setAdminDetails((prevState) => ({
														...prevState,
														display_picture: filesArr,
													}));
												}}
												className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
											/>
										</div>
									)}
								</div>
							</InputContainer>
							<button
								disabled={disabled}
								onClick={submitHandler}
								className='btn_action'
							>
								{disabled ? <Loading color='white' /> : 'Create'}
							</button>
						</StyledForm>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddAdminModal;
