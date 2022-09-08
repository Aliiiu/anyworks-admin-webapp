import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OTPInput from 'src/components/inputs/OTPInput';
import AdminAuth from 'src/service/AdminAuth';
import { auth } from 'src/store/Auth';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	StyledButton,
} from 'src/styles/commonStyle';
import { setAuthToken } from 'src/utils/AuthUtils';
import styled from 'styled-components';
import { emailCtx } from './ForgotPassword';

const StyledWrapper = styled.div`
	background: #7e00c4;
	h4 {
		font-size: 14;
		margin-top: 16;
		color: #1d2939;
		text-align: center;
		font-weight: 400;
	}
	.otpContainer {
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}

	.otpInput {
		width: 64px;
		margin: 0 1rem;
		font-size: 48px;
		text-align: center;
		border-radius: 8px;
		border: 1px solid #98a2b3;
		padding: 8px;
		outline: 1px solid #98a2b3;
		::placeholder {
			color: #98a2b3;
		}
	}
`;

const GetCode = () => {
	let navigate = useNavigate();
	const [code, setCode] = useState<number>(0);
	const userEmail = emailCtx.use();

	const resendCodeHandler = () => {
		AdminAuth.forgotPassword({ email: userEmail })
			.then((res: any) => {
				console.log(res.data.message);
			})
			.catch((err: any) => {
				console.log(err.res);
			});
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		console.log(`email: ${userEmail}`);
		// navigate('/new-password');
		AdminAuth.forgotPasswordOtp({ email: userEmail, code })
			.then((res) => {
				console.log(res.data);
				setAuthToken(res.data.payload.token);
			})
			.catch((err: any) => console.log(err.response.data.error.message));
	};
	return (
		<StyledWrapper>
			<Container>
				<Link to='/'>
					<Image src='/images/logo.png' alt='anyworks logo' />
				</Link>
				<LoginCard>
					<CardHeader>Forgot Password</CardHeader>
					<h4>Enter the code sent to olajide@gmail.com</h4>
					<form onSubmit={submitHandler}>
						<div className='otpContainer'>
							<OTPInput
								autoFocus
								length={4}
								inputClassName='otpInput'
								onChangeOTP={(otp) => setCode(Number(otp))}
							/>
						</div>
						<StyledButton style={{ marginTop: 30 }}>Sumbit</StyledButton>
					</form>
					<h5
						style={{
							fontSize: 14,
							color: '#1D2939',
							textAlign: 'center',
							fontWeight: 400,
							marginTop: 30,
						}}
					>
						Don’t receive code?
						<span
							onClick={resendCodeHandler}
							style={{
								fontSize: 14,
								color: '#7E00C4',
								fontWeight: 500,
								cursor: 'pointer',
							}}
						>
							{' '}
							Resend
						</span>
					</h5>
				</LoginCard>
			</Container>
		</StyledWrapper>
	);
};

export default GetCode;
