import styled from 'styled-components';

export const PopupContainer = styled.div`
	background: #ffffff;
	box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08),
		0px 4px 6px -2px rgba(16, 24, 40, 0.03);
	border-radius: 8px;
`;

export const ArtisanTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 2rem 0;
	border-radius: 16px;
	padding-bottom: 20px;
	.heading {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
		padding: 20px;

		.count {
			font-weight: 700;
			font-size: 17px;
			line-height: 27px;
			color: ${(props) => props.theme.colors.purple};
			background-color: ${(props) => props.theme.colors.gray_04};
			padding: 4px 12px;
			width: max-content;
			border-radius: 16px;
		}
	}
`;
