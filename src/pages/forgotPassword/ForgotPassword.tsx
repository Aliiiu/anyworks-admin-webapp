import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { entity } from 'simpler-state';
import { Loading } from 'src/components/ui';
import AdminAuth from 'src/service/AdminAuth';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	Input,
	StyledButton,
} from 'src/styles/commonStyle';
import { setAuthToken } from 'src/utils/AuthUtils';

export const emailCtx = entity('');

const ForgotPassword = () => {
	let navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		document.title = 'Forgot Password';
	}, []);

	const submitHandler = (e: any) => {
		e.preventDefault();
		if (isSuccess) {
			return;
		}
		setIsSuccess(true);
		emailCtx.set(email);
		AdminAuth.forgotPassword({ email })
			.then((res: any) => {
				if (res.data.success) {
					setAuthToken(res.data.token);
					toast(res.data.message);
					navigate('/get-code');
				}
			})
			.catch((err: any) => {
				err.response.data.error.message &&
					toast.error(err.response.data.error.message);
			})
			.finally(() => setIsSuccess(false));
	};
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Link to='/'>
					<Image src='/svgs/logo-one.svg' alt='anyworkx logo' />
				</Link>
				<ToastContainer />
				<LoginCard>
					<CardHeader>Forgot Password</CardHeader>
					<h4>Please enter your email address to receive your new password</h4>
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
						<StyledButton
							disabled={isSuccess}
							type='submit'
							style={{ marginTop: 24 }}
						>
							{isSuccess ? <Loading color='white' /> : 'Send Code'}
						</StyledButton>
					</form>
				</LoginCard>
			</Container>
		</div>
	);
};

export default ForgotPassword;
