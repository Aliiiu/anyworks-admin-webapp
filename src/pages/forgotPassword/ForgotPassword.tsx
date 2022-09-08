import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { entity } from 'simpler-state';
import AdminAuth from 'src/service/AdminAuth';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	StyledButton,
} from 'src/styles/commonStyle';

export const emailCtx = entity('');

const ForgotPassword = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');

	const submitHandler = (e: any) => {
		e.preventDefault();
		emailCtx.set(email);
		// console.log(email);
		// navigate('/get-code');
		AdminAuth.forgotPassword({ email })
			.then((res: any) => {
				console.log(res.data.message);
				navigate('/get-code');
			})
			.catch((err: any) => {
				console.log(err.res);
			});
	};
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Link to='/'>
					<Image src='/images/logo.png' alt='anyworks logo' />
				</Link>
				<LoginCard>
					<CardHeader>Forgot Password</CardHeader>
					<h4
						style={{
							fontSize: 16,
							marginTop: 16,
							fontWeight: 400,
							color: '#1D2939',
						}}
					>
						Please enter your email address to receive your new password
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
							<label htmlFor='email'>Email</label>
							<Input
								onChange={(e: any) => setEmail(e.target.value)}
								placeholder='olivia@untitledui.com'
								style={{ fontFamily: 'Raleway' }}
							/>
						</div>
						<StyledButton style={{ marginTop: 24 }}>Send Code</StyledButton>
					</form>
				</LoginCard>
			</Container>
		</div>
	);
};

export default ForgotPassword;
