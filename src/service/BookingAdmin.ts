import bookingAdminServiceApi from 'src/utils/BookingAdminServiceApi';

const bookingAdminService = {
	dashboardData: async () => {
		return bookingAdminServiceApi().get('admin/dashboard');
	},
	bookingHistory: async () => {
		return bookingAdminServiceApi().get('admin/history?status=');
	},
};

export default bookingAdminService;
