import React, { useEffect, useRef, useState } from 'react';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import { StyledPasswordInput } from '../forgotPassword/NewPassword';
import useBoolean from 'src/hooks/useBoolean';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AdminProfile from 'src/service/AdminProfile';
import { toast, ToastContainer } from 'react-toastify';
import { Flex, Loading } from 'src/components/ui';
import { auth, setAuthUser } from 'src/store/Auth';
import { BounceLoader, ClipLoader } from 'react-spinners';
import Visibility from 'src/components/common/Visibility';
import miscService from 'src/service/miscServices';
import { useLoading } from 'src/hooks';
import AdminAuth from 'src/service/AdminAuth';

const InputField = styled(Field)`
	border-radius: 8px;
	background: transparent;
	padding: 10px 14px 10px 14px;
	font-size: inherit;
	border: 1px solid #98a2b3;
	width: 100%;
	box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
	outline: none;
	&:focus {
		background: #f9fafb;
	}
	::placeholder {
		color: #98a2b3;
	}
`;

const SettingsContainer = styled.div`
	background: #ffffff;
	border-radius: 16px;
	margin-top: 30px;
	padding: 35px;
	.profile_container {
		margin-bottom: 28px;
		.custom-file-upload {
			border-radius: 50%;
			display: inline-block;
			position: relative;
			cursor: pointer;
			background: white;
			box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
			margin-top: 15px;
			input[type='file'] {
				display: none;
			}
			.icon {
				position: absolute;
				width: 45px;
				bottom: -60px;
				right: 0px;
			}
			.img-wrapper {
				position: relative;
				width: 150px;
				height: 150px;
				overflow: hidden;
				border-radius: 50%;
				img {
					width: 100%;
				}
				.loading_container {
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			img {
				width: auto;
				height: 100%;
			}
		}
	}
	.change_password_container {
		.input_wrapper {
			margin-top: 24px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			max-width: 553px;
			gap: 20px;
			.input_container {
				display: flex;
				flex-direction: column;
				gap: 6px;
				width: 100%;
				.error {
					color: red;
				}
			}
			.action_btn {
				background: #7e00c4;
				width: 153px;
				display: flex;
				justify-content: center;
				padding: 12px 5px;
				color: white;
				border-radius: 8px;
			}
		}
	}
`;

