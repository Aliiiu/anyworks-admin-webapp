import { artisanServiceApi } from 'src/utils/AdminServiceApi';

export const ArtisansServices = {
	getAllArtisans: async () => {
		return artisanServiceApi().get('');
	},
	getArtisan: async (artisan_id: number) => {
		return artisanServiceApi().get(`profile/:${artisan_id}`);
	},
};
