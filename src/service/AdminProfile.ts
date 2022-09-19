import { adminServiceApi } from 'src/utils/AdminServiceApi';

const AdminProfile = {
	getMe: async () => {
		return adminServiceApi().get('profile');
	},
	changePassword: async (data: {
		old_password: string;
		new_password: string;
		confirm_password: string;
	}) => {
		return adminServiceApi().put('profile/password', data);
	},
	changeDp: async (data: any) => {
		return adminServiceApi().put('profile/dp', data);
	},
};

export default AdminProfile;
