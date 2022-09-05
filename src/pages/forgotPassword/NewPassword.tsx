import { useNavigate } from 'react-router-dom';
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
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Image src='/images/logo.png' alt='anyworks logo' />
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
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: 30,
							gap: 6,
						}}
					>
						<label htmlFor='password'>New Password</label>
						<Input type={'password'} placeholder='********' />
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
						<Input type={'password'} placeholder='********' />
					</div>
					<StyledButton onClick={() => navigate('/')} style={{ marginTop: 30 }}>
						Confrim
					</StyledButton>
				</LoginCard>
			</Container>
		</div>
	);
};

export default NewPassword;
