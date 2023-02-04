import avatar from 'src/assets/images/header/avatar.svg';

export const RECENT_BOOKINGS_TABLE_DATA = () => {
	const recentBookingsData = [
		{
			id: 1,
			vendor: 'Olajide Olajide',
			customer: 'Olajide Olajide',
			img: avatar,
			calloutFee: 'N10,000',
			serviceFee: 'N5000',
		},
		{
			id: 2,
			vendor: 'Olajide Kola',
			customer: 'Olajide Olajide',
			img: avatar,
			calloutFee: 'N10,000',
			serviceFee: 'N5000',
		},
		{
			id: 3,
			vendor: 'Olajide Olajide',
			customer: 'Olajide Olajide',
			img: avatar,
			calloutFee: 'N10,000',
			serviceFee: 'N5000',
		},
		{
			id: 4,
			vendor: 'Olajide Kola',
			customer: 'Olajide Olajide',
			img: avatar,
			calloutFee: 'N10,000',
			serviceFee: 'N5000',
		},
		{
			id: 5,
			vendor: 'Olajide Kola',
			customer: 'Olajide Olajide',
			img: avatar,
			calloutFee: 'N10,000',
			serviceFee: 'N5000',
		},
	];

	return recentBookingsData;
};
export const RECENT_CUSTOMER_TRANSACTION_DATA = () => {
	const recentCustomerBookingsData = [
		//yyyy-mm-dd
		{
			id: 1,
			customer: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 2,
			customer: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 3,
			customer: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 4,
			customer: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 5,
			customer: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
	];

	return recentCustomerBookingsData;
};
export const RECENT_VENDOR_TRANSACTION_DATA = () => {
	const recentVendorBookingsData = [
		//yyyy-mm-dd
		{
			id: 1,
			vendor: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 2,
			vendor: 'Olajide Kola',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 3,
			vendor: 'Olajide Olajide',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 4,
			vendor: 'Olajide Kola',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
		{
			id: 5,
			vendor: 'Olajide Kola',
			amount: 'N5000',
			date: '06/05/2022',
			transaction: 'Transfer',
			status: 'Successful',
			img: avatar,
		},
	];

	return recentVendorBookingsData;
};

export default RECENT_BOOKINGS_TABLE_DATA;
