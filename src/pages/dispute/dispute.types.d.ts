type ChatProp = {
	message: string;
	_id?: string;
	sender?: string;
	message_date?: string;
	message_type: string;
	checked?: boolean;
};
type CardProp = {
	messages: ChatProp[];
	dispute_id?: string;
	bookingDetails: BookingsTypes;
	resolved?: boolean;
	fetchDispute: Function;
	setMessage: Function;
};

type MessageProp = {
	message: ChatProp;
};

type BookingTrnxType = {
	narration: string;
	amount: number;
	status: string;
	selected: boolean;
	_id: string;
};
