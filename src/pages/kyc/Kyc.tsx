import { DashboardLayout } from 'src/components/dashboard'
import React, { useState, useEffect } from 'react'
import { KycTable } from 'src/components/kyc/KycTable'
import { Input } from 'src/components/inputs'
import searchIcon from 'src/assets/images/input/searchIcon.svg'
import { useLoading } from 'src/hooks'
import KycData from 'src/service/KycData'
import { toast, ToastContainer } from 'react-toastify'
import { Loader } from 'src/components/common'

interface Props {
  handleChange: (e: any) => void
}

export const RhsHeading: React.FC<Props> = ({ handleChange }) => (
  <Input
    icon={<img src={searchIcon} alt="searchIcon" />}
    type="search"
    placeholder="Search"
    handleChange={handleChange}
  />
)

const KYCDataGrid = () => {
  const [searchField, setSearchField] = useState('')
  const [kycData, setKycData] = useState<any[]>([])

  const filteredData = kycData.filter((data) => {
    return (
      (data?.name && data?.name?.toLowerCase().includes(searchField.toLowerCase())) ||
      (data?.meansOfId && data?.meansOfId?.toLowerCase().includes(searchField.toLowerCase()))
    )
  })

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }

  const {
    loading: fetchingKycData,
    startLoading: startFetchingKycData,
    stopLoading: stopFetchingKycData,
  } = useLoading(false)

  useEffect(() => {
    startFetchingKycData()
    KycData.getAllKyc()
      .then((res) => {
        setKycData(res?.data?.payload?.data || [])
      })
      .catch((err) => {
        toast.error(err.response.data.error.message)
      })
      .finally(() => stopFetchingKycData())
  }, [])

  return (
    <DashboardLayout pageTitle="KYC" rhsHeading={<RhsHeading handleChange={handleChange} />}>
      <>
        <ToastContainer />
        {fetchingKycData ? (
          <div>
            <Loader>loading...</Loader>{' '}
          </div>
        ) : (
          <KycTable rows={filteredData} />
        )}
      </>
    </DashboardLayout>
  )
}

export default KYCDataGrid
