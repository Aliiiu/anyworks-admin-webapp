import styled from 'styled-components';

export const BookingDetailsPageContainer = styled.div`
	.people {
		margin: 3rem 0 0 0;
	}

	.people-card {
		background-color: ${(props) => props.theme.colors.white};
		border-radius: 16px;
		padding: 24px;
		min-width: 473px;
		width: 48%;
		max-width: 100%;
		@media (max-width: ${(props) => props.theme.breakpoint.md}) {
			width: auto;
		}
		@media (max-width: ${(props) => props.theme.breakpoint.sm}) {
			min-width: 100%;
		}
	}

	.lhs {
		img {
			width: 108px;
			height: 108px;
		}
		.info {
			color: ${(props) => props.theme.colors.text_01};
			.name {
				font-weight: 700;
				font-size: 20px;
				line-height: 32px;
			}
			.rating {
				font-size: 16px;
				margin-top: 2rem;
			}
			.value {
				font-weight: 600;
				font-size: 16px;
			}
		}
	}

	.role {
		font-weight: 600;
		font-size: 18px;
		line-height: 30px;
		border-radius: 8px;
		padding: 8px 20px;
		background-color: ${(props) => props.theme.colors.gray_04};
		height: max-content;
	}

	.booking-status {
		background-color: ${(props) => props.theme.colors.white};
		border-radius: 16px;
		padding: 24px;
		width: max-content;
		margin: 2rem 0;
		max-width: 100%;

		.title {
			font-weight: 600;
			font-size: 14px;
			line-height: 20px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}

	.booking-details--info {
		background-color: ${(props) => props.theme.colors.white};
		border-radius: 16px;
		padding: 24px;
		margin-bottom: 6rem;

		.gridy1 {
			display: grid;
			gap: 2%;
			grid-template-columns: 18% 40% 18% 18%;
			@media (max-width: ${(props) => props.theme.breakpoint.md}) {
				display: flex;
				flex-wrap: wrap;
				gap: 20px;
			}
		}
		.gridy2 {
			display: grid;
			gap: 2%;
			grid-template-columns: 18% 18% 40% 18%;
			@media (max-width: ${(props) => props.theme.breakpoint.md}) {
				grid-template-columns: 1fr 1fr;
			}
			@media (max-width: ${(props) => props.theme.breakpoint.sm}) {
				display: flex;
				flex-wrap: wrap;
				gap: 20px;
			}
		}

		.item {
			font-size: 16px;
			line-height: 24px;
			color: ${(props) => props.theme.colors.text_01};
			.title {
				font-weight: 600;
			}
		}
	}
	.buttons {
		margin: 2rem 0;
	}

	.loader-container {
		width: 400px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;
