import { Menu, RadioGroup, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const DaysRangePicker = ({ setStartTime, setEndTime, startTime, endTime }) => {
	const [daysSelector, setDaysSelector] = useState(null);
	const [start, setStart] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [count, setCount] = useState(0);
	const [range, setRange] = useState([]);
	let [time, setTime] = useState('AM');
	let [timeDay, setTimeDay] = useState('AM');
	const [open, setOpen] = useState(false);

	const [daysArr, setDaysArr] = useState([
		{ id: 0, day: 'Monday', selected: false },
		{ id: 1, day: 'Tuesday', selected: false },
		{ id: 2, day: 'Wednesday', selected: false },
		{ id: 3, day: 'Thursday', selected: false },
		{ id: 4, day: 'Friday', selected: false },
		{ id: 5, day: 'Saturday', selected: false },
		{ id: 6, day: 'Sunday', selected: false },
	]);

	// useEffect(() => {
	// 	console.log(start);
	// }, [start]);

	const selectDate = (item) => {
		if (start === null) {
			setStart(item.id);
			setStartDate(item.day.substring(0, 3));
			item.selected = true;
			let days = [...daysArr];
			let dayIndex = days.indexOf(item);
			days[dayIndex] = { ...item };
			setDaysArr(days);
		} else {
			// console.log(item.id);
			let end = item.id;
			setEndDate(item.day.substring(0, 3));
			if (start < item.id) {
				let tempArr = [...daysArr];
				tempArr.map((item) => {
					if (item.id >= start && item.id <= end) {
						item.selected = true;
					} else {
						item.selected = false;
					}
				});
				console.log(tempArr);
				setDaysArr(tempArr);
			} else {
				// setStart(null);
				setStart(item.id);
				let strt = item.id;
				setStartDate(item.day.substring(0, 3));
				let tempArr = [...daysArr];
				tempArr.map((item) => {
					if (item.id === strt) {
						item.selected = true;
					} else {
						item.selected = false;
					}
				});
			}
		}
	};
	// console.log(dayjs(`${startTime ? startTime : '00'}:00`, 'HH:mm'));
	return (
		<div className=''>
			<Menu as='div' className='relative inline-block text-left'>
				<div>
					<Menu.Button className='flex pl-4 items-center gap-4'>
						<p className='text-[#999999]'>
							{startDate ? startDate : 'Mon'} - {endDate ? endDate : 'Fri'}
						</p>
						<div className='flex gap-1 items-center'>
							<p className='text-[#999999]'>
								{startTime ? startTime + ':00' : '04:00'} -{' '}
								{endTime ? endTime + ':00' : '16:00'}
							</p>
							<img src='/svgs/calendar-new.svg' alt='' className='w-6 h-6' />
						</div>
					</Menu.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-out duration-100'
					enterFrom='transform opacity-0 scale-95'
					enterTo='transform opacity-100 scale-100'
					leave='transition ease-in duration-75'
					leaveFrom='transform opacity-100 scale-100'
					leaveTo='transform opacity-0 scale-95'
				>
					<Menu.Items className='absolute right-0 z-40 mt-6 w-[349px] p-6 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
						{/* <div>
							<h4 className='text-[#4D4D4D]'>Select Date</h4>
							<div className='flex gap-x-5 gap-y-3 mt-3 flex-wrap'>
								{daysArr.map((item, index) => (
									<small
										onClick={() => selectDate(item)}
										className={`${
											item.selected
												? 'text-primary border border-primary px-1 rounded-2xl'
												: 'text-[#B3B3B3]'
										}  cursor-pointer`}
										key={index}
									>
										{item.day}
									</small>
								))}
							</div>
						</div> */}
						<div className='mt-4'>
							<h4 className='text-[#4D4D4D]'>Select Time</h4>
							<div className='flex justify-between mt-3'>
								<div className='flex flex-col gap-1'>
									<label className='text-[#999999] text-xs'>From</label>
									<div className='flex gap-1 max-h-fit'>
										<div className='flex flex-col gap-1'>
											<input
												value={`${
													startTime
														? Number(startTime) < 10
															? '0' + startTime
															: startTime
														: '00'
												}:00`}
												onChange={(e) => setStartTime(e)}
												type='time'
												className='bg-[#F2F4F7] max-w-[92px] border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-2 py-3 h-[44px]'
											/>
										</div>
										{/* <RadioGroup value={time} onChange={setTime}>
											<RadioGroup.Option value='AM'>
												{({ checked }) => (
													<small
														className={
															checked
																? 'text-[#7E00C4] text-sm'
																: 'text-[#B3B3B3] cursor-pointer'
														}
													>
														AM
													</small>
												)}
											</RadioGroup.Option>
											<RadioGroup.Option value='PM'>
												{({ checked }) => (
													<small
														className={
															checked
																? 'text-[#7E00C4] text-sm'
																: 'text-[#B3B3B3] cursor-pointer'
														}
													>
														PM
													</small>
												)}
											</RadioGroup.Option>
										</RadioGroup> */}
									</div>
								</div>
								<div></div>
								<div className='flex flex-col gap-1'>
									<label className='text-[#999999] text-xs'>To</label>
									<div className='flex gap-1 max-h-fit'>
										<input
											value={`${
												endTime
													? Number(endTime) < 10
														? '0' + endTime
														: endTime
													: '00'
											}:00`}
											// value={endTime}
											type='time'
											onChange={(e) => setEndTime(e)}
											className='bg-[#F2F4F7] max-w-[92px] border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-2 py-3 h-[44px]'
										/>
										{/* <RadioGroup value={timeDay} onChange={setTimeDay}>
											<RadioGroup.Option value='AM'>
												{({ checked }) => (
													<small
														className={
															checked
																? 'text-[#7E00C4] text-sm'
																: 'text-[#B3B3B3] cursor-pointer'
														}
													>
														AM
													</small>
												)}
											</RadioGroup.Option>
											<RadioGroup.Option value='PM'>
												{({ checked }) => (
													<small
														className={
															checked
																? 'text-[#7E00C4] text-sm'
																: 'text-[#B3B3B3] cursor-pointer'
														}
													>
														PM
													</small>
												)}
											</RadioGroup.Option>
										</RadioGroup> */}
									</div>
								</div>
							</div>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
};

export default DaysRangePicker;
