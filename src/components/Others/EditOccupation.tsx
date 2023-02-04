import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
import closeModal from 'src/assets/images/common/closeModal.svg';
import { PhotoCamera } from '@mui/icons-material';
import { AdminServices } from 'src/service/AdminServices';
import { Loading } from 'src/components/ui';
import clsx from 'clsx';
import ModalResponse from './ModalResponse';
import miscService from 'src/service/miscServices';
import DeleteIcon from '@mui/icons-material/Delete';
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
		font-size: 12px;
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
	category: string;
	categoryError: string;
	display_picture: File[];
}
interface categoriesTypes {
	_id: string;
	name: string;
	slug: string;
}

const EditOccupationModal: React.FC<{
	open: boolean;
	id: string;
	fetchOccupation: Function;
	data: any;
	handleClose: () => void;
}> = ({ open, handleClose, fetchOccupation, id, data }) => {
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
		category: '',
		categoryError: '',
		display_picture: [],
	});
	// const [category, setCategory] = useState('');
	const handleChange = (e: any) => {
		setOccupationDetails((prevState) => ({
			...prevState,
			category: e.target.value,
			categoryError: '',
		}));
	};

	useLayoutEffect(() => {
		// console.log({ data, id });
		setOccupationDetails((prevState) => ({
			...prevState,
			name: data?.name,
			nameError: '',
		}));
		setOccupationDetails((prevState) => ({
			...prevState,
			category: data?.category_slug,
			categoryError: '',
		}));
	}, [data, id]);

	const [categories, setCategories] = useState<categoriesTypes[]>([]);

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (disabled) {
			return;
		}
		let nameError = '';
		let categoryError = '';
		// console.log(occupationDetails);
		setDisabled(true);
		const newData = new FormData();
		newData.append('name', occupationDetails.name);
		newData.append('category_slug', occupationDetails.category);
		newData.append('icon', occupationDetails.display_picture[0]);
		// console.log({
		// 	id,
		// 	name: occupationDetails.name,
		// 	category_slug: occupationDetails.category,
		// 	icon: occupationDetails.display_picture[0],
		// });
		miscService
			.editOccupations(id, newData)
			.then((res) => {
				// console.log(res.data);
				setShowSuccessResponse(true);
				// fetchOccupation();
			})
			.catch((err: any) => {
				setShowSuccessResponse(false);
				console.log(err.response.data.error.message);
			})
			.finally(() => {
				setOccupationDetails((prevState) => ({
					...prevState,
					name: '',
					nameError: '',
					category: '',
					categoryError: '',
					display_picture: [],
				}));
				setDisabled(false);
				handleOpenModal();
				handleClose();
			});
	};

	useEffect(() => {
		setShowSuccessResponse(false);
		setOccupationDetails((prevState) => ({
			...prevState,
			name: '',
			nameError: '',
			category: '',
			categoryError: '',
			display_picture: [],
		}));
	}, []);

	useEffect(() => {
		if (showSuccessResponse) {
			fetchOccupation();
		}
	}, [fetchOccupation, showSuccessResponse]);

	useEffect(() => {
		miscService
			.getCategories()
			.then((res) => {
				// console.log(res?.data?.payload);
				setCategories(res?.data?.payload.data);
			})
			.catch((err: any) => {
				console.log(err.response.data.error.message);
			});
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
								Edit Occupation
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
								<div>
									<label htmlFor='categories' className='mb-1'>
										Select Category
									</label>
									<select
										id='categories'
										value={occupationDetails.category}
										placeholder='Select a category'
										style={{
											width: '100%',
											borderColor: occupationDetails.nameError && '#F04438',
											background: occupationDetails.nameError && '#F9FAFB',
										}}
										onChange={handleChange}
										className='border border-[#98a2b3] text-sm rounded-lg placeholder:text-[#98a2b3] block w-full px-[10px] py-[14px]'
									>
										<option></option>
										{categories.map((category) => (
											<option key={category._id} value={category.slug}>
												{category.name}
											</option>
										))}
									</select>
									{occupationDetails.categoryError && (
										<h6 className='text-[12px] text-[#f04438]'>
											{occupationDetails.categoryError}
										</h6>
									)}
								</div>
								<InputContainer>
									<label htmlFor='dropzone-file'>Occupation Icon</label>
									<div className='file_wrapper'>
										{occupationDetails.display_picture[0] &&
										occupationDetails.display_picture.length > 0 ? (
											<div className='upload_item'>
												{/* <img src={ImageConfig['png']} alt='' width={'40px'} /> */}
												<div className='upload_item_container'>
													<p>{occupationDetails.display_picture[0].name}</p>
													<div>
														<DeleteIcon
															onClick={() => {
																setOccupationDetails((prevState) => ({
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
													onChange={(
														e: React.ChangeEvent<HTMLInputElement>
													) => {
														const filesArr: File[] = Array.from(
															e.target.files!
														);
														setOccupationDetails((prevState) => ({
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

export default EditOccupationModal;
