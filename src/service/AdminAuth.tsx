import { adminServiceApi } from 'src/utils/AdminServiceApi';

const AdminAuth = {
	login: async (data: { email: string; password: string }) => {
		return adminServiceApi().post('admin/v1/auth/login', data);
	},
	signUp: async (data: { email: string; password: string }) => {
		return adminServiceApi().post('admin/v1/auth/signup', data);
	},
	forgotPassword: async (data: { email: string }) => {
		return adminServiceApi().post('admin/v1/auth/forgot-password', data);
	},
	forgotPasswordOtp: async (data: { email: string; code: number }) => {
		return adminServiceApi().post(
			'admin/v1/auth/forgot-password/verify-otp',
			data
		);
	},
	resetPassword: async (data: {
		password: string;
		confirm_password: string;
	}) => {
		return adminServiceApi().post('admin/v1/auth/reset-password', data);
	},
	serviceFeeRange: async (data: { min: string; max: string }) => {
		return adminServiceApi().post('admin/v1/misc/service-fee', data);
	},
	getServiceFeeRange: async () => {
		return adminServiceApi().get('admin/v1/misc/service-fee');
	},
};

export default AdminAuth;
