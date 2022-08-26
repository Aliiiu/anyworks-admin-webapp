import React from 'react'
import styled from 'styled-components'
import { DashboardSidebarHeader } from 'src/components/dashboard'
import { Flex, InitialsAvatar } from 'src/components/ui'
// import { URLS } from 'src/constants'
import notify from 'src/assets/images/header/notify.svg'

const DashboardHeaderContainer = styled.header`
  .DashboardSidebar__header {
    width: 100%;
    height: 6rem;
    padding: 0.5rem 1.5rem;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.white};
    display: flex;
    justify-content: flex-end;

    .DashboardHeader__user {
      display: block;
      max-width: 15rem;
      border-radius: 3px;
      background-color: ${(props) => props.theme.colors.white};
    }

    .DashboardHeader__user-role-wrapper {
      max-width: 8rem;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 2px;
      text-align: left;
    }

    .notify {
      position: relative;

      .notify--indicate {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        right: -1px;
        border: 2px solid ${(props) => props.theme.colors.white};
        background-color: ${(props) => props.theme.colors.purple};
        position: absolute;
      }
    }

    .DashboardHeader__user--text {
      width: 100%;
      font-size: 16px;
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
      line-height: 20px;
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
        <Flex justify="flex-end" align="center" gap="30px">
          <div className="notify">
            <img src={notify} alt="notify" />
            <span className="notify--indicate"></span>
          </div>
          <div className="DashboardHeader__user">
            <Flex align="center" gap="10px">
              <Flex justify="flex-end" gap="10px" align="center">
                <InitialsAvatar name="Olajide Olajide" />
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
        </Flex>
      </div>
    </DashboardHeaderContainer>
  )
}

export default DashboardHeader
