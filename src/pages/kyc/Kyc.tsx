import { DashboardLayout } from 'src/components/dashboard'
import React, { useState } from 'react'
import { kycData } from 'src/constants/KYCDATA'
import { KycTable } from 'src/components/kyc/KycTable'
import { Input } from 'src/components/inputs'
import searchIcon from 'src/assets/images/input/searchIcon.svg'

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

  const filteredData = kycData.filter((data) => {
    return (
      data.name.toLowerCase().includes(searchField.toLowerCase()) ||
      data.meansOfId.toLowerCase().includes(searchField.toLowerCase())
    )
  })

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }

  return (
    <DashboardLayout pageTitle="KYC" rhsHeading={<RhsHeading handleChange={handleChange} />}>
      <>
        <KycTable rows={filteredData} />
      </>
    </DashboardLayout>
  )
}

export default KYCDataGrid
