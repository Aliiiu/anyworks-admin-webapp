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
	suspended: boolean;
	display_picture: string;
	address: ArtisanAddress;
}

interface ArtisanAddress {
	house_address: string;
	city: string;
	state: string;
}

interface WalletDataTypes {
	balance: number;
	transactions: WalletTrnxTypes[];
}
