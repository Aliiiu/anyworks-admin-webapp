import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { NumberInput } from 'src/components/inputs/NumberInput';
import ImageMagnifier from 'src/components/kyc/ImageMagnifier';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal';
import { Flex } from 'src/components/ui';
import Button from 'src/components/ui/widget/Button';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';
import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';

const ProfileContainer = styled.div`
	padding: 40px;
	background: #ffffff;
	width: 100%;
	margin-top: 36px;
	border-radius: 16px;
	h3 {
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 32px;
	}
	.input_wrapper {
		display: grid;
		grid: auto / auto auto;
		gap: 20px;
	}
`;

const DocumentUpload: FC<{
	id: string;
	verifyData: { [key: string]: any };
}> = ({ id, verifyData }) => {
	const { handleSubmit, control, setValue } = useForm({
		mode: 'onChange',
	});
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openReject, setOpenReject] = useState(false);
	const handleRejectOpen = () => setOpenReject(true);
	const handleRejectClose = () => setOpenReject(false);
	const [rejectionReason, setRejectionReason] = useState('');

	const {
		loading: rejectingKyc,
		startLoading: startRejectingKyc,
		stopLoading: stopRejectingKyc,
	} = useLoading(false);

	const handleRejectKyc = () => {
		startRejectingKyc();
		id &&
			VerificationService.approveRejectVendor(
				{ reason: 'rejectionReason' },
				id,
				'reject',
				'id_card'
			)
				.then((res) => {
					console.log(res.data);
					toast.success(res?.data?.message || []);
					// handleRejectClose();
				})
				.catch((err) => {
					toast.error(err.response.data.error.message);
				})
				.finally(() => {
					stopRejectingKyc();
					handleRejectClose();
					// navigate('/kyc');
				});
	};

	const {
		loading: approvingKyc,
		startLoading: startApprovingKyc,
		stopLoading: stopApprovingKyc,
	} = useLoading(false);

	const onSubmit = (data: any) => {
		console.log(data);
		startApprovingKyc();
		VerificationService.approveRejectVendor(
			{ reason: '' },
			id,
			'approve',
			'id_card'
		)
			.then((res) => {
				console.log(res.data);
				toast.success(res?.data?.message || '');
				setTimeout(() => handleOpen(), 1000);
			})
			.catch((err) => {
				toast.error(err.response.data.error.message);
			})
			.finally(() => {
				stopApprovingKyc();
				// navigate('/artisans');
			});
	};
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-[60%] pb-[29px] pt-[74px]'
		>
			<div className='flex flex-col justify-between h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>
						{verifyData?.verification?.id_card?.id_card_type ||
							'Drivers License'}
					</h3>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignContent: 'center',
						}}
						className='mt-10'
					>
						<ImageMagnifier
							height='300px'
							src={`${verifyData?.verification?.id_card?.id_card_url}`}
						/>
					</div>
				</div>
				<div className='flex gap-6 justify-center'>
					<Button classes='bg-[#7607BD] text-2xl py-2 flex justify-center items-center gap-2 text-white'>
						Accept
					</Button>
					<Button
						onClick={handleRejectOpen}
						classes='border border-[#D92D20] text-2xl py-2 flex justify-center items-center gap-2 text-[#D92D20]'
					>
						Reject
					</Button>
				</div>
			</div>
			<KycApprovedModal
				open={open}
				handleClose={handleClose}
				artisanName={`${verifyData?.artisan?.first_name} ${verifyData?.artisan?.last_name}`}
			/>
			<RejectionModal
				open={openReject}
				handleRejectKyc={handleRejectKyc}
				handleClose={handleRejectClose}
				rejectionReason={rejectionReason}
				setRejectionReason={setRejectionReason}
				rejectingKyc={rejectingKyc}
			/>
		</form>
	);
};

export default DocumentUpload;
