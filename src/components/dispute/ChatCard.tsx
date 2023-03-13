import React, { FC, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoCheckmarkDone } from 'react-icons/io5';
import { useParams } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';
import avatar from 'src/assets/images/header/avatar.svg';
import { useLoading } from 'src/hooks';
import { disputeService } from 'src/service/disputeService';
import { formatDate, formatTimer } from 'src/utils';

type ChatProp = {
	message: string;
	_id?: string;
	sender?: string;
	message_date: string;
	checked?: boolean;
};
type CardProp = {
	// messages: ChatProp[];
	dispute_id?: string;
	bookingDetails: BookingsTypes;
	resolved?: boolean;
	fetchDispute: Function;
};

type MessageProp = {
	message: ChatProp;
};

const AdminCard = ({ message }: MessageProp) => {
	return (
		<div className='w-full flex flex-col gap-1 items-end mt-5'>
			{message.message && (
				<div className='rounded-lg w-fit max-w-[80%] p-[10px] bg-[#F2F2F2]'>
					<p className='text-[#4D4D4D]'>{message.message}</p>
				</div>
			)}

			<div className='flex gap-1 items-center'>
				<h3 className='text-sm text-[#B3B3B3]'>{message.message_date}</h3>
				{/* <img src='/svgs/seenIcon.svg' alt='' className='w-[18px] h-[18px]' /> */}
				<IoCheckmarkDone
					className={message.checked ? 'text-[#7E00C4]' : 'text-gray-200'}
				/>
			</div>
		</div>
	);
};

const SenderCard = ({ message }: MessageProp) => {
	return (
		<div className='mt-5 w-full'>
			{message.message && (
				<div className='py-[10px] px-[20px] max-w-[80%] border w-fit rounded-r-lg rounded-bl-lg border-[#7E00C4]'>
					{message.message}
				</div>
			)}

			{/* <p className='text-[#B3B3B3] text-sm mt-1'>09:30 PM</p> */}
		</div>
	);
};

const ChatCard = ({ bookingDetails, dispute_id, resolved }: CardProp) => {
	const [messageList, setMessageList] = useState<ChatProp[]>();
	const { handleSubmit, register, reset } = useForm<ChatProp>({
		mode: 'onChange',
	});
	// console.log(resolved);
	const { id } = useParams();
	const messageRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messageList]);

	const fetchDisputeDetails = (booking_id: string) => {
		disputeService
			.getDisputeDetails(booking_id)
			.then((res) => {
				setMessageList(res?.data?.payload?.data?.dispute?.messages);
				console.log('Chat Card');
			})
			.catch((err) => {
				console.log(err?.response?.data?.error?.message);
			});
	};

	useEffect(() => {
		id && fetchDisputeDetails(id);
	}, []);

	const onSubmit: SubmitHandler<ChatProp> = (data) => {
		// console.log(data);
		// console.log(id);
		// setMessageList((prev) => [
		// 	...prev,
		// 	{ sender: 'Admin', message: data.message },
		// ]);
		reset();
		dispute_id &&
			disputeService
				.sendMessage(dispute_id, { sender: 'Admin', message: data.message })
				.then((res) => {
					console.log(res?.data);
					setMessageList(res?.data?.payload?.data?.messages);
					id && fetchDisputeDetails(id);
				})
				.catch((err) => console.log(err?.response));
	};
	return (
		<div className='bg-white rounded-lg overflow-hidden w-[65%] max-h-[75vh] flex flex-col'>
			<div className='border-b-[#E6E6E6] border-b py-5 px-7 flex justify-between'>
				<div className='flex gap-4'>
					<img
						src={bookingDetails?.user_meta?.display_picture}
						alt='avatar'
						className='w-[40px] h-[40px] rounded-full'
					/>
					<div className='flex flex-col justify-between'>
						<h3 className='text-sm'>Customer</h3>
						<h3 className='text-base'>
							{bookingDetails?.user_meta?.first_name || ''}{' '}
							{bookingDetails?.user_meta?.last_name || ''}
						</h3>
					</div>
				</div>
				<div className='flex flex-col justify-between'>
					<h3 className='text-base text-[#4D4D4D]'>
						{formatDate(bookingDetails?.createdAt)}
					</h3>
					<h3 className='text-sm text-[#B3B3B3]'>
						{formatTimer(bookingDetails?.createdAt)}
					</h3>
				</div>
			</div>
			<div className='p-[28px] h-full overflow-y-auto'>
				{messageList ? (
					messageList.map((item, idx) => (
						<div ref={messageRef} key={idx} className=''>
							{item.sender === 'user' ? (
								<SenderCard message={item} />
							) : (
								<AdminCard message={item} />
							)}
						</div>
					))
				) : (
					<div className='flex justify-center py-8 items-center'>
						<ScaleLoader color='#7E00C4' height={30} width={4} />
					</div>
				)}
			</div>
			{!resolved && (
				<div className='w-full flex justify-center py-5'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='rounded-2xl max-w-[80%] w-full px-5 h-[50px] flex items-center bg-[#F2F2F2]'
					>
						<input
							type='text'
							{...register('message', { required: true })}
							className='border-none outline-none bg-transparent w-full'
							placeholder='type here...'
						/>
						<button>
							<img
								src='/svgs/sendIcon.svg'
								alt=''
								className='w-[24px] cursor-pointer h-[24px]'
							/>
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default ChatCard;