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
	retryVerification: async (data: {
		identity_type: string;
		identity_no: string;
		artisan_id: string;
	}) => {
		return adminServiceApi().post(`artisan/v1/kyc/verify-identity/retry`, data);
	},
	updateCalloutFee: async (
		artisan_id: string,
		data: { callout_fee_min: string; callout_fee_max: string }
	) => {
		return adminServiceApi().put(
			`artisan/v1/kyc/${artisan_id}/callout-fee`,
			data
		);
	},
};

export default KycData;
