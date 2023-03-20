import React, { useEffect, useRef, useState } from 'react';
import { IoWarning } from 'react-icons/io5';
import { ScaleLoader } from 'react-spinners';
import { useLoading } from 'src/hooks';
import bookingAdminService from 'src/service/BookingAdmin';

export type ChatProp = {
	message: string;
	_id: string;
	sender: string;
	createdAt: string;
	message_read: boolean;
	message_type: string;
};
type CardProp = {
	bookingDetails: BookingsTypes;
	messages: ChatProp[];
};

type MessageProp = {
	message: ChatProp;
};

const AdminCard = ({ message }: MessageProp) => {
	return (
		<div className='w-full flex flex-col gap-1 items-end mt-5'>
			{message?.message_type === 'text' ? (
				<div className='rounded-lg w-fit max-w-[80%] p-[10px] bg-[#F2F2F2]'>
					<p className='text-[#4D4D4D]'>{message.message}</p>
				</div>
			) : (
				<img
					src={'data:image/png;base64,' + message?.message}
					alt=''
					className='h-[300px]'
				/>
			)}
		</div>
	);
};

const SenderCard = ({ message }: MessageProp) => {
	return (
		<div className='mt-5 w-full'>
			{message?.message_type === 'text' ? (
				<div className='py-[10px] px-[20px] border w-fit max-w-[80%] rounded-r-lg rounded-bl-lg border-[#7E00C4]'>
					{message.message}
				</div>
			) : (
				<img
					src={'data:image/png;base64,' + message?.message}
					alt=''
					className='h-[300px] max-w-[80%]'
				/>
			)}
		</div>
	);
};

const UserArtisanChart = ({ bookingDetails, messages }: CardProp) => {
	const { loading, startLoading, stopLoading } = useLoading(false);
	const messageRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className=' overflow-hidden rounded-lg w-[65%] max-h-[75vh] flex flex-col'>
			<div className='bg-white py-5 px-7 flex justify-between'>
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
				<div className='flex gap-4'>
					<img
						src={bookingDetails?.artisan_meta?.display_picture}
						alt='avatar'
						className='w-[40px] h-[40px] rounded-full'
					/>
					<div className='flex flex-col justify-between'>
						<h3 className='text-sm'>Customer</h3>
						<h3 className='text-base'>
							{bookingDetails?.artisan_meta?.first_name || ''}{' '}
							{bookingDetails?.artisan_meta?.last_name || ''}
						</h3>
					</div>
				</div>
			</div>
			<div className='text-center py-2'>
				You are viewing customer and vendor chat
			</div>
			<div className='p-[28px] rounded-b-lg bg-white h-full overflow-y-auto'>
				{messages.length > 0 ? (
					<div className=''>
						{messages.map((item, idx) => (
							<div ref={messageRef} key={item?._id} className=''>
								{item?.sender === 'user' ? (
									<SenderCard message={item} />
								) : (
									<AdminCard message={item} />
								)}
							</div>
						))}
					</div>
				) : (
					<div className='flex justify-center items-center py-10 px-5'>
						<span className='md:text-sm text-sm px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
							<IoWarning size={20} /> There are currently no available chat
						</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserArtisanChart;
