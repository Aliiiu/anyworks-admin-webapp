import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

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
	p: '60px',
};

const KycApprovedModal: React.FC<{
	open: boolean;
	handleClose: () => void;
	name: string;
}> = ({ open, handleClose, name }) => {
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
						<img
							src='/svgs/verifyIcon.svg'
							alt=''
							width='100px'
							height='100px'
						/>
						<Typography
							id='transition-modal-title'
							variant='h3'
							sx={{ marginTop: '24px' }}
							gutterBottom
						>
							Verification Successful
						</Typography>
						<Typography
							id='transition-modal-description'
							variant='h5'
							gutterBottom
						>
							You have sucessfully verify {name}
						</Typography>
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
							Return
						</button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default KycApprovedModal;
