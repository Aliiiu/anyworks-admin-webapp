import styled from 'styled-components';
import { styled as MUIStyled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';

export const MUIStyledButton = MUIStyled(Button)({
	color: '#7e00c4',
	background: 'white',
	borderRadius: '8px',
	padding: '8px 16px',
	fontSize: '16px',
	textTransform: 'capitalize',
}) as typeof Button;

export const StyledMenu = MUIStyled((props: MenuProps) => (
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
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		maxWidth: '200px',
		width: '100%',
		color:
			theme.palette.mode === 'light'
				? 'rgb(55, 65, 81)'
				: theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			display: 'flex',
			justifyContent: 'space-between',
			width: '100%',
			alignItems: 'center',
			'& .MuiSvgIcon-root': {
				fontSize: 18,
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));
export const StyledMenuStatus = MUIStyled((props: MenuProps) => (
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
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		maxWidth: '110px',
		width: '100%',
		color:
			theme.palette.mode === 'light'
				? 'rgb(55, 65, 81)'
				: theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			display: 'flex',
			justifyContent: 'space-between',
			width: '100%',
			alignItems: 'center',
			'& .MuiSvgIcon-root': {
				fontSize: 18,
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export const AdminTableContainer = styled.div`
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

export const StyledAdminProfileComponent = styled.div`
	.admin_profile_details {
		margin-top: 36px;
		border-radius: 16px;
		background: #ffffff;
		padding: 24px;
		.profile_header {
			display: flex;
			align-items: start;
			justify-content: space-between;
			h3 {
				font-size: 24px;
				color: #1d2939;
				margin-top: 8px;
			}
			.profile_status_wrapper {
				display: flex;
				gap: 10px;
			}
		}
		.profile_details_wrapper {
			margin-top: 40px;
			display: flex;
			gap: 50px;
			img {
				border-radius: 50%;
			}
			.profile_details {
				h4 {
					margin-bottom: 20px;
				}
				.details {
					table {
						width: 100%;
						td:first-child {
							padding-right: 120px;
						}
						td:last-child {
							font-weight: 600;
						}
						td {
							padding-bottom: 5px;
							span {
								margin-right: 5px;
								text-transform: capitalize;
							}
						}
						.status-action {
							font-size: 14px;
							border-radius: 32px;
							display: flex;
							justify-content: center;
							width: max-content;
							padding: 6px 12px;
						}
					}
				}
			}
		}
	}
	.loader-container {
		border-radius: 16px;
		background: #ffffff;
		height: 300px;
		margin-top: 36px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

export const StyledProfileHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	h2 {
		font-weight: 600;
		font-size: 27px;
		color: ${(props) => props.theme.colors.text_01};
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
`;

export const AdminActivityTableContainer = styled.div`
	background-color: ${(props) => props.theme.colors.white};
	margin: 3rem 0;
	border-radius: 16px;
	padding-bottom: 20px;

	.heading {
		border-bottom: 1px solid ${(props) => props.theme.colors.gray_03};
		padding: 20px;

		.title {
			font-weight: 600;
			font-size: 18px;
			line-height: 28px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}
`;
