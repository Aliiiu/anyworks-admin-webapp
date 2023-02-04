interface ArtisanMetricTypes {
	artisans: number;
	pending_kyc: number;
	total_balance: number;
}
interface BookingMetricTypes {
	active_bookings: number;
	canceled_bookings: number;
	pending_bookings: number;
	total_bookings: number;
	completed_bookings: number;
	bookings: {}[];
}

type MetricTypes = {
	bookingData: BookingMetricTypes;
	userData: {
		pending_verification: number;
		users: number;
	};
	artisanData: {
		pending_verification: number;
		artisans: number;
	};
};
interface WalletTrnxTypes {
	created_at: string;
	amount: number;
	type: string;
	transaction_details: {
		status: string;
	};
}
