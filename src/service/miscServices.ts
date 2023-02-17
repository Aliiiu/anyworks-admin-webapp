import adminServiceApi from 'src/utils/AdminServiceApi';

const miscService = {
	getOccupations: async () => {
		return adminServiceApi().get('admin/v1/misc/occupations');
	},
	addOccupations: async (data: any) => {
		return adminServiceApi().post('admin/v1/misc/occupation', data);
	},
	editOccupations: async (id: string, data: any) => {
		return adminServiceApi().put(`admin/v1/misc/occupation/${id}`, data);
	},
	deleteOccupations: async (id: string) => {
		return adminServiceApi().delete(`admin/v1/misc/occupation/${id}`);
	},
	addCategories: async (data: any) => {
		return adminServiceApi().post('admin/v1/misc/occupation/category', data);
	},
	getBanks: async () => {
		return adminServiceApi().get('admin/v1/misc/banks');
	},
	getCategories: async () => {
		return adminServiceApi().get('admin/v1/misc/occupation/category');
	},
	delCache: async () => {
		return adminServiceApi().delete('admin/v1/cache');
	},
	setVariableFee: async (data: any) => {
		return adminServiceApi().post('booking/v1/admin/variable-fee', data);
	},
	getVariable: async () => {
		return adminServiceApi().get('booking/v1/admin/variable-fee');
	},
};

export default miscService;
