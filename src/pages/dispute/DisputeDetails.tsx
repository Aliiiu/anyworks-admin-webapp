import { Disclosure } from '@headlessui/react';
import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { DashboardLayout } from 'src/components/dashboard';
import avatar from 'src/assets/images/header/avatar.svg';
import AppModal from 'src/components/ui/widget/Modal/Modal';
import ResolveModal from './ResolveModal';

const DisputeDetails = () => {
	const [showModal, setShowModal] = useState<boolean | null>(false);
	return (
		<DashboardLayout>
			<div className='flex justify-between'>
				<h2 className='text-4xl'>Booking Details</h2>
				<Link to={'/dispute'}>
					<button className='py-3 px-5 bg-[#7607BD] text-white rounded-lg flex items-center gap-2'>
						<AiOutlineArrowLeft className='text-white' />
						Back to Dispute management
					</button>
				</Link>
			</div>
			<div className='flex w-full h-full mt-10 gap-10'>
				<div className='bg-white rounded-lg p-[24px] w-[35%]'>
					<div className='border border-[#7607BD] flex flex-col gap-3 rounded-lg p-3'>
						<div className='flex items-center justify-between'>
							<h3 className='text-[#7E00C4] text-2xl'>Resolved</h3>
							<span className='text-[#4D4D4D]'>06/05/2022</span>
						</div>
						<h3 className='text-[#4d4d4d]'>Order ID: #2323 </h3>
						<div className='flex gap-1'>
							<h3 className='text-[#999999]'>Refunded: </h3>
							<p className='text-[#4d4d4d]'>Customer</p>
						</div>
						<div className='flex gap-1'>
							<h3 className='text-[#999999]'>Amount: </h3>
							<p className='text-[#4d4d4d]'>
								N5,000.00 <span className='text-[#7E00C4]'>(Service Fee)</span>
							</p>
						</div>
					</div>
					<div className='mt-10 flex flex-col divide-y divide-gray-300'>
						<div className='flex flex-col gap-2 py-[18px]'>
							<div className='flex gap-2 items-center'>
								<img src='/svgs/check.svg' alt='check' />
								<h3 className='text-xl font-semibold text-[#4d4d4d]'>
									AC Service and Repair
								</h3>
							</div>
							<div className='flex gap-2 items-center'>
								<img src='/svgs/calendar.svg' alt='check' />
								<h3 className='text-sm text-[#4d4d4d]'>Jul 20, 2022</h3>
							</div>
						</div>
						<div className='flex flex-col gap-2 py-[18px]'>
							<div className='flex gap-2 items-center'>
								<img src='/svgs/location.svg' alt='check' />
								<h3 className='text-sm text-[#4d4d4d]'>
									2323 Mokola Area, Ibadan...
								</h3>
							</div>
							<img
								src='/images/location.png'
								alt=''
								className='w-full h-[120px] 2xl:h-[170px]'
							/>
						</div>
						<div className='flex flex-col gap-2 py-[18px]'>
							<h5 className='font-semibold text-[#4D4D4D]'>Description</h5>
							<p className='text-[#4D4D4D] text-sm'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id
								donec id at sit pretium laoreet velit. Purus magnis iaculis
								turpis nec morbi consectetur neque neque.{' '}
							</p>
						</div>
						<div className='flex flex-col gap-2 py-[18px]'>
							<h5 className='font-semibold text-[#4D4D4D]'>
								Booking Transaction
							</h5>
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
													<p className='text-[12px] text-[#B3B3B3] font-bold'>
														Paid
													</p>
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
						<div className='py-[18px]'>
							<div className='flex justify-between'>
								<h5 className='text-sm text-[#7607BD]'>Total Amount</h5>
								<span className='text-[14px] font-semibold text-[#7607BD]'>
									N15,000
								</span>
							</div>
						</div>
					</div>
					<div className='flex justify-center py-6 w-full'>
						<p className='text-[#4D4D4D]'>View customer and vendor chat</p>
					</div>
					<div className='flex flex-col gap-9 py-6 w-full'>
						<button className='py-3 text-[#7607BD] border rounded-lg border-[#7607BD] w-full'>
							Refund
						</button>
						<button
							onClick={() => setShowModal(true)}
							className='py-3 text-white rounded-lg bg-[#7607BD] w-full'
						>
							Resolve
						</button>
					</div>
				</div>
				<div className='bg-white rounded-lg overflow-hidden w-[65%] relative'>
					<div className='border-b-[#E6E6E6] border-b py-5 px-7 flex justify-between'>
						<div className='flex gap-4'>
							<img
								src={avatar}
								alt='avatar'
								className='w-[40px] h-[40px] rounded-full'
							/>
							<div className='flex flex-col justify-between'>
								<h3 className='text-sm'>Customer</h3>
								<h3 className='text-base'>Olajide Joseph</h3>
							</div>
						</div>
						<div className='flex flex-col justify-between'>
							<h3 className='text-base text-[#4D4D4D]'>Jul 20, 2023</h3>
							<h3 className='text-sm text-[#B3B3B3]'>09:30 PM</h3>
						</div>
					</div>
					<div className='p-[28px]'>
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
						<div className=' w-full flex flex-col gap-1 items-end mt-5'>
							<div className='rounded-lg w-fit p-[10px] bg-[#F2F2F2]'>
								<p className='text-[#4D4D4D]'>
									Hello Joseph, <br /> I am Tonita, i will be assisting you{' '}
									<br /> with your complaint
								</p>
							</div>
							<div className='flex gap-1 items-center'>
								<h3 className='text-sm text-[#B3B3B3]'>09:30 PM</h3>
								<img
									src='/svgs/seenIcon.svg'
									alt=''
									className='w-[18px] h-[18px]'
								/>
							</div>
						</div>
						<div>
							<div className='py-[10px] px-[20px] border w-fit rounded-r-lg rounded-bl-lg border-[#7E00C4]'>
								Lorem ipsum dolor sit amet, <br /> wdaco nsectetur adipiscing
								elit. Velit <br /> at donec mi diam leo sds
							</div>
							<p className='text-[#B3B3B3] text-sm mt-1'>09:30 PM</p>
						</div>
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
			</div>
			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={<ResolveModal onClick={() => setShowModal(false)} />}
			/>
		</DashboardLayout>
	);
};

export default DisputeDetails;
