import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DashboardLayout } from 'src/components/dashboard';
import {
	BookingStatusBg,
	InvoiceModal,
	ChatModal,
} from 'src/components/bookings';
import invoice from 'src/assets/images/bookings/invoice.svg';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import chat from 'src/assets/images/bookings/chat.svg';
import { theme } from 'src/styles/Theme';
import { Link, useParams } from 'react-router-dom';
import { Flex, Button, ButtonClass } from 'src/components/ui';
import avatar from 'src/assets/images/header/avatar.svg';
import { BookingDetailsPageContainer } from './bookings.styles';
import bookingAdminService from 'src/service/BookingAdmin';
import { useLoading } from 'src/hooks';
import { ScaleLoader } from 'react-spinners';
import { formatDateDmy, formatTime } from 'src/utils';

export const RhsHeading = () => (
	<Flex wrap='wrap'>
		<Link to='/bookings'>
			<Button
				classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
				style={{ backgroundColor: theme.colors.purple }}
			>
				{' '}
				<img src={arrowLeft} alt='back' />
				<span>Back to Bookings</span>
			</Button>
		</Link>
	</Flex>
);

const initialAddressState = {
	city: '',
	state: '',
	house_address: '',
};

const initialTrxState = {
	_id: '',
	narration: '',
	status: '',
	amount: 0,
};
const initialMetaState = {
	call_out_fee: 0,
	display_picture: '',
	first_name: '',
	last_name: '',
	phone: '',
	rating: '',
	address: initialAddressState,
};

export const initialBookingState = {
	artisan_id: '',
	city: '',
	service: '',
	state: '',
	status: '',
	updatedAt: '',
	user_id: '',
	artisan_meta: initialMetaState,
	user_meta: initialMetaState,
};

