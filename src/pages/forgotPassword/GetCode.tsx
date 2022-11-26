import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import OTPInput from 'src/components/inputs/OTPInput';
import Loading from 'src/components/ui/Loader';
import AdminAuth from 'src/service/AdminAuth';
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
		width: 32px;
		font-size: 24px;
		margin: 0 8px;
		text-align: center;
		border-radius: 8px;
		border: 1px solid #98a2b3;
		padding: 2px;
		outline: 1px solid #98a2b3;
		color: #98a2b3;
		::placeholder {
			color: #98a2b3;
		}
		@media (min-width: ${(props) => props.theme.breakpoint.sm}) {
			width: 64px;
			padding: 8px;
			font-size: 48px;
			margin: 0 1rem;
		}
	}
`;

const GetCode = () => {
	let navigate = useNavigate();
	const [code, setCode] = useState<string>('');
	// const [resetCode, setResetCode] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const userEmail = emailCtx.use();

	useEffect(() => {
		document.title = 'OTP Code';
	}, []);

	const resendCodeHandler = () => {
		AdminAuth.forgotPassword({ email: userEmail })
			.then((res: any) => {
				toast(res.data.message);
			})
			.catch((err: any) => {
				err.response.data.error.message &&
					toast(err.response.data.error.message);
			});
	};

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (isSuccess) {
			return;
		}
		setIsSuccess(true);
		AdminAuth.forgotPasswordOtp({ email: userEmail, code: Number(code) })
			.then((res) => {
				if (res.data.success) {
					toast(res.data.message);
					setAuthToken(res.data.payload.token);
					navigate('/new-password');
				}
			})
			.catch(
				(err: any) =>
					err.response.data.error.message &&
					toast.error(err.response.data.error.message)
			)
			.finally(() => setIsSuccess(false));
	};
	return (
		<StyledWrapper>
			<Container>
				<Link to='/'>
					<Image src='/images/logo.png' alt='anyworkx logo' />
				</Link>
				<ToastContainer />
				<LoginCard>
					<CardHeader>Forgot Password</CardHeader>
					<h4>Enter the code sent to {userEmail}</h4>
					<form onSubmit={submitHandler}>
						<div className='otpContainer'>
							<OTPInput
								autoFocus
								length={4}
								inputClassName='otpInput'
								onChangeOTP={(otp) => setCode(otp)}
							/>
						</div>
						<StyledButton style={{ marginTop: 30 }}>
							{isSuccess ? <Loading color='white' /> : 'Submit'}
						</StyledButton>
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
