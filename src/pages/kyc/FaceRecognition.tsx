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
	fetchData: Function;
	verifyData: { [key: string]: any };
}> = ({ id, verifyData, who, fetchData }) => {
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

	const {
		loading: rejectingKyc,
		startLoading: startRejectingKyc,
		stopLoading: stopRejectingKyc,
	} = useLoading(false);

	const handleRejectKyc = handleSubmit(() => {
		if (rejectingKyc) {
			return;
		}
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
	});

	const {
		loading: approvingKyc,
		startLoading: startApprovingKyc,
		stopLoading: stopApprovingKyc,
	} = useLoading(false);

	const onSubmit = (e?: any) => {
		e.preventDefault();
		// console.log(data);
		if (
			approvingKyc ||
			!verifyData?.verification?.face_capture?.face_capture_url
		) {
			return;
		}
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
				// toast.success(res?.data?.message || '');
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
			// onSubmit={handleSubmit(onSubmit)}
			className='w-[60%] pb-[29px] pt-[74px]'
		>
			<div className='flex flex-col justify-between items-center h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Face Recognition</h3>
					<div className='mt-10 bg-[#7507BD] w-[307px] h-[316px] mx-auto p-[25px] rounded-full'>
						{verifyData?.verification?.face_capture?.face_capture_url ? (
							<img
								src={verifyData?.verification?.face_capture?.face_capture_url}
								alt='profile pics'
								className='rounded-full bg-white w-full h-full'
							></img>
						) : (
							''
						)}
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
							onClick={handleSubmit(onSubmit)}
							disabled={approvingKyc}
							classes={`bg-[#7607BD] w-[100px] py-2 flex justify-center items-center gap-2 text-white ${
								verifyData?.verification?.face_capture?.face_capture_url
									? ''
									: 'cursor-not-allowed'
							}`}
						>
							Accept
						</Button>
						<Button
							onClick={(e?: any) => {
								e.preventDefault();
								if (!verifyData?.verification?.face_capture?.face_capture_url) {
									return;
								} else {
									handleRejectOpen();
								}
							}}
							classes={`border border-[#D92D20] w-[100px] py-2 flex justify-center items-center gap-2 text-[#D92D20] ${
								verifyData?.verification?.face_capture?.face_capture_url
									? ''
									: 'cursor-not-allowed'
							}`}
						>
							Reject
						</Button>
					</div>
				)}
				{/* {verifyData?.verification?.face_capture?.face_capture_url} */}
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
