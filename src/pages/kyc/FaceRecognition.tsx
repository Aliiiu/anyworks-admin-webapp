import { FC, useState } from 'react';
import Button from 'src/components/ui/widget/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';

const FaceRecognition: FC<{
	id: string;
	who: string;
	verifyData: { [key: string]: any };
}> = ({ id, verifyData, who }) => {
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

	const onSubmit = (data: any) => {
		console.log(data);
		startApprovingKyc();
		VerificationService.approveRejectVerification(
			{ reason: '' },
			id,
			'approve',
			'face_capture',
			who
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
			<div className='flex flex-col justify-between items-center h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Face Recognition</h3>
					<div className='mt-10 bg-[#7507BD] w-[307px] h-[316px] mx-auto p-[25px] rounded-full'>
						<img
							src='/images/profilePicture.png'
							alt='profile pics'
							className='rounded-full bg-white w-full h-full'
						></img>
					</div>
				</div>
				{verifyData?.artisan?.verified?.face_capture ||
				verifyData?.user?.verified?.face_capture ? (
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

export default FaceRecognition;
