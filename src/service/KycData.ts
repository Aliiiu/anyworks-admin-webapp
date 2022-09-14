import {artisanServiceApi} from 'src/utils/ArtisanServiceApi';

const KycData = {
	getAllPendingKyc: async () => {
		return artisanServiceApi().get('kyc');
	},
	getOnePendingKyc: async (artisan_id: string) => {
		return artisanServiceApi().get(`kyc/${artisan_id}`);
	},
	approveRejectKyc: async (data: { reason: string }, artisan_id: string, action: string) => {
		return artisanServiceApi().put(`kyc/${artisan_id}/${action}`, data);
	},
};

export default KycData;
