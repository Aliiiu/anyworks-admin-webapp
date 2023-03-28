import React, { FC } from 'react';
import { formatDateDmy, numberWithCommas } from 'src/utils';

type CardProp = {
	details: { [x: string]: any };
	escrowBalance: BookingTrnxType[];
};
const ResolvedCard = ({ details, escrowBalance }: CardProp) => {
	const refunded_amount = escrowBalance.reduce((a, b) => a + b?.amount, 0);
	return (
		<div className='border border-[#7607BD] flex flex-col gap-2 2xl:gap-3 rounded-lg p-3'>
			<div className='flex items-center justify-between'>
				<h3 className='text-[#7E00C4] text-xl 2xl:text-2xl'>Resolved</h3>
				<span className='text-[#4D4D4D]'>
					{formatDateDmy(details.resolve_date)}
				</span>
			</div>
			{/* <div className='flex gap-1'>
				<h3 className='text-[#999999]'>Refunded: </h3>
				<p className='text-[#4d4d4d]'>Customer</p>
			</div> */}
			<div className='flex justify-between'>
				<h3 className='text-[#999999]'>Refunded Amount: </h3>
				<p className='text-[#4d4d4d]'>
					{refunded_amount ? '₦' + numberWithCommas(refunded_amount) : 0}
				</p>
			</div>
		</div>
	);
};

export default ResolvedCard;
