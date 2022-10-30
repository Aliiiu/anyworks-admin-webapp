import adminServiceApi from 'src/utils/AdminServiceApi';

export const ArtisansServices = {
	getAllArtisans: async () => {
		return adminServiceApi().get('artisan/v1/');
	},
	getArtisan: async (artisan_id: string) => {
		return adminServiceApi().get(`artisan/v1/profile/${artisan_id}`);
	},
};
