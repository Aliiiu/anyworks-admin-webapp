import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Visibility from 'src/components/common/Visibility';
import { Loading } from 'src/components/ui';
import { useBoolean } from 'src/hooks';
import AdminAuth from 'src/service/AdminAuth';
import {
	Container,
	Image,
	LoginCard,
	CardHeader,
	StyledButton,
} from 'src/styles/commonStyle';
import styled from 'styled-components';

export const StyledPasswordInput = styled.div`
	border: 1px solid #98a2b3;
	border-radius: 8px;
	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	width: 100%;
	display: flex;
	align-items: center;
	outline: none;
	input {
		background: transparent;
		padding: 10px 14px 10px 14px;
		border: none;
		width: 100%;
		font-size: inherit;
		&:focus {
			outline: none;
			background: transparent;
		}
		::placeholder {
			color: #98a2b3;
		}
		&:disabled {
			color: black;
		}
	}
	img {
		margin-right: 20px;
	}
`;

const NewPassword = () => {
	let navigate = useNavigate();
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const { value, toggle } = useBoolean(false);
	const [resetDetails, setResetDetails] = useState({
		password: '',
		confirm_password: '',
		passwordError: '',
		confirmPasswordError: '',
	});

	useEffect(() => {
		document.title = 'New Password';
	}, []);

	const submitHandler = (e: any) => {
		e.preventDefault();
		let passwordError = '';
		let confirmPasswordError = '';
		if (resetDetails.password.length < 6) {
			passwordError = 'Password should be at least 8 character long';
		} else if (
			resetDetails.password.trim() !== resetDetails.confirm_password.trim()
		) {
			confirmPasswordError = 'Password must be the same';
		}

		if (passwordError || confirmPasswordError) {
			setResetDetails((prevState) => ({
				...prevState,
				passwordError,
				confirmPasswordError,
			}));
		} else {
			if (isSuccess) {
				return;
			}
			setIsSuccess(true);
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
					setIsSuccess(false);
				});
		}
	};
	return (
		<div style={{ background: '#7e00c4' }}>
			<Container>
				<Link to='/'>
					<Image src='/images/logo.png' alt='anyworkx logo' />
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
							<StyledPasswordInput
								style={{
									borderColor: resetDetails.passwordError && '#F04438',
									background: resetDetails.passwordError && '#F9FAFB',
								}}
							>
								<input
									type={value ? 'text' : 'password'}
									placeholder='********'
									value={resetDetails.password}
									onChange={(e: any) =>
										setResetDetails((prevState) => ({
											...prevState,
											password: e.target.value,
											passwordError: '',
										}))
									}
								/>
								<Visibility value={value} toggle={toggle} />
							</StyledPasswordInput>
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
							<StyledPasswordInput
								style={{
									borderColor: resetDetails.confirmPasswordError && '#F04438',
									background: resetDetails.confirmPasswordError && '#F9FAFB',
								}}
							>
								<input
									type={value ? 'text' : 'password'}
									placeholder='********'
									value={resetDetails.confirm_password}
									onChange={(e: any) =>
										setResetDetails((prevState) => ({
											...prevState,
											confirm_password: e.target.value,
											confirmPasswordError: '',
										}))
									}
								/>
								<Visibility value={value} toggle={toggle} />
							</StyledPasswordInput>
							{resetDetails.confirmPasswordError && (
								<h6 className='validation_error'>
									{resetDetails.confirmPasswordError}
								</h6>
							)}
						</div>
						<StyledButton style={{ marginTop: 30 }}>
							{isSuccess ? <Loading color='white' /> : 'Confirm'}
						</StyledButton>
					</form>
				</LoginCard>
			</Container>
		</div>
	);
};

export default NewPassword;
