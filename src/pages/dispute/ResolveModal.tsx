import React from 'react';
import { IoCloseOutline, IoWarning } from 'react-icons/io5';
import avatar from 'src/assets/images/header/avatar.svg';
import { Flex } from 'src/components/ui';
import { BookingTrnxType } from './DisputeDetails';

const ResolveModal: React.FC<{
	onClick: () => void;
	bookingTrnx: BookingTrnxType[];
	bookingDetails: BookingsTypes;
}> = ({ onClick, bookingTrnx, bookingDetails }) => {
	console.log(bookingDetails);
	const pendingTrnx = bookingTrnx.filter((item) => item.status === 'pending');
	return (
		<div className='flex w-[475px] bg-white flex-col items-center gap-y-[24px] rounded-lg p-10'>
			<div className='fixed -right-2 z-50 cursor-pointer -top-2 p-1 rounded-full bg-black'>
				<IoCloseOutline onClick={onClick} className='text-white text-xl' />
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
				{pendingTrnx.length > 0 ? (
					<div className='flex justify-between flex-wrap gap-y-2 mt-3'>
						<p className='text-left text-[#4D4D4D]'>Select Fee</p>
						{pendingTrnx.map((item) => (
							<Flex
								key={item._id}
								align='start'
								gap='5px'
								direction='column'
								style={{ width: '154px' }}
							>
								<label className='text-[#4D4D4D] text-xs'>
									{item.narration}
								</label>
								<input
									disabled
									defaultValue={item.amount}
									className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
								/>
							</Flex>
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
			<button
				onClick={onClick}
				className='py-3 px-4 rounded-[8px] w-full text-base text-white bg-[#4307bd33]'
			>
				Refund
			</button>
		</div>
	);
};

export default ResolveModal;
