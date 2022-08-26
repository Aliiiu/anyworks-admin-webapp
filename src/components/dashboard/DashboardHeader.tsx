import React from 'react'
import styled from 'styled-components'
import { DashboardSidebarHeader } from 'src/components/dashboard'
import { Flex, Button, ButtonClass } from 'src/components/ui'
// import { URLS } from 'src/constants'
import avatar from 'src/assets/images/header/avatar.svg'
import logout from 'src/assets/images/header/logout.svg'

const DashboardHeaderContainer = styled.header`
  .DashboardSidebar__header {
    width: 100%;
    height: 5.5rem;
    padding: 0.5rem 2.5rem;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    justify-content: flex-end;

    .DashboardHeader__user {
      display: block;
      max-width: 15rem;
      border-radius: 3px;
      background-color: ${(props) => props.theme.colors.white};
      img.avatar {
        width: 41px;
      }
    }

    .DashboardHeader__user-role-wrapper {
      max-width: 8rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      text-align: left;
    }

    .DashboardHeader__user--text {
      width: 100%;
      font-size: 15px;
      line-height: 24px;
      color: ${(props) => props.theme.colors.text_01};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 600;
    }

    .DashboardHeader__user--role {
      color: ${(props) => props.theme.colors.black};
      font-size: 12px;
      font-weight: 400;
      line-height: 15px;
    }

    @media (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: none;

      .DashboardHeader__content {
        margin-left: 0;
        padding: 30px;
        width: 100%;
      }
    }
  }
`

interface Props {
  isOpen: boolean
  toggleSidebar: Function
}

export const DashboardHeader: React.FC<Props> = ({ isOpen, toggleSidebar }) => {
  return (
    <DashboardHeaderContainer>
      <DashboardSidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} showOnDesktop={false} />

      <div className="DashboardSidebar__header">
        <Flex justify="flex-end" align="center" gap="40px">
          <div className="DashboardHeader__user">
            <Flex align="center" gap="10px">
              <Flex justify="flex-end" gap="10px" align="center">
                <img className="avatar" src={avatar} alt="dp" />
                <div className="DashboardHeader__user-role-wrapper">
                  <p className="DashboardHeader__user--text DashboardHeader__user--name">
                    Olajide Olajide
                  </p>
                  <p className="DashboardHeader__user--text DashboardHeader__user--role">
                    HR Manager
                  </p>
                </div>
              </Flex>
            </Flex>
          </div>

          <Button classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}>
            {' '}
            <img className="logout" src={logout} alt="logout" />
            <span>Log Out</span>
          </Button>
        </Flex>
      </div>
    </DashboardHeaderContainer>
  )
}

export default DashboardHeader
