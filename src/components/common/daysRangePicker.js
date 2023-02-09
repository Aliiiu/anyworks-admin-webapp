import { Menu, RadioGroup, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function DaysRangePicker() {
	const [daysSelector, setDaysSelector] = useState(null);
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [count, setCount] = useState(0);
	let [time, setTime] = useState('AM');
	let [timeDay, setTimeDay] = useState('AM');
	const daysArr = [
		{ id: 0, day: 'Monday' },
		{ id: 1, day: 'Tuesday' },
		{ id: 2, day: 'Wednesday' },
		{ id: 3, day: 'Thursday' },
		{ id: 4, day: 'Friday' },
		{ id: 5, day: 'Saturday' },
		{ id: 6, day: 'Sunday' },
	];
	console.log(
		[
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
			'Sunday',
		].filter((item) =>
			[
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			]
				.slice(0, 3)
				.includes(item)
		)
	);

	const selectDate = (index) => {
		setDaysSelector(index);
		if (start != index) {
			setStart(index);
			setEnd(null);
			setCount(count + 1);
		}
		if (end != index) {
			setStart(start);
			setEnd(index);
			setCount(count + 1);
		}
		// if (index === start) {
		// 	setStart(null);
		// 	setEnd(null);
		// }
	};
	useEffect(() => {
		console.log(start, end);
	}, [start, end]);

	// useEffect(() => {
	// 	if (count >= 2) {
	// 		setStart(null);
	// 		setEnd(null);
	// 	}
	// }, [count]);
	return (
		<div className=''>
			<Menu as='div' className='relative inline-block text-left'>
				<div>
					<Menu.Button className='flex pl-4 items-center gap-4'>
						<p className='text-[#999999]'>Mon - Fri</p>
						<div className='flex gap-1 items-center'>
							<p className='text-[#999999]'>8AM - 4PM</p>
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
					<Menu.Items className='absolute right-0 mt-6 w-[349px] p-6 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
						<div>
							<h4 className='text-[#4D4D4D]'>Select Date</h4>
							<div className='flex gap-x-6 gap-y-3 mt-3 flex-wrap'>
								{[
									'Monday',
									'Tuesday',
									'Wednesday',
									'Thursday',
									'Friday',
									'Saturday',
									'Sunday',
								].map((item, index) => (
									<small
										onClick={() => selectDate(index)}
										className={`${
											daysSelector === index
												? 'text-primary border border-primary px-1 rounded-2xl'
												: 'text-[#B3B3B3]'
										}  cursor-pointer`}
										key={index}
									>
										{item}
									</small>
								))}
							</div>
						</div>
						<div className='mt-4'>
							<h4 className='text-[#4D4D4D]'>Select Time</h4>
							<div className='flex justify-between mt-3'>
								<div className='flex flex-col gap-1'>
									<label className='text-[#999999] text-xs'>From</label>
									<div className='flex gap-1 max-h-fit'>
										<input className='bg-[#F2F4F7] max-w-[92px] border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-[44px]' />
										<RadioGroup value={time} onChange={setTime}>
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
										</RadioGroup>
									</div>
								</div>
								<div></div>
								<div className='flex flex-col gap-1'>
									<label className='text-[#999999] text-xs'>To</label>
									<div className='flex gap-1 max-h-fit'>
										<input className='bg-[#F2F4F7] max-w-[92px] border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-[44px]' />
										<RadioGroup value={timeDay} onChange={setTimeDay}>
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
										</RadioGroup>
									</div>
								</div>
							</div>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
