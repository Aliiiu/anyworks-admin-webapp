import styled from 'styled-components'
import { DashboardLayout } from 'src/components/dashboard'
import { Profile } from 'src/components/users'
import { Flex, Button, ButtonClass } from 'src/components/ui'
import arrowRight from 'src/assets/images/common/arrowRight.svg'
import { theme } from 'src/styles/Theme'
import { Link } from 'react-router-dom'

const UserProfileContainer = styled.div``

export const RhsHeading = () => (
  <Flex wrap='wrap'>
    <Link to="/users">
      <Button
        classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
        style={{ backgroundColor: theme.colors.purple }}
      >
        {' '}
        <img src={arrowRight} alt="back" />
        <span>Back to Users</span>
      </Button>
    </Link>
  </Flex>
)

const UserProfile = () => (
  <DashboardLayout pageTitle="Olajide Olajide’s Profile" rhsHeading={<RhsHeading />}>
    <UserProfileContainer>
      <Profile />
    </UserProfileContainer>
  </DashboardLayout>
)

export default UserProfile
