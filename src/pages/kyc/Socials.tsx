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
	fetchData: Function;
	verifyData: { [key: string]: any };
}> = ({ id, verifyData, who, fetchData }) => {
	const { formState, handleSubmit, register, control, setValue } =
		useForm<SocialType>({
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

	const INPUTVAL =
		verifyData?.verification?.social_media?.twitter ||
		verifyData?.verification?.social_media?.facebook ||
		verifyData?.verification?.social_media?.linkedin ||
		verifyData?.verification?.social_media?.others;

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
					// toast.success(res?.data?.message || []);
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

	const onSubmit: SubmitHandler<SocialType> = () => {
		// console.log(data);
		if (approvingKyc || !INPUTVAL) {
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
				toast.success(res?.data?.message || '');
				setTimeout(() => handleOpen(), 1000);
			})
			.catch((err) => {
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
							onClick={handleSubmit(onSubmit)}
							disabled={approvingKyc}
							classes={`bg-[#7607BD] w-[100px] py-2 flex justify-center items-center gap-2 text-white ${
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
							classes={`border border-[#D92D20] w-[100px] py-2 flex justify-center items-center gap-2 text-[#D92D20] ${
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

export default Socials;
