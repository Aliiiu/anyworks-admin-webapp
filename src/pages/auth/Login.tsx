import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	StyledButton,
} from 'src/styles/commonStyle';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminAuth from 'src/service/AdminAuth';
import { setAuthUser } from 'src/store/Auth';
import { setAuthToken } from 'src/utils/AuthUtils';
import { toast, ToastContainer } from 'react-toastify';
import Loading from 'src/components/ui/Loader';
import { StyledPasswordInput } from '../forgotPassword/NewPassword';
import { useBoolean } from 'src/hooks';
import Visibility from 'src/components/common/Visibility';

export const Login = () => {
	let navigate = useNavigate();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [loginDetails, setLoginDetails] = useState({
		email: '',
		password: '',
		emailError: '',
		passwordError: '',
	});

	useEffect(() => {
		document.title = 'Login';
	}, []);

	const handleEmailInputChange = (e: any) => {
		setLoginDetails({ ...loginDetails, email: e.target.value, emailError: '' });
	};

	const handlePasswordInputChange = (e: any) => {
		setLoginDetails({
			...loginDetails,
			password: e.target.value,
			passwordError: '',
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		let emailError = '';
		let passwordError = '';
		let emailFilter = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		if (!loginDetails.email) {
			emailError = "Email can't be empty";
		} else if (!loginDetails.email.match(emailFilter)) {
			emailError = 'Please enter a valid email address';
		}
		if (!loginDetails.password) {
			passwordError = "Password can't be empty";
		} else if (loginDetails.password.length < 6) {
			passwordError = 'Password should be at least 8 character long';
		}
		if (emailError || passwordError) {
			setLoginDetails({ ...loginDetails, emailError, passwordError });
		} else {
			if (isSuccess) {
				return;
			}
			setIsSuccess(true);
			// console.log('clicked');
			const { email, password } = loginDetails;
			AdminAuth.login({ email, password })
				.then((res: any) => {
					setAuthUser(res.data.payload.data);
					console.log(res.data.payload.data);
					setAuthToken(res.data.payload.token);
					toast.success(`${res.data.message}`, {
						position: 'top-center',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					navigate('/dashboard');
				})
				.catch((err: any) => {
					console.log(err.response);
					err.response.data.error.message &&
						toast.error(err.response.data.error.message);
				})
				.finally(() => setIsSuccess(false));
		}
	};

	const { value, toggle } = useBoolean(false);
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Image src='/images/logo.png' alt='anyworks logo' />
				<ToastContainer />
				<LoginCard>
					<CardHeader>log in</CardHeader>
					<h4>Welcome to Anyworks</h4>
					<form onSubmit={handleSubmit}>
						<div className='input-container'>
							<label htmlFor='email'>Email</label>
							<Input
								style={{
									borderColor: loginDetails.emailError && '#F04438',
									background: loginDetails.emailError && '#F9FAFB',
								}}
								placeholder='Email Address'
								value={loginDetails.email}
								onChange={handleEmailInputChange}
							/>
							{loginDetails.emailError && (
								<h6 className='validation_error'>{loginDetails.emailError}</h6>
							)}
						</div>
						<div
							style={{
								marginBottom: 16,
							}}
							className='input-container'
						>
							<label htmlFor='password'>Password</label>
							<StyledPasswordInput
								style={{
									borderColor: loginDetails.passwordError && '#F04438',
									background: loginDetails.passwordError && '#F9FAFB',
								}}
							>
								<input
									type={value ? 'text' : 'password'}
									placeholder='********'
									value={loginDetails.password}
									onChange={handlePasswordInputChange}
								/>
								<Visibility value={value} toggle={toggle} />
							</StyledPasswordInput>
							{loginDetails.passwordError && (
								<h6 className='validation_error'>
									{loginDetails.passwordError}
								</h6>
							)}
						</div>
						<Link to={'/forgot-password'} className='forgot-password'>
							Forgot password?
						</Link>
						<StyledButton disabled={isSuccess} onClick={handleSubmit}>
							{isSuccess ? <Loading color='white' /> : 'Login'}
						</StyledButton>
					</form>
				</LoginCard>
			</Container>
		</div>
	);
};

export default Login;
