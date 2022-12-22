import { Input } from 'src/styles/commonStyle';
import styled from 'styled-components';
import { formatDateYmd } from 'src/utils/helpers';
import { Flex } from 'src/components/ui';
import { useEffect, useState } from 'react';
import KycData from 'src/service/KycData';
import { ClipLoader } from 'react-spinners';
import useLoading from 'src/hooks/useLoading';
import AdminAuth from 'src/service/AdminAuth';
import { Controller, useForm } from 'react-hook-form';
import { NumberInput } from '../inputs/NumberInput';
import { toast } from 'react-toastify';

const ProfileContainer = styled.div`
	padding: 40px;
	background: #ffffff;
	width: 100%;
	margin-top: 36px;
	border-radius: 16px;
	h3 {
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 32px;
	}
	.input_wrapper {
		display: grid;
		grid: auto / auto auto;
		gap: 20px;
	}
`;

interface Props {
	artisanKyc: any;
}

const KycProfileInfo = ({ artisanKyc }: Props) => {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		mode: 'onChange',
		// defaultValues: {
		// 	callout_fee_min: 200,
		// 	callout_fee_max: 1000,
		// },
	});
	const [minServiceFee, setMinServiceFee] = useState('');
	const [maxServiceFee, setMaxServiceFee] = useState('');
	const [serviceFee, setServiceFee] = useState({ min: '', max: '' });
	const { loading, startLoading, stopLoading } = useLoading(false);

	useEffect(() => {
		// console.log(artisanKyc.artisan._id);
		setMinServiceFee(artisanKyc?.artisan?.call_out_fee?.min || '');
		// reset({ callout_fee_min: 50 });
		setValue('callout_fee_min', artisanKyc?.artisan?.call_out_fee?.min || '');
		setValue('callout_fee_max', artisanKyc?.artisan?.call_out_fee?.max || '');
		setMaxServiceFee(artisanKyc?.artisan?.call_out_fee?.max || '');
	}, [artisanKyc?.artisan?.call_out_fee, reset]);

	const updateCalloutFee = () => {
		console.log({
			min: minServiceFee,
			max: maxServiceFee,
		});
		startLoading();
		KycData.updateCalloutFee(artisanKyc?.artisan._id, {
			callout_fee_min: minServiceFee,
			callout_fee_max: maxServiceFee,
		})
			.then((res) => console.log(res.data.message))
			.catch((err) => console.log(err.response))
			.finally(() => stopLoading());
	};

	useEffect(() => {
		AdminAuth.getServiceFeeRange()
			.then((res) => {
				console.log(res.data);
				setServiceFee(res.data.payload.data.service_fee_range);
			})
			.catch((err) => console.log(err.response));
	}, []);

	const onSubmit = (data: any) => {
		console.log(data);
		startLoading();
		KycData.updateCalloutFee(artisanKyc?.artisan._id, data)
			.then((res) => toast.success(res?.data?.message))
			.catch((err) => toast.error(err?.response?.data?.error?.message))
			.finally(() => stopLoading());
	};
	return (
		<ProfileContainer>
			<h3 className='text-neutral text-3xl'>Profile Information</h3>
			<div
				style={{
					backgroundImage: `url(${
						artisanKyc?.artisan?.display_picture || '/images/profilePics.png'
					})`,
					width: '153px',
					height: '153px',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					objectFit: 'cover',
					backgroundSize: 'cover',
					boxShadow:
						'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
					borderRadius: '50%',
				}}
			></div>
			<br />
			<br />
			<Flex direction='column' gap='2.5rem'>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>First Name</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={artisanKyc?.artisan?.first_name}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Last Name</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={artisanKyc?.artisan?.last_name}
						/>
					</Flex>
				</Flex>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Occupation</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={artisanKyc?.artisan?.occupation}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Date of birth</label>
						<Input
							disabled
							type='date'
							style={{ background: '#F2F4F7' }}
							value={formatDateYmd(artisanKyc?.artisan?.dob)}
						/>
					</Flex>
				</Flex>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Residential Address</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={`${artisanKyc?.artisan?.address?.house_address},${artisanKyc?.artisan?.address?.city}, ${artisanKyc?.artisan?.address?.state}`}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Gender</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={artisanKyc?.artisan?.gender}
						/>
					</Flex>
				</Flex>
				<Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Email</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={artisanKyc?.artisan?.email}
						/>
					</Flex>
					<Flex direction='column' style={{ width: '50%' }}>
						<label htmlFor='first_name'>Phone Number</label>
						<Input
							disabled
							style={{ background: '#F2F4F7' }}
							value={artisanKyc?.artisan?.phone}
						/>
					</Flex>
				</Flex>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Flex align='end'>
						<Flex gap='5px' direction='column' style={{ width: '154px' }}>
							<NumberInput
								label={`Service Fee Minimum (${serviceFee?.min})`}
								control={control}
								{...register('callout_fee_min', {
									required: true,
									min: serviceFee?.min,
								})}
								error={errors.callout_fee_min}
							/>
						</Flex>
						<div className='h-12 flex items-center'>
							<div className='text-black h-[1px] w-2 bg-black' />
						</div>
						<Flex gap='5px' direction='column' style={{ width: '174px' }}>
							<NumberInput
								label={`Service Fee Maximum (${serviceFee?.max})`}
								control={control}
								{...register('callout_fee_max', {
									required: true,
									max: serviceFee?.max,
								})}
								error={errors.callout_fee_max}
							/>
						</Flex>
						<button
							// onClick={updateCalloutFee}
							className='text-primary border border-primary active:bg-primary active:text-white font-semibold rounded-lg text-sm px-2 py-3 min-w-[112px] h-full'
						>
							{loading ? (
								<ClipLoader
									size={20}
									color={'#7607BD'}
									className='text-primary'
								/>
							) : (
								'Update'
							)}
						</button>
					</Flex>
				</form>
			</Flex>
		</ProfileContainer>
	);
};

export default KycProfileInfo;
