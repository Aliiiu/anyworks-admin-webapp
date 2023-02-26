import React, { FC } from 'react';
import { ScaleLoader } from 'react-spinners';
import { Flex } from '../ui';

type cardTypes = {
	loading: boolean;
	src: string;
	first_name: string;
	last_name: string;
	card_type: string;
	rating: number | string;
};
const BookingCard: FC<cardTypes> = ({
	loading,
	first_name,
	last_name,
	rating,
	src,
	card_type,
}) => {
	return (
		<Flex justify='space-between' wrap='wrap'>
			<div className='lhs'>
				<Flex>
					{loading ? (
						<div className='loader-container'>
							<ScaleLoader color='#7E00C4' height={50} width={8} />
						</div>
					) : (
						<>
							<img style={{ borderRadius: '50%' }} src={src} alt='dp' />
							<div className='info'>
								<p className='name'>
									{first_name} {last_name}
								</p>
								<div className='rating'>
									<Flex>
										<p className='key'>Rating</p>
										<p className='value'>{rating}</p>
									</Flex>
								</div>
							</div>
						</>
					)}
				</Flex>
			</div>
			<p className='role'>{card_type}</p>
		</Flex>
	);
};

export default BookingCard;
