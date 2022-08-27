import React from 'react';
import styled from 'styled-components';
import { HamburgerMenu } from 'src/components/ui/HamburgerMenu';
import clsx from 'clsx';
import logo from 'src/assets/images/header/logo.svg';
import avatar from 'src/assets/images/header/avatar.svg';
import { Link } from 'react-router-dom';

const DashboardSidebarHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 10px;
	width: 100%;
	height: 5rem;
	font-size: 18px;
	font-weight: 500;
	letter-spacing: 0.44px;
	color: ${(props) => props.theme.colors.text_06};
	padding: 8px 32px 8px 43px;
	background-color: ${(props) => props.theme.colors.white};

	.brand-logo {
		width: 112px;
	}

	@media (max-width: ${(props) => props.theme.breakpoint.md}) {
		width: 100%;
		height: 5rem;
		border-bottom: 1px solid #eaeaea;
		padding: 8px 32px;
	}

	&:not(.showOnDesktop) {
		display: none;

		@media (max-width: ${(props) => props.theme.breakpoint.md}) {
			display: flex;
		}
	}

	.showOnMobile {
		display: none;
		@media (max-width: ${(props) => props.theme.breakpoint.md}) {
			display: block;
		}
	}
	.tooltip__avatar {
		position: relative;
		display: inline-block;
		cursor: pointer;
	}

	.tooltip__avatar .tooltiptext {
		visibility: hidden;
		width: auto;
		min-width: 150px;
		color: ${(props) => props.theme.colors.text_01};
		background-color: ${(props) => props.theme.colors.white};
		text-align: center;
		border-radius: 6px;
		padding: 5px;
		font-size: 14px;
		position: absolute;
		z-index: 1;
		box-shadow: 0px 24px 48px -12px rgba(16, 24, 40, 0.18);
		left: -43px;
	}

	.tooltip__avatar:hover .tooltiptext {
		visibility: visible;
	}

	.tooltiptext__user--name {
		font-size: 15px;
		line-height: 24px;
		color: ${(props) => props.theme.colors.text_01};
		font-weight: 600;
	}

	.tooltiptext__user--role {
		color: ${(props) => props.theme.colors.black};
		font-size: 12px;
		font-weight: 400;
		line-height: 15px;
	}
`;

interface Props {
	isOpen: boolean;
	showOnDesktop?: boolean;
	toggleSidebar: Function;
}

export const DashboardSidebarHeader: React.FC<Props> = ({
	isOpen,
	toggleSidebar,
	showOnDesktop,
}) => {
	return (
		<DashboardSidebarHeaderContainer
			className={clsx('DashboardSidebarHeader', { showOnDesktop })}
		>
			<Link to='/dashboard'>
				<img className='brand-logo' src={logo} alt='anyworks' />
			</Link>
			<div className='tooltip__avatar'>
				<img className='showOnMobile' src={avatar} alt='avatar' />
				<div className='tooltiptext'>
					{' '}
					<p className='tooltiptext__user--name'>Olajide Olajide</p>
					<p className='tooltiptext__user--role'>HR Manager</p>
				</div>
			</div>
			<HamburgerMenu isOpen={isOpen} onClick={toggleSidebar} />
		</DashboardSidebarHeaderContainer>
	);
};

export default DashboardSidebarHeader;