const Settings = () => {
	const { authUser } = auth.use();
	const { value, toggle } = useBoolean(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const imageFileRef = useRef<HTMLInputElement | null>(null);
	const settingSchema = Yup.object().shape({
		old_password: Yup.string().required('Enter your old password'),
		new_password: Yup.string()
			.required('Enter your new password')
			.min(6, 'Your new password should be greater than 6'),
		confirm_password: Yup.string()
			.required('Please retype your password')
			.oneOf([Yup.ref('new_password')], 'Your passwords do not match'),
	});
	const submitHandler = (values: any, { resetForm }: any) => {
		if (isSuccess) {
			return;
		}
		setIsSuccess(true);
		AdminProfile.changePassword(values)
			.then((res) => toast.success(res.data.message))
			.catch((err) => toast.error(err.response.data.error.message))
			.finally(() => {
				setIsSuccess(false);
				resetForm({ values: '' });
			});
	};

	useEffect(() => {
		document.title = 'Settings';
	}, []);

	const fetchMe = () => {
		AdminProfile.getMe()
			.then((res) => {
				console.log(res.data.payload.data.display_picture);
				setAuthUser(res.data.payload.data);
			})
			.catch((err) => toast(err.response.data.error.message));
	};

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const imagefile = imageFileRef.current?.files;
		if (imagefile?.length) {
			setIsLoading(true);
			const imageData = new FormData();
			Object.values(imagefile).forEach((file) => {
				console.log(file);
				imageData.append('display_picture', file);
			});
			AdminProfile.changeDp(imageData)
				.then((res) => {
					console.log(res.data);
					fetchMe();
				})
				.catch((err) => toast(err.response.data.error.message))
				.finally(() => setIsLoading(false));
		}
	};

	const submitDisplayPicture = () => {};

	const { loading, startLoading, stopLoading } = useLoading();
	const {
		loading: getServiceFee,
		startLoading: startFetchingServiceFee,
		stopLoading: stopFetchingServiceFee,
	} = useLoading();

	const cacheHandler = () => {
		startLoading();
		miscService
			.delCache()
			.then((res) => {
				toast.success(res.data.message);
				stopLoading();
			})
			.catch((err) => console.log(err.response.data.message));
	};

	const [minServiceFee, setMinServiceFee] = useState('');
	const [maxServiceFee, setMaxServiceFee] = useState('');

	const updateCalloutFee = () => {
		startFetchingServiceFee();
		console.log({
			min: minServiceFee,
			max: maxServiceFee,
		});
		AdminAuth.serviceFeeRange({
			min: minServiceFee,
			max: maxServiceFee,
		})
			.then((res) => {
				toast.success(res.data.message);
				console.log(res.data.message);
				stopFetchingServiceFee();
			})
			.catch((err) => console.log(err.response));
	};
	return (
		<DashboardLayout pageTitle='Settings'>
			<ToastContainer />
			<SettingsContainer>
				<div className='profile_container'>
					<h3>Personal Information</h3>
					<form onSubmit={submitDisplayPicture}>
						<label htmlFor='photo-upload' className='custom-file-upload'>
							<div className='img-wrapper img-upload'>
								{isLoading ? (
									<div className='loading_container'>
										<BounceLoader color='#7e00c4' />
									</div>
								) : (
									<img src={authUser.display_picture} alt='' />
								)}
							</div>
							<img src='./svgs/cameraIcon.svg' alt='' className='icon' />
							<input
								id='photo-upload'
								accept='.png, .jpeg, .jpg'
								name='photo-upload'
								type={'file'}
								ref={imageFileRef}
								onChange={changeHandler}
								className='dp_wrapper'
								multiple
							/>
						</label>
					</form>
				</div>
				<div className='change_password_container mb-4'>
					<h3>Change Password</h3>
					<Formik
						initialValues={{
							old_password: '',
							new_password: '',
							confirm_password: '',
						}}
						validationSchema={settingSchema}
						onSubmit={submitHandler}
					>
						<Form className='input_wrapper'>
							<div className='input_container'>
								<label htmlFor='old_password'>Old Password</label>
								<StyledPasswordInput>
									<InputField
										name='old_password'
										type={value ? 'text' : 'password'}
										placeholder='***************'
									/>
									<Visibility value={value} toggle={toggle} />
								</StyledPasswordInput>
								<div className='error'>
									<ErrorMessage name='old_password' />
								</div>
							</div>
							<div className='input_container'>
								<label htmlFor='new_password'>New Password</label>
								<StyledPasswordInput>
									<InputField
										name='new_password'
										type={value ? 'text' : 'password'}
										placeholder='***************'
									/>
									<Visibility value={value} toggle={toggle} />
								</StyledPasswordInput>
								<div className='error'>
									<ErrorMessage name='new_password' />
								</div>
							</div>
							<div className='input_container'>
								<label htmlFor='confirm_password'>New Password</label>
								<StyledPasswordInput>
									<InputField
										name='confirm_password'
										type={value ? 'text' : 'password'}
										placeholder='***************'
									/>
									<Visibility value={value} toggle={toggle} />
								</StyledPasswordInput>
								<div className='error'>
									<ErrorMessage name='confirm_password' />
								</div>
							</div>
							<button type='submit' className='action_btn'>
								{isSuccess ? <Loading color='white' /> : 'Update Password'}
							</button>
						</Form>
					</Formik>
				</div>
				<div className='mb-4'>
					<p className='mb-1 text-2xl font-semibold'>Set Service Fee</p>
					<Flex align='end'>
						<Flex gap='5px' direction='column' style={{ width: '154px' }}>
							<label>Service Fee Minimum</label>
							<input
								className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
								value={minServiceFee}
								onChange={(e) => setMinServiceFee(e.target.value)}
							/>
						</Flex>
						<div className='h-12 flex items-center'>
							<div className='text-black h-[1px] w-2 bg-black' />
						</div>
						<Flex gap='5px' direction='column' style={{ width: '154px' }}>
							<label>Service Fee Maximum</label>
							<input
								className='bg-[#F2F4F7] w-full border border-[#98a2b3] rounded-lg outline-none focus:bg-white px-4 py-3 h-full'
								value={maxServiceFee}
								onChange={(e) => setMaxServiceFee(e.target.value)}
							/>
						</Flex>
						<button
							onClick={updateCalloutFee}
							className='text-primary border border-primary active:bg-primary active:text-white font-semibold rounded-lg text-sm px-2 py-3 min-w-[112px] h-full'
						>
							{getServiceFee ? (
								<ClipLoader
									size={20}
									color={'#7607BD'}
									className='text-primary'
								/>
							) : (
								'Set Service Fee'
							)}
						</button>
					</Flex>
				</div>
				<div className='mb-10'>
					<h2 className='font-semibold text-2xl'>
						Clean up memory to save space for new information
					</h2>
					<button
						onClick={cacheHandler}
						className='bg-primary px-4 py-3 flex justify-center text-white min-w-[100px] rounded-lg mt-2'
					>
						{loading ? <Loading color='white' /> : 'Click here'}
					</button>
				</div>
			</SettingsContainer>
		</DashboardLayout>
	);
};

export default Settings;
