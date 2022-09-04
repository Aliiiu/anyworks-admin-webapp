import { useNavigate, Link } from 'react-router-dom';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	StyledButton,
} from 'src/styles/commonStyle';

const ForgotPassword = () => {
	let navigate = useNavigate();
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Link to='/'>
				<Image src='/images/logo.png' alt='anyworks logo' /></Link>
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
							placeholder='olivia@untitledui.com'
							style={{ fontFamily: 'Raleway' }}
						/>
					</div>
					<StyledButton
						onClick={() => navigate('/get-code')}
						style={{ marginTop: 24 }}
					>
						Send Code
					</StyledButton>
				</LoginCard>
			</Container>
		</div>
	);
};

export default ForgotPassword;
