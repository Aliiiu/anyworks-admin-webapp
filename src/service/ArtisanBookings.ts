import bookingAdminServiceApi from 'src/utils/BookingAdminServiceApi';

const artisanBookingService = {
	bookingHistory: async (artisan_id: string) => {
		return bookingAdminServiceApi().get(
			`booking/v1/admin/artisan/${artisan_id}/history?status=`
		);
	},
};

export default artisanBookingService;
