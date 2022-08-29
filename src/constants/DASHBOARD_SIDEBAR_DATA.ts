import dashboardIcons from 'src/assets/images/sidebar/dashboardIcons.png';
import kycIcons from 'src/assets/images/sidebar/kycIcons.png';
import settingsIcons from 'src/assets/images/sidebar/settingsIcons.png';
import usersIcons from 'src/assets/images/sidebar/usersIcons.png';

export const DASHBOARD_SIDEBAR_DATA = () => {
	let sidebarData = [
		{
			text: 'Dashboard',
			url: '/dashboard',
			icon: dashboardIcons,
		},
		{
			text: 'KYC',
			url: '/kyc',
			icon: kycIcons,
		},
		{
			text: 'Settings',
			url: '/settings',
			icon: settingsIcons,
		},
		{
			text: 'Users',
			url: '/users',
			icon: usersIcons,
		},

		// {
		//   text: 'Users',
		//   url: '/users',
		//   icon: '/dashboard/sidebar/usersIcons.svg',
		//   sublinks: [
		//     { text: 'Users', url: '/users' },
		//     { text: 'Staffs', url: '/users/staffs' },
		//   ],
		// },
	];

	return sidebarData;
};

export default DASHBOARD_SIDEBAR_DATA;
