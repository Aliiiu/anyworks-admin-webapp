import axios from 'axios';
import { getAuthToken, isLoggedIn } from './AuthUtils';

export const userServiceApi = () => {
	let headers = {};
	if (isLoggedIn()) {
		headers = {
			Authorization: `Bearer ${getAuthToken()}`,
		};
	}
	return axios.create({
		baseURL: process.env.REACT_APP_USER_BASE_URL || '',
		timeout: 300000,
		headers,
	});
};

export default userServiceApi;
