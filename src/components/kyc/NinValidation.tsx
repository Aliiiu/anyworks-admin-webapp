import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';
import { TextField } from '../ui/form/FormComponent';
import Button from '../ui/widget/Button';
import ConfirmApproveKycModal from './kycModals/ConfirmApproveKycModal';
import RejectionModal from './kycModals/RejectionModal';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';

type Props = {
	verifyData: { [key: string]: any };
	id: string;
	who: string;
};

const NinValidation = ({ verifyData, id, who }: Props) => {
	const { formState, handleSubmit, register, control, setValue } = useForm({
		mode: 'onChange',
	});

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [openReject, setOpenReject] = useState(false);
	const handleRejectOpen = () => setOpenReject(true);
	const handleRejectClose = () => setOpenReject(false);
	const [rejectionReason, setRejectionReason] = useState('');
	useEffect(() => {
		setValue('nin', verifyData?.verification?.nin?.nin_no || '');
		setValue('vnin', verifyData?.verification?.nin?.vnin_no || '');
	}, [
		setValue,
		verifyData?.verification?.nin?.nin_no,
		verifyData?.verification?.nin?.vnin_no,
	]);

	const {
		loading: rejectingKyc,
		startLoading: startRejectingKyc,
		stopLoading: stopRejectingKyc,
	} = useLoading(false);

	const handleRejectKyc = () => {
		startRejectingKyc();
		id &&
			VerificationService.approveRejectVerification(
				{ reason: 'rejectionReason' },
				id,
				'reject',
				'nin',
				who
			)
				.then((res) => {
					console.log(res.data);
					// toast.success(res?.data?.message || []);
					// handleRejectClose();
				})
				.catch((err) => {
					console.error(err.response.data.error.message);
				})
				.finally(() => {
					stopRejectingKyc();
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
		VerificationService.approveRejectVerification(
			{ reason: '' },
			id,
			'approve',
			'nin',
			who
		)
			.then((res) => {
				console.log(res.data);
				setTimeout(() => handleOpen(), 1000);
			})
			.catch((err) => {
				console.error(err.response.data.error.message);
			})
			.finally(() => {
				stopApprovingKyc();
				// navigate('/artisans');
			});
	};
	console.log(verifyData?.artisan?.verified?.nin);
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-[60%] pb-[29px] pt-[74px]'
		>
			<div className='flex flex-col justify-between h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Nin Validation</h3>
					<div className='mt-10'>
						<TextField
							label={'NIN'}
							type='text'
							control={control}
							error={formState.errors.nin}
							{...register('nin', { required: false })}
						/>
						<TextField
							label={'V-NIN'}
							type='text'
							control={control}
							error={formState.errors.vnin}
							{...register('vnin', { required: false })}
						/>
					</div>
				</div>
				{verifyData?.artisan?.verified?.nin ||
				verifyData?.user?.verified?.nin ? (
					<div className='flex justify-center'>
						<Button classes='bg-[#7607BD] text-2xl py-2 flex justify-center items-center gap-2 text-white'>
							<img src='/svgs/retry.svg' alt='' className='w-[24px] h-[24px]' />
							Retry
						</Button>
					</div>
				) : (
					<div className='flex gap-6 justify-center'>
						<Button
							disabled={approvingKyc}
							classes='bg-[#7607BD] text-2xl py-2 flex justify-center items-center gap-2 text-white'
						>
							Accept
						</Button>
						<Button
							onClick={handleRejectOpen}
							classes='border border-[#D92D20] text-2xl py-2 flex justify-center items-center gap-2 text-[#D92D20]'
						>
							Reject
						</Button>
					</div>
				)}
			</div>
			{/* <ConfirmApproveKycModal
				open={openConfirmApproveKycModal}
				handleApproveKyc={handleApproveKyc}
				handleClose={handleConfirmApproveKycModalClose}
				artisanName={`${artisanKyc?.artisan?.first_name} ${artisanKyc?.artisan?.last_name}`}
				approvingKyc={approvingKyc}
			/> */}
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

export default NinValidation;
