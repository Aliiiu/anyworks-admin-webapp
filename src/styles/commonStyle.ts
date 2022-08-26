import styled from 'styled-components';

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
`;

export const CardHeader = styled.h2`
	font-size: 48px;
	font-style: normal;
	font-weight: 600;
`;

export const Button = styled.div`
	background: #7e00c4;
	border-radius: 8px;
	max-width: 100%;
	font-weight: 500;
	text-align: center;
	padding: 12px 0px;
	color: #fff;
	margin-top: 48px;
	cursor: pointer;
`;

export const Input = styled.input`
	border-radius: 8px;
	background: transparent;
	color: #98a2b3;
	padding: 10px 14px 10px 14px;
	font-size: inherit;
	border: 1px solid #98a2b3;
	width: 98%;
	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	&:focus {
		outline: none;
		background: #f9fafb;
	}
`;