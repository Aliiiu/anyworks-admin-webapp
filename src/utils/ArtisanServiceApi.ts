import axios from 'axios';
import { getAuthToken, isLoggedIn } from './AuthUtils';

const artisanServiceApi = () => {
	let headers = {};
	if (isLoggedIn()) {
		headers = {
			Authorization: `Bearer ${getAuthToken()}`,
		};
	}
	return axios.create({
		baseURL: process.env.REACT_APP_ARTISAN_BASE_URL || '',
		timeout: 300000,
		headers,
	});
};

export default artisanServiceApi;
