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

interface VendorWalletTrnxTypes {
	vendor: string;
	id: string;
	amount: number;
	created_at: string;
	type: string;
	img: string;
	status: string;
	transaction_details: {
		[x: string]: any;
	};
}
