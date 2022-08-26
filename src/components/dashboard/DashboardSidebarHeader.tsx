import React from 'react';
import styled from 'styled-components';
import { HamburgerMenu } from 'src/components/ui/HamburgerMenu';
import clsx from 'clsx';
import logo from 'src/assets/images/header/logo.svg';

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
	}

	&:not(.showOnDesktop) {
		display: none;

		@media (max-width: ${(props) => props.theme.breakpoint.md}) {
			display: flex;
		}
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
			<img className='brand-logo' src={logo} alt='anyworks' />
			<HamburgerMenu isOpen={isOpen} onClick={toggleSidebar} />
		</DashboardSidebarHeaderContainer>
	);
};

export default DashboardSidebarHeader;
