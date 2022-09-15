import { adminServiceApi } from 'src/utils/AdminServiceApi';

export const AdminServices = {
	getAllAdmins: async () => {
		return adminServiceApi().get('');
	},
	getAdmin: async (admin_id: string) => {
		return adminServiceApi().get(`${admin_id}`);
	},
	addAdmin: async (data: any) => {
		return adminServiceApi().post(``, data);
	},
	suspendAdmin: async (admin_id: string, action: string) => {
		return adminServiceApi().put(`${admin_id}/${action}`);
	},
};
