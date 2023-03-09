import { Field } from 'formik';
import styled from 'styled-components';

export const InputField = styled(Field)`
	border-radius: 8px;
	background: transparent;
	padding: 10px 14px 10px 14px;
	font-size: inherit;
	border: 1px solid #98a2b3;
	width: 100%;
	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	outline: none;
	&:focus {
		background: #f9fafb;
	}
	::placeholder {
		color: #98a2b3;
	}
`;

export const SettingsContainer = styled.div`
	background: #ffffff;
	border-radius: 16px;
	margin-top: 30px;
	padding: 35px;
	display: flex;
	justify-content: space-between;
	.profile_container {
		margin-bottom: 28px;
		.custom-file-upload {
			border-radius: 50%;
			display: inline-block;
			position: relative;
			cursor: pointer;
			background: white;
			box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
			margin-top: 15px;
			input[type='file'] {
				display: none;
			}
			.icon {
				position: absolute;
				width: 45px;
				bottom: -60px;
				right: 0px;
			}
			.img-wrapper {
				position: relative;
				width: 150px;
				height: 150px;
				overflow: hidden;
				border-radius: 50%;
				img {
					width: 100%;
				}
				.loading_container {
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			img {
				width: auto;
				height: 100%;
			}
		}
	}
	.change_password_container {
		.input_wrapper {
			margin-top: 24px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			max-width: 553px;
			gap: 20px;
			.input_container {
				display: flex;
				flex-direction: column;
				gap: 6px;
				width: 100%;
				.error {
					color: red;
				}
			}
			.action_btn {
				background: #7e00c4;
				width: 153px;
				display: flex;
				justify-content: center;
				padding: 12px 5px;
				color: white;
				border-radius: 8px;
			}
		}
	}
`;
