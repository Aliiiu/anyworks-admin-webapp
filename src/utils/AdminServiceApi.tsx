import axios from 'axios';
import { getAuthToken, isLoggedIn } from './AuthUtils';

let headers = {};
if (isLoggedIn()) {
	headers = {
		Authorization: `Bearer ${getAuthToken()}`,
	};
}
const adminServiceApi = () => {
	return axios.create({
		baseURL: process.env.REACT_APP_ADMIN_BASE_URL || '',
		timeout: 300000,
		headers,
	});
};
export const artisanServiceApi = () => {
	return axios.create({
		baseURL: process.env.REACT_APP_ARTISAN_BASE_URL || '',
		timeout: 30000,
		headers,
	});
};

export default adminServiceApi;
