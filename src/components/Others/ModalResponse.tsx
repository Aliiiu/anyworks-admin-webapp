import * as React from 'react';
import clsx from 'clsx';
import { styled as MUIStyled, Box, Theme } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import styled from 'styled-components';
import closeModal from 'src/assets/images/common/closeModal.svg';

const BackdropUnstyled = React.forwardRef<
	HTMLDivElement,
	{ openModal?: boolean; className: string }
>((props, ref) => {
	const { openModal, className, ...other } = props;
	return (
		<div
			className={clsx({ 'MuiBackdrop-open': openModal }, className)}
			ref={ref}
			{...other}
		/>
	);
});

const Modal = MUIStyled(ModalUnstyled)`
	position: fixed;
	z-index: 1300;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Backdrop = MUIStyled(BackdropUnstyled)`
	z-index: -1;
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-tap-highlight-color: transparent;
`;

const style = (theme: Theme) => ({
	width: 400,
	bgcolor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
	padding: '30px',
	borderRadius: '16px',
});

const StyledWarningContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	p {
		text-align: center;
		font-size: 16px;
	}
`;

export default function ModalResponse({
	success,
	openModal,
	handleClose,
}: {
	success: boolean;
	openModal: boolean;
	handleClose: () => void;
}) {
	return (
		<Modal
			aria-labelledby='unstyled-modal-title'
			aria-describedby='unstyled-modal-description'
			open={openModal}
			onClose={handleClose}
			components={{ Backdrop }}
		>
			<Box sx={style}>
				<StyledWarningContainer>
					<button
						onClick={handleClose}
						style={{
							position: 'absolute',
							top: -40,
							right: -40,
							cursor: 'pointer',
						}}
					>
						<img src={closeModal} alt='' width={32} height='32px' />
					</button>
					<img
						src={success ? '/svgs/success.svg' : '/svgs/warning.svg'}
						alt=''
					/>
					<h3>{success ? 'Added Successfully' : 'Unsuccessfull attempt'}</h3>
					<p>
						{success
							? 'Occupation has been created successfully'
							: 'There was an error creating the account, kindly contact webmaster for more information'}
					</p>
				</StyledWarningContainer>
			</Box>
		</Modal>
	);
}
