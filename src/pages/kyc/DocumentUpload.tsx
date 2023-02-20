import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoWarning } from 'react-icons/io5';
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
	who: string;
	verifyData: { [key: string]: any };
	fetchData: Function;
}> = ({ id, verifyData, who, fetchData }) => {
	const { handleSubmit, control, setValue } = useForm({
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
		startRejectingKyc();
		id &&
			VerificationService.approveRejectVerification(
				{ reason: 'rejectionReason' },
				id,
				'reject',
				'id_card',
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
		if (!verifyData?.verification?.id_card?.id_card_url || approvingKyc) {
			return;
		}
		startApprovingKyc();
		VerificationService.approveRejectVerification(
			{ reason: '' },
			id,
			'approve',
			'id_card',
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
			<div className='flex flex-col justify-between h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>
						{verifyData?.verification?.id_card?.id_card_type || ''}
					</h3>
					{verifyData?.verification?.id_card?.id_card_url ? (
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
					) : (
						<div className='flex justify-center items-center py-10 px-5'>
							<span className='md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
								<IoWarning size={20} /> There are currently no available data
							</span>
						</div>
					)}
				</div>
				{verifyData?.artisan?.verified?.id_card ||
				verifyData?.user?.verified?.id_card ? (
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
								verifyData?.verification?.id_card?.id_card_url
									? ''
									: 'cursor-not-allowed'
							}`}
						>
							Accept
						</Button>
						<Button
							onClick={(e?: any) => {
								e.preventDefault();
								if (!verifyData?.verification?.id_card?.id_card_url) {
									return;
								} else {
									handleRejectOpen();
								}
							}}
							classes={`border border-[#D92D20] w-[100px] py-2 flex justify-center items-center gap-2 text-[#D92D20] ${
								verifyData?.verification?.id_card?.id_card_url
									? ''
									: 'cursor-not-allowed'
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

export default DocumentUpload;
