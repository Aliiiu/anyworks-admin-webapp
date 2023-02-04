import React from 'react';
import { Controller } from 'react-hook-form';

export const NumberInput = React.forwardRef<
	HTMLInputElement,
	{
		label: string;
		error: any;
		control: any;
		name: string;
		value?: string;
	}
>(({ label, control, error, name, value }, ref) => {
	return (
		<div>
			<label className={`sm:text-xs ${error && 'text-red-500'}`}>{label}</label>
			<Controller
				name={name}
				render={({ field: { onChange, value } }) => (
					<input
						type={'number'}
						value={Number(value)}
						onChange={(e) => onChange(parseInt(e.target.value, 10))}
						className={`bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full ${
							error && 'border-red-500'
						}`}
					/>
				)}
				control={control}
			/>
			{/* {error && <p className='text-red-500'>max fee</p>} */}
		</div>
	);
});