const BookingDetailsPage = () => {
	const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
	const handleOpenInvoiceModal = () => setOpenInvoiceModal(true);
	const handleCloseInvoiceModal = () => setOpenInvoiceModal(false);

	const [openChatModal, setOpenChatModal] = useState(false);
	const handleOpenChatModal = () => setOpenChatModal(true);
	const handleCloseChatModal = () => setOpenChatModal(false);
	const [bookingsDetail, setBookingDetail] =
		useState<BookingsTypes>(initialBookingState);
	const [bookingTransactions, setBookingTransactions] = useState<
		TransactionTypes[]
	>([initialTrxState]);
	const { loading, startLoading, stopLoading } = useLoading(false);
	const { id } = useParams();
	const fetchBookingDetails = (booking_id: string) => {
		startLoading();
		bookingAdminService
			.bookingDetails(booking_id)
			.then((res) => {
				console.log(res?.data?.payload?.data);
				setBookingTransactions(res?.data?.payload?.data.booking_trx);
				setBookingDetail(
					res?.data?.payload?.data?.booking || initialBookingState
				);
			})
			.catch((err) => console.error(err.response))
			.finally(() => stopLoading());
	};
	useEffect(() => {
		id && fetchBookingDetails(id);
	}, []);
	return (
		<DashboardLayout pageTitle='Booking Details' rhsHeading={<RhsHeading />}>
			<BookingDetailsPageContainer>
				<div className='people'>
					<Flex gap='2rem' wrap='wrap' justify='space-between'>
						<Link
							to={`/users/${bookingsDetail?.user_id}`}
							className='user people-card'
						>
							<Flex justify='space-between' wrap='wrap'>
								<div className='lhs'>
									<Flex>
										{loading ? (
											<div className='loader-container'>
												<ScaleLoader color='#7E00C4' height={50} width={8} />
											</div>
										) : (
											<>
												<img
													style={{ borderRadius: '50%' }}
													src={
														bookingsDetail?.user_meta.display_picture || avatar
													}
													alt='dp'
												/>
												<div className='info'>
													<p className='name'>
														{bookingsDetail?.user_meta.first_name}{' '}
														{bookingsDetail?.user_meta.last_name}
													</p>
													<div className='rating'>
														<Flex>
															<p className='key'>Rating</p>
															<p className='value'>
																{bookingsDetail?.user_meta.rating}
															</p>
														</Flex>
													</div>
												</div>
											</>
										)}
									</Flex>
								</div>
								<p className='role'>User</p>
							</Flex>
						</Link>
						<Link
							to={`/artisans/${bookingsDetail?.artisan_id}`}
							className='artisan people-card'
						>
							<Flex justify='space-between' wrap='wrap'>
								<div className='lhs'>
									<Flex>
										{loading ? (
											<div className='loader-container'>
												<ScaleLoader color='#7E00C4' height={50} width={8} />
											</div>
										) : (
											<>
												<img
													style={{ borderRadius: '50%' }}
													src={
														bookingsDetail?.artisan_meta.display_picture ||
														avatar
													}
													alt='dp'
												/>
												<div className='info'>
													<p className='name'>
														{bookingsDetail?.artisan_meta.first_name}{' '}
														{bookingsDetail?.artisan_meta.last_name}
													</p>
													<div className='rating'>
														<Flex>
															<p className='key'>Rating</p>
															<p className='value'>
																{bookingsDetail?.artisan_meta.rating}
															</p>
														</Flex>
													</div>
												</div>
											</>
										)}
									</Flex>
								</div>
								<p className='role'>Artisan</p>
							</Flex>
						</Link>
					</Flex>
				</div>
				<div className='booking-status'>
					<Flex align='center' gap='2rem'>
						<p className='title'>Booking Status</p>
						<BookingStatusBg status={bookingsDetail?.status} />
					</Flex>
				</div>
				<div className='booking-details--info'>
					<Flex direction='column' gap='2rem'>
						<div className='gridy1'>
							<div className='item'>
								<Flex direction='column' gap='10px'>
									<p className='title'>Service Rendered</p>
									<p className='details'>{bookingsDetail.service}</p>
								</Flex>
							</div>
							<div className='item'>
								<Flex direction='column' gap='10px'>
									<p className='title'>Description</p>
									<p className='details'>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Pulvinar mauris ultricies aliquam sit tortor congue sed
										eget. Tortor gravida fringilla metus lacus porttitor.
									</p>
								</Flex>
							</div>
							<div className='item'>
								<Flex direction='column' gap='10px'>
									<p className='title'>Time</p>
									<p className='details'>
										{formatTime(new Date(bookingsDetail.updatedAt))}
									</p>
								</Flex>
							</div>
							<div className='item'>
								<Flex direction='column' gap='10px'>
									<p className='title'>Date </p>
									<p className='details'>
										{formatDateDmy(bookingsDetail.updatedAt)}
									</p>
								</Flex>
							</div>
						</div>
						<div className='gridy2'>
							<div className='item'>
								<Flex direction='column' gap='10px'>
									<p className='title'>Artisan Location </p>
									<p className='details'>
										{bookingsDetail.artisan_meta.address.house_address},{' '}
										{bookingsDetail.artisan_meta.address.city},{' '}
										{bookingsDetail.artisan_meta.address.state}.
									</p>
								</Flex>
							</div>
							<div className='item'>
								<Flex direction='column' gap='10px'>
									<p className='title'>User Location </p>
									<p className='details'>
										{bookingsDetail.user_meta.address.house_address},{' '}
										{bookingsDetail.user_meta.address.city},{' '}
										{bookingsDetail.user_meta.address.state}.
									</p>
								</Flex>
							</div>
						</div>
					</Flex>
					<InvoiceModal
						open={openInvoiceModal}
						handleClose={handleCloseInvoiceModal}
						bookingTransaction={bookingTransactions}
					/>
					<ChatModal open={openChatModal} handleClose={handleCloseChatModal} />
					<div className='buttons'>
						<Flex gap='1.5rem' wrap='wrap'>
							<div>
								<Button
									classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
									onClick={handleOpenInvoiceModal}
									style={{ backgroundColor: theme.colors.purple }}
								>
									{' '}
									<img src={invoice} alt='paper' />
									<span>View Booking Invoice</span>
								</Button>
							</div>
							<div>
								<Button
									classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
									style={{ backgroundColor: theme.colors.purple }}
									onClick={handleOpenChatModal}
								>
									{' '}
									<img src={chat} alt='chat' />
									<span>View Chat</span>
								</Button>
							</div>
						</Flex>
					</div>
				</div>
			</BookingDetailsPageContainer>
		</DashboardLayout>
	);
};

export default BookingDetailsPage;
