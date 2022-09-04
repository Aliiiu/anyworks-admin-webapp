import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { DASHBOARD_SIDEBAR_DATA } from 'src/constants'
import { DashboardSidebarHeader } from 'src/components/dashboard'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import { Button, ButtonClass } from 'src/components/ui'
import logout from 'src/assets/images/header/logout.svg'

const DashboardSidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: all 0.3s ease-in;
  width: 100%;
  max-width: 15rem;
  height: 100vh;
  background: ${(props) => props.theme.colors.white};
  z-index: 2;

  @media (max-width: ${(props) => props.theme.breakpoint.md}) {
    display: none;
    max-width: 100%;
    box-shadow: none;

    &.isOpen {
      display: initial;

      .DashboardSidebar__nav {
        margin-top: 0;
      }
    }
  }

  .DashboardSidebar__nav {
    position: relative;
    transition: all 0.5s ease-out;
    overflow-y: auto;
    height: calc(100vh - 5.5rem);
    margin-top: 2rem;

    /* custom scrollbar-color */
    & ::-webkit-scrollbar {
      width: 4px;
    }
    & ::-webkit-scrollbar-track {
      background-color: #f5f5f5;
    }
    & ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: ${(props) => props.theme.colors.purple};
    }

    ul {
      margin: 0;
      padding: 0;

      li {
        list-style: none;
        margin-bottom: 10px;

        &:last-child {
          margin-bottom: 0;
					}

        & summary,
        & > .DashboardSidebar__nav__link {
          display: flex;
          gap: 1rem;
          height: 3.5rem;
          align-items: center;
          padding: 8px 16px 8px 37px;
          transition: background-color 0.5s ease-out;
          color: ${(props) => props.theme.colors.text_04};
          border-left: 7px solid ${(props) => props.theme.colors.white};
          @media (max-width: ${(props) => props.theme.breakpoint.md}) {
            padding-left: 24px;
          }

          &:focus,
          &:hover {
            background-color: ${(props) => props.theme.colors.ui_01};
            border-left: 7px solid ${(props) => props.theme.colors.ui_01};
          }

          i {
            width: 31px;
            height: 34px;
            background-position: -6px -5px;
            background-repeat: no-repeat;
          }

          span {
            font-weight: 500;
            font-size: 17px;
            line-height: 30px;
            letter-spacing: 0.44px;
          }
        }

        &.isActiveNav {
          & summary,
          & > .DashboardSidebar__nav__link {
            border-left: 7px solid ${(props) => props.theme.colors.purple};
            color: ${(props) => props.theme.colors.black};
            i {
              background-position: -50px -5px;
            }
          }
        }

        & > details {
          margin: 0;
          padding: 0;

          summary {
            list-style: none;
            cursor: pointer;
          }

          li {
            .DashboardSidebar__subnav__link {
              display: flex;
              gap: 16px;
              width: 100%;
              height: 2rem;
              align-items: center;
              padding: 8px 8px 8px 70px;
              font-size: small;
              transition: all 0.5s ease-out;
              color: ${(props) => props.theme.colors.text_05};
            }

            &:hover {
              background-color: ${(props) => props.theme.colors.ui_01};
            }

            &.isActiveSubNav {
              .DashboardSidebar__subnav__link {
                color: ${(props) => props.theme.colors.primaryColor};
                font-weight: bold;
              }
            }
          }

          &[open] {
            ul {
              border-bottom: 1px solid #eaeaea;
            }
          }
        }
      }
    }

    @media (max-width: ${(props) => props.theme.breakpoint.md}) {
      height: calc(100vh - 5rem);
    }
  }

  .logout__btn {
    display: none;
    @media (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: block;
      padding: 16px 16px 0 37px;
    }
  }
`

interface Props {
  isOpen: boolean
  toggleSidebar: Function
}

export const DashboardSidebar: React.FC<Props> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation()

  const mapSidebarNav = (nav: any, index: any) => {
    const { sublinks = [] } = nav || {}
    const isActiveNav =
      index === 0 ? location.pathname === nav.url : location.pathname.includes(nav.url)

    if (sublinks.length) {
      return (
        <li key={nav.text} className={clsx({ isActiveNav })}>
          <details>
            <summary>
              <i style={{ backgroundImage: `url(${nav.icon})` }} />
              <span>{nav.text}</span>
            </summary>

            <ul>
              {sublinks.map((subnav: any) => {
                const isActiveSubNav = location.pathname === subnav.url
                return (
                  <li key={subnav.text} className={clsx({ isActiveSubNav })}>
                    <Link to={subnav.url} className="DashboardSidebar__subnav__link">
                      {subnav.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </details>
        </li>
      )
    }

    return (
      <li key={nav.text} className={clsx({ isActiveNav })} onClick={nav.onClick}>
        <Link to={nav.url} className="DashboardSidebar__nav__link">
          <i style={{ backgroundImage: `url(${nav.icon})` }} />
          <span>{nav.text}</span>
        </Link>
      </li>
    )
  }

  return (
    <DashboardSidebarContainer className={clsx({ isOpen })}>
      <DashboardSidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} showOnDesktop />

      <nav className="DashboardSidebar__nav">
        <ul>{DASHBOARD_SIDEBAR_DATA().map(mapSidebarNav)}</ul>
        <div className="logout__btn">
          <Button classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}>
            {' '}
            <img className="logout" src={logout} alt="logout" />
            <span>Log Out</span>
          </Button>
        </div>
      </nav>
    </DashboardSidebarContainer>
  )
}

export default DashboardSidebar
