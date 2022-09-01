import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	Button,
} from 'src/styles/commonStyle';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
	let navigate = useNavigate();
	const [loginDetails, setLoginDetails] = useState({
		email: '',
		password: '',
		emailError: '',
		passwordError: '',
	});

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

	const handleSumbit = (e: any) => {
		let emailError = '';
		let passwordError = '';
		let emailFilter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
			navigate('/dashboard');
		}
	};
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Image src='/images/logo.png' alt='anyworks logo' />
				<LoginCard>
					<CardHeader>log in</CardHeader>
					<h4
						style={{
							fontSize: 16,
							marginTop: 20,
							color: '#1D2939',
							fontWeight: 400,
						}}
					>
						Welcome to Anyworks
					</h4>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: 20,
							gap: 6,
						}}
					>
						<label htmlFor='email'>Email</label>
						<Input
							style={{
								borderColor: loginDetails.emailError && '#F04438',
								background: loginDetails.passwordError && '#F9FAFB',
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
							display: 'flex',
							flexDirection: 'column',
							marginTop: 20,
							marginBottom: 16,
							gap: 6,
						}}
					>
						<label htmlFor='password'>Password</label>
						<Input
							style={{
								borderColor: loginDetails.passwordError && '#F04438',
								background: loginDetails.passwordError && '#F9FAFB',
							}}
							type={'password'}
							placeholder='********'
							value={loginDetails.password}
							onChange={handlePasswordInputChange}
						/>
						{loginDetails.passwordError && (
							<h6 className='validation_error'>{loginDetails.passwordError}</h6>
						)}
					</div>

					<Link
						style={{
							fontSize: 14,
							color: '#1D2939',
							fontWeight: 500,
							cursor: 'pointer',
						}}
						to={'/forget-password'}
					>
						Forgot password?
					</Link>
					<Button onClick={handleSumbit}>Login</Button>
				</LoginCard>
			</Container>
		</div>
	);
};

export default Login;
