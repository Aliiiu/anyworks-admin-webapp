import adminServiceApi from 'src/utils/AdminServiceApi';

export const disputeService = {
	getAllDisputes: async () => {
		return adminServiceApi().get(`booking/v1/admin/dispute`);
	},
	getDisputeDetails: async (dispute_id: string) => {
		// return adminServiceApi().get(
		// 	`booking/v1/admin/63f93ed2f8ffcc7de5ebb1d4/dispute`
		// );
		return adminServiceApi().get(
			`booking/v1/admin/${dispute_id}/dispute?admin=1`
		);
	},
	resolveDispute: async (dispute_id: string) => {
		return adminServiceApi().post(`booking/v1/admin/${dispute_id}/dispute`);
	},
};
