import adminServiceApi from 'src/utils/AdminServiceApi';

const KycData = {
	getAllPendingKyc: async () => {
		return adminServiceApi().get('artisan/v1/kyc');
	},
	getOnePendingKyc: async (artisan_id: string) => {
		return adminServiceApi().get(`artisan/v1/kyc/${artisan_id}`);
	},
	approveRejectKyc: async (
		data: { reason: string },
		artisan_id: string,
		action: string
	) => {
		return adminServiceApi().put(
			`artisan/v1/kyc/${artisan_id}/${action}`,
			data
		);
	},
};

export default KycData;
