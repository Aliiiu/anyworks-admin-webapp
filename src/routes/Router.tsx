import Dashboard from 'src/pages/dashboard/Dashboard';
import Kyc from 'src/pages/kyc/Kyc';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from 'src/pages/forgotPassword/ForgotPassword';
import GetCode from 'src/pages/forgotPassword/GetCode';
import NewPassword from 'src/pages/forgotPassword/NewPassword';
import Login from 'src/pages/auth/Login';
import ArtisanKyc from 'src/pages/kyc/ArtisanKyc';
import Settings from 'src/pages/settings/Settings';
import Admin from 'src/pages/admin/Admin';
import AdminProfile from 'src/pages/admin/AdminProfile';
import Users from 'src/pages/users/Users';
import Profile from 'src/pages/users/UserProfile';
import BookingsPage from 'src/pages/bookings/Bookings';
import BookingDetailsPage from 'src/pages/bookings/BookingDetails';
import Artisan from 'src/pages/artisans/Artisan';
import ArtisansProfile from 'src/pages/artisans/ArtisansProfile';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='forgot-password' element={<ForgotPassword />} />
			<Route path='get-code' element={<GetCode />} />
			<Route path='new-password' element={<NewPassword />} />
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='/kyc' element={<Kyc />} />
			<Route path='/kyc/artisan' element={<ArtisanKyc />} />
			<Route path='/users' element={<Users />} />
			<Route path='/users/profile' element={<Profile />} />
			<Route path='/artisans' element={<Artisan />} />
			<Route path='/artisans/:id' element={<ArtisansProfile />} />
			<Route path='/admins' element={<Admin />} />
			<Route path='/admins/:id' element={<AdminProfile />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/bookings' element={<BookingsPage />} />
			<Route
				path='/bookings/booking-details'
				element={<BookingDetailsPage />}
			/>
		</Routes>
	);
};

export default Router;
