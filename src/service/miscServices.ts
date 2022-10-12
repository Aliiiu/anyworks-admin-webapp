import adminServiceApi from 'src/utils/AdminServiceApi';

const miscService = {
	getOccupations: async () => {
		return adminServiceApi().get('admin/v1/misc/occupations');
	},
	getBanks: async () => {
		return adminServiceApi().get('admin/v1/misc/banks');
	},
};

export default miscService;
