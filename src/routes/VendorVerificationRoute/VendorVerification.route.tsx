import { useState, useEffect } from 'react';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import {
	Link,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { Button, ButtonClass, Flex } from 'src/components/ui';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useLoading } from 'src/hooks';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from 'src/components/common';
import NinValidation from 'src/pages/kyc/NinValidation';
import DocumentUpload from 'src/pages/kyc/DocumentUpload';
import AddressVerification from 'src/pages/kyc/AddressVerification';
import Socials from 'src/pages/kyc/Socials';
import FaceRecognition from 'src/pages/kyc/FaceRecognition';
import VerificationService from 'src/service/VerifyService';
import VendorProfileInfo from '../../components/kyc/VendorProfileInfo';
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

const VendorVerificationRoute = () => {
	const location = useLocation();
	const { artisan_id } = useParams();
	const [vendorVerify, setVendorVerify] = useState<{ [key: string]: any }>({});
	const {
		loading: fetchingData,
		startLoading: startFetchingData,
		stopLoading: stopFetchingData,
	} = useLoading(false);
	const fetchingVendorVerificationData = (id: string) => {
		startFetchingData();
		VerificationService.getVendorVerification(id || '')
			.then((res) => {
				setVendorVerify(res?.data?.payload?.data || {});
				// console.log(res.data.payload?.data?.artisan);
			})
			.catch((err) => {
				toast.error(err.response.data.error.message);
			})
			.finally(() => {
				stopFetchingData();
			});
	};
	useEffect(() => {
		// console.log(artisan_id);
		fetchingVendorVerificationData(artisan_id || '');
	}, []);

	const tiersGroup = [
		{
			id: 1,
			title: 'Tier 1',
			content: 'Face Recognition',
			img: '/svgs/tier4.svg',
			href: 'face-recognition',
			verified: vendorVerify?.artisan?.verified?.face_capture,
			tier: vendorVerify?.user?.tier,
			pending: vendorVerify?.user?.meta?.pending_verification,
		},
		{
			id: 2,
			title: 'Tier 2',
			content: 'NIN validation ',
			img: '/svgs/tier1.svg',
			href: 'nin-validation',
			verified: vendorVerify?.artisan?.verified?.nin,
			tier: vendorVerify?.user?.tier,
			pending: vendorVerify?.user?.meta?.pending_verification,
		},
		{
			id: 3,
			title: 'Tier 3',
			content: 'Address Verification',
			img: '/svgs/tier3.svg',
			href: 'address-verification',
			verified: vendorVerify?.artisan?.verified?.address,
			tier: vendorVerify?.user?.tier,
			pending: vendorVerify?.user?.meta?.pending_verification,
		},
		{
			id: 4,
			title: 'Tier 4',
			content: 'Social Media Linking',
			img: '/svgs/tier5.svg',
			href: 'social-media-linking',
			verified: vendorVerify?.artisan?.verified?.social_media,
			tier: vendorVerify?.user?.tier,
			pending: vendorVerify?.user?.meta?.pending_verification,
		},
		{
			id: 5,
			title: 'Tier 5',
			content: 'Uploading professional Certificates',
			img: '/svgs/tier6.svg',
			href: 'certificate',
			verified: vendorVerify?.artisan?.verified?.certificate,
			tier: vendorVerify?.user?.tier,
			pending: vendorVerify?.user?.meta?.pending_verification,
		},
	];

	return (
		<DashboardLayout>
			<ToastContainer />

			<ArtisankycContainer>
				<Flex justify='space-between' align='center' className='pageHeader'>
					<h2>Vendor Verification</h2>
					<Link to='/verification/vendor'>
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
				{fetchingData ? (
					<div className='rounded-2xl mt-10 bg-white flex justify-center items-center h-80'>
						<ScaleLoader color='#7E00C4' height={50} width={8} />
					</div>
				) : (
					<>
						{' '}
						{/* <KycPersonalInfo
							artisanKyc={artisanKyc}
							fetchData={fetchingArtisanKycData}
						/> */}
						<VendorProfileInfo verifyData={vendorVerify} />
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
											who='artisan'
											id={artisan_id || ''}
											verifyData={vendorVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/document-upload'
									element={
										<DocumentUpload
											who='artisan'
											id={artisan_id || ''}
											verifyData={vendorVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/address-verification'
									element={
										<AddressVerification
											who='artisan'
											id={artisan_id || ''}
											verifyData={vendorVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/face-recognition'
									element={
										<FaceRecognition
											who='artisan'
											id={artisan_id || ''}
											verifyData={vendorVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/social-media-linking'
									element={
										<Socials
											who='artisan'
											id={artisan_id || ''}
											verifyData={vendorVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
								<Route
									path='/certificate'
									element={
										<Certificate
											who='artisan'
											id={artisan_id || ''}
											verifyData={vendorVerify}
											fetchData={fetchingVendorVerificationData}
										/>
									}
								/>
							</Routes>
						</div>
					</>
				)}
			</ArtisankycContainer>
		</DashboardLayout>
	);
};

export default VendorVerificationRoute;
