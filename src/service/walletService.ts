import adminServiceApi from 'src/utils/AdminServiceApi';

const WalletService = {
	artisanWalletData: async () => {
		return adminServiceApi().get(`artisan/v1/dashboard/wallet`);
	},
	customerWalletData: async () => {
		return adminServiceApi().get(`user/v1/dashboard/wallet`);
	},
	bookingWalletData: async () => {
		return adminServiceApi().get(`booking/v1/admin/dashboard/wallet`);
	},
};

export default WalletService;
