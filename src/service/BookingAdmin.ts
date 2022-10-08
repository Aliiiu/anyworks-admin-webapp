import adminServiceApi from 'src/utils/AdminServiceApi';

const bookingAdminService = {
	dashboardData: async () => {
		return adminServiceApi().get('booking/v1/admin/dashboard');
	},
	bookingHistory: async () => {
		return adminServiceApi().get('booking/v1/admin/history?status=');
	},
	artisanBookingHistory: async (artisan_id: string) => {
		return adminServiceApi().get(
			`booking/v1/admin/artisan/${artisan_id}/history?status=`
		);
	},
	userBookingHistory: async (user_id: string) => {
		return adminServiceApi().get(
			`booking/v1/admin/user/${user_id}/history?status=`
		);
	},
	bookingDetails: async (booking_id: string) => {
		return adminServiceApi().get(
			`booking/v1/admin/history/${booking_id}`
		);
	},
};

export default bookingAdminService;
