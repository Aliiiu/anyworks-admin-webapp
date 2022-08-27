import dashboardIcon from 'src/assets/images/sidebar/dashboardIcon.svg';
import kycIcon from 'src/assets/images/sidebar/kycIcon.svg';
import settingsIcon from 'src/assets/images/sidebar/settings.svg';

export const DASHBOARD_SIDEBAR_DATA = () => {
	let sidebarData = [
		{
			text: 'Dashboard',
			url: '/dashboard',
			icon: dashboardIcon,
		},
		{
			text: 'KYC',
			url: '/kyc',
			icon: kycIcon,
		},
		{
			text: 'Setting',
			url: '/setting',
			icon: settingsIcon,
		},

		// {
		//   text: 'Users',
		//   url: '/users',
		//   icon: '/dashboard/sidebar/usersIcon.svg',
		//   sublinks: [
		//     { text: 'Users', url: '/users' },
		//     { text: 'Staffs', url: '/users/staffs' },
		//   ],
		// },
	];

	return sidebarData;
};

export default DASHBOARD_SIDEBAR_DATA;
