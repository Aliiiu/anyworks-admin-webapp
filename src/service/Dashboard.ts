import artisanServiceApi from 'src/utils/ArtisanServiceApi';

export const DashboardService = {
	ArtisansData: async () => {
		return artisanServiceApi().get('dashboard');
	},
};
