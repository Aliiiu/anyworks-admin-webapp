import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';
import { TextField } from '../../components/ui/form/FormComponent';
import Button from '../../components/ui/widget/Button';
import ConfirmApproveKycModal from '../../components/kyc/kycModals/ConfirmApproveKycModal';
import RejectionModal from '../../components/kyc/kycModals/RejectionModal';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import { toast } from 'react-toastify';

type Props = {
	verifyData: { [key: string]: any };
	id: string;
	who: string;
	fetchData: Function;
};

const NinValidation = ({ verifyData, id, who, fetchData }: Props) => {
	const { formState, handleSubmit, register, control, setValue } = useForm({
		mode: 'onChange',
	});

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		fetchData(id);
	};
	const [openReject, setOpenReject] = useState(false);
	const handleRejectOpen = () => setOpenReject(true);
	const handleRejectClose = () => {
		setOpenReject(false);
		fetchData(id);
	};
	const [rejectionReason, setRejectionReason] = useState('');
	useEffect(() => {
		setValue('nin', verifyData?.verification?.nin?.nin_no || '');
		setValue('vnin', verifyData?.verification?.nin?.vnin_no || '');
	}, [
		setValue,
		verifyData?.verification?.nin?.nin_no,
		verifyData?.verification?.nin?.vnin_no,
	]);

	const INPUTVAL =
		verifyData?.verification?.nin?.nin_no ||
		verifyData?.verification?.nin?.vnin_no;

	const {
		loading: rejectingKyc,
		startLoading: startRejectingKyc,
		stopLoading: stopRejectingKyc,
	} = useLoading(false);

	const handleRejectKyc = handleSubmit((e?: any) => {
		if (rejectingKyc) {
			return;
		}
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
				})
				.catch((err) => {
					console.error(err.response.data.error.message);
					toast.error(err.response.data.error.message);
				})
				.finally(() => {
					stopRejectingKyc();
					// navigate('/kyc');
				});
	});

	const {
		loading: approvingKyc,
		startLoading: startApprovingKyc,
		stopLoading: stopApprovingKyc,
	} = useLoading(false);

	const handleApprove = () => {
		// e.preventDefault();
		// console.log(data);
		if (approvingKyc || !INPUTVAL) {
			return;
		}
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
				toast.error(err.response.data.error.message);
			})
			.finally(() => {
				stopApprovingKyc();
			});
	};

	return (
		<form className='w-[60%] pb-[29px] pt-[74px]'>
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
					// <div className='flex justify-center'>
					// 	<Button classes='bg-[#7607BD] w-[100px] py-2 flex justify-center items-center gap-2 text-white'>
					// 		<img src='/svgs/retry.svg' alt='' className='w-[18px] h-[18px]' />
					// 		Retry
					// 	</Button>
					// </div>
					<div className='flex gap-2 items-center justify-center'>
						<img src='/svgs/verified.svg' alt='' className='w-9 h-9' />
						<p className='text-[#667085] font-semibold'>Validation Confirmed</p>
					</div>
				) : (
					<div className='flex gap-6 justify-center'>
						<Button
							onClick={handleSubmit(handleApprove)}
							disabled={approvingKyc}
							classes={`bg-[#7607BD] py-2 flex justify-center items-center gap-2 text-white w-[100px] ${
								INPUTVAL ? '' : 'cursor-not-allowed'
							}`}
						>
							Accept
						</Button>
						<Button
							onClick={(e?: any) => {
								e.preventDefault();
								if (!INPUTVAL) {
									return;
								} else {
									handleRejectOpen();
								}
							}}
							classes={`border border-[#D92D20] py-2 flex justify-center items-center gap-2 text-[#D92D20] w-[100px] ${
								INPUTVAL ? '' : 'cursor-not-allowed'
							}`}
						>
							Reject
						</Button>
					</div>
				)}
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

export default NinValidation;
