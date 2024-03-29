import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DASHBOARD_SIDEBAR_DATA } from 'src/constants';
import { DashboardSidebarHeader } from 'src/components/dashboard';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom';
import { Button, ButtonClass } from 'src/components/ui';
import logoutIcon from 'src/assets/images/header/logout.svg';
import { useNavigate } from 'react-router';
import { logout } from 'src/utils/AuthUtils';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { Disclosure } from '@headlessui/react';
import { MdKeyboardArrowRight } from 'react-icons/md';

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
	@media (max-width: ${(props) => props.theme.breakpoint.xl}) {
		-ms-overflow-style: none;
		scrollbar-width: none;
		overflow-y: scroll;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	.DashboardSidebar__nav {
		position: relative;
		transition: all 0.5s ease-out;
		overflow-y: auto;
		height: calc(100vh - 5.5rem);
		margin-top: 2rem;

		/* custom scrollbar-color */
		&::-webkit-scrollbar {
			width: 4px;
		}
		&::-webkit-scrollbar-track {
			background-color: #f5f5f5;
		}
		&::-webkit-scrollbar-thumb {
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
						background-position: center;
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
					}
				}

				& > details {
					margin: 0;
					padding: 0;

					summary {
						list-style: none;
						cursor: pointer;
						.arrow-icon {
							width: 5px;
							height: 5px;
							background-color: purple;
						}
					}

					li {
						.DashboardSidebar__subnav__link {
							display: flex;
							gap: 16px;
							width: 100%;
							height: 2rem;
							align-items: center;
							margin-left: 20px;
							padding: 8px 8px 8px 70px;
							font-weight: 500;
							font-size: 15px;
							line-height: 30px;
							letter-spacing: 0.44px;
							transition: all 0.5s ease-out;
							border-left: 7px solid ${(props) => props.theme.colors.white};
							color: ${(props) => props.theme.colors.text_04};
							.sublink_nav {
								width: 15px;
								height: 15px;
								border-radius: 50%;
								border: 1px solid #828282;
							}
						}

						&:hover {
							background-color: ${(props) => props.theme.colors.ui_01};
						}

						&.isActiveSubNav {
							.DashboardSidebar__subnav__link {
								color: ${(props) => props.theme.colors.black};
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
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);

	const mapSidebarNav = (nav: any, index: any) => {
		const { sublinks = [] } = nav || {};
		const isActiveNav =
			index === 0
				? location.pathname === nav.url
				: location.pathname.includes(nav.url);

		if (sublinks.length) {
			return (
				<Disclosure key={nav.text}>
					{({ open }) => (
						<>
							<Disclosure.Button
								className={`flex w-full gap-4 items-center pr-4 pl-[37px] py-2 font-medium text-[#B3B3B3] h-[3.5rem] border-l-white border-l-[7px] focus:outline-none ${
									isActiveNav ? 'bg-[#F2F4F7]' : 'bg-white'
								}`}
							>
								<i
									style={{
										backgroundImage: `url(${open ? nav.activeIcon : nav.icon})`,
									}}
									className='w-[31px] h-[31px] bg-center bg-no-repeat'
								/>
								<span className='text-[17px] font-medium'>{nav.text}</span>
								<MdKeyboardArrowRight
									className={`${
										open ? 'rotate-90 transform' : ''
									} h-5 w-5 text-[#b3b3b3]`}
								/>
							</Disclosure.Button>
							<Disclosure.Panel className='pr-4 pl-[37px] py-4 text-gray-500'>
								<ul className='flex flex-col gap-2'>
									{sublinks.map((subnav: any) => {
										const isActiveSubNav = location.pathname === subnav.url;
										return (
											<li
												key={subnav.text}
												className={clsx({ isActiveSubNav })}
											>
												<Link
													to={subnav.url}
													className='flex gap-4 items-center border-l-white border-l-[7px]'
												>
													<div
														style={{
															background: `${
																isActiveSubNav ? '#7E00C4' : 'transparent'
															}`,
														}}
														className='w-[24px] h-[24px] border border-[#B3B3B3] rounded-full'
													></div>
													<span
														className={`text-[17px] font-medium ${
															isActiveSubNav ? 'text-[#7E00C4]' : ''
														}`}
													>
														{subnav.text}
													</span>
												</Link>
											</li>
										);
									})}
								</ul>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
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
							backgroundImage: `url(${
								isActiveNav ? nav.activeIcon : nav.icon
							})`,
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
			<nav className='DashboardSidebar__nav pb-20'>
				<ul>{DASHBOARD_SIDEBAR_DATA().map(mapSidebarNav)}</ul>
				<div className='logout__btn'>
					<Button
						classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
						onClick={() => {
							logout(() => navigate('/'));
						}}
					>
						{' '}
						<img className='logout' src={logoutIcon} alt='logout' />
						<span>Log Out</span>
					</Button>
				</div>
			</nav>
		</DashboardSidebarContainer>
	);
};

export default DashboardSidebar;
