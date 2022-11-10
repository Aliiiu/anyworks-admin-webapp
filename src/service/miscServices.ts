import adminServiceApi from 'src/utils/AdminServiceApi';

const miscService = {
	getOccupations: async () => {
		return adminServiceApi().get('admin/v1/misc/occupations');
	},
	addOccupations: async (data: any) => {
		return adminServiceApi().post('admin/v1/misc/occupation', data);
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
};

export default miscService;
