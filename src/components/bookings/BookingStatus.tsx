import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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

export const BookingStatus = ({ status }: Props) => {
	const displayCompleted = () => (
		<div className='item'>
			<p className='text completed_text'>Completed</p>
		</div>
	);

	const displayActive = () => (
		<div className='item'>
			<p className='text active_text'>Active</p>
		</div>
	);

	const displayPending = () => (
		<div className='item'>
			<p className='text text-primary'>Pending</p>
		</div>
	);

	const displayCanceled = () => (
		<div className='item'>
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

export default BookingStatus;
