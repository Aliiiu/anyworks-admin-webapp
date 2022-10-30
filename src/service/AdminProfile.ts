import { adminServiceApi } from 'src/utils/AdminServiceApi';

const AdminProfile = {
	getMe: async () => {
		return adminServiceApi().get('admin/v1/profile');
	},
	changePassword: async (data: {
		old_password: string;
		new_password: string;
		confirm_password: string;
	}) => {
		return adminServiceApi().put('admin/v1/profile/password', data);
	},
	changeDp: async (data: any) => {
		return adminServiceApi().put('admin/v1/profile/dp', data);
	},
};

export default AdminProfile;
