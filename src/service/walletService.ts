import adminServiceApi from 'src/utils/AdminServiceApi';

const WalletService = {
	artisanWalletData: async () => {
		return adminServiceApi().get(`artisan/v1/dashboard/wallet`);
	},
	artisanTrans: async () => {
		return adminServiceApi().get(`artisan/v1/wallet/transactions/recent`);
	},
	customerWalletData: async () => {
		return adminServiceApi().get(`user/v1/dashboard/wallet`);
	},
	customerTrans: async () => {
		return adminServiceApi().get(`user/v1/wallet/transactions/recent`);
	},
	bookingWalletData: async () => {
		return adminServiceApi().get(`booking/v1/admin/dashboard/wallet`);
	},
	bookingTrnx: async () => {
		return adminServiceApi().get(`booking/v1/admin/dashboard/trx`);
	},
};

export default WalletService;
