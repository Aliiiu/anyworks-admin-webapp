import { useState, useEffect } from 'react';
import arrowLeft from 'src/assets/images/common/arrowLeft.svg';
import { theme } from 'src/styles/Theme';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonClass, Flex } from 'src/components/ui';
import { DashboardLayout } from 'src/components/dashboard';
import styled from 'styled-components';
import KycPersonalInfo from '../../components/kyc/KycPersonalInfo';
import KycProfileInfo from '../../components/kyc/KycProfileInfo';
import KycApprovedModal from 'src/components/kyc/kycModals/KycApprovedModal';
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal';
import ConfirmApproveKycModal from 'src/components/kyc/kycModals/ConfirmApproveKycModal';
import { useParams } from 'react-router-dom';
import { useLoading } from 'src/hooks';
import KycData from 'src/service/KycData';
import { toast, ToastContainer } from 'react-toastify';
import { Loader } from 'src/components/common';

const ArtisankycContainer = styled.div`
	.pageHeader {
		h2 {
			font-weight: 600;
			font-size: 27px;
			color: ${(props) => props.theme.colors.text_01};
		}
	}
`;
const ArtisanKyc = () => {
	const [open, setOpen] = useState(false);
	const [openReject, setOpenReject] = useState(false);
	const [openConfirmApproveKycModal, setOpenConfirmApproveKycModal] =
		useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const handleRejectOpen = () => setOpenReject(true);
	const handleRejectClose = () => setOpenReject(false);
	const handleConfirmApproveKycModalClose = () =>
		setOpenConfirmApproveKycModal(false);
	const handleConfirmApproveKycModalOpen = () =>
		setOpenConfirmApproveKycModal(true);

	const { artisan_id } = useParams();

	const [artisanKyc, setArtisanKyc] = useState<{ [key: string]: any }>({});
	const [rejectionReason, setRejectionReason] = useState('');

	const {
		loading: fetchingArtisanKyc,
		startLoading: startFetchingArtisanKyc,
		stopLoading: stopFetchingArtisanKyc,
	} = useLoading(false);
	const fetchingArtisanKycData = () => {
		startFetchingArtisanKyc();
		KycData.getOnePendingKyc(artisan_id || '')
			.then((res) => {
				setArtisanKyc(res?.data?.payload?.data || []);
				console.log(res.data.payload.data);
			})
			.catch((err) => {
				toast.error(err.response.data.error.message);
			})
			.finally(() => {
				stopFetchingArtisanKyc();
			});
	};
	useEffect(() => {
		fetchingArtisanKycData();
	}, []);

	const {
		loading: approvingKyc,
		startLoading: startApprovingKyc,
		stopLoading: stopApprovingKyc,
	} = useLoading(false);
	let navigate = useNavigate();
	const handleApproveKyc = () => {
		startApprovingKyc();
		artisan_id &&
			KycData.approveRejectKyc({ reason: '' }, artisan_id, 'approve')
				.then((res) => {
					console.log(res.data);
					handleConfirmApproveKycModalClose();
					setTimeout(() => handleOpen(), 1000);
				})
				.catch((err) => {
					toast.error(err.response.data.error.message);
				})
				.finally(() => {
					stopApprovingKyc();
					navigate('/artisans');
				});
	};

	const {
		loading: rejectingKyc,
		startLoading: startRejectingKyc,
		stopLoading: stopRejectingKyc,
	} = useLoading(false);

	const handleRejectKyc = () => {
		startRejectingKyc();
		artisan_id &&
			KycData.approveRejectKyc(
				{ reason: rejectionReason },
				artisan_id,
				'reject'
			)
				.then((res) => {
					console.log(res.data);
					toast.success(res?.data?.message || []);
					handleRejectClose();
				})
				.catch((err) => {
					toast.error(err.response.data.error.message);
				})
				.finally(() => {
					stopRejectingKyc();
					navigate('/kyc');
				});
	};

	return (
		<DashboardLayout>
			<ToastContainer />

			<ArtisankycContainer>
				<Flex justify='space-between' align='center' className='pageHeader'>
					<h2>Vendor KYC</h2>
					<Link to='/kyc'>
						<Button
							classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
							style={{ backgroundColor: theme.colors.purple }}
						>
							{' '}
							<img src={arrowLeft} alt='back' />
							<span>Back to KYC</span>
						</Button>
					</Link>
				</Flex>
				{fetchingArtisanKyc ? (
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: '100px',
						}}
					>
						<Loader>loading...</Loader>{' '}
					</div>
				) : (
					<>
						{' '}
						<KycPersonalInfo
							artisanKyc={artisanKyc}
							fetchData={fetchingArtisanKycData}
						/>
						<KycProfileInfo artisanKyc={artisanKyc} />
						<br />
						<Flex>
							<div>
								<Button
									onClick={handleConfirmApproveKycModalOpen}
									classes={[ButtonClass.SOLID]}
									style={{
										backgroundColor: theme.colors.purple,
										height: '37px',
										width: '136px',
										fontWeight: '300',
										justifyContent: 'center',
									}}
								>
									Accept
								</Button>
							</div>
							<div>
								<Button
									onClick={handleRejectOpen}
									classes={[ButtonClass.SOLID]}
									style={{
										color: theme.colors.purple,
										backgroundColor: 'rgba(126, 0, 196, 0.2)',
										height: '37px',
										width: '136px',
										fontWeight: '300',
										justifyContent: 'center',
									}}
								>
									Reject
								</Button>
							</div>
						</Flex>
					</>
				)}

				<KycApprovedModal
					open={open}
					handleClose={handleClose}
					artisanName={`${artisanKyc?.artisan?.first_name} ${artisanKyc?.artisan?.last_name}`}
				/>
				<RejectionModal
					open={openReject}
					handleRejectKyc={handleRejectKyc}
					handleClose={handleRejectClose}
					rejectionReason={rejectionReason}
					setRejectionReason={setRejectionReason}
					rejectingKyc={rejectingKyc}
				/>
				<ConfirmApproveKycModal
					open={openConfirmApproveKycModal}
					handleApproveKyc={handleApproveKyc}
					handleClose={handleConfirmApproveKycModalClose}
					artisanName={`${artisanKyc?.artisan?.first_name} ${artisanKyc?.artisan?.last_name}`}
					approvingKyc={approvingKyc}
				/>
			</ArtisankycContainer>
		</DashboardLayout>
	);
};

export default ArtisanKyc;
