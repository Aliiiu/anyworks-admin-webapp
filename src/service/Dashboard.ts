import adminServiceApi from 'src/utils/AdminServiceApi';

export const DashboardService = {
	ArtisansData: async () => {
		return adminServiceApi().get('artisan/v1/dashboard');
	},
	RecentWalletHistory: async () => {
		return adminServiceApi().get('artisan/v1/wallet/transactions/recent');
	},
	RecentBookingHistory: async () => {
		return adminServiceApi().get('booking/v1/admin/recent');
	},
};
