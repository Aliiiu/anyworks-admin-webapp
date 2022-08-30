import dashboardIcons from 'src/assets/images/sidebar/dashboardIcons.png';
import kycIcons from 'src/assets/images/sidebar/kycIcons.png';
import settingsIcons from 'src/assets/images/sidebar/settingsIcons.png';
import usersIcons from 'src/assets/images/sidebar/usersIcons.png';
import settingsIcon from 'src/assets/images/sidebar/settings.svg';
import adminIcon from 'src/assets/images/sidebar/admin.svg';
import bookingsIcons from 'src/assets/images/sidebar/bookingsIcons.png';

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
			text: 'Users',
			url: '/users',
			icon: usersIcons,
		},
		{
			text: 'Admin',
			url: '/admin',
			icon: usersIcons,
		},
		{
			text: 'Settings',
			url: '/settings',
			icon: settingsIcons},
			{				
	text: 'Bookings',
			url: '/bookings',
			icon: bookingsIcons,
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
