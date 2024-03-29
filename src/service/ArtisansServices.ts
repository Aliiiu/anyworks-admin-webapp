import adminServiceApi from 'src/utils/AdminServiceApi';

export const ArtisansServices = {
	getAllArtisans: async () => {
		return adminServiceApi().get('artisan/v1/');
	},
	getAllArtisansVerification: async () => {
		return adminServiceApi().get('artisan/v1/verification');
	},
	getArtisan: async (artisan_id: string) => {
		return adminServiceApi().get(`artisan/v1/profile/${artisan_id}`);
	},
	getArtisanVerification: async (artisan_id: string) => {
		return adminServiceApi().get(`artisan/v1/verification/${artisan_id}`);
	},
	suspendArtisan: async (artisan_id: string, data: any) => {
		return adminServiceApi().post(`artisan/v1/${artisan_id}/suspend`, data);
	},
	unSuspendArtisan: async (artisan_id: string, data: any) => {
		return adminServiceApi().post(`artisan/v1/${artisan_id}/unsuspend`, data);
	},
};
