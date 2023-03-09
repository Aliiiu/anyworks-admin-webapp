interface KycData {
	id: string;
	email: string;
	first_name: string;
	gender: string;
	last_name: string;
	display_picture: string;
	occupation: string;
}

type VendorDataType = {
	_id: string;
	email: string;
	tier: number;
	display_picture: string;
	first_name: string;
	gender: string;
	last_name: string;
};

type CustomerDataType = {
	_id: string;
	email: string;
	tier: number;
	display_picture: string;
	first_name: string;
	gender: string;
	last_name: string;
};
