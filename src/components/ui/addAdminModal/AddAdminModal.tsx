import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import MultipleSelect from '../MultipleSelect';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import closeModal from 'src/assets/images/common/close.svg';

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
	border: '1px solid #000',
	borderRadius: '16px',
	boxShadow: 24,
	p: '40px',
};

export const InputContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-top: 20px;
	gap: 6px;
`;

const AddAdminModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
	open,
	handleClose,
}) => {
	const [status, setStatus] = useState('');
	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value);
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
						<InputContainer>
							<label htmlFor='name'>Name</label>
							<Input placeholder='Olajide Olajide' style={{ width: '100%' }} />
						</InputContainer>
						<InputContainer>
							<label htmlFor='email'>Email</label>
							<Input placeholder='Olajide@gmail.com' style={{}} />
						</InputContainer>
						<InputContainer>
							<label htmlFor='Phone_No'>Phone Number</label>
							<Input placeholder='08089898989' style={{}} />
						</InputContainer>
						{/* <label htmlFor='role'>Role</label> */}
						<MultipleSelect />
						<InputContainer>
							<label htmlFor='status'>Status</label>
							<FormControl fullWidth size='small'>
								<InputLabel id='demo-simple-select-label'>Status</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={status}
									label='Age'
									onChange={handleChange}
								>
									<MenuItem value={'Active'}>Active</MenuItem>
									<MenuItem value={'Blocked'}>Blocked</MenuItem>
								</Select>
							</FormControl>
						</InputContainer>

						<button
							onClick={handleClose}
							style={{
								width: '100%',
								display: 'flex',
								cursor: 'pointer',
								justifyContent: 'center',
								alignItems: 'center',
								background: '#7E00C4',
								padding: '10px 18px',
								borderRadius: 8,
								color: '#FFFFFF',
								fontSize: 16,
								marginTop: 24,
								border: '1px solid #7E00C4',
								boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
							}}
						>
							Create
						</button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddAdminModal;
