import React, { FC } from 'react';
import avatar from 'src/assets/images/header/avatar.svg';
import { formatDate, formatTimer } from 'src/utils';

type ChatProp = {
	message: string;
	_id: string;
	sender: string;
};
type CardProp = {
	messages: ChatProp[];
	bookingDetails: BookingsTypes;
};

type MessageProp = {
	message: ChatProp;
};

const AdminCard = ({ message }: MessageProp) => {
	return (
		<div className=' w-full flex flex-col gap-1 items-end mt-5'>
			{message.message && (
				<div className='rounded-lg w-fit p-[10px] bg-[#F2F2F2]'>
					<p className='text-[#4D4D4D]'>{message.message}</p>
				</div>
			)}

			{/* <div className='flex gap-1 items-center'>
				<h3 className='text-sm text-[#B3B3B3]'>09:30 PM</h3>
				<img src='/svgs/seenIcon.svg' alt='' className='w-[18px] h-[18px]' />
			</div> */}
		</div>
	);
};

const SenderCard = ({ message }: MessageProp) => {
	return (
		<div className='mt-5'>
			{message.message && (
				<div className='py-[10px] px-[20px] border w-fit rounded-r-lg rounded-bl-lg border-[#7E00C4]'>
					{message.message}
				</div>
			)}

			{/* <p className='text-[#B3B3B3] text-sm mt-1'>09:30 PM</p> */}
		</div>
	);
};
const ChatCard = ({ messages, bookingDetails }: CardProp) => {
	return (
		<div className='bg-white rounded-lg overflow-hidden w-[65%] max-h-[75vh] relative'>
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
			<div className='px-[28px] pt-[28px] pb-[200px] h-full overflow-y-auto'>
				<div>
					<div className='py-[10px] px-[20px] border w-fit rounded-r-lg rounded-bl-lg border-[#7E00C4]'>
						Order ID: #2323{' '}
					</div>
					<p className='text-[#B3B3B3] text-sm mt-1'>09:30 PM</p>
				</div>
				<div className='rounded-lg border border-[#B3B3B3] max-w-[461px] mx-auto mt-5 pl-[50px] py-4'>
					<div className='flex items-center gap-2'>
						<img src='/svgs/chat.svg' alt='chat' className='w-6 h-6' />
						<p className='text-[#333333]'>Frequently Asked Questions</p>
					</div>
				</div>
				{messages &&
					messages.map((item, idx) => (
						<div key={item._id} className=''>
							{item.sender === 'user' ? (
								<SenderCard message={item} />
							) : (
								<AdminCard message={item} />
							)}
						</div>
					))}
			</div>
			<div className='absolute w-full flex justify-center bottom-[4%]'>
				<div className='rounded-2xl max-w-[80%] w-full px-5 h-[50px] flex items-center bg-[#F2F2F2]'>
					<input
						type='text'
						className='border-none outline-none bg-transparent w-full'
						placeholder='type here...'
					/>
					<img
						src='/svgs/sendIcon.svg'
						alt=''
						className='w-[24px] cursor-pointer h-[24px]'
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatCard;
