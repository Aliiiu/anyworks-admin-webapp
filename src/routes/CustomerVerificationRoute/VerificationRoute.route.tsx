import { useState, useEffect } from 'react';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { Button, ButtonClass, Flex } from 'src/components/ui';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useLoading } from 'src/hooks';
import { toast, ToastContainer } from 'react-toastify';
import NinValidation from 'src/pages/kyc/NinValidation';
import DocumentUpload from 'src/pages/kyc/DocumentUpload';
import AddressVerification from 'src/pages/kyc/AddressVerification';
import Socials from 'src/pages/kyc/Socials';
import FaceRecognition from 'src/pages/kyc/FaceRecognition';
import CustomerProfileInfo from 'src/components/kyc/CusomerProfileInfo';
import VerificationService from 'src/service/VerifyService';
import { ScaleLoader } from 'react-spinners';
import { BsCheck2 } from 'react-icons/bs';
import Certificate from 'src/pages/kyc/Certificate';

const ArtisankycContainer = styled.div`
	.pageHeader {
		h2 {
			font-weight: 700;
			font-size: 36px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}
`;

const VerificationRoute = () => {
	const location = useLocation();
	const { user_id } = useParams();
	const [userVerify, setUserVerify] = useState<{ [key: string]: any }>({});

	const {
		loading: fetchingVerification,
		startLoading: startFetchingVerification,
		stopLoading: stopFetchingVerification,
	} = useLoading(false);
	const fetchingVendorVerificationData = (id: string) => {
		startFetchingVerification();
		VerificationService.getUserVerification(id || '')
			.then((res) => {
				setUserVerify(res?.data?.payload?.data || {});
				// console.log(res.data.payload?.data);
			})
			.catch((err) => {
				toast.error(err.response.data.error.message);
			})
			.finally(() => {
				stopFetchingVerification();
			});
	};
	useEffect(() => {
		fetchingVendorVerificationData(user_id || '');
	}, []);

	const tiersGroup = [
		{
			id: 1,
			title: 'Tier 1',
			content: 'Face Recognition',
			img: '/svgs/tier4.svg',
			href: 'face-recognition',
			verified: userVerify?.user?.verified?.face_capture,
			tier: userVerify?.user?.tier,
			pending: userVerify?.user?.meta?.pending_verification,
		},
		{
			id: 2,
			title: 'Tier 2',
			content: 'NIN validation ',
			img: '/svgs/tier1.svg',
			href: 'nin-validation',
			verified: userVerify?.user?.verified?.nin,
			tier: userVerify?.user?.tier,
			pending: userVerify?.user?.meta?.pending_verification,
		},
		{
			id: 3,
			title: 'Tier 3',
			content: 'Address Verification',
			img: '/svgs/tier3.svg',
			href: 'address-verification',
			verified: userVerify?.user?.verified?.address,
			tier: userVerify?.user?.tier,
			pending: userVerify?.user?.meta?.pending_verification,
		},
		{
			id: 4,
			title: 'Tier 4',
			content: 'Social Media Linking',
			img: '/svgs/tier5.svg',
			href: 'social-media-linking',
			verified: userVerify?.user?.verified?.social_media,
			tier: userVerify?.user?.tier,
			pending: userVerify?.user?.meta?.pending_verification,
		},
	];

	return (
		<DashboardLayout>
			<ToastContainer />

			<ArtisankycContainer>
				<Flex justify='space-between' align='center' className='pageHeader'>
					<h2>Customer Verification</h2>
					<Link to='/verification/customer'>
						<Button
							classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
							style={{ backgroundColor: theme.colors.purple }}
						>
							{' '}
							<img src={arrowLeft} alt='back' />
							<span>Back</span>
						</Button>
					</Link>
				</Flex>
				{fetchingVerification ? (
					<div className='rounded-2xl mt-10 bg-white flex justify-center items-center h-80'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<>
						<CustomerProfileInfo verifyData={userVerify} />
						<div className='mt-[36px] bg-white px-1 py-1 flex rounded-2xl'>
							<div className='bg-[#F2F4F7] w-[40%] rounded-tl-2xl rounded-bl-2xl pt-[20px] pb-[190px] pl-[34px]'>
								<h2 className='font-semibold text-3xl'>Tiers</h2>
								<div className='mt-[24px]'>
									{tiersGroup.map((item) => {
										return (
											<Link to={item.href}>
												<div
													key={item.id}
													className={`max-h-[80px] p-[17px] ${
														location.pathname.includes(item.href)
															? 'bg-white'
															: 'bg-transparent'
													}`}
												>
													<div className='flex items-center justify-between'>
														<div>
															<div className='flex gap-1 items-center'>
																<h5 className='text-[#4D4D4D] text-xl'>
																	{item.title}
																</h5>
																<img
																	src={item.img}
																	alt={item.title}
																	className='w-[24px] h-[24px]'
																/>
															</div>
															<p className='text-[#999999]'>{item.content}</p>
														</div>
														{item.verified ? (
															<div className='w-8 h-8 rounded-full flex justify-center items-center bg-primary'>
																<BsCheck2 className='text-white text-xl' />
															</div>
														) : item.tier === item.id ? (
															item.pending ? (
																<div className='bg-[#00A7D7] text-white py-1 px-2 rounded-2xl'>
																	Pending
																</div>
															) : (
																''
															)
														) : (
															''
														)}
													</div>
												</div>
											</Link>
										);
									})}
								</div>
							</div>
							<Routes>
								<Route
									path='/nin-validation'
									element={
										<NinValidation
											who='user'
											id={user_id || ''}
											verifyData={userVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/document-upload'
									element={
										<DocumentUpload
											who='user'
											id={user_id || ''}
											verifyData={userVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/address-verification'
									element={
										<AddressVerification
											who='user'
											id={user_id || ''}
											verifyData={userVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/face-recognition'
									element={
										<FaceRecognition
											who='user'
											id={user_id || ''}
											verifyData={userVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/social-media-linking'
									element={
										<Socials
											who='user'
											id={user_id || ''}
											verifyData={userVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								{/* <Route
									path='/certificate'
									element={
										<Certificate
											who='user'
											id={user_id || ''}
											verifyData={userVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/> */}
							</Routes>
						</div>
					</>
				)}
			</ArtisankycContainer>
		</DashboardLayout>
	);
};

export default VerificationRoute;
