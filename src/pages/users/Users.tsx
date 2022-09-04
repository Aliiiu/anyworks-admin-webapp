import React, { useState } from 'react'
import styled from 'styled-components'
import { DashboardLayout } from 'src/components/dashboard'
import { UsersTable } from 'src/components/users'
import { Input } from 'src/components/inputs'
import { USERS_TABLE_DATA } from 'src/constants'
import searchIcon from 'src/assets/images/input/searchIcon.svg'
const UsersContainer = styled.div``

interface Props {
  handleChange: (e: any) => void
}

export const RhsHeading : React.FC<Props> =  ({handleChange}) => (
  <Input
  icon={<img src={searchIcon} alt='searchIcon'/>}
  type="search"
  placeholder="Search"
  handleChange={handleChange}
/>
)

const Users = () => {
  const [searchField, setSearchField] = useState('')

  const filteredData = USERS_TABLE_DATA().filter((data) => {
    return (
      data.name.toLowerCase().includes(searchField.toLowerCase()) ||
      data.email.toLowerCase().includes(searchField.toLowerCase())
    )
  })

  const handleChange = (e: any) => {
    setSearchField(e.target.value)
  }

  return (
    <DashboardLayout pageTitle="Users" rhsHeading={<RhsHeading handleChange={handleChange}/>}>
      <UsersContainer>
        <UsersTable rows={filteredData} />
      </UsersContainer>
    </DashboardLayout>
  )
}

export default Users
