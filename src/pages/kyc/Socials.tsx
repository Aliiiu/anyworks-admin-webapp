import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField } from 'src/components/ui/form/FormComponent';
import Button from 'src/components/ui/widget/Button';
import { toast } from 'react-toastify';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';

type SocialType = {
	others: string;
	linkedin: string;
	facebook: string;
	twitter: string;
};
const Socials: FC<{
	id: string;
	who: string;
	verifyData: { [key: string]: any };
}> = ({ id, verifyData, who }) => {
	const { formState, handleSubmit, register, control, setValue } =
		useForm<SocialType>({
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
			VerificationService.approveRejectVerification(
				{ reason: 'rejectionReason' },
				id,
				'reject',
				'face_capture',
				who
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

	const onSubmit: SubmitHandler<SocialType> = (data) => {
		console.log(data);
		// startApprovingKyc();
		// VerificationService.approveRejectVerification(
		// 	{ reason: '' },
		// 	id,
		// 	'approve',
		// 	'face_capture',
		// 	who
		// )
		// 	.then((res) => {
		// 		console.log(res.data);
		// 		toast.success(res?.data?.message || '');
		// 		setTimeout(() => handleOpen(), 1000);
		// 	})
		// 	.catch((err) => {
		// 		toast.error(err.response.data.error.message);
		// 	})
		// 	.finally(() => {
		// 		stopApprovingKyc();
		// 		// navigate('/artisans');
		// 	});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-[60%] pb-[29px] pt-[74px]'
		>
			<div className='flex flex-col justify-between h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Social Media Linking</h3>
					<div className='mt-10'>
						<TextField
							label={'Twitter'}
							type='text'
							control={control}
							error={formState.errors.twitter}
							{...register('twitter', { required: false })}
						/>
						<TextField
							label={'Facebook'}
							type='text'
							control={control}
							error={formState.errors.facebook}
							{...register('facebook', { required: false })}
						/>
						<TextField
							label={'Linkedin'}
							type='text'
							control={control}
							error={formState.errors.linkedin}
							{...register('linkedin', { required: false })}
						/>
						<TextField
							label={'Other websites or Social media'}
							type='text'
							control={control}
							error={formState.errors.others}
							{...register('others', { required: false })}
						/>
					</div>
				</div>
				{verifyData?.artisan?.verified?.social_meida ||
				verifyData?.user?.verified?.social_meida ? (
					<div className='flex gap-2 items-center justify-center'>
						<img src='/svgs/verified.svg' alt='' className='w-9 h-9' />
						<p className='text-[#667085] font-semibold'>Validation Confirmed</p>
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

export default Socials;
