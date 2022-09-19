import { artisanServiceApi } from 'src/utils/ArtisanServiceApi';

export const ArtisansServices = {
	getAllArtisans: async () => {
		return artisanServiceApi().get('');
	},
	getArtisan: async (artisan_id: string) => {
		return artisanServiceApi().get(`profile/${artisan_id}`);
	},
};
