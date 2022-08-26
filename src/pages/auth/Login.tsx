import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	Button,
} from 'src/styles/commonStyle';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
	let navigate = useNavigate();
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
						<Input placeholder='Email Address' />
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
						<Input type={'password'} placeholder='********' />
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
					<Button onClick={() => navigate('/dashboard')}>Login</Button>
				</LoginCard>
			</Container>
		</div>
	);
};

export default Login;
