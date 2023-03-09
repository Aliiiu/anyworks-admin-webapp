import React, { useRef } from 'react';
import { BounceLoader } from 'react-spinners';
import { Formik, Form, ErrorMessage } from 'formik';
import { StyledPasswordInput } from 'src/pages/forgotPassword/NewPassword';
import Visibility from '../common/Visibility';
import { useBoolean, useLoading } from 'src/hooks';
import { toast } from 'react-toastify';
import AdminProfile from 'src/service/AdminProfile';
import { auth, setAuthUser } from 'src/store/Auth';
import * as Yup from 'yup';
import { Loading } from '../ui';
import { InputField, SettingsContainer } from './changePassword.style';

const ChangePasswordCard = () => {
	const { loading, startLoading, stopLoading } = useLoading();
	const {
		loading: updatePassword,
		startLoading: startUpdatingPassword,
		stopLoading: stopUpdatingPassword,
	} = useLoading();
	const imageFileRef = useRef<HTMLInputElement | null>(null);
	const { authUser } = auth.use();
	const { value, toggle } = useBoolean(false);

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
		if (updatePassword) {
			return;
		}
		startUpdatingPassword();
		AdminProfile.changePassword(values)
			.then((res) => toast.success(res.data.message))
			.catch((err) => toast.error(err.response.data.error.message))
			.finally(() => {
				stopUpdatingPassword();
				resetForm({ values: '' });
			});
	};

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
			startLoading();
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
				.finally(() => stopLoading());
		}
	};

	const submitDisplayPicture = () => {};
	return (
		<SettingsContainer>
			<div className='profile_container w-1/3'>
				<h3 className='text-xl font-semibold'>Personal Information</h3>
				<form onSubmit={submitDisplayPicture}>
					<label htmlFor='photo-upload' className='custom-file-upload'>
						<div className='img-wrapper img-upload'>
							{loading ? (
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
			<div className='change_password_container w-2/3 mb-4'>
				<h3 className='text-xl font-semibold'>Change Password</h3>
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
							{updatePassword ? <Loading color='white' /> : 'Update Password'}
						</button>
					</Form>
				</Formik>
			</div>
		</SettingsContainer>
	);
};

export default ChangePasswordCard;
