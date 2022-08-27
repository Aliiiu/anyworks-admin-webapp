import { AiOutlineArrowLeft } from 'react-icons/ai';
import { DashboardLayout } from 'src/components/dashboard';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import KycPersonalInfo from './KycPersonalInfo';
import KycProfileInfo from './KycProfileInfo';
import { useState } from 'react';
import KycModal from 'src/components/ui/kycModals/KycModal';
import RejectionModal from 'src/components/ui/kycModals/RejectionModal';

const ArtisankycContainer = styled.div`
	.pageHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h2 {
			font-size: 36px;
			font-weight: 700;
			color: ${(props) => props.theme.colors.text_01};
		}
		.navButton {
			background: ${(props) => props.theme.colors.purple};
			color: #ffffff;
			font-weight: 500;
			font-szie: 16px;
			display: flex;
			gap: 10px;
			justify-content: center;
			border-radius: 8px;
			padding: 12px 20px;
		}
	}
	.action_btn_wrapper {
		display: flex;
		gap: 20px;
		margin-top: 24px;
		.action_btn {
			border-radius: 8px;
			padding: 12px 14px;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 136px;
			cursor: pointer;
		}
	}
`;
const ArtisanKyc = () => {
	const [open, setOpen] = useState(false);
	const [openReject, setOpenReject] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleRejectOpen = () => setOpenReject(true);
	const handleClose = () => setOpen(false);
	const handleRejectClose = () => setOpenReject(false);
	return (
		<DashboardLayout>
			<ArtisankycContainer>
				<div className='pageHeader'>
					<h2>Artisan KYC</h2>
					<button className='navButton'>
						<AiOutlineArrowLeft style={{ color: '#FFFFFF' }} /> Back to KYC
					</button>
				</div>
				<KycPersonalInfo />
				<KycProfileInfo />
				<div className='action_btn_wrapper'>
					<button
						style={{ color: '#FFF', background: '#7E00C4' }}
						className='action_btn'
						onClick={handleOpen}
					>
						Accept
					</button>
					<button
						onClick={handleRejectOpen}
						style={{ color: '#7E00C4', background: 'rgba(126, 0, 196, 0.2)' }}
						className='action_btn'
					>
						Reject
					</button>
					<KycModal open={open} handleClose={handleClose} />
					<RejectionModal open={openReject} handleClose={handleRejectClose} />
				</div>
			</ArtisankycContainer>
		</DashboardLayout>
	);
};

export default ArtisanKyc;
