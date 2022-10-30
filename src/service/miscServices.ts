import adminServiceApi from 'src/utils/AdminServiceApi';

const miscService = {
	getOccupations: async () => {
		return adminServiceApi().get('admin/v1/misc/occupations');
	},
	addOccupations: async (data: any) => {
		return adminServiceApi().post('admin/v1/misc/occupation', data);
	},
	getBanks: async () => {
		return adminServiceApi().get('admin/v1/misc/banks');
	},
};

export default miscService;
