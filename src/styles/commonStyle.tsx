import styled from 'styled-components';
// import { styled as MuiStyled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';

export const Container = styled.div`
	max-width: 1440px;
	background: #7e00c4;
	min-height: 100vh;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	background-image: url('/images/bgPattern.png');
`;

export const Image = styled.img`
	width: 183px;
	height: 60px;
	object-fit: contain;
	position: absolute;
	top: 50px;
	left: 50px;
	cursor: pointer;
`;

export const LoginCard = styled.div`
	border-radius: 16px;
	background: #ffffff;
	box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
	margin: 0 auto;
	padding: 40px 40px;
	width: 466px;
	.validation_error {
		color: #f04438;
		font-size: 14px;
		font-weight: 400;
	}
`;

export const CardHeader = styled.h2`
	font-size: 48px;
	font-style: normal;
	font-weight: 600;
`;

export const StyledButton = styled.button`
	background: #7e00c4;
	border-radius: 8px;
	width: 100%;
	font-weight: 500;
	text-align: center;
	padding: 12px 0px;
	color: #fff;
	margin-top: 48px;
	display: flex;
	cursor: pointer;
	justify-content: center;
	align-items: center;
`;

export const Input = styled.input`
	border-radius: 8px;
	background: transparent;
	padding: 10px 14px 10px 14px;
	font-size: inherit;s
	border: 1px solid #98a2b3;
	width: 98%;
	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	&:focus {
		outline: none;
		background: #f9fafb;
	}
	::placeholder {
		color: #98a2b3;
	}
	&:disabled{
		color: black;
	}
`;

export const StyledPageHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-size: 36px;
		font-weight: 700;
		color: ${(props) => props.theme.colors.text_01};
	}
	.header_action_wrapper {
		display: flex;
		gap: 15px;
		.search_bar {
			border-radius: 8px;
			background: #ffffff;
			width: 402px;
			height: 50px;
			padding: 10px 0 10px 40px;
			border: none;
			display: flex;
			align-items: center;
			gap: 20px;
			.search_input {
				color: #98a2b3;
				font-size: 20px;
				width: 100%;
				border: none;
				outline: none;
			}
		}
		.add_admin_btn {
			background: ${(props) => props.theme.colors.purple};
			color: #ffffff;
			font-weight: 500;
			font-size: 16px;
			display: flex;
			gap: 10px;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			padding: 12px 20px;
		}
	}
`;

export const StyledTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding: 20px 0;
	.wrapper {
		display: flex;
		justify-content: space-between;
		.table_summary {
			background: #f2f4f7;
			border-radius: 16px;
			color: #7e00c4;
			font-weight: 700;
			font-size: 18px;
			margin-left: 20px;
			width: 150px;
			height: 30px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.table_divider {
		background: #f2f4f7;
		margin-top: 20px;
		width: 100%;
		height: 1px;
	}
`;

export const FilterButton = styled.button`
	background: #f2f4f7;
	display: flex;
	align-items: center;
	gap: 8px;
	border-radius: 16px;
	padding: 4px 12px;

	&:disabled {
		pointer-events: none;
	}
`;

// const StyledMenu = MuiStyled((props: MenuProps) => <Menu />);
export const StyledVerticalMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(() => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		minWidth: 180,
		color: '#1D2939',
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '0 0',
		},
		'& .MuiMenuItem-root': {
			padding: '10px 20px',
		},
		'& .MuiDivider-root': {
			margin: 0,
		},
	},
}));
