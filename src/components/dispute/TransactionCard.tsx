import { Disclosure } from '@headlessui/react';
import React from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';

const TransactionCard = () => {
	return (
		<div className='flex flex-col gap-2 py-[18px]'>
			<h5 className='font-semibold text-[#4D4D4D]'>Booking Transaction</h5>
			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button
							className={`flex w-full justify-between items-center font-medium text-[#B3B3B3] border-l-white border-l-[7px] focus:outline-none `}
						>
							<span className='text-[14px] font-medium'>Services</span>
							<div className='flex items-center gap-2'>
								<span className='text-[#4D4D4D]'>4</span>
								<MdKeyboardArrowRight
									className={`${
										open ? 'rotate-90 transform' : ''
									} h-5 w-5 text-[#b3b3b3]`}
								/>
							</div>
						</Disclosure.Button>
						<Disclosure.Panel className='px-2 flex flex-col gap-4 py-4 rounded-lg bg-[#F2F2F2] text-gray-500'>
							<div className='flex justify-between'>
								<span className='text-[#999999]'>Service 1</span>
								<div className='flex gap-3 items-center'>
									<p className='text-[14px] text-[#999999] font-semibold'>
										N5,000
									</p>
									<p className='text-[12px] text-[#B3B3B3] font-bold'>Paid</p>
								</div>
							</div>
							<div className='flex justify-between'>
								<span className='text-[#4D4D4D]'>Service 2</span>
								<p className='text-[14px] text-[#4D4D4D] font-semibold'>
									N5,000
								</p>
							</div>
							<div className='flex justify-between'>
								<span className='text-[#4D4D4D]'>Service 3</span>
								<p className='text-[14px] text-[#4D4D4D] font-semibold'>
									N5,000
								</p>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default TransactionCard;
