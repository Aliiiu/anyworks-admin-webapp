import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal';
import { TextField } from 'src/components/ui/form/FormComponent';
import Button from 'src/components/ui/widget/Button';
import { useLoading } from 'src/hooks';
import VerificationService from 'src/service/VerifyService';

const AddressVerification: FC<{
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

	const INPUTVAL =
		verifyData?.verification?.address?.house_address ||
		verifyData?.verification?.address?.city ||
		verifyData?.verification?.address?.state ||
		verifyData?.verification?.address?.city;

	const {
		loading: rejectingKyc,
		startLoading: startRejectingKyc,
		stopLoading: stopRejectingKyc,
	} = useLoading(false);

	const handleRejectKyc = () => {
		if (rejectingKyc) {
			return;
		}
		startRejectingKyc();
		id &&
			VerificationService.approveRejectVerification(
				{ reason: 'rejectionReason' },
				id,
				'reject',
				'address',
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
	};

	const {
		loading: approvingKyc,
		startLoading: startApprovingKyc,
		stopLoading: stopApprovingKyc,
	} = useLoading(false);

	const onSubmit = () => {
		// console.log(data);
		console.log(approvingKyc || !INPUTVAL);
		if (approvingKyc || !INPUTVAL) {
			return;
		}
		startApprovingKyc();
		VerificationService.approveRejectVerification(
			{ reason: '' },
			id,
			'approve',
			'address',
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

	useEffect(() => {
		setValue('address', verifyData?.verification?.address?.house_address || '');
		setValue('city', verifyData?.verification?.address?.city || '');
		setValue('state', verifyData?.verification?.address?.state || '');
		setValue('description', verifyData?.verification?.address?.city || '');
	}, []);

	return (
		<form
			// onSubmit={handleSubmit(onSubmit)}
			className='w-[60%] pb-[29px] pt-[74px]'
		>
			<div className='flex flex-col justify-between h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Address Verification</h3>
					<div className='mt-10'>
						{/* {verifyData?.verification?.address?.house_address} */}
						<TextField
							label={'Residential Address'}
							type='text'
							disabled={true}
							control={control}
							error={formState.errors.address}
							{...register('address', { required: false })}
						/>
						<TextField
							label={'City'}
							type='text'
							disabled={true}
							control={control}
							error={formState.errors.city}
							{...register('city', { required: false })}
						/>
						<TextField
							label={'State'}
							type='text'
							disabled={true}
							control={control}
							error={formState.errors.state}
							{...register('state', { required: false })}
						/>
						<TextField
							label={'Description'}
							type='text'
							disabled={true}
							control={control}
							error={formState.errors.description}
							{...register('description', { required: false })}
						/>
					</div>
				</div>
				{verifyData?.artisan?.verified?.address ||
				verifyData?.user?.verified?.address ? (
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

export default AddressVerification;
