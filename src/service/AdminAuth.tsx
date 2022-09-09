import adminServiceApi from 'src/utils/AdminServiceApi';

const AdminAuth = {
	login: async (data: { email: string; password: string }) => {
		return adminServiceApi().post('auth/login', data);
	},
	signUp: async (data: { email: string; password: string }) => {
		return adminServiceApi().post('auth/signup', data);
	},
	forgotPassword: async (data: { email: string }) => {
		return adminServiceApi().post('auth/forgot-password', data);
	},
	forgotPasswordOtp: async (data: { email: string; code: number }) => {
		return adminServiceApi().post('auth/forgot-password/verify-otp', data);
	},
	resetPassword: async (data: {
		password: string;
		confirm_password: string;
	}) => {
		return adminServiceApi().post('auth/reset-password', data);
	},
};

export default AdminAuth;
