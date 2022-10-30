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
}
interface WalletTrnxTypes {
	created_at: string;
	amount: number;
	type: string;
	transaction_details: {
		status: string;
	};
}
