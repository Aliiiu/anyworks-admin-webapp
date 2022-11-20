import React, { useEffect } from 'react';
import styled from 'styled-components';
import { DashboardHeader, DashboardSidebar } from 'src/components/dashboard';
import { auth, setAuthUser } from 'src/store/Auth';
import { dashboard, toggleSidebar, closeSidebar } from 'src/store/dashboard';
import { Loader, LoadingOverlay } from 'src/components/common';
import { Flex } from 'src/components/ui';
import { useLocation } from 'react-router-dom';
import { useLoading } from 'src/hooks';
import AdminProfile from 'src/service/AdminProfile';

const DashboardLayoutElement = styled.div`
	width: 100%;
	min-height: 100vh;

	.DashboardLayout__wrapper {
		width: 100%;
		padding-left: 15rem;

		@media (max-width: ${(props) => props.theme.breakpoint.md}) {
			padding-left: 0;
		}
	}

	.DashboardLayout__content-wrapper {
		display: flex;
		flex-direction: column;
		padding: 2rem 2.5rem;
		@media (max-width: ${(props) => props.theme.breakpoint.md}) {
			padding: 2rem;
		}
	}

	.DashboardLayout__pageHeading {
		.DashboardLayout__pageHeading--title {
			font-weight: 600;
			font-size: 27px;
			line-height: 40px;
			color: ${(props) => props.theme.colors.black};
		}
	}

	.modal--info {
		font-size: 16px;
		line-height: 22px;
		color: ${(props) => props.theme.colors.black};
	}

	.modal--upper {
		padding: 0 32px 32px 32px;
	}

	.modal-lower {
		border-radius: 10px;
		border-top-left-radius: 0;
		border-top-right-radius: 0;
		padding: 32px;
		background-color: ${(props) => props.theme.colors.offWhite};
		border-top: 1px solid ${(props) => props.theme.colors.dividerColor};
	}
	.table-entry-status {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100px;
		font-weight: 700;
		font-size: 24px;
		font-style: italic;
	}
`;

interface Props {
	children: any;
	rhsHeading?: any;
	showPageTitle?: boolean;
	pageTitle?: string;
}

export const DashboardLayout: React.FC<Props> = ({
	pageTitle,
	showPageTitle = true,
	children,
	rhsHeading,
}) => {
	const { sidebarIsOpen } = dashboard.use();
	const location = useLocation();
	useEffect(() => closeSidebar(), [location]);

	const { authUser } = auth.use();

	const {
		loading: fetchingAuthUser,
		startLoading: startFetchingAuthUser,
		stopLoading: stopFetchingAuthUser,
	} = useLoading(false);

	const noLoggedInUserRole = !authUser?.role;

	const fetchLoggedInUser = () => {
		startFetchingAuthUser();
		AdminProfile.getMe()
			.then((res) => {
				return setAuthUser(res?.data?.payload?.data || {});
			})
			.catch((err) => {
				console.log(err.response.data.error.message);
			})
			.finally(() => stopFetchingAuthUser());
	};

	useEffect(() => {
		noLoggedInUserRole && fetchLoggedInUser();
	}, []);

	if (fetchingAuthUser) {
		return (
			<LoadingOverlay>
				<div>
					<Loader>loading...</Loader>{' '}
				</div>
			</LoadingOverlay>
		);
	}

	return (
		<DashboardLayoutElement>
			<DashboardSidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar} />
			<div className='DashboardLayout__wrapper'>
				<DashboardHeader isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar} />

				<div className='DashboardLayout__content-wrapper'>
					{showPageTitle && (
						<div className='DashboardLayout__pageHeading'>
							{showPageTitle && (
								<Flex justify='space-between' align='center' wrap='wrap'>
									<h2 className='DashboardLayout__pageHeading--title'>
										{pageTitle}
									</h2>
									<>{rhsHeading}</>
								</Flex>
							)}
						</div>
					)}

					<main className='DashboardLayout__content'>{children}</main>
				</div>
			</div>
		</DashboardLayoutElement>
	);
};

export default DashboardLayout;
