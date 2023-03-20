import React, { useEffect, useRef, useState } from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import useBoolean from 'src/hooks/useBoolean';
import { toast, ToastContainer } from 'react-toastify';
import { Flex, Loading } from 'src/components/ui';
import { auth, setAuthUser } from 'src/store/Auth';
import { BounceLoader, ClipLoader, ScaleLoader } from 'react-spinners';
import Visibility from 'src/components/common/Visibility';
import miscService from 'src/service/miscServices';
import { useLoading } from 'src/hooks';
import AdminAuth from 'src/service/AdminAuth';
import AppModal from 'src/components/ui/widget/Modal/Modal';
import ModalContent from 'src/components/common/ModalContent';
import { AiOutlinePlus } from 'react-icons/ai';
import DaysRangePicker from 'src/components/common/daysRangePicker';
import { SubmitHandler, useForm } from 'react-hook-form';
import ChangePasswordCard from 'src/components/settings/ChangePasswordCard';

type IntervalFeeType = {
	_id?: string;
	start_time: string;
	end_time: string;
	percent: string;
};
type VariableFeeType = {
	amount_per_km: number;
	time_variation: IntervalFeeType[];
};
const Settings = () => {
	const { formState, handleSubmit, register, control, setValue } =
		useForm<VariableFeeType>({
			mode: 'onChange',
		});
	const [timeRangeCount, setTimeRangeCount] = useState(1);
	const [timeIntervalFee, setTimeIntervalFee] = useState<IntervalFeeType[]>([
		{
			start_time: '',
			end_time: '',
			percent: '',
		},
	]);
	const [values, setValues] = useState('');

	const handleChange = (event: any) => {
		const result = event.target.value.replace(/\D/g, '');

		setValues(result);
	};
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [serviceFee, setServiceFee] = useState({ min: '', max: '' });

	const [minServiceFee, setMinServiceFee] = useState('');
	const [maxServiceFee, setMaxServiceFee] = useState('');
	const [showModal, setShowModal] = useState<boolean | null>(false);

	const {
		loading: fetchIntervalFee,
		startLoading: startFetchingServiceFee,
		stopLoading: stopFetchingServiceFee,
	} = useLoading();

	useEffect(() => {
		startFetchingServiceFee();
		AdminAuth.getServiceFeeRange()
			.then((res) => {
				// console.log(res.data);
				setServiceFee(res?.data?.payload?.data?.service_fee_range);
				setMaxServiceFee(res?.data?.payload?.data?.service_fee_range?.max);
				setMinServiceFee(res?.data?.payload?.data?.service_fee_range?.min);
			})
			.catch((err) => console.log(err.response))
			.finally(() => stopFetchingServiceFee());
	}, []);

	const { loading, startLoading, stopLoading } = useLoading();
	const {
		loading: updateIntervalFee,
		startLoading: startUpdatingServiceFee,
		stopLoading: stopUpdatingServiceFee,
	} = useLoading();

	const cacheHandler = () => {
		startLoading();
		miscService
			.delCache()
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((err) => console.log(err.response.data.message))
			.finally(() => {
				stopLoading();
				setShowModal(false);
			});
	};

	const updateCalloutFee = () => {
		startUpdatingServiceFee();
		console.log({
			min: minServiceFee,
			max: maxServiceFee,
		});
		AdminAuth.serviceFeeRange({
			min: minServiceFee,
			max: maxServiceFee,
		})
			.then((res) => {
				toast.success(res.data.message);
				console.log(res.data.message);
				stopUpdatingServiceFee();
			})
			.catch((err) => console.log(err.response));
	};

	useEffect(() => {
		document.title = 'Settings';
	}, []);

	const {
		loading: timeFee,
		startLoading: startLoadingTimeFee,
		stopLoading: stopLoadingTimeFee,
	} = useLoading();

	const onSubmit: SubmitHandler<VariableFeeType> = (data) => {
		data.time_variation = timeIntervalFee;
		console.log(data);
		startLoadingTimeFee();
		miscService
			.setVariableFee(data)
			.then((res) => {
				console.log(res?.data?.payload);
				toast.success(res?.data?.message);
			})
			.catch((err) => err.response.data)
			.finally(() => stopLoadingTimeFee());
	};

	const {
		loading: getIntervalFee,
		startLoading: startLoadingIntervalFee,
		stopLoading: stopLoadingIntervalFee,
	} = useLoading();

	useEffect(() => {
		startLoadingIntervalFee();
		miscService
			.getVariable()
			.then((res) => {
				console.log(res?.data);
				setValue('amount_per_km', res?.data?.payload?.data?.amount_per_km);
				setValues(res?.data?.payload?.data?.amount_per_km);
				const timeVar = res?.data?.payload?.data?.time_variation;
				setTimeIntervalFee(timeVar);
			})
			.catch((err) => err?.response?.data)
			.finally(() => stopLoadingIntervalFee());
	}, []);
	return (
		<DashboardLayout pageTitle='Settings'>
			<ToastContainer />
			<ChangePasswordCard />
			<div className='my-10 p-[35px] rounded-2xl bg-white flex flex-col divide-y'>
				<form className='py-[25px]'>
					{getIntervalFee ? (
						<div className='flex justify-center py-8 items-center'>
							<ScaleLoader color='#7E00C4' height={30} width={4} />
						</div>
					) : (
						<>
							<p className='mb-1 text-2xl font-semibold'>Variable Fee</p>
							<div className='flex items-center'>
								<div className='flex flex-col gap-4'>
									<label>Distance Fee</label>
									<div className='flex items-center gap-1'>
										<input
											{...register('amount_per_km', { required: true })}
											value={values}
											onChange={handleChange}
											className='bg-[#F2F4F7] max-w-[154px] border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
										/>
										<span className='text-[#4D4D4D] font-light'>per KM</span>
									</div>
								</div>
								<div className='w-[1px] h-[118px] bg-[#F2F2F2] mx-[68px]'></div>
								<div className='flex flex-col gap-4'>
									<div className='flex justify-between gap-4'>
										<label>Time Interval Fee</label>
										<button
											className='flex items-center cursor-pointer gap-2'
											onClick={(e: any) => {
												e.preventDefault();
												setTimeIntervalFee((prev) => [
													...prev,
													{
														_id: String(timeIntervalFee.length + 1),
														start_time: '',
														end_time: '',
														percent: '',
													},
												]);
											}}
										>
											<AiOutlinePlus className='text-primary' />
											<span className='text-primary'>Add</span>
										</button>
									</div>
									{timeIntervalFee.map((item, index) => (
										<div
											key={index}
											className='flex justify-between items-center'
										>
											<input
												value={item?.percent || ''}
												onChange={(e) => {
													const value = e.target.value.replace(/\D/g, '');
													if (e.target.value === '' || Number(value) <= 100) {
														let tempTime = [...timeIntervalFee];
														tempTime[index] = {
															...item,
															percent: e.target.value.replace(/\D/g, ''),
														};
														setTimeIntervalFee(tempTime);
													}
												}}
												className='bg-[#F2F4F7] max-w-[154px] border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
											/>
											<DaysRangePicker
												startTime={item.start_time}
												endTime={item.end_time}
												onDelete={() => {
													console.log(item?._id);
													setTimeIntervalFee((prevState) =>
														prevState.filter((elem) => elem._id !== item._id)
													);
												}}
												setStartTime={(e: any) => {
													const value = e.target.value;
													// console.log(value.split(':')[0]);
													let tempTime = [...timeIntervalFee];
													tempTime[index] = {
														...item,
														start_time: value.split(':')[0],
													};
													setTimeIntervalFee(tempTime);
												}}
												setEndTime={(e: any) => {
													// console.log(e.target.value);
													const value = e.target.value;
													let tempTime = [...timeIntervalFee];
													tempTime[index] = {
														...item,
														end_time: value.split(':')[0],
													};
													setTimeIntervalFee(tempTime);
												}}
											/>
											{/* <div className='flex pl-4 items-center gap-4'>
										<p className='text-[#999999]'>Mon - Fri</p>
										<div className='flex gap-1 items-center'>
											<p className='text-[#999999]'>8AM - 4PM</p>
											<img
												src='/svgs/calendar-new.svg'
												alt=''
												className='w-6 h-6'
											/>
										</div>
									</div> */}
										</div>
									))}
								</div>
							</div>

							<button
								onClick={handleSubmit(onSubmit)}
								className='text-primary border border-primary active:bg-primary active:text-white font-semibold rounded-lg text-sm px-2 py-3 min-w-[112px] h-full'
							>
								{timeFee ? (
									<ClipLoader
										size={20}
										color={'#7607BD'}
										className='text-primary'
									/>
								) : (
									'Set Interval Fee'
								)}
							</button>
						</>
					)}
				</form>

				{fetchIntervalFee ? (
					<div className='flex justify-center py-8 items-center'>
						<ScaleLoader color='#7E00C4' height={30} width={4} />
					</div>
				) : (
					<div className='py-[25px]'>
						<p className='mb-1 text-2xl font-semibold'>Set Service Fee</p>
						<Flex align='end'>
							<Flex gap='5px' direction='column' style={{ width: '154px' }}>
								<label>Service Fee Minimum</label>
								<input
									className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
									value={minServiceFee}
									onChange={(e) => setMinServiceFee(e.target.value)}
								/>
							</Flex>
							<div className='h-12 flex items-center'>
								<div className='text-black h-[1px] w-2 bg-black' />
							</div>
							<Flex gap='5px' direction='column' style={{ width: '154px' }}>
								<label>Service Fee Maximum</label>
								<input
									className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
									value={maxServiceFee}
									onChange={(e) => setMaxServiceFee(e.target.value)}
								/>
							</Flex>
							<button
								onClick={updateCalloutFee}
								className='text-primary border border-primary active:bg-primary active:text-white font-semibold rounded-lg text-sm px-2 py-3 min-w-[112px] h-full'
							>
								{updateIntervalFee ? (
									<ClipLoader
										size={20}
										color={'#7607BD'}
										className='text-primary'
									/>
								) : (
									'Set Service Fee'
								)}
							</button>
						</Flex>
					</div>
				)}
			</div>
			<div className='my-10 p-[35px] rounded-2xl bg-white'>
				<h2 className='font-semibold text-2xl'>Clear Cache</h2>
				<button
					onClick={() => setShowModal(true)}
					className='bg-primary px-4 py-3 flex cursor-not-allowed justify-center text-white min-w-[100px] rounded-lg mt-2'
				>
					{'Click here'}
				</button>
			</div>
			<AppModal
				open={showModal}
				onClose={() => setShowModal(false)}
				content={
					<ModalContent
						content1='Clear Cache'
						content2='Are you sure you want to clear the cache?'
						btnAction={cacheHandler}
						linkContent='Yes, Clear'
						loading={loading}
						onClick={() => setShowModal(false)}
					/>
				}
			/>
		</DashboardLayout>
	);
};

export default Settings;
