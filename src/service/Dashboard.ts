import adminServiceApi from 'src/utils/AdminServiceApi';

export const DashboardService = {
	ArtisansData: async () => {
		return adminServiceApi().get('artisan/v1/dashboard');
	},
};
