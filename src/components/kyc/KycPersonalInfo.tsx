import { Input } from 'src/styles/commonStyle';
// import styled from 'styled-components';
// import { formatDateYmd } from 'src/utils/helpers';
// import ImageMagnifier from './ImageMagnifier';
// import KycData from 'src/service/VerifyService';
// import { useLoading } from 'src/hooks';
// import { ClipLoader } from 'react-spinners';
// import { toast, ToastContainer } from 'react-toastify';
// import { useEffect } from 'react';

// const InfoContainer = styled.div`
// 	display: flex;
// 	margin-top: 40px;
// 	.personal_info_container {
// 		width: 40%;
// 		margin-right: 50px;
// 	}
// 	.moi_info_container {
// 		width: 60%;
// 		/* display: flex;
//     justify-content: center; */
// 	}
// 	.personal_info_container,
// 	.moi_info_container {
// 		border-radius: 16px;
// 		background: #ffffff;
// 		padding: 30px;
// 	}
// 	.input_container {
// 		display: flex;
// 		flex-direction: column;
// 		margin-top: 20px;
// 		gap: 6px;
// 	}
// `;

// interface Props {
// 	artisanKyc: any;
// 	fetchData: Function;
// }
// // const KycPersonalInfo = ({ artisanKyc, fetchData }: Props) => {
// // 	const { loading, startLoading, stopLoading } = useLoading();
// // 	const RetryKYC = (
// // 		identity_type: string,
// // 		identity_no: string,
// // 		artisan_id: string
// // 	) => {
// // 		startLoading();
// // 		KycData.retryVerification({
// // 			identity_type,
// // 			identity_no,
// // 			artisan_id,
// // 		})
// // 			.then((res) => {
// // 				console.log(res.data);
// // 				toast.success(res.data.message);
// // 				fetchData();
// // 			})
// // 			.catch((err) => console.log(err.response))
// // 			.finally(() => stopLoading());
// // 	};

// 	return (
// 		<InfoContainer>
// 			<ToastContainer />
// 			<div className='personal_info_container'>
// 				<div className='flex justify-between items-center'>
// 					<h3 className='text-neutral font-semibold text-[28px]'>
// 						Personal Information
// 					</h3>
// 					{/* {artisanKyc?.kyc?.identity_type === 'NIN' ? (
// 						artisanKyc?.kyc?.identity_resolved_value?.firstname &&
// 						artisanKyc?.kyc?.identity_resolved_value?.surname ? (
// 							''
// 						) : (
// 							<button
// 								onClick={() =>
// 									RetryKYC(
// 										artisanKyc.kyc.identity_type,
// 										String(artisanKyc.kyc.identity_no),
// 										artisanKyc.kyc.artisan
// 									)
// 								}
// 								disabled={loading}
// 								className='bg-primary cursor-pointer disabled:cursor-not-allowed text-white min-w-[80px] rounded-lg px-4 py-2'
// 							>
// 								{loading ? (
// 									<ClipLoader size={20} color={'#FFFFFF'} className='' />
// 								) : (
// 									'Retry NIN'
// 								)}
// 							</button>
// 						)
// 					) : artisanKyc?.kyc?.identity_resolved_value?.firstName &&
// 					  artisanKyc?.kyc?.identity_resolved_value?.lastName ? (
// 						''
// 					) : (
// 						<button
// 							onClick={() =>
// 								RetryKYC(
// 									artisanKyc.kyc.identity_type,
// 									String(artisanKyc.kyc.identity_no),
// 									artisanKyc.kyc.artisan
// 								)
// 							}
// 							disabled={loading}
// 							className='bg-[#7E00C4] cursor-pointer disabled:cursor-not-allowed text-white min-w-[80px] rounded-lg px-4 py-2'
// 						>
// 							{loading ? (
// 								<ClipLoader size={20} color={'#FFFFFF'} className='' />
// 							) : (
// 								'Retry BVN'
// 							)}
// 						</button>
// 					)} */}
// 				</div>
// 				{/* <div className='input_container'>
// 					<label htmlFor='nin'>{artisanKyc?.kyc?.identity_type} Number</label>
// 					<Input
// 						disabled
// 						placeholder='12334545435345'
// 						value={artisanKyc?.kyc?.identity_no}
// 						type={'number'}
// 						style={{ background: '#F2F4F7' }}
// 					/>
// 				</div> */}
// 				<div className='input_container'>
// 					<label htmlFor='name'>Full name</label>
// 					<Input
// 						disabled
// 						placeholder='Fullname'
// 						value={
// 							artisanKyc?.kyc?.identity_type === 'NIN'
// 								? artisanKyc?.kyc?.identity_resolved_value?.firstname ===
// 								  undefined
// 									? ''
// 									: artisanKyc?.kyc?.identity_resolved_value?.firstname +
// 									  ' ' +
// 									  artisanKyc?.kyc?.identity_resolved_value?.surname
// 								: artisanKyc?.kyc?.identity_resolved_value?.firstName ===
// 								  undefined
// 								? ''
// 								: artisanKyc?.kyc?.identity_resolved_value?.firstName +
// 								  ' ' +
// 								  artisanKyc?.kyc?.identity_resolved_value?.lastName
// 						}
// 						style={{ background: '#F2F4F7' }}
// 					/>
// 				</div>
// 				<div className='input_container'>
// 					<label htmlFor='phone_no'>Phone number</label>
// 					<Input
// 						disabled
// 						placeholder='Phone Number'
// 						value={
// 							artisanKyc?.kyc?.identity_type === 'NIN'
// 								? artisanKyc?.kyc?.identity_resolved_value?.telephoneno
// 								: artisanKyc?.kyc?.identity_resolved_value?.phoneNumber1
// 						}
// 						type={'number'}
// 						style={{ background: '#F2F4F7' }}
// 					/>
// 				</div>
// 				<div className='input_container'>
// 					<label htmlFor='dob'>Date of birth</label>
// 					<Input
// 						disabled
// 						placeholder='Date of birth'
// 						value={
// 							artisanKyc?.kyc?.identity_type === 'NIN'
// 								? artisanKyc?.kyc?.identity_resolved_value?.birthdate
// 								: artisanKyc?.kyc?.identity_resolved_value?.dateOfBirth
// 						}
// 						type={'text'}
// 						style={{ background: '#F2F4F7' }}
// 					/>
// 				</div>
// 			</div>
// 			<div className='moi_info_container'>
// 				<div>
// 					<h3 className='mb-8 font-semibold text-neutral text-[28px]'>
// 						Means of Identification
// 					</h3>
// 					<div
// 						style={{
// 							display: 'flex',
// 							justifyContent: 'center',
// 							alignContent: 'center',
// 						}}
// 					>
// 						<ImageMagnifier
// 							height='300px'
// 							src={
// 								artisanKyc?.kyc?.document_url || '/images/driversLicense.png'
// 							}
// 						/>
// 					</div>
// 				</div>
// 			</div>
// 		</InfoContainer>
// 	);
// };

// export default KycPersonalInfo;
