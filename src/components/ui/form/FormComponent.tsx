import React, { Fragment, useState } from 'react';
import {
	CheckboxDiv,
	Fieldset,
	PassType,
	SelectInput,
	ToggleContainer,
} from './form.style';
import { ChangeHandler, Controller } from 'react-hook-form';
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
		disabled?: boolean;
		type: string;
		placeholder?: string;
		onChange: ChangeHandler;
	}
>(
	(
		{
			label,
			type,
			name,
			control,
			className,
			error,
			mb,
			placeholder,
			onChange,
			disabled,
		},
		ref
	) => {
		// console.log(error);
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
									disabled={disabled}
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
							disabled={disabled}
							placeholder={placeholder}
							onChange={onChange}
							ref={ref}
							className={` placeholder:text-sm border border-solid bg-[#F2F4F7] border-[#98a2b3] max-h-[50px] rounded-lg py-[10px] px-[14px] w-full outline-none focus:bg-white placeholder:text-[#98a2b3] ${
								error?.message.length === 0 ? 'border-red-500' : ''
							}`}
						/>
					))}
				{error && (
					<small className='text-[12px] text-[#f04438]'>
						{error.message || 'Field is empty'}
					</small>
				)}
			</div>
		);
	}
);

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
					className={`border ${error && 'border-[#f04438] bg-[#f9fafb]'}`}
				/>
			</PassType>
		</Fieldset>
	);
});

export const SelectField = React.forwardRef<
	HTMLSelectElement,
	{
		label: string;
		// name: string;
		// control: any;
		onChange: ChangeHandler;
		className?: string;
		// mb: string;
		// register: any;
		// required: boolean;
		value?: string;
		error: any;
		pattern?: any;
		placeholder?: string;
		selectArr: any;
	}
>(
	(
		{ label, error, placeholder, selectArr, className, onChange, value },
		ref
	) => {
		return (
			<div>
				<label htmlFor='categories' className='mb-1'>
					{label}
				</label>
				<select
					id='categories'
					name='category_slug'
					placeholder={placeholder}
					onChange={onChange}
					ref={ref}
					className={`border border-[#98a2b3] text-sm rounded-lg placeholder:text-[#98a2b3] block w-full px-[10px] py-[14px] ${className} ${
						error?.message.length === 0 ? 'border-[#f04438]' : ''
					}`}
				>
					<option></option>
					{selectArr.map((category: any) => (
						<option key={category._id} value={category.slug}>
							{category.name}
						</option>
					))}
				</select>
				{error && (
					<small className='text-[12px] text-[#f04438]'>
						{error.message || 'Field is empty'}
					</small>
				)}
			</div>
		);
	}
);
