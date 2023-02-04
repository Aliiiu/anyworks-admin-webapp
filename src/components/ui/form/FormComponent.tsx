import React, { Fragment, useState } from 'react';
import {
	CheckboxDiv,
	Fieldset,
	PassType,
	SelectInput,
	ToggleContainer,
} from './form.style';
import { Controller } from 'react-hook-form';
import { FiCheckSquare, FiEye, FiEyeOff, FiSquare } from 'react-icons/fi';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { Listbox, Transition } from '@headlessui/react';
import { HiCheck, HiSelector } from 'react-icons/hi';

const classNames = (...classes: string[]) => {
	return classes.filter(Boolean).join(' ');
};
export const TextField = React.forwardRef<
	HTMLInputElement,
	{
		label: string;
		name: string;
		control: any;
		className?: string;
		mb?: string;
		error: any;
		pattern?: any;
		type: string;
		placeholder?: string;
	}
>(({ label, type, name, control, className, error, mb, placeholder }, ref) => {
	return (
		<div className='mb-4 flex flex-col gap-1'>
			<label htmlFor={name} className='text-black font-light text-opacity-80'>
				{label}
			</label>
			{['email', 'text', 'number', 'file', 'date', 'time'].includes(type) &&
				(type === 'number' ? (
					<Controller
						name={name}
						render={({ field: { onChange } }) => (
							<input
								type={type}
								placeholder={placeholder}
								onChange={(e) => onChange(parseInt(e.target.value, 10))}
							/>
						)}
						control={control}
					/>
				) : (
					<input
						type={type}
						name={name}
						id={name}
						placeholder={placeholder}
						ref={ref}
						className={`${
							error && ''
						} placeholder:text-sm border border-solid bg-[#F2F4F7] border-[#98a2b3] max-h-[50px] rounded-lg py-[10px] px-[14px] w-full outline-none focus:bg-white placeholder:text-[#98a2b3]`}
					/>
				))}
		</div>
	);
});

export const PasswordField = React.forwardRef<
	HTMLInputElement,
	{
		label: string;
		name: string;
		control: any;
		onChange: () => null;
		className: string;
		mb: string;
		register: any;
		required: boolean;
		defaultValue: string;
		error: any;
		pattern?: any;
		type: string;
		placeholder?: string;
	}
>(({ label, name, defaultValue, onChange, error, placeholder }, ref) => {
	const [visible, setVisible] = useState(false);

	return (
		<Fieldset className='w-full'>
			<div className='flex items-center pr-3 justify-between'>
				<legend>{label}</legend>
				<span className='p_visible' onClick={() => setVisible(!visible)}>
					{!visible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
				</span>
			</div>
			<PassType>
				<input
					type={visible ? 'text' : 'password'}
					name={name}
					id={name}
					placeholder={placeholder}
					defaultValue={defaultValue}
					onChange={onChange}
					ref={ref}
					className={`border ${error && 'border-red-500'}`}
				/>
			</PassType>
		</Fieldset>
	);
});

// export const SelectField = React.forwardRef(
// 	(
// 		{
// 			label,
// 			name,
// 			item,
// 			action,
// 			value,
// 			error,
// 			mb,
// 			selected_item,
// 			control,
// 			defaultValue,
// 			className,
// 			disabled,
// 			onPress,
// 			color,
// 		},
// 		ref
// 	) => {
// 		const [selected, setSelected] = useState(defaultValue || 'Select One');
// 		const [selectvalue, setSelectvalue] = useState('');
// 		return (
// 			<Fieldset className={`${mb || 'mb-5'}`}>
// 				<label htmlFor={name} className='text-black font-light text-opacity-80'>
// 					{label}
// 				</label>
// 				<Controller
// 					name={name}
// 					control={control}
// 					defaultValue=''
// 					render={({ field: { onChange }, ...props }) => (
// 						<Listbox
// 							value={selectvalue}
// 							className='outline-none'
// 							onChange={(e) => {
// 								onChange(e);
// 								setSelected(e[selected_item] || e);
// 								setSelectvalue(e[value] || e);
// 								action && action(e);
// 							}}
// 						>
// 							{({ open }) => (
// 								<>
// 									<div
// 										onClick={onPress}
// 										className={`pt-3 ${error && 'border-red-500'}  ${
// 											disabled
// 												? `bg-gray-100 ${color || 'text-gray-400'}`
// 												: 'bg-[#c2cfd633]'
// 										} rounded-lg mt-1 relative w-full ${className}`}
// 									>
// 										<Listbox.Button className='relative w-full pb-3.5 px-3 text-right cursor-pointer font-light text-sm text-gray-400 outline-none'>
// 											<span className='flex items-center'>
// 												<span className='block truncate'>
// 													{disabled
// 														? defaultValue
// 														: selected.replace(/_/g, ' ')}
// 												</span>
// 											</span>
// 											<span className='absolute inset-y-0 right-0 flex items-start pr-0 pointer-events-none'>
// 												<HiSelector
// 													className='h-5 w-5 text-gray-400'
// 													aria-hidden='true'
// 												/>
// 											</span>
// 										</Listbox.Button>
// 										{!disabled && (
// 											<Transition
// 												show={open}
// 												as={Fragment}
// 												leave='transition ease-in duration-100'
// 												leaveFrom='opacity-100'
// 												leaveTo='opacity-0'
// 											>
// 												<Listbox.Options className='absolute z-10 mt-1 w-full bg-white shadow-lg max-h-28 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm'>
// 													{item?.map((content, index) => (
// 														<Listbox.Option
// 															key={index}
// 															className={({ active }) =>
// 																classNames(
// 																	active
// 																		? 'text-white bg-gray-400'
// 																		: 'text-gray-900',
// 																	'cursor-default select-none relative py-2 pl-3 pr-9 outline-none hover:text-white'
// 																)
// 															}
// 															value={content}
// 														>
// 															{({ selected, active }) => (
// 																<>
// 																	<div className='flex items-center'>
// 																		<span
// 																			className={classNames(
// 																				selected
// 																					? 'font-semibold'
// 																					: 'font-normal'
// 																				// "block truncate"
// 																			)}
// 																		>
// 																			{content[selected_item] || content}
// 																		</span>
// 																	</div>

// 																	{selected ? (
// 																		<span
// 																			className={classNames(
// 																				active ? 'text-white' : 'text-red-800',
// 																				'absolute inset-y-0 right-0 flex items-center pr-4'
// 																			)}
// 																		>
// 																			<HiCheck
// 																				className='h-5 w-5'
// 																				aria-hidden='true'
// 																			/>
// 																			{/* <CheckIcon
// 																				className='h-5 w-5'
// 																				aria-hidden='true'
// 																			/> */}
// 																		</span>
// 																	) : null}
// 																</>
// 															)}
// 														</Listbox.Option>
// 													))}
// 												</Listbox.Options>
// 											</Transition>
// 										)}
// 									</div>
// 								</>
// 							)}
// 						</Listbox>
// 					)}
// 				/>
// 			</Fieldset>
// 		);
// 	}
// );
