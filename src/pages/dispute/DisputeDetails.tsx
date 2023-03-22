import { Disclosure } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { DashboardLayout } from 'src/components/dashboard';
import AppModal from 'src/components/ui/widget/Modal/Modal';
import ResolveModal from './ResolveModal';
import ResolvedCard from 'src/components/dispute/ResolvedCard';
import { disputeService } from 'src/service/disputeService';
import { useLoading } from 'src/hooks';
import { toast, ToastContainer } from 'react-toastify';
import ChatCard from 'src/components/dispute/ChatCard';
import bookingAdminService from 'src/service/BookingAdmin';
import TransactionCard from 'src/components/dispute/TransactionCard';
import UserArtisanChart, {
	ChatProp,
} from 'src/components/dispute/UserArtisanChart';
import { Loader } from 'src/components/common';
import { formatDate } from 'src/utils';
import MapCard from 'src/components/dispute/MapCard';

const DisputeDetails = () => {
	const [showModal, setShowModal] = useState<boolean | null>(false);
	const [showChat, setShowChat] = useState<boolean>(false);
	const [disputeDetails, setDisputeDetails] = useState<{ [x: string]: any }>(
		{}
	);
	const [bookingTrnx, setBookingTrnx] = useState<BookingTrnxType[]>([
		{} as BookingTrnxType,
	]);
	const [escrowTrnx, setEscrowTrnx] = useState<BookingTrnxType[]>([
		{} as BookingTrnxType,
	]);

	const [bookingsDetail, setBookingDetail] = useState<BookingsTypes>(
		{} as BookingsTypes
	);
	const [messageList, setMessageList] = useState<ChatProp[]>();
	const { id } = useParams();
	const { loading, startLoading, stopLoading } = useLoading(false);
	const {
		loading: resolveDispute,
		startLoading: startResolvingDispute,
		stopLoading: stopResolvingDispute,
	} = useLoading(false);
	const [messages, setMessages] = useState<ChatProp[]>([]);

	const fetchDisputeDetails = (booking_id: string) => {
		startLoading();
		disputeService
			.getDisputeDetails(booking_id)
			.then((res) => {
				setDisputeDetails(res?.data?.payload?.data?.dispute);
				setMessageList(res.data?.payload?.data?.dispute?.messages);
				setMessages(res?.data?.payload?.data?.chat_messages);
				setBookingDetail(res?.data?.payload?.data?.booking || {});
				setBookingTrnx(res.data?.payload?.data?.booking_trx);
				setEscrowTrnx(res.data?.payload?.data?.escrow_trx);
				// console.log(res?.data?.payload?.data);
				console.log('Dispute Details');
			})
			.catch((err) => {
				console.log(err?.response?.data?.error?.message);
				toast.error(err?.response?.data?.error?.message);
			})
			.finally(() => stopLoading());
	};

	const resolveDisputes = (dispute_id: string, booking_id: string) => {
		if (resolveDispute) return;
		startResolvingDispute();
		disputeService
			.resolveDispute(dispute_id)
			.then((res) => {
				console.log(res.data.payload);
				toast.success(res.data.message);
				fetchDisputeDetails(booking_id);
			})
			.catch((err) => {
				console.log(err.response);
			})
			.finally(() => stopResolvingDispute());
	};

	useEffect(() => {
		id && fetchDisputeDetails(id);
	}, [id]);

	const location = {
		lat: bookingsDetail?.user_meta?.address?.lat || 6.5882357,
		lng: bookingsDetail?.user_meta?.address?.long || 3.3978118,
	};
	return (
		<DashboardLayout>
			<ToastContainer />
			<div className='flex justify-between'>
				<h2 className='text-4xl'>Booking Details</h2>
				<Link to={'/dispute'}>
					<button className='py-3 px-5 bg-[#7607BD] text-white rounded-lg flex items-center gap-2'>
						<AiOutlineArrowLeft className='text-white' />
						Back to Dispute management
					</button>
				</Link>
			</div>
			{loading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '100px',
					}}
				>
					<Loader>loading...</Loader>{' '}
				</div>
			) : (
				<div className='flex w-full h-full mt-10 gap-10'>
					<div className='bg-white rounded-lg p-[24px] flex-grow-0 items-start max-h-[calc(80vh-45px)] overflow-y-auto w-[35%]'>
						{disputeDetails?.status === 'resolved' && (
							<ResolvedCard
								details={disputeDetails}
								escrowBalance={escrowTrnx}
							/>
						)}
						<div className='mt-10 flex flex-col divide-y divide-gray-300'>
							<div className='flex flex-col gap-2 py-[18px]'>
								<div className='flex gap-2 items-center'>
									<img src='/svgs/check.svg' alt='check' />
									<h3 className='text-xl font-semibold text-[#4d4d4d]'>
										{bookingsDetail?.service || ''}
									</h3>
								</div>
								<div className='flex gap-2 items-center'>
									<img src='/svgs/calendar.svg' alt='check' />
									<h3 className='text-sm text-[#4d4d4d]'>
										{formatDate(bookingsDetail?.createdAt)}
									</h3>
								</div>
							</div>
							<div className='flex flex-col gap-2 py-[18px]'>
								<div className='flex gap-2 items-center'>
									<img src='/svgs/location.svg' alt='check' />
									<h3 className='text-sm text-[#4d4d4d]'>
										{bookingsDetail?.artisan_meta?.address?.house_address &&
											bookingsDetail?.artisan_meta?.address?.house_address +
												', ' +
												bookingsDetail?.artisan_meta?.address?.city +
												', ' +
												bookingsDetail?.artisan_meta?.address?.state}
									</h3>
								</div>
								{/* <img
									src='/images/location.png'
									alt=''
									className='w-full h-[120px] 2xl:h-[170px]'
								/> */}
								<div className='w-full h-[120px] 2xl:h-[170px] overflow-hidden rounded-xl'>
									<MapCard location={location} />
								</div>
							</div>
							<div className='flex flex-col gap-2 py-[18px]'>
								<h5 className='font-semibold text-[#4D4D4D]'>Description</h5>
								<p className='text-[#4D4D4D] text-sm'>
									{disputeDetails?.description || ''}
								</p>
							</div>
							<TransactionCard bookingTrx={bookingTrnx} />
							<div className='py-[18px]'>
								<div className='flex justify-between'>
									<h5 className='text-sm text-[#7607BD]'>Total Amount</h5>
									<span className='text-[14px] font-semibold text-[#7607BD]'>
										N
										{bookingTrnx
											.map((item) => item.amount)
											.reduce((a, b) => a + b, 0)}
									</span>
								</div>
							</div>
						</div>
						<div className='flex justify-center py-6 w-full'>
							<p
								onClick={() => setShowChat((prev) => !prev)}
								className='text-[#4D4D4D] cursor-pointer'
							>
								{showChat
									? 'Back to Admin Chat'
									: 'View customer and vendor chat'}
							</p>
						</div>
						{disputeDetails?.status !== 'resolved' && (
							<div className='flex flex-col gap-9 py-6 w-full'>
								<button
									onClick={() => setShowModal(true)}
									className='py-3 text-[#7607BD] border rounded-lg border-[#7607BD] w-full'
								>
									Refund
								</button>
								<button
									disabled={resolveDispute}
									onClick={() =>
										disputeDetails._id &&
										id &&
										resolveDisputes(disputeDetails._id, id)
									}
									className='py-3 text-white rounded-lg bg-[#7607BD] w-full disabled:bg-opacity-60 disabled:cursor-not-allowed'
								>
									Resolve
								</button>
							</div>
						)}
					</div>
					{showChat ? (
						<UserArtisanChart
							bookingDetails={bookingsDetail}
							messages={messages}
						/>
					) : (
						<ChatCard
							messages={messageList || []}
							bookingDetails={bookingsDetail}
							dispute_id={disputeDetails?._id}
							resolved={disputeDetails?.status === 'resolved'}
							fetchDispute={fetchDisputeDetails}
							setMessage={setMessageList}
						/>
					)}
				</div>
			)}

			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={
					<ResolveModal
						onClose={() => {
							setShowModal(false);
						}}
						fetchDisputeDetails={() => id && fetchDisputeDetails(id)}
						escrowTrnx={escrowTrnx}
						bookingDetails={bookingsDetail}
					/>
				}
			/>
		</DashboardLayout>
	);
};

export default DisputeDetails;
