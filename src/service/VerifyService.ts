import adminServiceApi from 'src/utils/AdminServiceApi';

const VerificationService = {
	getUsersVerification: async () => {
		return adminServiceApi().get('user/v1/verification');
	},
	getUserVerification: async (user_id: string) => {
		return adminServiceApi().get(`user/v1/verification/${user_id}`);
	},
	getAllVendorsVerification: async () => {
		return adminServiceApi().get('artisan/v1/verification');
	},
	getVendorVerification: async (artisan_id: string) => {
		return adminServiceApi().get(`artisan/v1/verification/${artisan_id}`);
	},
	approveRejectVendor: async (
		data: { reason: string },
		artisan_id: string,
		action: string,
		type: string
	) => {
		return adminServiceApi().put(
			`artisan/v1/verification/${artisan_id}/${action}?type=${type}`,
			data
		);
	},
	retryNinVerification: async (data: {
		identity_type: string;
		identity_no: string;
		artisan_id: string;
	}) => {
		return adminServiceApi().post(`artisan/v1/verification/nin/retry`, data);
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

export default VerificationService;
