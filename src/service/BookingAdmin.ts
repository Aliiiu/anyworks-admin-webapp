import bookingAdminServiceApi from 'src/utils/BookingAdminServiceApi';

const bookingAdminService = {
	dashboardData: async () => {
		return bookingAdminServiceApi().get('admin/dashboard');
	},
	bookingHistory: async () => {
		return bookingAdminServiceApi().get('admin/history?status=');
	},
	artisanBookingHistory: async (artisan_id: string) => {
		return bookingAdminServiceApi().get(
			`admin/artisan/${artisan_id}/history?status=`
		);
	},
	userBookingHistory: async (user_id: string) => {
		return bookingAdminServiceApi().get(
			`admin/user/${user_id}/history?status=`
		);
	},
	bookingDetails: async (booking_id: string) => {
		return bookingAdminServiceApi().get(`admin/history/${booking_id}`);
	},
};

export default bookingAdminService;
