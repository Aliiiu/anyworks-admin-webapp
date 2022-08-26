import { useNavigate } from 'react-router-dom';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	Button,
} from '../../App';

const ForgetPassword = () => {
	let navigate = useNavigate();
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Image src='/images/logo.png' alt='anyworks logo' />
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
					<Button
						onClick={() => navigate('/get-code')}
						style={{ marginTop: 24 }}
					>
						Send Code
					</Button>
				</LoginCard>
			</Container>
		</div>
	);
};

export default ForgetPassword;
