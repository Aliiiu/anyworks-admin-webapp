import React, { useEffect, useState } from 'react';
import { IoCloseOutline, IoWarning } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import avatar from 'src/assets/images/header/avatar.svg';
import { Flex } from 'src/components/ui';
import { useLoading } from 'src/hooks';
import { disputeService } from '../../service/disputeService';

const ResolveModal: React.FC<{
	onClose: () => void;
	fetchDisputeDetails: () => void;
	escrowTrnx: BookingTrnxType[];
	bookingDetails: BookingsTypes;
}> = ({ onClose, escrowTrnx, bookingDetails, fetchDisputeDetails }) => {
	const [refundId, setRefundId] = useState<string[]>([]);
	const [refundNarration, setRefundNarration] = useState<string[]>([]);
	const { loading, startLoading, stopLoading } = useLoading(false);
	// const pendingTrnx = bookingTrnx;
	useEffect(() => {
		console.log(refundId);
		console.log(refundNarration);
	}, [refundId]);
	const pendingTrnx = escrowTrnx.filter((item) => item.status === 'pending');
	// const updateRefund = (id: string, narration: string) => {
	// 	const temp = { id, narration };
	// };
	const { id } = useParams();
	const handleResolve = () => {
		if (loading) {
			return;
		}
		if (id) {
			startLoading();
			disputeService
				.refund(id, refundNarration)
				.then((res) => {
					toast.success(res.data.message);
					onClose();
					fetchDisputeDetails();
				})
				.catch((err) => toast.error(err.response?.data?.error?.message))
				.finally(() => stopLoading());
		}
	};
	return (
		<div className='flex w-[475px] bg-white flex-col items-center gap-y-[24px] rounded-lg p-10'>
			{/* <ToastContainer /> */}
			<div className='fixed -right-2 z-50 cursor-pointer -top-2 p-1 rounded-full bg-black'>
				<IoCloseOutline onClick={onClose} className='text-white text-xl' />
			</div>
			<div className='w-full flex flex-col items-center justify-center'>
				<h2 className='font-semibold text-2xl'>Refund customer </h2>
				<p className='text-left text-[#4D4D4D]'>Select the fee to refund </p>
				<div className='flex items-center gap-2 mt-3'>
					<img
						src={bookingDetails?.user_meta?.display_picture || avatar}
						alt='avatar'
						className='w-[40px] h-[40px] rounded-full'
					/>
					<h3 className='text-base text-[#4D4D4D]'>
						{bookingDetails?.user_meta?.first_name &&
							bookingDetails?.user_meta?.first_name +
								bookingDetails?.user_meta?.last_name}
					</h3>
					{/* <button className='flex focus:border focus:border-[#7607BD] focus:p-4 focus:rounded-lg gap-4'>
						
					</button> */}
				</div>
			</div>
			<div className='w-full'>
				<p className='text-center text-[#4D4D4D]'>Select Fee</p>
				{pendingTrnx.length > 0 ? (
					<div className='flex justify-between flex-wrap gap-y-2 mt-3'>
						{pendingTrnx.map((item) => (
							<div
								key={item._id}
								onClick={() => {
									if (!refundId.includes(item._id)) {
										setRefundId((prev) => [...prev, item._id]);
										setRefundNarration((prev) => [...prev, item.narration]);
									} else {
										let tempArr = refundId.filter((elem) => elem !== item._id);
										let tempNar = refundNarration.filter(
											(elem) => elem !== item.narration
										);
										setRefundId(tempArr);
										setRefundNarration(tempNar);
									}
								}}
								className={`flex items-start flex-col gap-2 w-36`}
							>
								<label
									className={`text-xs  ${
										refundId.includes(item._id)
											? 'text-primary'
											: 'text-[#4d4d4d]'
									}`}
								>
									{item.narration}
								</label>
								<input
									disabled
									defaultValue={item.amount}
									className={`w-full border cursor-pointer rounded-lg outline-none focus:bg-white px-4 py-3 h-full  ${
										refundId.includes(item._id)
											? 'border-primary bg-primary bg-opacity-40'
											: 'border-[#98a2b3] bg-[#f2f4f7]'
									}`}
								/>
							</div>
						))}
					</div>
				) : (
					<div className='flex gap-2 justify-center items-center px-2'>
						<span className='text-xs px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
							<IoWarning size={15} className='mr-2' /> No pending transactions
						</span>
					</div>
				)}
			</div>
			{refundNarration.length > 0 && (
				<button
					onClick={handleResolve}
					disabled={loading}
					className={`py-3 px-4 rounded-[8px] w-full text-base text-white ${
						loading ? 'bg-[#4307bd33] cursor-not-allowed' : 'bg-primary'
					}`}
				>
					{loading ? <ClipLoader color='#FFFFFF' size={20} /> : 'Refund'}
				</button>
			)}
		</div>
	);
};

export default ResolveModal;
