import React, { FC } from 'react';
import { formatDateDmy, numberWithCommas } from 'src/utils';

type CardProp = {
	details: { [x: string]: any };
};
const ResolvedCard = ({ details }: CardProp) => {
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
				<h3 className='text-[#999999]'>Amount: </h3>
				<p className='text-[#4d4d4d]'>
					{details.refund_amount
						? '₦' + numberWithCommas(details.refund_amount)
						: 0}
				</p>
			</div>
		</div>
	);
};

export default ResolvedCard;
