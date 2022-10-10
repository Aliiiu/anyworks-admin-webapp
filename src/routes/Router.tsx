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
import PrivateRoute from './PrivateRoute';

const Router = () => {
	return (
		<Routes>
			<Route path='/' element={<Login />} />
			<Route path='forgot-password' element={<ForgotPassword />} />
			<Route path='get-code' element={<GetCode />} />
			<Route
				path='new-password'
				element={
					<PrivateRoute>
						<NewPassword />
					</PrivateRoute>
				}
			/>
			<Route
				path='/dashboard'
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route
				path='/kyc'
				element={
					<PrivateRoute>
						<Kyc />
					</PrivateRoute>
				}
			/>
			<Route
				path='/kyc/:artisan_id'
				element={
					<PrivateRoute>
						<ArtisanKyc />
					</PrivateRoute>
				}
			/>
			<Route
				path='/users'
				element={
					<PrivateRoute>
						<Users />
					</PrivateRoute>
				}
			/>
			<Route
				path='/users/:id'
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route
				path='/artisans'
				element={
					<PrivateRoute>
						<Artisan />
					</PrivateRoute>
				}
			/>
			<Route
				path='/artisans/:id'
				element={
					<PrivateRoute>
						<ArtisansProfile />
					</PrivateRoute>
				}
			/>
			<Route
				path='/admins'
				element={
					<PrivateRoute>
						<Admin />
					</PrivateRoute>
				}
			/>
			<Route
				path='/admins/:id'
				element={
					<PrivateRoute>
						<AdminProfile />
					</PrivateRoute>
				}
			/>
			<Route
				path='/settings'
				element={
					<PrivateRoute>
						<Settings />
					</PrivateRoute>
				}
			/>

			<Route
				path='/bookings'
				element={
					<PrivateRoute>
						<BookingsPage />
					</PrivateRoute>
				}
			/>
			<Route
				path='/bookings/:id'
				element={
					<PrivateRoute>
						<BookingDetailsPage />
					</PrivateRoute>
				}
			/>
			{/* <Route
					path=':tabStatus'
					element={
						<PrivateRoute>
							<BookingsPage />
						</PrivateRoute>
					}
				/> */}
		</Routes>
	);
};

export default Router;
