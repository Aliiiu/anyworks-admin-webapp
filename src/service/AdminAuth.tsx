import adminServiceApi from 'src/utils/AdminServiceApi';

const AdminAuth = {
	login: async (data: { email: string; password: string }) => {
		return adminServiceApi().post('auth/login', data);
	},
	forgotPassword: async (data: { email: string }) => {
		return adminServiceApi().post('auth/forgot-password', data);
	},
	forgotPasswordOtp: async (data: { email: string; code: number }) => {
		return adminServiceApi().post('auth/forgot-password/verify-otp', data);
	},
	getMe: async () => {
		return adminServiceApi().get('auth/admin/me');
	},
	requestReset: async (data: any) => {
		return adminServiceApi().post(
			'auth/admin/request-password-reset-email',
			data
		);
	},
	verifyToken: async (data: any) => {
		return adminServiceApi().post(
			'auth/admin/forgot-password/verify-otp',
			data
		);
	},
	resetPassword: async (data: any) => {
		return adminServiceApi().post('auth/admin/reset-password', data);
	},
};

export default AdminAuth;
