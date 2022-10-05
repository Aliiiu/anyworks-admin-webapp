import axios from 'axios';
import { getAuthToken, isLoggedIn } from './AuthUtils';

export const bookingAdminServiceApi = () => {
	let headers = {};
	if (isLoggedIn()) {
		headers = {
			Authorization: `Bearer ${getAuthToken()}`,
		};
	}
	return axios.create({
		baseURL: process.env.REACT_APP_BOOKING_BASE_URL || '',
		timeout: 300000,
		headers,
	});
};

export default bookingAdminServiceApi;
