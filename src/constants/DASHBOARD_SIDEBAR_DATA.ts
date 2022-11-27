import dashboardActiveIcon from 'src/assets/images/sidebar/dashboardActiveIcon.svg';
import dashboardIcon from 'src/assets/images/sidebar/dashboardIcon.svg';
import kycIcon from 'src/assets/images/sidebar/kycIcon.svg';
import kycActiveIcon from 'src/assets/images/sidebar/kycActiveIcon.svg';
import settingsIcon from 'src/assets/images/sidebar/settingsIcon.svg';
import settingsActiveIcon from 'src/assets/images/sidebar/settingsActiveIcon.svg';
import usersIcon from 'src/assets/images/sidebar/usersIcon.svg';
import usersActiveIcon from 'src/assets/images/sidebar/usersActiveIcon.svg';
import adminIcon from 'src/assets/images/sidebar/adminIcon.svg';
import adminActiveIcon from 'src/assets/images/sidebar/adminActiveIcon.svg';
import bookingsIcon from 'src/assets/images/sidebar/bookingsIcon.svg';
import bookingsActiveIcon from 'src/assets/images/sidebar/bookingsActiveIcon.svg';
import artisanIcon from 'src/assets/images/sidebar/artisanIcon.svg';
import artisanActiveIcon from 'src/assets/images/sidebar/artisanActiveIcon.svg';

export const DASHBOARD_SIDEBAR_DATA = () => {
	let sidebarData = [
		{
			text: 'Dashboard',
			url: '/dashboard',
			icon: dashboardIcon,
			activeIcon: dashboardActiveIcon,
		},
		{
			text: 'KYC',
			url: '/kyc',
			icon: kycIcon,
			activeIcon: kycActiveIcon,
		},
		{
			text: 'Customers',
			url: '/users',
			icon: usersIcon,
			activeIcon: usersActiveIcon,
		},
		{
			text: 'Vendors',
			url: '/artisans',
			icon: artisanIcon,
			activeIcon: artisanActiveIcon,
		},
		{
			text: 'Bookings',
			url: '/bookings',
			icon: bookingsIcon,
			activeIcon: bookingsActiveIcon,
		},
		{
			text: 'Admin',
			url: '/admins',
			icon: adminIcon,
			activeIcon: adminActiveIcon,
		},
		{
			text: 'Others',
			icon: dashboardIcon,
			sublinks: [
				{
					text: 'Banks',
					url: '/banks',
				},
				{
					text: 'Occupations',
					url: '/occupations',
				},
				{
					text: 'Categories',
					url: '/categories',
				},
			],
			activeIcon: dashboardActiveIcon,
		},
		{
			text: 'Settings',
			url: '/settings',
			icon: settingsIcon,
			activeIcon: settingsActiveIcon,
		},
	];

	return sidebarData;
};

export default DASHBOARD_SIDEBAR_DATA;
