import { useState, useEffect } from 'react'
import arrowLeft from 'src/assets/images/common/arrowLeft.svg'
import { theme } from 'src/styles/Theme'
import { Link } from 'react-router-dom'
import { Button, ButtonClass } from 'src/components/ui'
import { DashboardLayout } from 'src/components/dashboard'
import styled from 'styled-components'
import KycPersonalInfo from '../../components/kyc/KycPersonalInfo'
import KycProfileInfo from '../../components/kyc/KycProfileInfo'
import KycModal from 'src/components/kyc/kycModals/KycModal'
import RejectionModal from 'src/components/kyc/kycModals/RejectionModal'
import { useParams } from 'react-router-dom'
import { useLoading } from 'src/hooks'
import KycData from 'src/service/KycData'
import { toast, ToastContainer } from 'react-toastify'

const ArtisankycContainer = styled.div`
  .pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 36px;
      font-weight: 700;
      color: ${(props) => props.theme.colors.text_01};
    }
  }
  .action_btn_wrapper {
    display: flex;
    gap: 20px;
    margin-top: 24px;
    .action_btn {
      border-radius: 8px;
      padding: 12px 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 136px;
      cursor: pointer;
    }
  }
`
const ArtisanKyc = () => {
  const [open, setOpen] = useState(false)
  const [openReject, setOpenReject] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleRejectOpen = () => setOpenReject(true)
  const handleClose = () => setOpen(false)
  const handleRejectClose = () => setOpenReject(false)
  const { artisan_id } = useParams()

  const [artisanKyc, setArtisanKyc] = useState<{ [key: string]: any }>({})
  const [rejectionReason, setRejectionReason] = useState('')

  const {
    loading: fetchingArtisanKyc,
    startLoading: startFetchingArtisanKyc,
    stopLoading: stopFetchingArtisanKyc,
  } = useLoading(false)

  useEffect(() => {
    startFetchingArtisanKyc()
    KycData.getOneKyc(artisan_id || '631dcc4b937e99baa819bf9a')
      .then((res) => {
        setArtisanKyc(res?.data?.payload?.data || [])
      })
      .catch((err) => {
        toast.error(err.response.data.error.message)
      })
      .finally(() => stopFetchingArtisanKyc())
  }, [])

  const handleApproveRejectKyc = (action: string) => {
    KycData.approveRejectKyc({ reason: rejectionReason }, '631dcc4b937e99baa819bf9a', action)
      .then((res) => {
        if (action === 'accept') return handleOpen()
        toast.success(res?.data?.message || [])
      })
      .catch((err) => {
        toast.error(err.response.data.error.message)
      })
      .finally(() => stopFetchingArtisanKyc())
  }

  const handleAcceptKyc = () => {
    handleApproveRejectKyc('accept')
  }
  const handleRejectKyc = () => {
    handleApproveRejectKyc('reject')
    handleRejectClose()
  }

  return (
    <DashboardLayout>
      <ToastContainer />

      <ArtisankycContainer>
        <div className="pageHeader">
          <h2>Artisan KYC</h2>
          <Link to="/kyc">
            <Button
              classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
              style={{ backgroundColor: theme.colors.purple }}
            >
              {' '}
              <img src={arrowLeft} alt="back" />
              <span>Back to KYC</span>
            </Button>
          </Link>
        </div>
        <KycPersonalInfo artisanKyc={artisanKyc} />
        <KycProfileInfo artisanKyc={artisanKyc} />
        <div className="action_btn_wrapper">
          <button
            style={{ color: '#FFF', background: '#7E00C4' }}
            className="action_btn"
            onClick={handleAcceptKyc}
          >
            Accept
          </button>
          <button
            onClick={handleRejectOpen}
            style={{ color: '#7E00C4', background: 'rgba(126, 0, 196, 0.2)' }}
            className="action_btn"
          >
            Reject
          </button>
          <KycModal open={open} handleClose={handleClose} />
          <RejectionModal
            open={openReject}
            handleRejectKyc={handleRejectKyc}
            handleClose={handleRejectClose}
            rejectionReason={rejectionReason}
            setRejectionReason={setRejectionReason}
          />
        </div>
      </ArtisankycContainer>
    </DashboardLayout>
  )
}

export default ArtisanKyc
