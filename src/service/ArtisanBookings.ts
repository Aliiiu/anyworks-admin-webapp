import bookingAdminServiceApi from 'src/utils/BookingAdminServiceApi';

const artisanBookingService = {
	bookingHistory: async () => {
		return bookingAdminServiceApi().get('artisan/history?status=completed');
	},
};

export default artisanBookingService;
