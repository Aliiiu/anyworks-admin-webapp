import dashboardActiveIcon from 'src/assets/images/sidebar/dashboardActiveIcon.svg';
import dashboardIcon from 'src/assets/images/sidebar/dashboardIcon.svg';
import kycIcon from 'src/assets/images/sidebar/kycIcon.svg';
import kycActiveIcon from 'src/assets/images/sidebar/kycActive.svg';
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
import walletIcon from 'src/assets/images/sidebar/walletIcon.svg';
import walletActiveIcon from 'src/assets/images/sidebar/walletActiveIcon.svg';
import disputeIcon from 'src/assets/images/sidebar/disputeIcon.svg';
import disputeActiveIcon from 'src/assets/images/sidebar/disputeActive.svg';

export const DASHBOARD_SIDEBAR_DATA = () => {
	let sidebarData = [
		{
			text: 'Dashboard',
			url: '/dashboard',
			icon: dashboardIcon,
			activeIcon: dashboardActiveIcon,
		},
		{
			text: 'Verification',
			icon: kycIcon,
			url: '/verification',
			sublinks: [
				{
					text: 'Customer',
					url: '/verification/customer',
				},
				{
					text: 'Vendor',
					url: '/verification/vendor',
				},
			],
			activeIcon: kycActiveIcon,
		},
		{
			text: 'Customers',
			url: '/customers',
			icon: usersIcon,
			activeIcon: usersActiveIcon,
		},
		{
			text: 'Vendors',
			url: '/vendors',
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
			text: 'Dispute',
			url: '/dispute',
			icon: disputeIcon,
			activeIcon: disputeActiveIcon,
		},
		{
			text: 'Admin',
			url: '/admins',
			icon: adminIcon,
			activeIcon: adminActiveIcon,
		},
		{
			text: 'Wallet',
			url: '/wallet',
			icon: walletIcon,
			activeIcon: walletActiveIcon,
		},
		{
			text: 'Others',
			icon: dashboardIcon,
			url: '/misc',
			sublinks: [
				{
					text: 'Banks',
					url: '/misc/banks',
				},
				{
					text: 'Occupations',
					url: '/misc/occupations',
				},
				{
					text: 'Categories',
					url: '/misc/categories',
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
