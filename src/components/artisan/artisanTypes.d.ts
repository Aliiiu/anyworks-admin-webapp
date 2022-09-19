interface ArtisanProfileDetails {
	_id?: string;
	first_name: string;
	last_name: string;
	email: string;
	occupation: string;
	profile_stage: number | string;
	phone: string;
	status: string;
	display_picture: string;
	address: ArtisanAddress;
}

interface ArtisanAddress {
	house_address: string;
	city: string;
	state: string;
}

interface WalletDataTypes {
	balance: 0;
	transactions: [];
}
