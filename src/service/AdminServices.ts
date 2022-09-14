import adminServiceApi from 'src/utils/AdminServiceApi';

export const AdminServices = {
	getAllAdmins: async () => {
		return adminServiceApi().get('');
	},
	getAdmin: async (admin_id: string) => {
		return adminServiceApi().get(`${admin_id}`);
	},
};
