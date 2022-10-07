interface BookingsTypes {
	artisan_id: string;
	artisan_meta: MetaTypes;
	city: string;
	service: string;
	state: string;
	status: string;
	updatedAt: string;
	user_id: string;
	user_meta: MetaTypes;
}

interface AddressTypes {
	city: string;
	state: string;
	house_address: string;
}

interface MetaTypes {
	call_out_fee?: number;
	display_picture: string;
	first_name: string;
	last_name: string;
	phone?: string;
	rating: string;
	address: AddressTypes;
}

interface TransactionTypes {
	amount: number;
	narration: string;
	_id: string;
	status: string;
}
// interface UserMetaTypes {
// 	display_picture: string;
// 	first_name: string;
// 	last_name: string;
// 	rating: string;
// 	address: AddressTypes;
// }
