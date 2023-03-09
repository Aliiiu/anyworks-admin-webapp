interface ArtisanProfileDetails {
	_id?: string;
	first_name: string;
	last_name: string;
	email: string;
	occupation: string;
	profile_stage: number | string;
	rating: number;
	phone: string;
	status: string;
	tier: number;
	suspended: boolean;
	display_picture: string;
	address: ArtisanAddress;
}

interface ArtisanAddress {
	house_address: string;
	city: string;
	state: string;
}

interface CustomerWalletTrnxTypes {
	customer: string;
	id: string;
	amount: number;
	created_at: string;
	type: string;
	img: string;
	transaction_details: {
		[x: string]: any;
	};
}

interface WalletDataTypes {
	balance: number;
	transactions: CustomerWalletTrnxTypes[];
}
