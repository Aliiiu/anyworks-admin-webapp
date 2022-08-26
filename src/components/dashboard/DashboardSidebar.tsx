import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DASHBOARD_SIDEBAR_DATA } from 'src/constants';
import { DashboardSidebarHeader } from 'src/components/dashboard';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

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
		}
	}

	.DashboardSidebar__nav {
		position: relative;
		transition: all 0.5s ease-out;
		overflow-y: auto;
		height: calc(100vh - 5.5rem);
		margin-top: 3rem;

		/* custom scrollbar-color */
		& ::-webkit-scrollbar {
			width: 4px;
		}
		& ::-webkit-scrollbar-track {
			background-color: #f5f5f5;
		}
		& ::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background-color: ${(props) => props.theme.colors.primaryColor};
		}

		ul {
			margin: 0;
			padding: 0;

			li {
				list-style: none;

				& summary,
				& > .DashboardSidebar__nav__link {
					display: flex;
					gap: 1rem;
					/* width: calc(100% - 32px); */
					/* margin: 0.5rem auto; */
					height: 4rem;
					align-items: center;
					padding: 8px 16px 8px 37px;
					transition: background-color 0.5s ease-out;
					color: ${(props) => props.theme.colors.text_04};
					border-left: 7px solid ${(props) => props.theme.colors.white};

					&:focus,
					&:hover {
						background-color: ${(props) => props.theme.colors.ui_04};
						border-left: 7px solid ${(props) => props.theme.colors.ui_04};
					}

					i {
						width: 20px;
						height: 20px;
						background-position: center;
						background-repeat: no-repeat;
						background-size: contain;
					}

					span {
						font-weight: 500;
						font-size: 20px;
						line-height: 30px;
						letter-spacing: 0.44px;
					}
				}

				&.isActiveNav {
					& summary,
					& > .DashboardSidebar__nav__link {
						border-left: 7px solid ${(props) => props.theme.colors.purple};
						color: ${(props) => props.theme.colors.purple};
						i {
							filter: brightness(0) saturate(100%) invert(0%) sepia(1%)
								saturate(7473%) hue-rotate(355deg) brightness(98%) contrast(99%);
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
							background-color: ${(props) => props.theme.colors.ui_04};
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
`;
interface Props {
	isOpen: boolean;
	toggleSidebar: Function;
}

export const DashboardSidebar: React.FC<Props> = ({
	isOpen,
	toggleSidebar,
}) => {
	const location = useLocation();

	const mapSidebarNav = (nav: any, index: any) => {
		const { sublinks = [] } = nav || {};
		const isActiveNav =
			index === 0
				? location.pathname === nav.url
				: location.pathname.includes(nav.url);
		console.log(`sublinks ${nav.text}`);

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
								const isActiveSubNav = location.pathname === subnav.url;
								return (
									<li key={subnav.text} className={clsx({ isActiveSubNav })}>
										<Link
											to={subnav.url}
											className='DashboardSidebar__subnav__link'
										>
											{subnav.text}
										</Link>
									</li>
								);
							})}
						</ul>
					</details>
				</li>
			);
		}

		return (
			<li
				key={nav.text}
				className={clsx({ isActiveNav })}
				onClick={nav.onClick}
			>
				<Link to={nav.url} className='DashboardSidebar__nav__link'>
					<i
						style={{
							backgroundImage: `url(${nav.icon})`,
						}}
					/>
					<span>{nav.text}</span>
				</Link>
			</li>
		);
	};

	return (
		<DashboardSidebarContainer className={clsx({ isOpen })}>
			<DashboardSidebarHeader
				isOpen={isOpen}
				toggleSidebar={toggleSidebar}
				showOnDesktop
			/>

			<nav className='DashboardSidebar__nav'>
				<ul>{DASHBOARD_SIDEBAR_DATA().map(mapSidebarNav)}</ul>
			</nav>
		</DashboardSidebarContainer>
	);
};

export default DashboardSidebar;
