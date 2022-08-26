import { useNavigate } from 'react-router-dom';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	Button,
} from '../../App';

const GetCode = () => {
	let navigate = useNavigate();
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Image src='/images/logo.png' alt='anyworks logo' />
				<LoginCard>
					<CardHeader>Forgot Password</CardHeader>
					<h4
						style={{
							fontSize: 14,
							marginTop: 16,
							color: '#1D2939',
							textAlign: 'center',
							fontWeight: 400,
						}}
					>
						Enter the code sent to olajide@gmail.com
					</h4>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							gap: 10,
							marginTop: 34,
						}}
					>
						<Input
							placeholder='0'
							style={{
								borderRadius: 8,
								fontSize: 48,
								color: '#98A2B3',
								padding: 8,
								textAlign: 'center',
								width: 64,
								height: 64,
							}}
						/>
						<Input
							placeholder='0'
							style={{
								borderRadius: 8,
								fontSize: 48,
								color: '#98A2B3',
								padding: 8,
								textAlign: 'center',
								width: 64,
								height: 64,
							}}
						/>
						<Input
							placeholder='0'
							style={{
								borderRadius: 8,
								fontSize: 48,
								color: '#98A2B3',
								padding: 8,
								textAlign: 'center',
								width: 64,
								height: 64,
							}}
						/>
						<Input
							placeholder='0'
							style={{
								borderRadius: 8,
								fontSize: 48,
								color: '#98A2B3',
								padding: 8,
								textAlign: 'center',
								width: 64,
								height: 64,
							}}
						/>
					</div>
					<Button
						onClick={() => navigate('/new-password')}
						style={{ marginTop: 30 }}
					>
						Sumbit
					</Button>
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
		</div>
	);
};

export default GetCode;
