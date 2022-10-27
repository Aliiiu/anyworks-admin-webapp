import { adminServiceApi } from 'src/utils/AdminServiceApi';

export const AdminServices = {
	getAllAdmins: async () => {
		return adminServiceApi().get('admin/v1/');
	},
	getAdmin: async (admin_id: string) => {
		return adminServiceApi().get(`admin/v1/${admin_id}`);
	},
	addAdmin: async (data: any) => {
		return adminServiceApi().post(`admin/v1/`, data);
	},
	sendMail: async (data: any) => {
		return adminServiceApi().post(`admin/v1/notification/mail`, data);
	},
	pushNotification: async (data: any) => {
		return adminServiceApi().post(`admin/v1/notification/pn`, data);
	},
	suspendAdmin: async (admin_id: string, action: string) => {
		return adminServiceApi().put(`admin/v1/${admin_id}/${action}`);
	},
};
