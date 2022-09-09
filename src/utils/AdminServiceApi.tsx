import axios from 'axios';
import { getAuthToken, isLoggedIn } from './AuthUtils';

const adminServiceApi = () => {
	let headers = {};
	if (isLoggedIn()) {
		headers = {
			Authorization: `Bearer ${getAuthToken()}`,
		};
	}
	return axios.create({
		baseURL: process.env.REACT_APP_BASE_URL || '',
		timeout: 30000,
		headers,
	});
};

export default adminServiceApi;
