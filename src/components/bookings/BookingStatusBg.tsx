import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	.item {
		padding: 10px;
		border-radius: 8px;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
	}
	.completed_item {
		background-color: rgba(0, 204, 205, 0.2);
	}
	.active_item {
		background-color: rgba(0, 255, 255, 0.2);
	}
	.canceled_item {
		background: rgba(225, 173, 1, 0.2);
	}

	.active_text {
		color: ${(props) => props.theme.colors.blue};
	}
	.completed_text {
		color: ${(props) => props.theme.colors.cyan};
	}
	.canceled_text {
		color: ${(props) => props.theme.colors.mustard};
	}
`;

interface Props {
	status: string;
}

export const BookingStatusBg = ({ status }: Props) => {
	const displayCompleted = () => (
		<div className='item completed_item'>
			<p className='text completed_text'>Completed</p>
		</div>
	);

	const displayActive = () => (
		<div className='item active_item'>
			<p className='text active_text'>Active</p>
		</div>
	);

	const displayPending = () => (
		<div className='item bg-primary bg-opacity-50'>
			<p className='text text-primary'>Pending</p>
		</div>
	);

	const displayCanceled = () => (
		<div className='item canceled_item'>
			<p className='text canceled_text'>Canceled</p>
		</div>
	);

	return (
		<Wrapper>
			{status === 'active' && displayActive()}
			{status === 'pending' && displayPending()}
			{status === 'completed' && displayCompleted()}
			{status === 'canceled' && displayCanceled()}
		</Wrapper>
	);
};

export default BookingStatusBg;
