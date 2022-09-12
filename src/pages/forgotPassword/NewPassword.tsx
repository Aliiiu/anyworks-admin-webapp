import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminAuth from 'src/service/AdminAuth';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	StyledButton,
} from 'src/styles/commonStyle';

const NewPassword = () => {
	let navigate = useNavigate();
	const [resetDetails, setResetDetails] = useState({
		password: '',
		confirm_password: '',
		passwordError: '',
		confirmPasswordError: '',
	});

	const submitHandler = (e: any) => {
		e.preventDefault();
		let passwordError = '';
		let confirmPasswordError = '';
		if (resetDetails.password.length < 6) {
			passwordError = 'Password should be at least 8 character long';
		} else if (resetDetails.password === resetDetails.confirm_password) {
			confirmPasswordError = 'Password must be the same';
		}

		if (passwordError || confirmPasswordError) {
			setResetDetails((prevState) => ({
				...prevState,
				passwordError,
				confirmPasswordError,
			}));
		} else {
			AdminAuth.resetPassword({
				password: resetDetails.password,
				confirm_password: resetDetails.confirm_password,
			})
				.then((res) => {
					if (res.data.message) {
						toast(res.data.message);
						navigate('/');
					}
				})
				.catch(
					(err: any) =>
						err.response.data.error.message &&
						toast.error(err.response.data.error.message)
				)
				.finally(() => {
					setResetDetails({
						password: '',
						confirm_password: '',
						passwordError: '',
						confirmPasswordError: '',
					});
				});
		}

		// navigate('/');
	};
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Link to='/'>
					<Image src='/images/logo.png' alt='anyworks logo' />
				</Link>
				<LoginCard>
					<CardHeader style={{ textAlign: 'center' }}>New Password</CardHeader>
					<h4
						style={{
							fontSize: 14,
							marginTop: 16,
							color: '#1D2939',
							textAlign: 'center',
							fontWeight: 400,
						}}
					>
						Please enter new password for your account
					</h4>
					<form onSubmit={submitHandler}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: 30,
								gap: 6,
							}}
						>
							<label htmlFor='password'>New Password</label>
							<Input
								style={{
									borderColor: resetDetails.passwordError && '#F04438',
									background: resetDetails.passwordError && '#F9FAFB',
								}}
								type={'password'}
								placeholder='********'
								value={resetDetails.password}
								onChange={(e: any) =>
									setResetDetails((prevState) => ({
										...prevState,
										password: e.target.value,
									}))
								}
							/>
							{resetDetails.passwordError && (
								<h6 className='validation_error'>
									{resetDetails.passwordError}
								</h6>
							)}
						</div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: 30,
								gap: 6,
							}}
						>
							<label htmlFor='password'>New Password</label>
							<Input
								style={{
									borderColor: resetDetails.confirmPasswordError && '#F04438',
									background: resetDetails.confirmPasswordError && '#F9FAFB',
								}}
								type={'password'}
								placeholder='********'
								value={resetDetails.confirm_password}
								onChange={(e: any) =>
									setResetDetails((prevState) => ({
										...prevState,
										confirm_password: e.target.value,
									}))
								}
							/>
							{resetDetails.confirmPasswordError && (
								<h6 className='validation_error'>
									{resetDetails.confirmPasswordError}
								</h6>
							)}
						</div>
						<StyledButton style={{ marginTop: 30 }}>Confrim</StyledButton>
					</form>
				</LoginCard>
			</Container>
		</div>
	);
};

export default NewPassword;
