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
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const submitHandler = (e: any) => {
		e.preventDefault();
		AdminAuth.resetPassword({ password, confirm_password: confirmPassword })
			.then((res) => {
				if (res.data.message) {
					toast(res.data.message);
					navigate('/');
				}
			})
			.catch(
				(err: any) =>
					err.response.data.error.message &&
					toast(err.response.data.error.message)
			)
			.finally(() => {
				setPassword('');
				setConfirmPassword('');
			});
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
								type={'password'}
								placeholder='********'
								value={password}
								onChange={(e: any) => setPassword(e.target.value)}
							/>
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
								type={'password'}
								placeholder='********'
								value={confirmPassword}
								onChange={(e: any) => setConfirmPassword(e.target.value)}
							/>
						</div>
						<StyledButton style={{ marginTop: 30 }}>Confrim</StyledButton>
					</form>
				</LoginCard>
			</Container>
		</div>
	);
};

export default NewPassword;
