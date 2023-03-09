import { Disclosure } from '@headlessui/react';
import React from 'react';
import { IoWarning } from 'react-icons/io5';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { BookingTrnxType } from 'src/pages/dispute/DisputeDetails';
import { numberWithCommas } from 'src/utils';

const TransactionCard = ({ bookingTrx }: { bookingTrx: BookingTrnxType[] }) => {
	// console.log(bookingTrx);
	return (
		<div className='flex flex-col gap-2 py-[18px]'>
			<h5 className='font-semibold text-[#4D4D4D]'>Booking Transaction</h5>
			{bookingTrx.length > 0 ? (
				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={`flex w-full justify-between items-center font-medium text-[#B3B3B3] border-l-white border-l-[7px] focus:outline-none `}
							>
								<span className='text-[14px] font-medium'>Services</span>
								<div className='flex items-center gap-2'>
									<span className='text-[#4D4D4D]'>
										{bookingTrx?.length || 0}
									</span>
									<MdKeyboardArrowRight
										className={`${
											open ? 'rotate-90 transform' : ''
										} h-5 w-5 text-[#b3b3b3]`}
									/>
								</div>
							</Disclosure.Button>
							{bookingTrx.map((item) => (
								<Disclosure.Panel
									key={item._id}
									className='px-2 flex flex-col gap-4 py-4 rounded-lg bg-[#F2F2F2] text-gray-500'
								>
									<div className='flex justify-between'>
										<span className='text-[#999999]'>Narration:</span>
										<p className='text-[14px] text-[#999999] font-semibold'>
											{item.narration}
										</p>
									</div>
									<div className='flex justify-between'>
										<span className='text-[#999999]'>Amount:</span>
										<p className='text-[14px] text-[#999999] font-semibold'>
											{item.amount ? '₦' + numberWithCommas(item.amount) : 0}
										</p>
									</div>
									<div className='flex justify-between'>
										<span className='text-[#999999]'>Status:</span>
										<p className='text-[14px] text-[#999999] font-semibold'>
											{item.status}
										</p>
									</div>
								</Disclosure.Panel>
							))}
						</>
					)}
				</Disclosure>
			) : (
				<div className='flex gap-2 justify-center items-center px-2'>
					<span className='text-xs px-5 py-3 flex items-center leading-5 rounded-lg bg-gray-50 text-gray-500'>
						<IoWarning size={15} /> No available transactions
					</span>
				</div>
			)}
		</div>
	);
};

export default TransactionCard;
