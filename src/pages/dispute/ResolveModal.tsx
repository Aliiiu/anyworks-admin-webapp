import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import avatar from 'src/assets/images/header/avatar.svg';
import { Flex } from 'src/components/ui';

const ResolveModal: React.FC<{
	onClick: () => void;
}> = ({ onClick }) => {
	return (
		<div className='flex w-[475px] bg-white flex-col items-center gap-y-[24px] rounded-lg p-10'>
			<div className='fixed -right-2 z-50 cursor-pointer -top-2 p-1 rounded-full bg-black'>
				<IoCloseOutline onClick={onClick} className='text-white text-xl' />
			</div>
			<h2 className='font-semibold text-2xl'>Refund</h2>
			<div className='w-full'>
				<p className='text-left text-[#4D4D4D]'>Select who to fund</p>
				<div className='flex justify-between items-center mt-3'>
					<button className='flex focus:border focus:border-[#7607BD] focus:p-4 focus:rounded-lg gap-4'>
						<img
							src={avatar}
							alt='avatar'
							className='w-[40px] h-[40px] rounded-full'
						/>
						<div className='flex flex-col justify-between'>
							<h3 className='text-xs text-[#4D4D4D]'>Customer</h3>
							<h3 className='text-base text-[#4D4D4D]'>Olajide Joseph</h3>
						</div>
					</button>
					<button className='flex flex-row-reverse focus:border focus:border-[#7607BD] focus:p-4 focus:rounded-lg gap-4'>
						<img
							src={avatar}
							alt='avatar'
							className='w-[40px] h-[40px] rounded-full'
						/>
						<div className='flex flex-col justify-between'>
							<h3 className='text-xs text-[#4D4D4D]'>Vendor</h3>
							<h3 className='text-sm text-[#4D4D4D]'>Olajide Joseph</h3>
						</div>
					</button>
				</div>
			</div>
			<div className='w-full'>
				<p className='text-left text-[#4D4D4D]'>Select Fee</p>
				<div className='flex justify-between mt-3'>
					<Flex
						align='start'
						gap='5px'
						direction='column'
						style={{ width: '154px' }}
					>
						<label className='text-[#4D4D4D] text-xs'>Service Fee</label>
						<input className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full' />
					</Flex>
					<Flex
						align='start'
						gap='5px'
						direction='column'
						style={{ width: '154px' }}
					>
						<label className='text-[#4D4D4D] text-xs'>Call-Out Fee</label>
						<input className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full' />
					</Flex>
				</div>
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
