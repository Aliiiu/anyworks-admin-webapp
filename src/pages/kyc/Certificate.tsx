import { FC, useState } from 'react';
import Button from 'src/components/ui/widget/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';

const Certificate: FC<{
	id: string;
	who: string;
	verifyData: { [key: string]: any };
	fetchData: Function;
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
				'certificate',
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

	const onSubmit = () => {
		// console.log(data);
		if (
			approvingKyc ||
			!verifyData?.verification?.nin?.nin_no ||
			!verifyData?.verification?.nin?.vnin_no
		) {
			return;
		}
		startApprovingKyc();
		VerificationService.approveRejectVerification(
			{ reason: '' },
			id,
			'approve',
			'certificate',
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

	const INPUTVAL = !!verifyData?.verification?.certificate?.certificate_url;
	return (
		<form className='w-[60%] pb-[29px] pt-[74px]'>
			<div className='flex flex-col justify-between items-center h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Professional Certificates</h3>
					<div className='mt-10 border border-dashed flex flex-col justify-between rounded-lg border-[#B3B3B3] w-[420px] gap-2 h-[114px] mx-auto p-[16px]'>
						<div className=''>
							<h3 className='text-[#4D4D4D] break-all'>
								{verifyData?.verification?.certificate?.certificate_url}
							</h3>
							{/* <small className='text-[#7607BD99]'>2MB</small> */}
						</div>
						{INPUTVAL && (
							<a
								href={verifyData?.verification?.certificate?.certificate_url}
								target='_blank'
								rel='noopener noreferrer'
								download
								className='text-[#7E00C4] text-xs cursor-pointer text-center'
							>
								Download{' '}
							</a>
						)}
					</div>
				</div>
				{verifyData?.artisan?.verified?.certificate ||
				verifyData?.user?.verified?.certificate ? (
					<div className='flex gap-2 items-center justify-center'>
						<img src='/svgs/verified.svg' alt='' className='w-9 h-9' />
						<p className='text-[#667085] font-semibold'>Validation Confirmed</p>
					</div>
				) : INPUTVAL ? (
					<div className='flex gap-6 justify-center'>
						<Button
							onClick={handleSubmit(onSubmit)}
							disabled={approvingKyc}
							classes={`bg-[#7607BD] w-[100px] py-2 flex justify-center items-center gap-2 text-white ${
								verifyData?.verification?.certificate?.certificate_url
									? ''
									: 'cursor-not-allowed'
							}`}
						>
							Accept
						</Button>
						<Button
							onClick={(e?: any) => {
								e.preventDefault();
								if (!verifyData?.verification?.certificate?.certificate_url) {
									return;
								} else {
									handleRejectOpen();
								}
							}}
							classes={`border border-[#D92D20] w-[100px] py-2 flex justify-center items-center gap-2 text-[#D92D20] ${
								verifyData?.verification?.certificate?.certificate_url
									? ''
									: 'cursor-not-allowed'
							}`}
						>
							Reject
						</Button>
					</div>
				) : (
					''
				)}
			</div>
			<KycApprovedModal
				open={open}
				handleClose={handleClose}
				name={`${
					verifyData?.artisan?.first_name || verifyData?.user?.first_name
				} ${verifyData?.artisan?.last_name || verifyData?.user?.last_name}`}
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

export default Certificate;
