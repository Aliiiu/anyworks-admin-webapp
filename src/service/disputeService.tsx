import adminServiceApi from 'src/utils/AdminServiceApi';

export const disputeService = {
	getAllDisputes: async () => {
		return adminServiceApi().get(`booking/v1/admin/dispute`);
	},
	getDisputeDetails: async (dispute_id: string) => {
		return adminServiceApi().get(
			`booking/v1/admin/${dispute_id}/dispute?admin=1`
		);
	},
	resolveDispute: async (dispute_id: string) => {
		return adminServiceApi().post(`booking/v1/admin/${dispute_id}/dispute`, {
			status: 'resolved',
		});
	},
	sendMessage: async (
		dispute_id: string,
		data: { sender: string; message: string }
	) => {
		return adminServiceApi().put(
			`booking/v1/admin/${dispute_id}/dispute`,
			data
		);
	},
};
// https://api.anyworks-ng.com/booking/v1/admin/63fcd35486415d5daa440da4/dispute
