import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from 'src/components/ui/form/FormComponent';
import Button from 'src/components/ui/widget/Button';

const AddressVerification = () => {
	const { formState, handleSubmit, register, control, setValue } = useForm({
		mode: 'onChange',
	});
	return (
		<form className='w-[60%] pb-[29px] pt-[74px]'>
			<div className='flex flex-col justify-between h-full'>
				<div className='p-[34px] w-full max-w-[530px] mx-auto'>
					<h3 className='font-medium text-2xl'>Address Verification</h3>
					<div className='mt-10'>
						<TextField
							label={'Residential Address'}
							type='text'
							control={control}
							error={formState.errors.address}
							{...register('address', { required: false })}
						/>
						<TextField
							label={'City'}
							type='text'
							control={control}
							error={formState.errors.city}
							{...register('city', { required: false })}
						/>
						<TextField
							label={'State'}
							type='text'
							control={control}
							error={formState.errors.state}
							{...register('state', { required: false })}
						/>
						<TextField
							label={'Description'}
							type='text'
							control={control}
							error={formState.errors.description}
							{...register('description', { required: false })}
						/>
					</div>
				</div>
				<div className='flex gap-6 justify-center'>
					<Button classes='bg-[#7607BD] text-2xl py-2 flex justify-center items-center gap-2 text-white'>
						Accept
					</Button>
					<Button classes='border border-[#D92D20] text-2xl py-2 flex justify-center items-center gap-2 text-[#D92D20]'>
						Reject
					</Button>
				</div>
			</div>
		</form>
	);
};

export default AddressVerification;
