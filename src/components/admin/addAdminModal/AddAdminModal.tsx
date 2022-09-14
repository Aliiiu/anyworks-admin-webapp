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
import { useState } from 'react';
import closeModal from 'src/assets/images/common/closeModal.svg';
import { PhotoCamera } from '@mui/icons-material';

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
	.btn-action {
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
	}
`;

export const InputContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-top: 20px;
	gap: 6px;
	.addAdminForm {
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
			.upload_item_container {
				display: flex;
				justify-content: space-between;
				width: 100%;
				background: grey;
				align-items: center;
				.delete_icon {
					width: 20px;
					height: 20px;
					margin-left: 7px;
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
	last_name: string;
	email: string;
	role: string[];
	suspended: string;
	display_picture: FileList | null;
}

const AddAdminModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
	open,
	handleClose,
}) => {
	const [adminDetails, setAdminDetails] = useState<AddAdminTypes>({
		first_name: '',
		last_name: '',
		email: '',
		role: [],
		suspended: '',
		display_picture: null,
	});

	const submitHandler = (e: any) => {
		e.preventDefault();
		console.log(adminDetails);
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
										}))
									}
									placeholder='First Name'
									style={{ width: '100%' }}
								/>
							</InputContainer>
							<InputContainer>
								<label htmlFor='First Name'>Last Name</label>
								<Input
									value={adminDetails.last_name}
									onChange={(e: any) =>
										setAdminDetails((prevState) => ({
											...prevState,
											last_name: e.target.value,
										}))
									}
									placeholder='Last Name'
									style={{ width: '100%' }}
								/>
							</InputContainer>
							<InputContainer>
								<label htmlFor='email'>Email</label>
								<Input
									value={adminDetails.email}
									onChange={(e: any) =>
										setAdminDetails((prevState) => ({
											...prevState,
											email: e.target.value,
										}))
									}
									placeholder='admin@gmail.com'
									style={{ width: '100%' }}
								/>
							</InputContainer>
							<MultipleSelect setRoles={setAdminDetails} />
							{/* <InputContainer>
								<label htmlFor='status'>Status</label>
								<FormControl fullWidth size='small'>
									<InputLabel id='demo-simple-select-label'>Status</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={adminDetails.suspended}
										label='Age'
										onChange={(e: any) =>
											setAdminDetails((prevState) => ({
												...prevState,
												suspended: e.target.value,
											}))
										}
									>
										<MenuItem value={'false'}>false</MenuItem>
										<MenuItem value={'true'}>true</MenuItem>
									</Select>
								</FormControl>
							</InputContainer> */}
							<InputContainer>
								<label htmlFor='dropzone-file'>Display Picture</label>
								<div className='file_wrapper'>
									{adminDetails.display_picture &&
									adminDetails.display_picture['0'].name ? (
										<div className='upload_item'>
											{/* <img src={ImageConfig['png']} alt='' width={'40px'} /> */}
											<div className='upload_item_container'>
												<p>{adminDetails.display_picture['0'].name}</p>
												<div>
													<DeleteIcon
														onClick={() => {
															setAdminDetails((prevState) => ({
																...prevState,
																display_picture: null,
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
													console.log(e.target.files!);
													setAdminDetails((prevState) => ({
														...prevState,
														display_picture: e.target.files!,
													}));
												}}
												className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
											/>
										</div>
									)}
								</div>
							</InputContainer>
							<button onClick={handleClose} className='btn-action'>
								Create
							</button>
						</StyledForm>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddAdminModal;
